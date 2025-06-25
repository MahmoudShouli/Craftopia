import { config } from "dotenv";
config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
});

export const generateImageFromDescription = async (description) => {
  const prompt = `Create a photo-realistic image based on this description: ${description}. 
  The image should be clean, clear, and look like a product listing photo.`;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  return response.data[0]?.url;
};
