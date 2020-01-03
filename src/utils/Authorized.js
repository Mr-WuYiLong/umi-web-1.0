import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
// console.log('----', getAuthority())
let Authorized = RenderAuthorize(getAuthority()); // Reload the rights component

const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
