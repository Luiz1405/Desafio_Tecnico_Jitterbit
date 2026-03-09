const swaggerSpec = require('../config/swagger');
const { enviarRespostaErro } = require('../utils/responseHandler');
const fs = require('fs');
const path = require('path');

function enviarJSON(res, dados) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dados, null, 2));
}

function enviarHTML(res, html) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
}

function gerarHTMLSwagger() {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation - Swagger UI</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            margin:0;
            background: #fafafa;
        }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: '/swagger.json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout"
            });
        };
    </script>
</body>
</html>
    `;
}

function tratarRotaSwagger(req, res) {
    if (req.method === 'GET' && req.url === '/swagger.json') {
        enviarJSON(res, swaggerSpec);
        return;
    }

    if (req.method === 'GET' && (req.url === '/swagger' || req.url === '/swagger/' || req.url === '/api-docs')) {
        const html = gerarHTMLSwagger();
        enviarHTML(res, html);
        return;
    }

    enviarRespostaErro(res, 404, 'Rota não encontrada');
}

module.exports = tratarRotaSwagger;
