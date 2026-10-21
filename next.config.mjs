/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build "standalone" para el servidor de RH Studio (VPS con cPanel, Node 20
  // corriendo con Passenger). Genera .next/standalone/server.js como archivo
  // de arranque, con sólo las dependencias que usa el sitio. Ver
  // scripts/empaquetar.sh y docs/entrega-rh.md.
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },
};

export default nextConfig;
