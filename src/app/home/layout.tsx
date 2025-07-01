import HomeNavbar from "./navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <main className="h-screen max-w-7xl mx-auto flex flex-col">
    <HomeNavbar />
    {children}
  </main>
}