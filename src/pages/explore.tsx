import React, { useState } from 'react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import { plans } from '@/utils/outing';

const Explore = () => {
  const [openModal, setOpenModal] = useState({
    name: '',
    status: false,
  });

  return (
    <main
      className={`bg-[#f5f5f5] relative flex min-h-screen flex-col justify-center items-center p-4 lg:p-24 ${inter.className}`}
    >
      <section className="flex flex-col lg:flex-row gap-8">
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
          {openModal?.name === 'serial' && (
            <div className="overflow-y-auto relative bg-white text-black h-full w-11/12 lg:w-[33%] ml-auto rounded-lg">
              <button
                onClick={() =>
                  setOpenModal({
                    name: '',
                    status: false,
                  })
                }
                className="absolute top-0 right-0 h-12 w-12 rounded-md shadow-md"
              >
                X
              </button>

              <div className="py-10 px-6 ">
                <h3>A-Z Date Ideas</h3>

                <p className="mb-4">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus, laborum.
                </p>

                <div className="overflow-y-scroll">
                  {' '}
                  {plans?.map((item) => (
                    <div className="mb-6" key={item.header}>
                      <span className="font-bold text-xl">{item.header}</span>

                      <ul className="mt-3">
                        {item.ideas?.map((_item) => (
                          <li className="pl-4 mb-2" key={_item.id}>
                            {_item.idea}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {openModal?.name === 'random' && (
            <div className="relative bg-white text-black h-1/2 w-1/2 mx-auto rounded-lg">
              <button
                onClick={() =>
                  setOpenModal({
                    name: '',
                    status: false,
                  })
                }
                className="absolute top-0 right-0 h-12 w-12 rounded-md shadow-md"
              >
                X
              </button>
              {openModal?.name}
            </div>
          )}

          {openModal?.name === 'ai' && (
            <div className="bg-white text-black h-1/2 w-1/2 mx-auto rounded-lg">
              {openModal?.name}
            </div>
          )}
        </div>
      )}
    </main>
  );
};
export default Explore;
