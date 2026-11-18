import { siFacebook, siMessenger, siYoutube } from 'simple-icons';
import { site } from '../data/site.mjs';

const fill = (path) => `<svg class="soc-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${path}"/></svg>`;
const networks = [
  { key: 'facebook', label: 'Facebook', svg: fill(siFacebook.path) },
  { key: 'messenger', label: 'Messenger', svg: fill(siMessenger.path) },
  { key: 'youtube', label: 'YouTube', svg: fill(siYoutube.path) },
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
