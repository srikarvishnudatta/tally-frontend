import Hero from "./hero";
import Navbar from "./navbar";


export default function Home() {
  return (
    <main className="h-screen max-w-7xl mx-auto ">
      <Navbar />
      <Hero />
    </main>
  );
}
