// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["image.tmdb.org"], // Agrega aquí los dominios de las imágenes que quieres permitir
    },
};

export default nextConfig;
