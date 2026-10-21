#!/usr/bin/env bash
# Arma el paquete para el servidor de RH Studio (cPanel + Passenger + Node 20):
# build "standalone" ya compilado, sin código fuente, listo para descomprimir.
#
# Uso, desde la raíz del repo:  npm run empaquetar
# Resultado:                     entrega/<sitio>-AAAAMMDD.zip
#
# Antes de correrlo:
#  · Node de la misma versión mayor que el servidor (hoy 20). Lo avisa abajo.
#  · .env con los NEXT_PUBLIC_* que correspondan: se fijan al compilar.
#  · package-lock.json al día (npm install después de cambiar dependencias).
set -euo pipefail
cd "$(dirname "$0")/.."

NODE_SERVIDOR="${NODE_SERVIDOR:-20}"
NODE_LOCAL="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_LOCAL" != "$NODE_SERVIDOR" ]; then
  echo "⚠  Estás compilando con Node $(node -v) y el servidor usa Node $NODE_SERVIDOR."
  echo "   Conviene usar la misma versión (por ejemplo: nvm use $NODE_SERVIDOR)."
  read -r -p "   ¿Seguir igual? [s/N] " r
  [ "$r" = "s" ] || exit 1
fi

SITIO="$(node -p "require('./package.json').name")"
FECHA="$(date +%Y%m%d)"
DESTINO="entrega/$SITIO"

rm -rf .next "$DESTINO"
npm ci
npm run build

mkdir -p "$DESTINO/.next"
# server.js + las dependencias mínimas que Next detectó.
cp -r .next/standalone/. "$DESTINO/"
# Next no copia los estáticos ni public/ al standalone: van a mano.
cp -r .next/static "$DESTINO/.next/static"
cp -r public "$DESTINO/public"
# Next copia los .env al standalone. Se sacan: en el servidor las variables
# se cargan desde el cPanel y no tienen que viajar claves nuestras.
rm -f "$DESTINO"/.env*
# Instrucciones para quien lo monta.
cp docs/entrega-rh.md "$DESTINO/LEEME.md"

( cd entrega && rm -f "$SITIO-$FECHA.zip" && zip -qr "$SITIO-$FECHA.zip" "$SITIO" )
echo "✓ Listo: entrega/$SITIO-$FECHA.zip ($(du -h "entrega/$SITIO-$FECHA.zip" | cut -f1))"
