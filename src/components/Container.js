export default function Container({ children }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      {children}
    </div>
  );
}
