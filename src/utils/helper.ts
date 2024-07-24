import axios from 'axios';
import { MessageProps, AIResponse } from './context';

export const getSuggestionFromAI = async (
  messages: MessageProps[],
  key: string | undefined,
): Promise<AIResponse> => {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 220,
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
    return { response };
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error?.message || error?.message || String(error);
    return {
      error: `(Error StatusCode: ${error?.response?.status}) ${errorMessage}`,
    };
  }
};
