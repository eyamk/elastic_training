/* eslint-disable linebreak-style */
import fetch from 'node-fetch';
import GraphqlTemplate from '../../../resources/template/templategql.json';

const DEFAULT_URL = 'http://localhost:9200/_template/graphql';

const updateTemplateGraphql = async (req, res) => {
  try {
    const response = await fetch(DEFAULT_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(GraphqlTemplate),
    });
    const result = await response.json();
    res.send(result);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('hhhhhhhhh', e);
  }
};

export default updateTemplateGraphql;
