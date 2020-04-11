import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

import styled from 'styled-components';

const Loader = () => {
  const LoaderWrapper = styled.div`
    width: 100%;
    max-height: 45vh;
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

export default Loader;
