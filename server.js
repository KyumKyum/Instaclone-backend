//===============================================================================
//server.js
//===============================================================================
/*
Basic code to run Apollo graphql server.
*/
//const {ApolloServer, gql} = require("apollo-server")
import {ApolloServer, gql} from "apollo-server";
//

//graphql type definitions
//Defines what kind of field the client going to query about.
const typeDefs = gql`
    type Movie{
        title: String
        year: Int
    }
    
    type Query {
        movies: [Movie]
        movie: Movie
    }

    type Mutation{
        createMovie(title:String!): Boolean
        deleteMovie(title:String!): Boolean
    }
`;

//graphql resolvers
//Defines what results the server return for corresponding queries.
const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({"title": "Hello", year:2022})
    },
    Mutation: {
        //_ -> root (bc we don't need it, ignores it)
        createMovie: (_, {title}) => {
            console.log(title); 
            return true;
        },
        deleteMovie: (_,{title}) => {
            console.log(title);
            return true;
        }
    }
};

//create server 
const server= new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen()
    .then(() => console.log("Server in running on http://localhost:4000/"));