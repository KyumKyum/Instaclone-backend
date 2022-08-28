//===============================================================================
//server.js
//===============================================================================
/*
Basic code to run Apollo graphql server.
*/
//const {ApolloServer, gql} = require("apollo-server")
import {ApolloServer} from "apollo-server";
import schema from "./schema";

//create server 
const server= new ApolloServer({schema});

server
    .listen()
    .then(() => console.log("Server in running on http://localhost:4000/"));