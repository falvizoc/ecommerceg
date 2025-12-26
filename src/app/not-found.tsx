import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">Página no encontrada</h2>
      <p className="mt-2 text-gray-500">
        Lo sentimos, no pudimos encontrar la página que buscas.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
