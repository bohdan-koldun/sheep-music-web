/**
 *
 * Asynchronously loads the component for AudioPlayer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
