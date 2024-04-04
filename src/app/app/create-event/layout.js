export default async function CreateEventLayout({ children }) {
  return (
    <>
      <main className="mx-auto max-w-xl py-12 px-2 sm:px-6 lg:px-8 bg-white">
        {children}
      </main>
    </>
  );
}
