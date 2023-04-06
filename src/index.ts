import { Handler } from '@netlify/functions';

const handler: Handler = async () => {
  return {
    statusCode: 204,
  };
};

export { handler };
