import Link from 'next/link';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import WordRotate from '@/components/WordRotate';

export default function Home() {
  return (
    <main
      className={`bg-[#f5f5f5] relative flex min-h-screen flex-col justify-center items-center p-4 lg:p-24 ${inter.className}`}
    >
      <span className="text-2xl font-bold text-black block absolute top-8 left-8">
        {' '}
        <span className="text-red-500 shadow-sm shadow-white/70">
          Outing{' '}
        </span>{' '}
        Planner
      </span>

      <div className="relative bg-white shadow-lg shadow-purple-200 h-72 md:h-96 rounded-lg w-full px-4 py-8 lg:p-20">
        <h1 className="font-medium text-2xl lg:text-5xl text-center text-black mb-8">
          We have the <span className="text-red-500 text-semibold">answer</span>{' '}
          to
          <br /> the biggest dating question.
        </h1>

        <div className=" text-center">
          <WordRotate
            className="text-3xl lg:text-6xl font-bold"
            words={[
              '🙃 Have you eaten?',
              '🫦 What are you wearing? ',
              '❤️‍🔥 Do you love me?',
              'Got a date idea?💡',
            ]}
          />
        </div>

        <Link href="/explore">
          <button className="shadow-lg shadow-red-500 text-white absolute  -bottom-2 -right-4 bg-red-400 text-base font-semibold px-8 py-4 rounded-full">
            Explore Ideas
          </button>
        </Link>
      </div>
    </main>
  );
}
