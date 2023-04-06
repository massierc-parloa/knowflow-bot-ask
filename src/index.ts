import { Handler } from '@netlify/functions';

const handler: Handler = async req => {
  console.log('req :>> ', req);

  return {
    statusCode: 204,
  };
};

export { handler };
