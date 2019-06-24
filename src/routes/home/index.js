import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('https://reqres.in/api/products/3');
  const { data } = await resp.json();

  if (!data) throw new Error('Failed to load the json.');
  return {
    title: 'Sheep Music',
    description: 'description1111',
    chunks: ['home'],
    component: (
      <Layout>
        <Home obj={data} />
      </Layout>
    ),
  };
}

export default action;
