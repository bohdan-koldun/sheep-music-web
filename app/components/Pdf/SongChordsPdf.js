/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Document,
  Page,
  StyleSheet,
  Font,
  Link,
  View,
  Image,
} from '@react-pdf/renderer';
import * as striptags from 'striptags';
import { isChordLine } from 'components/chords/chords-transposer/regexp';
import sheep from '../../images/icon-512x512.png';

Font.register({
  family: 'DejaVu Sans',
  fonts: [
    {
      src:
        'https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf',
    },
    {
      src:
        'https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src:
        'https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  headerTop: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 15,
    marginBottom: 10,
  },
  headerSong: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subSongHeader: {
    fontSize: 12,
    lineHeight: '1.5',
  },
  page: {
    paddingTop: 35,
    paddingBottom: 80,
    paddingHorizontal: 35,
    fontFamily: 'DejaVu Sans',
    fontSize: 14,
    lineHeight: '1.2',
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
    fontSize: 12,
    color: '#424243',
  },
  chordText: {
    color: '#3759da',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flex: 1,
  },
  img: {
    marginRight: 4,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLink: {
    justifyContent: 'center',
    lineHeight: 1,
    alignItems: 'center',
    fontSize: 14,
  },
});

function SongChordsPdf({ song, titles, qrCode, fileName }) {
  const isBold = row => {
    const headers = [
      'Instrumental:',
      'Interlude:',
      'Мост:',
      'Міст:',
      'Bridge:',
      'Tag:',
      'verse:',
      'Verse:',
      'Куплет:',
      'куплет:',
      'Припев:',
      'Приспів:',
      'Запев:',
      'Проигрыш:',
      'Вставка:',
      'Пред припев:',
      'chorus:',
      'Outro:',
      'Chorus:',
      'Ending:',
    ];

    return !!headers.find(element => row.includes(element));
  };

  const authorLink =
    song.author && `https://sheep-music.com/author/${song.author.slug}`;
  const albumLink =
    song.album && `https://sheep-music.com/album/${song.album.slug}`;
  const songLink = `https://sheep-music.com/chord/${song.slug}`;

  return (
    <Document
      renderMode="svg"
      title={song && song.title}
      author="Sheep Music"
      creator="sheep-music.com"
      onRender={blob => {
        if (blob && blob.blob) {
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(blob.blob);
          document.body.appendChild(a);
          a.style = 'display: none';
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      }}
    >
      <Page style={styles.page}>
        <Text style={styles.headerTop} fixed>
          ~ sheep-music.com ~
        </Text>
        <View style={{ ...styles.header }}>
          <Image src={qrCode} style={{ height: 90, width: 90 }} />
          <View>
            <Text style={styles.headerSong}>{song.title}</Text>
            <Text style={styles.subSongHeader}>
              {song.author ? (
                <Text>
                  {titles.author}:{' '}
                  <Link src={authorLink}>{song.author.title}</Link>
                </Text>
              ) : null}
              {song.album ? (
                <Text>
                  {'\n'}
                  {titles.album}:{' '}
                  <Link src={albumLink}>{song.album.title}</Link>
                </Text>
              ) : null}
              <Text>{'\n'}</Text>
              <Link src={songLink} style={{ color: '#424243' }}>
                {songLink}
              </Link>
            </Text>
          </View>
        </View>

        {striptags(song.chords)
          .split('\n')
          .map((row, i) => {
            if (isBold(row))
              return (
                <Text key={`${song.slug}${i}`} style={styles.boldText}>
                  {row}
                </Text>
              );
            if (isChordLine(row))
              return (
                <Text key={`${song.slug}${i}`} style={styles.chordText}>
                  {row}
                </Text>
              );
            return <Text key={`${song.slug}${i}`}>{row}</Text>;
          })}

        <View style={styles.footer} fixed>
          <Image src={sheep} style={styles.img} />
          <Link src="https://sheep-music.com" style={styles.footerLink}>
            sheep-music.com
          </Link>
        </View>
      </Page>
    </Document>
  );
}

SongChordsPdf.propTypes = {
  song: PropTypes.object,
  titles: PropTypes.object,
  qrCode: PropTypes.string,
  fileName: PropTypes.string,
};

export default SongChordsPdf;
