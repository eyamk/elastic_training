import fetch from 'node-fetch';
import EntityTemplate from '../../../resources/template/template.json';

const DEFAULT_URL = 'http://localhost:9200/_template/jobs';

const updateTemplate = async (req, res) => {
  try {
    const response = await fetch(DEFAULT_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(EntityTemplate),
    });
    const result = await response.json();
    res.send(result);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('hhhhhhhhh', e);
  }
};

export default updateTemplate;
