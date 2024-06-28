const key = '';

export const getSuggestionFromAI = async (
  personality: string,
): Promise<string> => {
  const response = await fetch(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        prompt: `Suggest a date idea for someone with the following personality traits: ${personality}`,
        max_tokens: 150,
      }),
    },
  );
  const data = await response.json();
  return data.choices[0].text.trim();
};
