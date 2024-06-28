import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import AZ from '@/components/A-Z';
import Random from '@/components/Random';
import AIExpert from '@/components/AIExpert';

import { ModalProps } from '@/utils/context';
import { outynLogo } from '../../public/icons';

const Explore = () => {
  const [openModal, setOpenModal] = useState<ModalProps>({
    name: '',
    status: false,
  });

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <meta property="og:title" content="Outyn Ideas - Explore" />
        <title>Outyn Ideas - Explore </title>

        <meta
          name="description"
          content="Stuck on what to do for a date? We have got you covered, browse through our list of outing ideas or talk to our Ai expert to curate ten fascinating date ideas fit to your partner's personality"
        />
        <meta
          property="og:description"
          content="Stuck on what to do for a date? We have got you covered, browse through our list of outing ideas or talk to our Ai expert to curate ten fascinating date ideas fit to your partner's personality"
        />

        {/* <meta property="og:image" content={rilTag} /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`bg-[#f5f5f5]  bg-glass-bg bg-blend-overlay  bg-right  bg-contain  min-h-screen flex flex-col justify-center items-center  relative p-4 lg:p-24 ${inter.className}`}
      >
        <div className="text-2xl font-bold text-black block absolute top-8  md:left-16">
          <Image src={outynLogo} alt="outyn planner logo" />
        </div>

        <section className="flex flex-col md:flex-row md:flex-wrap gap-8 mt-40 lg:mt-0">
          <article className="cursor-pointer p-4 hover:shadow-lg hover:shadow-red-100 overflow-hidden relative  h-80 w-80 rounded-lg bg-white text-white">
            <div className="border-2 border-[#FF8A8A] h-full p-4 rounded-md">
              <h2 className="text-2xl font-bold text-gray-700">
                {' '}
                A-Z Date Ideas
              </h2>
              <p className="text-gray-500 text-lg mt-4">
                Go on a date with the help of our serialize dating ideas and
                tips, browse through our thoughtfully curated list to keep your
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
              className="absolute shadow-lg -bottom-4 -right-6  border-2 border-[#FF8A8A] h-32 w-32 rounded-full flex items-center justify-center bg-white "
            >
              <button className="font-semibold text-lg  text-[#FF8A8A]">
                View
              </button>
            </div>
          </article>

          <article className="cursor-pointer p-4 hover:shadow-lg hover:shadow-red-100 overflow-hidden relative  h-80 w-80 rounded-lg bg-white text-black">
            <div className="border-2 border-gray-600 h-full p-4 rounded-md">
              <h2 className="text-2xl font-bold text-gray-700">
                {' '}
                Random Date Ideas
              </h2>
              <p className="text-gray-500 text-lg mt-4">
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
              className="shadow-lg border-2 border-gray-600 absolute -bottom-4  -right-6 h-32 w-32 rounded-full flex items-center justify-center bg-white "
            >
              <button className="font-semibold text-lg text-gray-600">
                View
              </button>
            </div>
          </article>

          <article className="cursor-pointer p-4 hover:shadow-lg hover:shadow-red-100 overflow-hidden relative  h-80 w-80 rounded-lg bg-[#9B001A] text-white">
            <div className="border-2 border-white h-full p-4 rounded-md">
              <h2 className="text-2xl font-bold text-white">
                {' '}
                Talk to Uncle Sam
              </h2>
              <p className="text-gray-100 text-lg mt-4">
                We can offer dates ideas based on the information provided to
                our AI Expert.
              </p>
            </div>

            <div className="absolute -bottom-4 -right-6 h-32 w-32 rounded-full flex items-center justify-center bg-white ">
              <button className="font-semibold text-lg text-black mr-4">
                Coming <br /> Soon
              </button>
            </div>
          </article>
        </section>

        {openModal.status && (
          <div className="bg-black/40 fixed top-0 left-0 bottom-0 right-0 px-4 py-6 flex justify-center items-center ">
            {openModal?.name === 'serial' && <AZ setOpenModal={setOpenModal} />}

            {openModal?.name === 'random' && (
              <Random setOpenModal={setOpenModal} />
            )}

            {openModal?.name === 'ai' && (
              <AIExpert setOpenModal={setOpenModal} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};
export default Explore;
