//===============================================================================
//server.js
//===============================================================================
/*
Basic code to run Apollo graphql server.
*/
//import dotenv from "dotenv"
//dotenv.config(); it won't work
require('dotenv').config()
//It don'y have to be re-imported from other files

//const {ApolloServer, gql} = require("apollo-server")
import express from "express";
//import { ApolloServer } from 'apollo-server';
import {ApolloServer} from "apollo-server-express";
import { graphqlUploadExpress } from 'graphql-upload';
import morgan from "morgan";
//import {finished} from "stream/promises"
//import ApolloServerPluginLandingPageLocalDefault from "apollo-server-core";
import {typeDefs, resolvers} from "./schema";
import { getUser, protectResolver } from "./users/users.utils"

const PORT = process.env.PORT;
//create server 
const startServer = async () => {
    const app = express();

    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            //console.log("auth header from request: " + req.headers)
            return { 
                loggedInUser: await getUser(req.headers.authorization),
                protectResolver
            }
        }
    });

    await apollo.start();

    //Add paths
    app.use(graphqlUploadExpress());
    app.use(morgan("tiny")); //The logger must be preceded the methode 'applyMiddleware'
    app.use("/static",express.static("files"));

    //add middlewares
    apollo.applyMiddleware({app});

    await new Promise(r => app.listen({port: PORT},r));
    console.log(`😁 Server in running on http://localhost:${PORT}/`);
}

startServer();

