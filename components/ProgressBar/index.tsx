const ProgressBar = ({ quest = [], currentQuestion = 0, history = [] }) => (
  <div className="flex gap-1 m-2 mb-4">
    {quest.map((_, index) => {
      const currentQuest = currentQuestion === index;
      const isError = history[index] === 0;
      const isSuccess = history[index] === 1;
      const isActive = currentQuest && !isError && !isSuccess;
      const bgProgressColor = () => {
        if (isActive) {
          return 'bg-gray-400';
        } else if (isError) {
          return 'bg-error-content';
        } else if (isSuccess) {
          return 'bg-success-content';
        } else {
          return 'bg-gray-600';
        }
      };

      return (
        <i
          key={index}
          className={`${bgProgressColor()}  transition-colors w-full h-[5px] rounded-sm`}
        ></i>
      );
    })}
  </div>
);

export default ProgressBar;
