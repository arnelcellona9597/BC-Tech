import { siFacebook, siMessenger, siWhatsapp, siYoutube } from 'simple-icons';
import { site } from '../data/site.mjs';

const fill = (path) => `<svg class="soc-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${path}"/></svg>`;
const linkedinSvg = '<svg class="soc-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="evenodd" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM6 6.4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zM4.9 10.2h2.2v7.1H4.9zM10.1 10.2h2.1v1c.4-.7 1.2-1.2 2.3-1.2 2.2 0 2.9 1.4 2.9 3.4v3.9h-2.2v-3.5c0-.9-.2-1.7-1.2-1.7-1 0-1.7.7-1.7 1.8v3.4h-2.2z"/></svg>';
const networks = [
  { key: 'facebook', label: 'Facebook', svg: fill(siFacebook.path) },
  { key: 'messenger', label: 'Messenger', svg: fill(siMessenger.path) },
  { key: 'whatsapp', label: 'WhatsApp', svg: fill(siWhatsapp.path) },
  { key: 'youtube', label: 'YouTube', svg: fill(siYoutube.path) },
  { key: 'linkedin', label: 'LinkedIn', svg: linkedinSvg },
  { key: 'googleBusiness', label: 'Google Business Profile', svg: '<svg class="soc-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 9.5 5 4h14l1.5 5.5M3.5 9.5a2.6 2.6 0 0 0 5 0 2.6 2.6 0 0 0 5 0 2.6 2.6 0 0 0 5 0 2.6 2.6 0 0 0 2.5 0M5 12.5V20h14v-7.5M10 20v-4.5h4V20"/></svg>' },
];

/** Social icon row. A network without a link shows a plain badge (no dead links). */
export function socialIcons(cls = '') {
  return `<ul class="social ${cls}" aria-label="Our social media">${networks
    .map((n) => {
      const url = site.social[n.key];
      return url
        ? `<li><a class="soc" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${n.label} (opens in a new tab)">${n.svg}</a></li>`
        : `<li><span class="soc is-off" role="img" aria-label="${n.label}">${n.svg}</span></li>`;
    })
    .join('')}</ul>`;
}

export const messengerHref = () => site.social.messenger || '/contact/#message';
