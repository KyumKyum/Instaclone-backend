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

//create server 
const server= new ApolloServer({schema});
const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() => console.log(`😁 Server in running on http://localhost:${PORT}/`));