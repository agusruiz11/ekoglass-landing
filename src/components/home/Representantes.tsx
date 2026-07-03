"use client";

import Reveal from "@/components/Reveal";
import { representantes } from "@/data/representantes";

/**
 * Red Ekoglass — cinta de logos que se desliza sola en loop infinito.
 * Minimalista: logos en gris que toman color al pasar el mouse, la cinta se
 * pausa en hover y respeta `prefers-reduced-motion` (queda estática).
 */
export default function Representantes() {
  // Duplicamos la lista: la animación mueve la cinta un 50% (una copia entera),
  // así el loop es continuo y sin saltos.
  const loop = [...representantes, ...representantes];

  return (
    <section id="red-ekoglass" className="section bg-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="chip">Red Ekoglass</span>
          <h2 className="h-display mt-4 text-1xl sm:text-3xl lg:text-4xl leading-[1.05]">
            La única red de fabricantes de DVH con Proceso Controlado.
          </h2>
          <p className="mt-4 text-sm text-ink/60">
            Gestionada y respaldada por VASA. Estos son los representantes que
            forman parte de nuestra red en todo el país.
          </p>
        </Reveal>
      </div>

      {/* Cinta. El mask difumina los bordes para que los logos "entren y salgan"
          suavemente en lugar de cortarse de golpe. */}
      <div className="group relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((rep, i) => (
            <li
              key={`${rep.name}-${i}`}
              className="shrink-0 px-6 sm:px-9"
              // La segunda copia es solo visual: la ocultamos a lectores de pantalla.
              aria-hidden={i >= representantes.length}
            >
              <a
                href={rep.web}
                target="_blank"
                rel="noopener noreferrer"
                title={rep.name}
                tabIndex={i >= representantes.length ? -1 : undefined}
                className="block rounded transition hover:opacity-100 focus-visible:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rep.src}
                  alt={rep.name}
                  loading="lazy"
                  className="h-9 sm:h-11 w-auto max-w-[150px] object-contain grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
