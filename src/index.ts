import { Handler } from '@netlify/functions';

const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: 'Hello world!',
  };
};

export { handler };
