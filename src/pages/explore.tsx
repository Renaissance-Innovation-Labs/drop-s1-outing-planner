import React, { useState } from 'react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import AZ from '@/components/A-Z';
import Random from '@/components/Random';
import AIExpert from '@/components/AIExpert';

type ModalProps = {
  name: string;
  status: boolean;
};

const Explore = () => {
  const [openModal, setOpenModal] = useState<ModalProps>({
    name: '',
    status: false,
  });

  return (
    <main
      className={`bg-[#f5f5f5] relative flex min-h-screen flex-col justify-center items-center p-4 lg:p-24 ${inter.className}`}
    >
      <section className="flex flex-col md:flex-row md:flex-wrap gap-8">
        <article className="cursor-pointer p-4 hover:shadow-lg hover:shadow-red-100 overflow-hidden relative  h-80 w-80 rounded-lg bg-red-900 text-white">
          <div className="border-4 border-white h-full p-4 rounded-md">
            <h2 className="text-3xl font-bold text-white"> A-Z Date Ideas</h2>
            <p className="text-gray-300 text-lg mt-4">
              Go on a date with the help of our serialize dating ideas and tips,
              browse through our thoughtfully curated list to keep your
              relationship interesting
            </p>
          </div>

          <div
            onClick={() =>
              setOpenModal({
                name: 'serial',
                status: true,
              })
            }
            className="absolute -bottom-4 -right-6 h-32 w-32 rounded-full flex items-center justify-center bg-white "
          >
            <button className="font-semibold text-lg text-red-900">View</button>
          </div>
        </article>

        <article className="cursor-pointer p-4 hover:shadow-lg hover:shadow-black/10 overflow-hidden relative  h-80 w-80 rounded-lg bg-white text-black">
          <div className="border-4 border-gray-200 h-full p-4 rounded-md">
            <h2 className="text-2xl font-bold"> Random Date Ideas</h2>
            <p className="text-gray-600 text-lg mt-4">
              In a hurry? Search for date ideas by providing the first letter.
            </p>
          </div>

          <div
            onClick={() =>
              setOpenModal({
                name: 'random',
                status: true,
              })
            }
            className="shadow-lg border-4 border-gray-200 absolute -bottom-4  -right-6 h-32 w-32 rounded-full flex items-center justify-center bg-white "
          >
            <button className="font-semibold text-lg text-gray-600">
              View
            </button>
          </div>
        </article>

        <article className="cursor-pointer p-4 hover:shadow-lg hover:shadow-black/30 overflow-hidden relative  h-80 w-80 rounded-lg bg-[#1A1A1A] text-white">
          <div className="border-4 border-white h-full p-4 rounded-md">
            <h2 className="text-2xl font-bold text-white">Talk to Uncle Sam</h2>
            <p className="text-gray-300 text-lg mt-4">
              We can offer dates ideas based on the information provided to our
              AI Expert.
            </p>
          </div>

          <div className="absolute -bottom-4 -right-6 h-32 w-32 rounded-full flex items-center justify-center bg-white ">
            <button className="font-semibold text-lg text-black">View</button>
          </div>
        </article>
      </section>

      {openModal.status && (
        <div className="bg-black/40 fixed top-0 left-0 bottom-0 right-0 px-4 py-6 flex justify-center items-center ">
          {openModal?.name === 'serial' && <AZ setOpenModal={setOpenModal} />}

          {openModal?.name === 'random' && (
            <Random setOpenModal={setOpenModal} />
          )}

          {openModal?.name === 'ai' && <AIExpert />}
        </div>
      )}
    </main>
  );
};
export default Explore;
