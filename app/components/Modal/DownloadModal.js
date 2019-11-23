import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import { MdVerticalAlignBottom } from 'react-icons/md';
import messages from './messages';
import './DownloadModal.scss';

function DownloadModal({ isOpen, onCloseModal, downloadUrl, title }) {
  Modal.setAppElement('#app');

  return (
    <Modal isOpen={isOpen} styles={{ zIndex: 200 }} className="download-modal">
      <a
        href={downloadUrl}
        onClick={() => setTimeout(onCloseModal, 1000)}
        download
        className="download-button"
      >
        <MdVerticalAlignBottom />
        <FormattedMessage {...messages.download} /> {title}
      </a>
      <button type="button" onClick={onCloseModal} className="cancel-button">
        <FormattedMessage {...messages.cancel} />
      </button>
    </Modal>
  );
}

DownloadModal.propTypes = {
  isOpen: PropTypes.bool,
  downloadUrl: PropTypes.string,
  title: PropTypes.string,
  onCloseModal: PropTypes.func,
};

export default DownloadModal;
