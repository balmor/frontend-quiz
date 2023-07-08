import QuizSection from '@/components/QuizSection';
import { getAllFrontedQuiz, getFrontedQuiz } from '@/pages/api';
import { IPath, IQuizFields, ISlug } from '@/types';
import { Entry } from 'contentful';
import { Metadata } from 'next';

export const dynamicParams = false;
export const revalidate = 60;

const getQuiz = async (slug: string) => {
  const result = await getFrontedQuiz(slug);

  const {
    items: [item],
  } = result;

  return item?.fields as IQuizFields;
};

export async function generateMetadata({
  params: { slug },
}: IPath): Promise<Metadata> {
  const { image } = await getQuiz(slug);
  const imageUrl = image.fields.file.url;

  const title = slug?.toUpperCase();

  return {
    title,
    description: `Check your frontend developer knowlegde about ${title}`,
    openGraph: {
      type: 'website',
      url: `https://frontquiz.vercel.app/quiz/${slug}`,
      title: `Frontend QUIZ - ${title}`,
      description: `Check your frontend developer knowlegde about ${title}`,
      images: [{ url: `https:${imageUrl}` }],
    },
  };
}

export async function generateStaticParams() {
  const frontendQuiz = await getAllFrontedQuiz();
  const items: Entry<IQuizFields>[] =
    frontendQuiz?.items as Entry<IQuizFields>[];

  const paths: ISlug[] = items.map(
    (item: Entry<IQuizFields>): ISlug => ({ slug: item.fields.slug })
  );

  return paths;
}

export default async function Post({ params: { slug } }: IPath) {
  const quiz = await getQuiz(slug);

  return <QuizSection quiz={quiz} />;
}
