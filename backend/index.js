import express from "express"; 
import http from "http"; 
import cors from "cors";
import dotenv from "dotenv";

import path from "path"; 
import passport from "passport";
import session from "express-session"; 
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";  
import { expressMiddleware } from "@apollo/server/express4"; 
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { buildContext } from "graphql-passport";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

import { connectDB } from "./db/connectDB.js"
import { configurePassport } from "./passport/passport.config.js";
import job from "./cron.js"; 

// call this function to be able to use the environment variables in .env file 
dotenv.config(); 
configurePassport(); 

job.start(); 

const __dirname = path.resolve(); 
const app = express(); 
const httpServer = http.createServer(app); 

const MongoDBStore = connectMongo(session); 
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});

store.on("error", (err) => { console.log(err) });

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false, // this option specifies whether to save the session to the store on every request 
        saveUninitialized: false, // option specifies whether to save uninitialized sessions to the store
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          httpOnly: true // prevents Cross-site scripting attacks
        },
        store: store
    })
);

app.use(passport.initialize()); 
app.use(passport.session());

const server = new ApolloServer({
    typeDefs: mergedTypeDefs, 
    resolvers: mergedResolvers, 
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
}); 

// ensure we wait for our server to start 
await server.start(); 

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/graphql',
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    }),
);

// render.com => backend & frontend under the same domain localhost:4000 
// npm run build will build the frontend app in the frontend/dist folder, will be the optimized production build 
app.use(express.static(path.join(__dirname, "frontend/dist"))); 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html")); 
});

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB(); 

// need to be http instead of https, otherwise will get "POST https://localhost:4000/graphql net::ERR_SSL_PROTOCOL_ERROR" error in console 
console.log(`🚀 Server ready at http://localhost:4000/graphql`);