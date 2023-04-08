import { Handler } from '@netlify/functions';
import axios from 'axios';

import { ask } from './ask';

const handler: Handler = async req => {
  if (!req.body) return { statusCode: 400 };

  const { question, responseUrl } = JSON.parse(req.body) as {
    question: string;
    responseUrl: string;
  };

  try {
    const answer = await ask(question);

    await axios.post(responseUrl, answer);
  } catch (err) {
    console.error('Error :>> ', err);
  }

  return {
    statusCode: 200,
    body: 'done',
  };
};

export { handler };
