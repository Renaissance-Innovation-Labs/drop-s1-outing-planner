import Link from 'next/link';
import Head from 'next/head';

import Image from 'next/image';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import WordRotate from '@/components/WordRotate';
import { outynLogo, outynLogoLarge } from '../../public/icons';

export default function Home() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <meta property="og:title" content="Outyn Ideas - Explore" />
        <title>Outyn Ideas </title>

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
        className={`bg-[#f5f5f5] animate-slightFadeIn bg-glass-bg bg-blend-overlay bg-bottom  lg:bg-right  bg-contain relative  flex min-h-screen flex-col justify-center items-center p-4 lg:p-24 ${inter.className}`}
      >
        <div className="text-2xl font-bold text-black block absolute top-8 left-8 md:left-16">
          <Image src={outynLogo} alt="outyn planner logo" />
        </div>

        <div className="relative bg-white shadow-md shadow-red-100 w-full md:w-2/3 h-72 lg:h-96 rounded-lg  px-4 py-8 lg:p-20">
          <h1 className="font-medium text-2xl lg:text-5xl text-center text-black mb-8">
            We have the{' '}
            <span className="text-red-500 text-semibold">answer</span> to
            <br /> the biggest dating question.
          </h1>

          <div className=" text-center">
            <WordRotate
              className="text-3xl lg:text-5xl font-bold"
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
    </div>
  );
}
