import type { Metadata } from "next";
import PuntosClient from "@/components/puntos/PuntosClient";

export const metadata: Metadata = {
  title: "Puntos de venta — Ekoglass",
  description:
    "Encontrá el punto de venta Ekoglass más cercano. Más de 100 vidrierías y distribuidores en todo el país.",
};

export default function PuntosDeVentaPage() {
  return <PuntosClient />;
}
