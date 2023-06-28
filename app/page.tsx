import FrontendQuiz from '@/components/FrontendQuiz';
import { getAllFrontedQuiz } from '@/pages/api';

export default async function Page() {
  const { items } = await getAllFrontedQuiz();

  return <FrontendQuiz items={items} />;
}
