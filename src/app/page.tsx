import Hero from "@/components/home/Hero";
import Soluciones from "@/components/home/Soluciones";
import QueEsEkoglass from "@/components/home/QueEsEkoglass";
import Representantes from "@/components/home/Representantes";
import Stats from "@/components/home/Stats";
import Aplicaciones from "@/components/home/Aplicaciones";
import Proyectos from "@/components/home/Proyectos";
import FAQ from "@/components/home/FAQ";
import Contacto from "@/components/home/Contacto";
import CTABand from "@/components/home/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Soluciones />
      <QueEsEkoglass />
      <Representantes />
      <Stats />
      <Aplicaciones />
      <Proyectos />
      <FAQ />
      <Contacto />
      <CTABand />
    </>
  );
}
