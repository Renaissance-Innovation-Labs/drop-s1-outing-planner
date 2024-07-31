import axios from 'axios';
import { MessageProps, AIResponse } from './context';

export const getSuggestionFromAI = async (
  messages: MessageProps[],
  key: string | undefined,
): Promise<AIResponse> => {
  try {
    const promptMessage = messages.find(
      (message) => message.role === 'user',
    )?.content;

    // Generate image
    // const imageRes = await axios.post(
    //   'https://api.openai.com/v1/images/generations',
    //   {
    //     prompt: `create appropriate images for the prompt: ${[promptMessage]}`,
    //     n: 3,
    //     size: '256x256',
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${key}`,
    //     },
    //   },
    // );
    // const imageUrls = imageRes.data.data[0].url;

    // const imageUrls = imageRes.data.data;

    // console.log({ imageUrls });

    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
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
    return { response };
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error?.message || error?.message || String(error);
    return {
      error: `(Error StatusCode: ${error?.response?.status}) ${errorMessage}`,
    };
  }
};

const CONTINUE_PROMPT = 'CONTINUE FROM HERE: ';

export const getSuggestionFromA3I = async (
  messages: MessageProps[],
  key: string | undefined,
  max_tokens: number = 200,
): Promise<AIResponse> => {
  try {
    let completeResponse = '';
    let isResponseComplete = false;

    while (!isResponseComplete) {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
        },
      );

      const data = response.data;
      const aiResponse = data?.choices[0]?.message?.content?.trim();

      if (aiResponse) {
        completeResponse += aiResponse;
        isResponseComplete = !aiResponse.endsWith(CONTINUE_PROMPT);

        if (!isResponseComplete) {
          messages.push({ role: 'assistant', content: aiResponse });
          messages.push({ role: 'user', content: CONTINUE_PROMPT });
        }
      } else {
        isResponseComplete = true;
      }
    }

    return { response: completeResponse };
  } catch (error: any) {
    return { error: error?.response?.data?.error?.message || error.toString() };
  }
};
