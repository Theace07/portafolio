import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Profile } from "@/components/Profile";
import { Stack } from "@/components/Stack";
import { Timeline } from "@/components/Timeline";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MotionLayer } from "@/components/motion/MotionLayer";

export default function Home() {
  return (
    <>
      <MotionLayer />
      <Header />
      <main>
        <Hero />
        <Profile />
        <Stack />
        <Timeline />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
