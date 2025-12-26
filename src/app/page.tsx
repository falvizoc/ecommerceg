export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="text-center">
        <h1 className="text-5xl font-bold text-gray-900">eCommerce-G</h1>
        <p className="mt-4 text-xl text-gray-600">
          Plataforma de comercio electrónico multi-tenant
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
            Next.js 16
          </span>
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
            TypeScript
          </span>
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
            Tailwind CSS
          </span>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Milestone 0.1: Scaffolding del Proyecto - Completado
        </p>
      </main>
    </div>
  );
}
