import Footer from '@/components/Footer';
import Head from 'next/head';
import Header from '@/components/Header';
import Content from '@/components/Content';
import { getAllFrontedQuiz } from '@/lib/api';
import FrontendQuiz from '@/components/FrontendQuiz';

export default function Home({ frontendQuiz: { items = [] } = {} }: any) {
  return (
    <>
      <Head>
        <title>Frontend QUIZ</title>
        <meta name="description" content="Frontend quiz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Content>
        <FrontendQuiz items={items} />
      </Content>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const frontendQuiz = await getAllFrontedQuiz();

  console.log('index frontendQuiz', frontendQuiz);

  return {
    props: { frontendQuiz },
  };
}
