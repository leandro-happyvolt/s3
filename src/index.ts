// * DEPENDENCIES
import express from "express";
import cors from "cors";
import configs from "./configs";

// * PORT APP
const PORT = process.env.PORT || 4000;

// * ROUTES
import files from "./routes/files";

// * APP
const app = express();

// * MIDDLEWARES
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://192.168.0.61:3000"
        ],
    })
);
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true}));
app.use(express.static('public'));

// * USE ROUTES
files(app);

// * APP LISTEN
app.listen(PORT, () => {
    console.log(configs.REST_API);
    console.log(configs.IP_LOCAL);
});