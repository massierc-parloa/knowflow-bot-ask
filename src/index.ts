import axios from 'axios';
import { parse } from 'qs';

// const body =
//   'token=mAZkl1fJ3BePSYxltYtUKtgI&team_id=T012TSW2ML3&team_domain=parloa&channel_id=D048QG2GR8Q&channel_name=directmessage&user_id=U047U737LHL&user_name=massimo.ercolani&command=%2Fask-eon&text=wasssssup&api_app_id=A052UG2R140&is_enterprise_install=false&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT012TSW2ML3%2F5059644844567%2FHXdemHTk1RmQUfWH5ktKju9B&trigger_id=5076656068132.1095914089683.f0eb3dca138a9d3d86fc3b43233d54a2';

type SlashCommandPayload = {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  user_id: string;
  user_name: string;
  command: string;
  text: string;
  api_app_id: string;
  is_enterprise_install: string;
  response_url: string;
  trigger_id: string;
};

const handler = ({ body }: { body: string }) => {
  // if (!body) return { statusCode: 400 };

  // const payload = parse(body) as SlashCommandPayload;

  // if (payload.command !== '/ask-eon') {
  //   return {
  //     statusCode: 200,
  //     body: {
  //       response_type: 'ephemeral',
  //       text: 'Invalid command. Try /ask-eon',
  //     },
  //   };
  // }

  // void doStuff(payload.text, payload.response_url);

  return {
    statusCode: 200,
    body: {
      response_type: 'in_channel',
      text: 'Sure, just a moment...',
    },
    headers: { 'Content-Type': 'application/json' },
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
