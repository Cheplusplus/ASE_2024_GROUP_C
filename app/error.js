'use client';

/**
 * @description
 * GlobalError is a Next.js error boundary component that displays
 * an error message and a reload button when an error occurs in the
 * application.
 *
 * @param {Object} error - The error object that was thrown.
 * @param {function} reset - A function to reset the error boundary.
 * @returns {JSX.Element} The GlobalError component.
 * @example
 * <GlobalError error={error} reset={reset} />
 */
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
