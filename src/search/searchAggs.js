/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import { map, get } from 'lodash';

const DEFAULT_URL = 'http://localhost:9200/entity_job,gql_entity/_search';
const AggsMixteSearch = async (req, res) => {
  const { Input = '', from = 0 } = req.body;
  const body = {
    size: 0,
    from: Number(from),
    query: {
      bool: {
        must: [],
        should: [],
        filter: [],
      },
    },
    aggs: {
      name: {
        terms: {
          field: 'job_type',
        },
      },
    },
  };
  if (Input) {
    body.query.bool.must.push({
      multi_match: {
        query: Input,
        fields: [
          'type',
          'job_type',
          'title',
          'description',
          'location',
          'company',
        ],
      },
    });
  }
  try {
    const response = await fetch(DEFAULT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(body, null, 2));
    const responseJson = await response.json();
    const aggs = {
      aggregations: {
        name: {
          buckets: map(response => ({
            key: response.type,
            doc_count: get(response, ['hits', 'total'], 0),
          })),
        },
      },
    };
    // eslint-disable-next-line no-console
    console.log(get(aggs, 'aggregations.name.buckets', []));
    return res.json({ responseJson, buckets: get(aggs, 'aggregations.name.buckets', []) });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
export default AggsMixteSearch;
