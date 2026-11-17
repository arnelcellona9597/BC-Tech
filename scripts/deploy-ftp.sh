#!/usr/bin/env bash
# Uploads the built site (public/) to your hosting over FTPS (explicit TLS). Run it yourself in a terminal:
#   npm run build && bash scripts/deploy-ftp.sh
# It asks for the FTP password and does not store it anywhere (the password is kept only in a temporary
# file that is deleted when the script ends). It never uploads api/config.php, api/storage or log files,
# so your real mail password on the server is never touched.
set -euo pipefail

HOST_DEFAULT="ftp.davaobyte.com"
read -r -p "FTP server [${HOST_DEFAULT}]: " HOST; HOST="${HOST:-$HOST_DEFAULT}"
read -r -p "FTP username: " FTP_USER
read -r -s -p "FTP password (typing is hidden): " FTP_PASS; echo
read -r -p "Remote folder, relative to the FTP account root [.]: " REMOTE; REMOTE="${REMOTE:-.}"
REMOTE="${REMOTE#/}"; REMOTE="${REMOTE%/}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/public"
[ -f "$SRC/index.html" ] || { echo "public/ is empty. Run: npm run build"; exit 1; }

NETRC="$(mktemp)"; chmod 600 "$NETRC"
trap 'rm -f "$NETRC"' EXIT
printf 'machine %s login %s password %s\n' "$HOST" "$FTP_USER" "$FTP_PASS" > "$NETRC"
unset FTP_PASS

base="ftp://${HOST}/"; [ "$REMOTE" != "." ] && base="${base}${REMOTE}/"
echo "Uploading to ${base} ..."
count=0; failed=()
while IFS= read -r -d '' f; do
  rel="${f#"$SRC"/}"
  case "$rel" in
    api/config.php|api/storage/*|*.log) continue ;;
  esac
  # Retry a few times: shared hosts sometimes answer "451 try again" when many files arrive quickly.
  if curl --silent --show-error --fail --ssl-reqd --ftp-create-dirs --retry 5 --retry-delay 3 --retry-all-errors --netrc-file "$NETRC" -T "$f" "${base}${rel}" 2>/dev/null; then
    count=$((count + 1))
  else
    failed+=("$rel")
  fi
  printf '\r%d uploaded, %d failed' "$count" "${#failed[@]}"
  sleep 0.2
done < <(find "$SRC" -type f -print0)
echo
if [ "${#failed[@]}" -gt 0 ]; then
  echo "These files did not upload (run the script again, it is safe to repeat):"
  printf '  %s\n' "${failed[@]}"
  exit 1
fi
echo "Done. Next: on the server create api/config.php from api/config.example.php (File Manager) and add the mail password there."
