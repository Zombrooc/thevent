import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const basicGenerationTemplate = async (prompt) => {
  const result = await model.generateContent(prompt);
  const rawResponse = await result.response;
  const textResponse = response.text();

  return {
    rawResponse,
    textResponse,
  };
};

const textImprovement = async (text) => {
  const prompt = "Exemplo de Prompt para textImprovement";

  const { rawResponse, textResponse } = await basicGenerationTemplate(prompt);

  return { rawResponse, textResponse };
};

const eventDescriptionGeneration = async (data) => {
  const prompt = "Exemplo de Prompt para textImprovement";

  const { rawResponse, textResponse } = await basicGenerationTemplate(prompt);

  return { rawResponse, textResponse };
};

const metadataImprovement = async () => {
  const prompt = "Exemplo de Prompt para textImprovement";

  const { rawResponse, textResponse } = await basicGenerationTemplate(prompt);

  return { rawResponse, textResponse };
};

export { textImprovement, eventDescriptionGeneration, metadataImprovement };
