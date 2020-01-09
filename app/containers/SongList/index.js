/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'translations/common-messages';
import Pagination from 'components/Pagination';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { titleCase } from 'utils/string';
import { setSongList, setPlayPause } from 'containers/AudioPlayer/actions';
import { SongPlayList } from 'components/List';
import { ListFilter } from 'components/Filter';
import { SearchInfo } from 'components/Info';
import Breadcrumb from 'components/Breadcrumb';
import { useIntl } from 'containers/LanguageProvider';
import menuMessages from 'components/Menu/messages';
import Loader from 'components/Loader';
import {
  makeSelectPlay,
  makeSelectAudioPlayData,
} from 'containers/AudioPlayer/selectors';
import { makeSelectTags } from 'containers/App/selectors';
import {
  loadSongList,
  changeSearch,
  changePage,
  changeFilter,
  changeTagsFilter,
} from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSongList,
  makeSelectSongListPage,
  makeSelectSongListSearch,
  makeSelectSongListFilter,
  makeSelectSongListTagsFilter,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './SongList.scss';

export function SongList({
  songs,
  loading,
  onLoadSongList,
  onPlaySongList,
  onPlayPause,
  play,
  playData,
  page,
  search,
  filter,
  tags,
  curTags,
  onChangePage,
  onChangeSearch,
  onChangeFilter,
  onChangeTagsFilter,
  history,
}) {
  useInjectReducer({ key: 'songList', reducer });
  useInjectSaga({ key: 'songList', saga });
  const intl = useIntl();

  const myRef = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 20);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    const urlPage = currentUrlParams.get('page');
    const urlSearch = currentUrlParams.get('search');
    const urlTags = currentUrlParams.get('tags');
    const urlFilter = currentUrlParams.get('filter');

    if (urlSearch) {
      onChangeSearch(urlSearch);
    }
    if (urlFilter) {
      onChangeFilter({ value: urlFilter });
    }
    if (urlTags) {
      onChangeTagsFilter(urlTags.split(',').map(tag => ({ value: tag })));
    }
    if (urlPage && !Number.isNaN(urlPage)) {
      onChangePage(Number.parseInt(urlPage, 10));
    }

    return () => {
      onChangeTagsFilter(null);
      onChangeFilter({});
      onChangePage(0);
      onChangeSearch('');
    };
  }, []);

  const changeURLSearchParams = (value, name, currentUrlParams) => {
    if (value) {
      currentUrlParams.set(name, value);
    } else {
      currentUrlParams.delete(name);
    }
  };

  const changeCurrentUrl = () => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    const urlPage = currentUrlParams.get('page');
    const urlSearch = currentUrlParams.get('search');
    const urlTags = currentUrlParams.get('tags');
    const urlFilter = currentUrlParams.get('filter');

    const isChange = (param, urlParam) =>
      (!!param || !!urlParam) && param != urlParam;
    const isParams = page || search || filter.value || curTags;

    if (
      isParams &&
      (isChange(page, urlPage) ||
        isChange(search, urlSearch) ||
        isChange(filter.value, urlFilter) ||
        isChange(curTags, urlTags))
    ) {
      changeURLSearchParams(search, 'search', currentUrlParams);
      changeURLSearchParams(filter && filter.value, 'filter', currentUrlParams);
      changeURLSearchParams(curTags, 'tags', currentUrlParams);
      changeURLSearchParams(page, 'page', currentUrlParams);
      history.push(
        `${window.location.pathname}?${currentUrlParams.toString()}`,
      );
    }
  };

  useEffect(() => {
    onLoadSongList(page, search, filter.value, curTags);
    changeCurrentUrl();
  }, [page, search, filter, curTags]);

  const playPauseSong = song => {
    if (playData && playData.song && song && song.id === playData.song.id) {
      onPlayPause(song.id);
    } else if (song && song.audioMp3 && song.audioMp3.path) {
      onPlaySongList(song, songs.results || []);
    }
  };

  const curTagNames =
    curTags &&
    tags
      .filter(tag => curTags.split(',').includes(String(tag.id)))
      .map(tag => tag.name);

  return (
    <div>
      <Helmet>
        <title>
          {curTagNames
            ? `${curTagNames.join(
                ', ',
              )} | Песни | Лучшие ${new Date().getFullYear()}`
            : `Удобный Сборник Христианских Песен ${new Date().getFullYear()}`}
        </title>
        <meta
          name="description"
          content="Христианские песни: слушать онлайн, скачать, слова, текст, аккорды, фонограммы"
        />
      </Helmet>

      <Breadcrumb
        pageList={[
          {
            link: '/songs',
            name: intl.formatMessage(menuMessages.songs),
          },
        ]}
      />

      <h1 ref={myRef}>
        {curTags ? (
          <React.Fragment>
            {titleCase(intl.formatMessage(commonMessages.manySongFirstVariant))}
            {': '}
            {curTagNames.map(tag => (
              <span key={tag} className="theme-tag-header">
                {tag}
              </span>
            ))}
          </React.Fragment>
        ) : (
          <FormattedMessage {...messages.header} />
        )}
      </h1>
      <ListFilter
        search={search}
        filter={filter}
        // tags={tags}
        curTags={curTags}
        onChangeSearch={onChangeSearch}
        onChangeFilter={onChangeFilter}
        onChangeTagsFilter={onChangeTagsFilter}
      />
      <SearchInfo
        count={(songs && songs.total) || 0}
        page={songs && 1 + Number.parseInt(songs.curPage, 10)}
        search={search}
      />

      {!loading && songs && songs.results ? (
        <div>
          <SongPlayList
            songs={songs.results}
            playPauseSong={playPauseSong}
            playData={playData}
            play={play}
          />
          <Pagination
            pageCount={songs.countPages}
            forcePage={Number(songs.curPage)}
            onPageChange={pageNum => {
              onChangePage(pageNum);
              executeScroll();
            }}
          />
        </div>
      ) : (
        (loading && <Loader />) || null
      )}
    </div>
  );
}

