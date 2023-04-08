import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async req => {
  if (!req.body) return { statusCode: 400 };

  const payload = JSON.parse(req.body) as {
    question: string;
    responseUrl: string;
  };

  await doStuff(payload.question, payload.responseUrl);

  return {
    statusCode: 200,
    body: 'done',
  };
};

export { handler };

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function doStuff(_: string, responseUrl: string) {
  await delay(2000);

  try {
    await axios.post(
      responseUrl,
      {
        replace_original: 'true',
        text: 'This should replace the original message',
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.log('err :>> ', err);
  }
}
