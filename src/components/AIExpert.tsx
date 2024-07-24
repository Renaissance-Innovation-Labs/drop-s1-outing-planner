import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { OpenModalProps } from '@/utils/context';

import { getSuggestionFromAI } from '@/utils/helper';

import { iRobotLarge, iRobotSmall, person } from '../../public/images';
import { halfCircle } from '../../public/icons';

const AIExpert: React.FC<OpenModalProps> = ({ setOpenModal }) => {
  const key = process.env.OPEN_API_KEY;

  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([
    {
      role: 'system',
      content: 'You are a helpful assistant. Your name is Ifunay-ai',
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessage = { role: 'user', content: input };

    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);

    setInput('');

    setLoading(true);

    const response = await getSuggestionFromAI(updatedMessages, key);

    const aiReply = { role: 'assistant', content: response };
    setMessages([...updatedMessages, aiReply]);
    setLoading(false);
  };

  useEffect(() => {
    if (chatRef.current) {
      (chatRef.current as HTMLElement).scrollIntoView();
    }
  }, [messages]);

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
              <div className="flex flex-col justify-center items-center bg-red-50 rounded-lg h-full">
                <Image
                  src={iRobotLarge}
                  alt="Ai robot"
                  height={150}
                  width={300}
                />
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
                  <p
                    className={`${
                      message.role === 'assistant'
                        ? 'bg-red-100'
                        : ' bg-teal-100 '
                    } text-black text-sm  p-2 w-fit max-w-[90%] md:max-w-[80%] rounded-md`}
                  >
                    {message.content}
                  </p>

                  <div ref={chatRef}></div>
                </div>
              ))
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-auto px-2">
          <div className="w-full py-1 pl-4 pr-1 flex  justify-center gap-6 border border-red-200 rounded-full">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              className="flex-1  resize-none border-0 outline-0 bg-transparent text-sm"
              placeholder="Start coversation.."
              autoFocus
            />

            <div className="w-[20%]">
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
