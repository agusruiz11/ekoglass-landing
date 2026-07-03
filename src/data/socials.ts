import { Facebook, Instagram, Youtube, type LucideIcon } from "lucide-react";

export type Social = { label: string; href: string; Icon: LucideIcon };

// Redes oficiales de Ekoglass — un solo lugar para actualizarlas.
export const socials: Social[] = [
  { label: "Facebook", href: "https://www.facebook.com/ekoglass.intl/", Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/ekoglass_intl/", Icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCC8fJmcRmP6dRtP-CNvpmRA", Icon: Youtube },
];
