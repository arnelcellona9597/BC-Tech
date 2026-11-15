// Address of each service's own page. Kept in a tiny file so layout, home and the page templates share it.
import { servicePages } from '../data/service-pages.mjs';
export const serviceUrl = (id) => `/services/${servicePages[id].slug}/`;
