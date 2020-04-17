const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const user = require('./Routes/user')
// ------------------------------------
// swagger Configuration
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./SwaggerDoc.json');
swaggerDocument.host= 'localhost:5001';

// bodyParser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json({ limit: '900mb' }));

// Database
const url = 'mongodb://localhost:27017/userRegistration';
mongoose
    .connect(
        url, { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

//  Routes for API
app.use('/api/v1/user',user)

// Server Swagger Document
const apiV1Html1 = swaggerUi.generateHTML(
    swaggerDocument,
  );
  app.use(
    '/api-docs',
    swaggerUi.serveFiles(swaggerDocument),
  );
  
  app.get('/api-docs', (req,res) => {
    res.send(apiV1Html1);
  });

//   port configuration
const PORT = 5001;

app.listen(PORT, function (req, res) {
    console.log(`my server is running on port no: ${PORT}`);
})