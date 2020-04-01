/* eslint-disable consistent-return */
/* eslint-disable no-constant-condition */
/* eslint-disable no-sequences */
import fetch from 'node-fetch';
import { get } from 'lodash';

const DEFAULT_URL = 'http://localhost:9200/entity_job/_search';

const searchJobs = async (req, res) => {
  const { Input = '', from = 0 } = req.body;
  const body = {
    size: 12,
    from: Number(from),
    query: {
      bool: {
        must: [],
        should: [],
        filter: [],
      },
    },
  };
  const signalFields = ['company', 'location', 'title', 'description', 'how_to_apply'];

  if (Input) {
    body.query.bool.must.push({
      multi_match: {
        query: Input,
        operator: 'or',
        fields: signalFields,
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
    console.log('searchJobs -> JSON.stringify(body)', JSON.stringify(body, null, 2));
    const responseJson = await response.json();
    // eslint-disable-next-line no-console
    console.log(responseJson);
    const jobs = get(
      responseJson,
      ['hits', 'hits'],
      [],
    ).map(
      ({
        _source: {
          id,
          type,
          url,
          created_at: createdAt,
          company,
          company_url: companyUrl,
          location,
          title,
          description,
          how_to_apply: howToApply,
          company_logo: companyLogo,
        },
      }) => ({
        id,
        type,
        url,
        createdAt,
        company,
        companyUrl,
        location,
        title,
        description,
        howToApply,
        companyLogo,
      }),
    );
    return res.json({ jobs });
  } catch (error) {
    throw new Error(`No such solutions found: ${error}`);
  }
};

export default searchJobs;
