import Footer from '@/components/Footer';
import Head from 'next/head';
import Header from '@/components/Header';
import Content from '@/components/Content';
import { Entry } from 'contentful';
import { getAllFrontedQuiz, getFrontedQuiz } from '@/lib/api';
import QuizSection from '@/components/QuizSection';
import { formattedQuiz } from '@/utils';
import { IPath, IQuiz, IQuizFields } from '@/types';

export default function Quiz({ quiz }: IQuiz) {
  return (
    <>
      <Head>
        <title>Frontend QUIZ - {quiz.topic}</title>
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
  const items: Entry<IQuizFields>[] =
    frontendQuiz?.items as Entry<IQuizFields>[];

  const paths: IPath[] = items.map(
    (item: Entry<IQuizFields>): IPath => ({
      params: { slug: item.fields.slug },
    })
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: IPath) {
  const quiz = await getFrontedQuiz(params);
  const {
    items: [item],
  } = quiz || {};
  const fields = item?.fields as IQuizFields;

  return {
    props: { quiz: formattedQuiz(fields) },
  };
}
