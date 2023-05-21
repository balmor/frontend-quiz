import '@/styles/globals.css';
import { Roboto, Baloo_2 } from 'next/font/google';
import type { AppProps } from 'next/app';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
});

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-baloo',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} ${baloo.variable} font-sans flex flex-col h-full`}>
      <Component {...pageProps} />
    </main>
  );
}
