/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
import { omit, flatten } from 'lodash';
import esClient from '../../ESconnection/connection';
import DataGql from '../../../resources/data/graphqlJob.json';

// eslint-disable-next-line no-unused-vars
const exportGqlToEs = async (req, res) => {
  try {
    const body = DataGql.reduce((acc, item) => {
      acc.push({
        index: {
          _index: 'gql_entity',
          _id: item.id,
        },
      });
      acc.push({
        ...omit(item, ['id']),
      });
      return acc;
    }, []);

    return esClient.bulk({ body: flatten(body) });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
export default exportGqlToEs;
