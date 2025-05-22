import { Link } from 'react-router';


const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
  
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
      
    </div>
  );
};

export default NotFound;
