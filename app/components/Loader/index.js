import React from 'react';
import PropTypes from 'prop-types';
import ScaleLoader from 'react-spinners/ScaleLoader';

import styled from 'styled-components';

const Loader = ({ marginTop }) => {
  const LoaderWrapper = styled.div`
    width: 100%;
    max-height: 45vh;
    margin-top: ${marginTop != null ? marginTop : '150px'};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <LoaderWrapper>
      <ScaleLoader height={50} width={6} color="#3e3e3e" />
    </LoaderWrapper>
  );
};

Loader.propTypes = {
  marginTop: PropTypes.string,
};

export default Loader;
