/**
 *
 * Asynchronously loads the component for Album
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
