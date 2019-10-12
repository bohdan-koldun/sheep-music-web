import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BeatLoader from 'react-spinners/BeatLoader';
import { MdPictureAsPdf } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'containers/LanguageProvider';
import commonMessages from 'translations/common-messages';
import QRCode from 'qrcode';
import ReactGA from 'react-ga';
import SongTextPdf from './SongTextPdf';
import messages from './messages';
import './SongPdfGenerator.scss';

function SongPdfGenerator({ song }) {
  const [downloadPdf, setDownloadPdf] = useState(false);
  const [isReadyImg, setIsReadyImg] = useState(false);
  const [qrCode, setQrCode] = useState();
  const intl = useIntl();

  const generateQR = async () => {
    const code = await QRCode.toDataURL(
      `https://sheep-music.com/song/${song.slug}`,
    );
    setQrCode(code);
    setIsReadyImg(true);
  };

  useEffect(() => {
    if (downloadPdf) {
      generateQR();
    }
  }, [downloadPdf]);

  return (
    <div className="song-pdf-generator">
      {downloadPdf && isReadyImg ? (
        <div>
          <PDFDownloadLink
            document={
              <SongTextPdf
                song={song}
                titles={{
                  author: intl.formatMessage(commonMessages.author),
                  album: intl.formatMessage(commonMessages.album),
                }}
                qrCode={qrCode}
              />
            }
            fileName={`${song.slug}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <div className="pdf-loader">
                  <BeatLoader />
                </div>
              ) : (
                <button
                  type="button"
                  className="pdf-download-button"
                  onClick={() =>
                    ReactGA.event({
                      category: 'Song',
                      action: 'click pdf download button',
                    })
                  }
                >
                  <MdPictureAsPdf />
                  <FormattedMessage {...messages.downloadPdf} />
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      ) : (
        (!downloadPdf && (
          <button
            type="button"
            className="pdf-generate-button"
            onClick={() => {
              setDownloadPdf(true);
              ReactGA.event({
                category: 'Song',
                action: 'click pdf generate button',
              });
            }}
          >
            <MdPictureAsPdf />
            <FormattedMessage {...messages.generatePdf} />
          </button>
        )) || (
          <div className="pdf-loader">
            <BeatLoader />
          </div>
        )
      )}
    </div>
  );
}

SongPdfGenerator.propTypes = {
  song: PropTypes.object,
};

export default SongPdfGenerator;
