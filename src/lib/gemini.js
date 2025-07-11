import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generateEventTitle = async (prompt) => {
  const result = await model.generateContent(
    `A partir do título, crie outro título para que seja utilizado em SEO. \n
    Título: ${prompt}

    Me retorne únicamente o título e nada mais.
    `
  );
  const rawResponse = await result.response;
  const textResponse = rawResponse.text();

  return {
    textResponse,
  };
};

const generateEventDescription = async (prompt) => {
  const result = await model.generateContent(
    `Base no nome de um evento esportivos chamado ${prompt}, crie uma descrição que seja otimizado para SEO.`
  );
  const rawResponse = await result.response;
  const textResponse = rawResponse.text();

  return {
    rawResponse,
    textResponse,
  };
};

export { generateEventTitle, generateEventDescription };

// const basicGenerationTemplate = async (prompt) => {
//   const result = await model.generateContent(prompt);
//   const rawResponse = await result.response;
//   const textResponse = rawResponse.text();

//   return {
//     rawResponse,
//     textResponse,
//   };
// };

// const textImprovement = async (text) => {
//   const prompt = "Exemplo de Prompt para textImprovement";

//   const { rawResponse, textResponse } = await basicGenerationTemplate(prompt);

//   return { rawResponse, textResponse };
// };

// const eventDescriptionGeneration = async (data) => {
//   const prompt = "Exemplo de Prompt para textImprovement";

//   const { rawResponse, textResponse } = await basicGenerationTemplate(prompt);

//   return { rawResponse, textResponse };
// };

// const metadataImprovement = async () => {
//   const prompt = "Hello world";

//   const { rawResponse, textResponse } = await basicGenerationTemplate(prompt);

//   return { rawResponse, textResponse };
// };

// export { textImprovement, eventDescriptionGeneration, metadataImprovement };

// const metadataGenerationFromScratch = async (description) => {
//   const prompt = `"${description}. Analisando o texto anterior crie metatags para uma plataforma de eventos, essas metatags serão usadas melhorar o SEO da plataforma. Lembre-se de retornar a resposta em português e também no formato JSON`;

//   const { rawResponse, textResponse } = await basicGenerationTemplate(prompt);

//   return { rawResponse, textResponse };
// };
