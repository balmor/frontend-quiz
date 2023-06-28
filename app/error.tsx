'use client';
import { Replay } from "@/components/SVGIcons";

 // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log('error', error.message);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold py-10">Something went wrong!</h2>
      <button className="btn btn-neutral mb-10" onClick={() => reset()}>
        Try again
        <Replay />
      </button>

      <div className="mockup-code text-left">
        <pre className="max-h-60 overflow-x-auto  break-words whitespace-pre-wrap test">
          <code>{error.message}</code>
        </pre>
      </div>
    </div>
  );
}
