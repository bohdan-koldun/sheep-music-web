import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BeatLoader from 'react-spinners/BeatLoader';
import { MdPictureAsPdf } from 'react-icons/md';
import { useIntl } from 'containers/LanguageProvider';
import commonMessages from 'translations/common-messages';
import QRCode from 'qrcode';
import ReactGA from 'react-ga';
import ReactTooltip from 'react-tooltip';
import SongTextPdf from './SongTextPdf';
import SongChordsPdf from './SongChordsPdf';
import messages from './messages';
import './SongPdfGenerator.scss';

function SongPdfGenerator({ song, type }) {
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

  const fileName = `${song.slug}.pdf`;

  return (
    <div className="song-pdf-generator">
      {downloadPdf && isReadyImg ? (
        <div>
          <PDFDownloadLink
            document={
              type !== 'chords' ? (
                <SongTextPdf
                  song={song}
                  titles={{
                    author: intl.formatMessage(commonMessages.author),
                    album: intl.formatMessage(commonMessages.album),
                  }}
                  qrCode={qrCode}
                  fileName={fileName}
                />
              ) : (
                <SongChordsPdf
                  song={song}
                  titles={{
                    author: intl.formatMessage(commonMessages.author),
                    album: intl.formatMessage(commonMessages.album),
                  }}
                  qrCode={qrCode}
                  fileName={fileName}
                />
              )
            }
            fileName={fileName}
          >
            {({ loading }) =>
              loading ? (
                <div className="pdf-loader">
                  <BeatLoader />
                </div>
              ) : (
                <React.Fragment>
                  <MdPictureAsPdf
                    data-tip={intl.formatMessage(messages.downloadPdf)}
                    data-for="click-pdf-download"
                    className="song-icon"
                    onClick={() => {
                      ReactGA.event({
                        category: 'Song',
                        action: 'click pdf download button',
                      });
                    }}
                  />
                  <ReactTooltip id="click-pdf-download" />
                </React.Fragment>
              )
            }
          </PDFDownloadLink>
        </div>
      ) : (
        (!downloadPdf && (
          <React.Fragment>
            <MdPictureAsPdf
              data-tip={intl.formatMessage(messages.generatePdf)}
              data-for="click-pdf-generate"
              className="song-icon"
              onClick={() => {
                setDownloadPdf(true);
                ReactGA.event({
                  category: 'Song',
                  action: 'click pdf generate button',
                });
              }}
            />
            <ReactTooltip id="click-pdf-generate" />
          </React.Fragment>
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
  type: PropTypes.string,
};

export default SongPdfGenerator;
