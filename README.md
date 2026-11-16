# Davao Byte website

Marketing site for Davao Byte (web design and development, Davao City, Philippines).

- Static HTML, CSS and vanilla JavaScript, with no frameworks and no third-party scripts.
- PHP is used only to send form emails over SMTP (contact form and the booking calendar).
- Source is in `src/`. `npm run build` writes the deployable site to `public/`.
- Brand assets (logo, favicons, social kit) are in `brand/`.

```bash
npm install
npm start      # build + preview at http://localhost:4173
```

Setup, content editing and deployment steps are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
