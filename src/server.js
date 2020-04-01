import express from 'express';
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'body-parser';
import template from './routes/indexation/template';
import exportToEs from './routes/exportData/exportToES';
import templateGraphql from './routes/indexation/templateGraphql';
import exportGqlToEs from './routes/exportData/exportGqlToEs';
import searchJobs from './search/searchJobs';
import mixteSearch from './search/mixteSearch';
import AggsMixteSearch from './search/searchAggs';


dotenv.config();
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('OK');
});
app.use('/template', template);
app.use('/export', exportToEs);
app.use('/templateGql', templateGraphql);
app.use('/exportGql', exportGqlToEs);
app.use('/mysearch', searchJobs);
app.use('/mixtesearch', mixteSearch);
app.use('/searchaggs', AggsMixteSearch);
// eslint-disable-next-line no-console
app.listen(3001, () => console.log('server running ! 🚀 '));
