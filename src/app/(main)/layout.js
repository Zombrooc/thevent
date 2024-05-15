import Navbar from "@/components/Navbar";

export default async function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
