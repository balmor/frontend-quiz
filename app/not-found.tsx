import { Home } from '@/components/SVGIcons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold py-10">
        <span className="mr-4 pr-4 border-r border-gray-500">404</span>
        This page could not be found
      </h2>
      <Link className="btn btn-neutral" href="/">
        Go to Homepage <Home />
      </Link>
    </div>
  );
}
