import { defineConfig } from 'vite';

export default defineConfig({
  // Je vais lire le fichier `.env` qui se trouve dans le dossier parent de celui où je suis
  // C'est à dire que je vais lire le fichier `.env` qui se trouve à la racine de mon projet
  envDir: '../back',
});
