import { TextLoader } from 'langchain/document_loaders';
import { CharacterTextSplitter } from 'langchain/text_splitter';

const files = [
  `${__dirname}/../data/eng/faqs.txt`,
  `${__dirname}/../data/eng/aktuelle-marktlage.txt`,
  `${__dirname}/../data/eng/gaspreisbremse.txt`,
  `${__dirname}/../data/eng/strompreisbremse.txt`,
];

const loaders = files.map(file => new TextLoader(file));
const docs = loaders.map(loader => loader.load());

const splitter = new CharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const splitDocs = docs.map(
  async doc => await splitter.splitDocuments(await doc)
);
