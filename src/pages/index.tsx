import Image from 'next/image';
import Head from 'next/head';

import { useRouter } from 'next/router';

import { Lily_Script_One, Open_Sans } from 'next/font/google';

const lily = Lily_Script_One({
  weight: '400',
  style: 'normal',
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

import { useEffect } from 'react';

import { outynGlass } from '../../public/icons';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push('/home');
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [router]);

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
        <div className="">
          <Image className="animate-pulse" src={outynGlass} alt="outyn logo" />

          <div>
            <h1
              className={`${lily.className} animate-slightFadeIn  text-white font-bold text-7xl mb-4`}
            >
              Outyn
            </h1>

            <p
              className={`relative text-white  p-1 ml-auto text-base w-[max-content] ${openSans.className} before:absolute before:inset-0 before:bg-[#9B001A] before:animate-typewriter`}
            >
              ❤️❤️ Date Ideas Suite ❤️❤️❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
