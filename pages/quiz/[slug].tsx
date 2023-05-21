import Footer from '@/components/Footer';
import Head from 'next/head';
import Header from '@/components/Header';
import Content from '@/components/Content';
import { createClient } from 'contentful';
import { getAllFrontedQuiz, getFrontedQuiz } from '@/lib/api';
import QuizSection from '@/components/QuizSection';
import { formattedQuiz } from '@/utils';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export default function Quiz({ quiz }: any) {
  console.log('quiz', quiz);
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
        <QuizSection quiz={quiz} />
      </Content>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const frontendQuiz = await getAllFrontedQuiz();

  const paths: any = frontendQuiz.items.map((item: any) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const quiz = await getFrontedQuiz(params);
  const { items: [item] = [] } = quiz || {};
  const { fields } = item || {};

  return {
    props: { quiz: formattedQuiz(fields) },
  };
}
