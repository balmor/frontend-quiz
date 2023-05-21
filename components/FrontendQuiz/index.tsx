import CardQuiz from '../CartQuiz';

const FrontendQuiz = ({ items }: any) => (
  <div>
    <h2 className="text-center text-4xl font-bold py-10">Choose a Topic</h2>
    <div className="flex flex-wrap gap-10 justify-center">
      {items.map((item: any, index: number) => (
        <CardQuiz key={index} item={item} />
      ))}
    </div>
  </div>
);

export default FrontendQuiz;
