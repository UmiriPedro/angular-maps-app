const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
  mapbox_key: "${ process.env['MAPBOX_KEY'] }"
};
`;

// Creamos la carpeta environments dentro de la carpeta src.
// Si ya existe, la sobreescribimos.
mkdirSync('./src/environments', { recursive: true });

// Escribimos el contenido de la constante envFileContent
// dentro del archivo que esta en la ruta de la constante targetPath.
writeFileSync( targetPath, envFileContent );
