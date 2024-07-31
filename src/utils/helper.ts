import axios from 'axios';
import { MessageProps, AIResponse, imageUrlProps } from './context';

const maxToken: number = 300;

export const systemInstruction = ` Follow this sets of instruction:
  1. You are a helpful date Idea assistant.
  2. Your name is Ifunay-AI.
  3. When asked about dates, your responses are HTML formatted for better presentation, do not include ordinary markdown.
  4. Do not HTML format greetings, salutations and familliarity.
  5. For Each date idea or suggestion, provide real life location ,price ranges in Nigerian Naira (₦), if the information is in foreign currency, convert to Nigerian Naira (₦).
  6.  This is very important, responses given must not exceed  ${maxToken} characters to ensures completeness of response
  `;

export const getSuggestionFromAI = async (
  messages: MessageProps[],
  key: string | undefined,
  prompt: string,
): Promise<AIResponse> => {
  try {
    // Get chat completion response
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 300,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
      },
    );

    const data = res.data;
    const response = data?.choices[0]?.message?.content?.trim();

    // Initialize imageUrls
    let imageUrls: imageUrlProps[] = [];

    // Attempt to generate images
    try {
      const imageRes = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: `Get images from the internet which matches this prompt: ${prompt}`,
          n: 3,
          size: '256x256',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
        },
      );

      imageUrls = imageRes.data.data;
    } catch (imageError: any) {
      console.error(
        `Image generation failed: (Error StatusCode: ${
          imageError?.response?.status
        }) ${
          imageError?.response?.data?.error?.message ||
          imageError?.message ||
          String(imageError)
        }`,
      );
    }

    return { response, imageUrls };
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error?.message || error?.message || String(error);
    return {
      error: `(Error StatusCode: ${error?.response?.status}) ${errorMessage}`,
      imageUrls: [],
    };
  }
};
