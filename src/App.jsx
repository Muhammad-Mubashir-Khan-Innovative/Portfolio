import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Vehicles from "./components/Vehicles";
import Stats from "./components/Stats";
import Experience from "./components/Experience";
import CustomerStories from "./components/CustomerStories";
import Feedback from "./components/Feedback";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Vehicles />
        <Stats />
        <Experience />
        <CustomerStories />
        <Feedback />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
