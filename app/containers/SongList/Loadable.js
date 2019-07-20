/**
 *
 * Asynchronously loads the component for SongList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
