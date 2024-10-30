import Navbar from "@/components/Navbar";

export default async function HomeLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
