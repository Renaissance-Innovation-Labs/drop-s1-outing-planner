import React, { useState } from 'react';

import { OpenModalProps } from '@/utils/context';

// import { getSuggestionFromAI } from '@/utils/helper';

const AIExpert: React.FC<OpenModalProps> = ({ setOpenModal }) => {
  const [personality, setPersonality] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonality(e.target.value);
  };

  const key = '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';

  const getSuggestionFromAI = async (personality: string): Promise<string> => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `Suggest a date idea for someone with the following personality traits: ${personality}`,
          },
        ],
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dateSuggestion = await getSuggestionFromAI(personality);
    setSuggestion(dateSuggestion);
  };

  console.log({ suggestion, personality });

  return (
    <div className="relative bg-white text-black w-full h-fit lg:h-fit lg:w-1/3 mx-auto rounded-lg p-8">
      <button
        onClick={() => setOpenModal({ name: '', status: false })}
        className="absolute top-0 right-0 h-12 w-12 rounded-md shadow-md"
      >
        X
      </button>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Talk to AI Expert</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={personality}
            onChange={handleChange}
            placeholder="Describe your partner's personality..."
            className="w-full p-2 border rounded mb-4"
            rows={4}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Get Date Suggestion
          </button>
        </form>
        {suggestion && (
          <div className="bg-green-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Curated Date Suggestion:</h2>
            <p>{suggestion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIExpert;
