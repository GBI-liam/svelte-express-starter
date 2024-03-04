const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const { createProxyMiddleware } = require('http-proxy-middleware');
const { setupEndpoints:setupTestEndpoints} = require('./endpoints/testEndpoints.js');
//NEEDED FOR OAUTH 2.0 AUTHENTICATION
const cookieParser = require("cookie-parser");
//NEEDED IF USING GOOGLE SECRETS MANAGER
const { getSecret } = require('./utilities/googleSecrets.js');


//MIDDLE WARE
async function setupMiddleware(){

    app.use(express.static('./client/dist'));
    app.use(express.json());
    app.use(cookieParser());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });


    //SETUP SPECIAL PROXY ENDPOINTS FOR DEVELOPMENT ENV.
    //THIS ALLOWS US TO USE VITE AND HAVE NICE AUTOMATIC UPDATES
    //ANY ENDPOINT THAT DOES NOT HAVE /API IN THE PATH WILL BE PROXIED TO VITE
    //ALL ENDPOINTS THAT ARE NOT PAGES NEED THE /API PREFIX
    if (process.env.NODE_ENV === 'development') {
        console.log("Development mode proxying to Vite server");
        app.use('/', (req, res, next) => {
            if (!req.path.startsWith("/api")) { //DOES NOT HAVE /API IN THE PATH
                createProxyMiddleware({
                    target: 'http://127.0.0.1:5173/', 
                    changeOrigin: true,
                })(req, res, next);
            } else {
                next();
            }
        });
    } else{
        // Serve ehr.html at the root path
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/client/dist/index.html'));
        });
    }
    

}

//ENDPOINTS 
async function setupEndpoints(){
    setupTestEndpoints(app);
}

setupMiddleware().then(() => {
    setupEndpoints().then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });
});