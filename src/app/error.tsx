'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900">Algo salió mal</h1>
      <p className="mt-2 text-gray-500">
        Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
