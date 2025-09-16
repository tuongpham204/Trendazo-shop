import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-6">
      <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 rounded-full bg-black text-white font-medium text-lg hover:bg-gray-900 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
