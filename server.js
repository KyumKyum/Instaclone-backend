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
import {ApolloServer} from "apollo-server";
import schema from "./schema";
import { getUser, protectResolver } from "./users/users.utils"


const PORT = process.env.PORT;
//create server 
const server= new ApolloServer({
    schema,
    context: async ({ req }) => {
        //console.log("auth header from request: " + req.headers)
        return { 
            loggedInUser: await getUser(req.headers.authorization),
            protectResolver
        }
    }
});

server
    .listen(PORT)
    .then(() => console.log(`😁 Server in running on http://localhost:${PORT}/`));