import { Handler } from '@netlify/functions';

const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: 'I am being developed as we speak, but bare with me I will be live soon!',
  };
};

export { handler };
