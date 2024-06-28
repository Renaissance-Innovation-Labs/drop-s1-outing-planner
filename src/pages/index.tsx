import Image from 'next/image';
import Head from 'next/head';

import { useRouter } from 'next/router';

import { Lily_Script_One } from 'next/font/google';
const lily = Lily_Script_One({
  weight: '400',
  style: 'normal',
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
});

import { useEffect } from 'react';

import { outynGlass, outynLogoLarge } from '../../public/icons';

export default function SplashScreen() {
  const router = useRouter();

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     router.push('/home');
  //   }, 4000);

  //   return () => clearTimeout(timeoutId);
  // }, [router]);

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
      {/* splash screen */}
      <div className="h-screen flex items-center justify-center bg-[#9B001A]">
        <div>
          <Image src={outynGlass} alt="outyn logo" />

          <h1 className={`${lily.className} text-white font-bold text-7xl`}>
            Outyn
          </h1>

          <p className="text-sm  text-[#F6F6F6] font-normal ml-auto mt-4 border border-white w-fit py-2 px-4 rounded-full">
            Date Ideas Suite
          </p>
        </div>
      </div>
    </div>
  );
}
