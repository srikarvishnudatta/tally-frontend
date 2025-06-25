import Hero from "./hero";
import Navbar from "./navbar";


export default function Home() {
  return (
    <main className="h-screen max-w-7xl mx-auto py-4">
      <Navbar />
      <Hero />
    </main>
  );
}