SongList.propTypes = {
  loading: PropTypes.bool,
  songs: PropTypes.shape({
    result: PropTypes.object,
    pageTotal: PropTypes.number,
    total: PropTypes.number,
  }),
  onLoadSongList: PropTypes.func,
  play: PropTypes.bool,
  playData: PropTypes.shape({
    song: PropTypes.shape({
      title: PropTypes.string,
      audioMp3: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
    prevPlayListId: PropTypes.number,
    nextPlayListId: PropTypes.number,
  }),
  onPlaySongList: PropTypes.func,
  onPlayPause: PropTypes.func,
  page: PropTypes.number,
  search: PropTypes.string,
  filter: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  tags: PropTypes.arrayOf(PropTypes.object),
  curTags: PropTypes.string,
  onChangeSearch: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeFilter: PropTypes.func,
  onChangeTagsFilter: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  songs: makeSelectSongList(),
  play: makeSelectPlay(),
  playData: makeSelectAudioPlayData(),
  page: makeSelectSongListPage(),
  search: makeSelectSongListSearch(),
  filter: makeSelectSongListFilter(),
  tags: makeSelectTags(),
  curTags: makeSelectSongListTagsFilter(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSongList: (page, search, filter, tags) =>
      dispatch(loadSongList(page, search, filter, tags)),
    onPlaySongList: (song, songList) => dispatch(setSongList(song, songList)),
    onPlayPause: () => dispatch(setPlayPause()),
    onChangePage: page => dispatch(changePage(page)),
    onChangeSearch: search => dispatch(changeSearch(search)),
    onChangeFilter: filter => dispatch(changeFilter(filter)),
    onChangeTagsFilter: tags =>
      dispatch(changeTagsFilter(tags && tags.map(tag => tag.value).join(','))),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SongList);
