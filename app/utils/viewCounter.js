import { API_HOST } from 'utils/constants';
import request from 'utils/request';

export default function viewCounter(entity, id) {
  switch (entity) {
    case 'song': {
      if (!localStorage.getItem(`song_${id}`)) {
        localStorage.setItem(`song_${id}`, true);
        request(`${API_HOST}/songs/increment/view/${id}`);
      }
      break;
    }
    case 'album': {
      if (!localStorage.getItem(`album_${id}`)) {
        localStorage.setItem(`album_${id}`, true);
        request(`${API_HOST}/albums/increment/view/${id}`);
      }
      break;
    }
    case 'author': {
      if (!localStorage.getItem(`author_${id}`)) {
        localStorage.setItem(`author_${id}`, true);
        request(`${API_HOST}/authors/increment/view/${id}`);
      }
      break;
    }
    // eslint-disable-next-line no-empty
    default: {
    }
  }
}
