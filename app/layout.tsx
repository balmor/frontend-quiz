import { Metadata } from 'next';
import Header from '@/components/Header';
import './globals.css';
import { Baloo_2, Roboto } from 'next/font/google';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import { balmorURL } from '@/utils';

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

const description = 'Check your frontend developer knowledge';

export const metadata: Metadata = {
  title: {
    template: 'Frontend QUIZ - %s',
    default: 'Frontend QUIZ',
  },
  description,
  keywords: ['frontend', 'quiz,', 'next.js', 'react', 'javascript', 'css', 'html'],
  authors: [{ name: "Damian Duda", url: balmorURL }],
  openGraph: {
    type: 'website',
    url: 'https://frontquiz.vercel.app',
    title: 'Frontend QUIZ',
    description,
  },
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en" className="bg-darkblue">
      <body
        className={`${roboto.variable} ${baloo.variable} bg-gradient-to-b from-[#07070f] to-[#0C0F28] font-sans flex flex-col h-screen`}
      >
        <Header />
        <Content>{children}</Content>
        <Footer />
      </body>
    </html>
  );
}
