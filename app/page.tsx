import FrontendQuiz from '@/components/FrontendQuiz';
import { getAllFrontedQuiz } from '@/pages/api';

export const revalidate = 60 // revalidate this page every 60 seconds

export default async function Page() {
  const { items } = await getAllFrontedQuiz();

  return <FrontendQuiz items={items} />;
}
