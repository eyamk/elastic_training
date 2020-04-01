/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

export default function getEnv(varName) {
  return process.env[varName];
}
