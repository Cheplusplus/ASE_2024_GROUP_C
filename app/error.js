'use client';

export default function GlobalError({ error, reset }) {
  return (
        <div className="text-center bg-white p-8 rounded-lg mx-auto my-[10%] shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
          <p className="text-gray-700 mb-6">{error.message}</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Reload
          </button>
        </div>
  );
}
