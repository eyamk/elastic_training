import elasticsearch from 'elasticsearch';

const esClient = new elasticsearch.Client({
  host: process.env.ELASTIC_HOST,
  log: 'trace',
});

export default esClient;
