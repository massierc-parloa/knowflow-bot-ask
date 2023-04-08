import 'hnswlib-node';

import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { TextLoader } from 'langchain/document_loaders';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { OpenAI } from 'langchain/llms';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from 'langchain/vectorstores';

const FILES = [
  `${__dirname}/../data/eng/faqs.txt`,
  `${__dirname}/../data/eng/aktuelle-marktlage.txt`,
  `${__dirname}/../data/eng/gaspreisbremse.txt`,
  `${__dirname}/../data/eng/strompreisbremse.txt`,
];

const splitter = new CharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const model = new OpenAI({});

export const ask = async (question: string) => {
  const loaders = FILES.map(file => new TextLoader(file));
  const docs = await Promise.all(loaders.map(loader => loader.load()));

  const splitDocs = await Promise.all(
    docs.map(doc => splitter.splitDocuments(doc))
  );

  const vectorStore = await HNSWLib.fromDocuments(
    splitDocs.flat(),
    new OpenAIEmbeddings()
  );

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );

  const res = await chain.call({
    question,
    chat_history: [],
  });

  return res.text as string;
};
