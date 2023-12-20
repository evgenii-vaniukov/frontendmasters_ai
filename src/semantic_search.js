import {Document} from "langchain/document";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {movies} from "./data/movies";

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    movies.map(
      (movie) =>
        new Document({
          pageContent: `Title: ${movie.title}\n${movie.description}`,
          metadata: {source: movie.id, title: movie.title},
        })
    ),
    new OpenAIEmbeddings()
  );

export const search = async (query, count = 1) => {
  const store = await createStore();
  return store.similaritySearch(query, count);
};

console.log(await search("cute and furry"));
