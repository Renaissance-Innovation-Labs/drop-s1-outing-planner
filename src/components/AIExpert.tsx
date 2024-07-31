import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import FormattedText from './FormattedText';

import { iRobotLarge, iRobotSmall, person } from '../../public/images';
import { caretLeftWhite, halfCircle } from '../../public/icons';

import { OpenModalProps, MessageProps, imageUrlProps } from '@/utils/context';
import { getSuggestionFromAI, systemInstruction } from '@/utils/helper';

const AIExpert: React.FC<OpenModalProps> = ({ setOpenModal }) => {
  const key = process.env.OPEN_API_KEY;

  const [messages, setMessages] = useState<MessageProps[]>([
    {
      role: 'system',
      content: systemInstruction,
    },
  ]);

  const [images, setImages] = useState<imageUrlProps[]>([]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (prompt: string) => {
    const newMessage = { role: 'user', content: prompt };

    if (newMessage?.content?.length > 1) {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      setLoading(true);

      const { response, error, imageUrls } = await getSuggestionFromAI(
        updatedMessages,
        key,
        prompt,
      );

      setInput('');

      if (error) {
        const aiReply = {
          role: 'assistant',
          content: error,
        };
        setImages([]);
        setMessages([...updatedMessages, aiReply]);
        setLoading(false);
      } else if (response) {
        setImages(imageUrls);
        const aiReply = { role: 'assistant', content: response };
        setMessages([...updatedMessages, aiReply]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      (chatRef.current as HTMLElement).scrollIntoView();
    }
  }, [messages]);

  const starters = [
    {
      id: 1,
      content: 'Plan a romantic date idea in Lagos, Nigeria.',
    },
    {
      id: 2,
      content:
        'Give me a list of date ideas with real places for a book lover, they live in Abuja, Nigeria',
    },
    {
      id: 3,
      content: 'Suggest a date idea for honeymooners in Maldives',
    },
  ];

  return (
    <div className="relative bg-white text-black w-full h-[600px] lg:w-1/2 mx-auto rounded-lg pt-8">
      <div className="absolute left-0 top-0 right-0 w-full bg-red-600 flex justify-between items-center pl-8">
        <span className="text-white">Chat with Ifunay-AI</span>

        <button
          onClick={() => setOpenModal({ name: '', status: false })}
          className=" h-12 w-12 rounded-md shadow-md text-white"
        >
          X
        </button>
      </div>

      <div className="container mx-auto py-4  h-full flex flex-col ">
        <div className="lg:px-4 flex-1 mb-2  overflow-hidden">
          <div className="bg-gray-50 h-full overflow-y-auto p-4 rounded-md">
            {messages?.length <= 1 ? (
              <div className="px-4 flex flex-col md:flex-row gap-y-8 justify-between items-center bg-red-50 rounded-lg h-fit md:h-full">
                <Image
                  src={iRobotLarge}
                  alt="Ai robot"
                  height={150}
                  width={300}
                />

                <div className="flex-1 self-end pb-4">
                  <h3 className="font-medium text-sm mb-3">
                    Here are some examples of starter conversations to have with
                    Ifunay-AI.
                  </h3>
                  <ul className="">
                    {starters?.map((item) => (
                      <li
                        onClick={() => handleSubmit(item.content)}
                        role="button"
                        className="text-xs border border-red-100 bg-white/70 p-2 mb-3 rounded-lg"
                        key={item.id}
                      >
                        {item.content}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              messages?.slice(1)?.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4  flex items-end gap-2 ${
                    message.role === 'assistant'
                      ? 'ml-auto'
                      : ' flex-row-reverse'
                  }`}
                >
                  <Image
                    src={message.role === 'assistant' ? iRobotSmall : person}
                    alt={message.role === 'assistant' ? 'AI' : 'You'}
                    height={40}
                    width={40}
                  />

                  <FormattedText message={message} images={images} />

                  <div ref={chatRef}></div>
                </div>
              ))
            )}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(input);
          }}
          className="mt-auto px-2"
        >
          <div className="w-full py-1 pl-4 pr-1 flex  justify-center gap-6 border border-red-200 rounded-full">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              className="flex-1  resize-none border-0 outline-0 bg-transparent text-sm"
              placeholder="Start coversation.."
              autoFocus
            />

            <div className="w-1/4  lg:w-[20%]">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-2.5 px-4  rounded-full text-white bg-red-400 text-sm  font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <Image
                    className=" animate-spin"
                    src={halfCircle}
                    alt="loading"
                  />
                ) : (
                  <span>Send</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIExpert;

// content: `Your name is Ifunay-AI, you are a helpful date idea assistant. With the exception of salutations, please respond with HTML formatting for better presentation, do not give me ordinary markdowns just formatted as HTML. For each date idea, date planning, or date suggestion you give, make sure they are real life places,  for more information include the website links to the places, and price ranges in Nigerian Naira (₦). Keep responses within the token limit to ensure completeness`,
