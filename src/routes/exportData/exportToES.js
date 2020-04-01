/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
import { omit } from 'lodash';
import esClient from '../../ESconnection/connection';
import DataJob from '../../../resources/data/githubJob.json';

// eslint-disable-next-line no-unused-vars
const exportToEs = async (req, res) => {
  try {
    const body = DataJob.reduce((acc, item) => {
      acc.push({
        index: {
          _index: 'entity_job',
          _id: item.id,
        },
      });
      acc.push({
        ...omit(item, ['id']),
      });
      return acc;
    }, []);
    return esClient.bulk({ body });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
export default exportToEs;
