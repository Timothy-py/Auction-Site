const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Auction App API",
            version: "1.0.0",
            description: "An Auction Application API",
            contact: {
                "name": "Timothy",
                "url": "https://github.com/Timothy-py",
                "email": "adeyeyetimothy33@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:5000/api",
                description: "Development Server"
            },
            {
                url: "https://auction00-api.herokuapp.com/api",
                description: "Production Server"
            }
        ],
    },
    apis: ["./routes/api_docs.js"]
}

const swaggerSpecs = swaggerJsDoc(options);

function swaggerDocs(app, port) {
    // swagger page
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs) );

    // docs in JSON format
    app.get("docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpecs)
    });
    console.log(`Docs available at http://localhost:${5000}/docs`);
}

module.exports = swaggerDocs;

