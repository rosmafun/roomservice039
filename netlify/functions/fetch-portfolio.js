const axios = require('axios');

exports.handler = async function(event, context) {
    const portfolioURL = event.queryStringParameters.url;

    if (!portfolioURL) {
        return {
            statusCode: 400,
            body: 'Error: Proporciona una URL.',
        };
    }

    try {
        const response = await axios.get(portfolioURL);
        let html = response.data;

        const baseURL = new URL(portfolioURL).origin;

        // --- 1. REESCRIBIR TODAS LAS RUTAS RELATIVAS (MÁS POTENTE) ---
        // Ahora busca en src, href, data-src, y srcset
        const pathRegex = /(href|src|data-src|srcset)="(\/(?!\/)[^"]*)"/g;
        html = html.replace(pathRegex, `$1="${baseURL}$2"`);

        // --- 2. SOLUCIONAR EL "LAZY LOADING" ---
        // Busca imágenes que tengan "data-src" y lo copia a "src"
        const lazySrcRegex = /<img([^>]*?)data-src="([^"]*)"([^>]*?)>/g;
        html = html.replace(lazySrcRegex, (match, p1, dataSrc, p2) => {
            // Elimina el 'src' viejo si existe para evitar que cargue la imagen borrosa
            const newP1 = p1.replace(/src="[^"]*"/, '');
            return `<img${newP1}src="${dataSrc}"${p2}>`;
        });
        
        // --- 3. SOLUCIONAR EL "LAZY LOADING" PARA IMÁGENES RESPONSIVE (srcset) ---
        // Busca elementos (img, source) que tengan "data-srcset" y lo copia a "srcset"
        const lazySrcsetRegex = /<(img|source)([^>]*?)data-srcset="([^"]*)"([^>]*?)>/g;
        html = html.replace(lazySrcsetRegex, `<$1$2srcset="$3"$4>`);


        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: html, // Devolvemos el HTML completamente reparado
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Hubo un error al obtener el contenido: ${error.message}`,
        };
    }
};