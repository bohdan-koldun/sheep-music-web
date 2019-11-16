/**
 *
 * Asynchronously loads the component for EditSong
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
