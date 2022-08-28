//===============================================================================
//server.js
//===============================================================================
/*
Basic code to run Apollo graphql server.
*/
//const {ApolloServer, gql} = require("apollo-server")
import {ApolloServer, gql} from "apollo-server";
import {PrismaClient} from "@prisma/client";


const client = new PrismaClient();

//graphql type definitions
//Defines what kind of field the client going to query about.
const typeDefs = gql`
    type Movie{
        id: Int!
        title: String!
        year: Int!
        genre: String
        createdAt: String!
        updatedAt: String!
    }
    
    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }

    type Mutation{
        createMovie(title:String!, year: Int!, genre: String): Movie
        deleteMovie(id: Int!): Movie
        updateMovie(id: Int!, title: String!, year: Int!, genre:String): Movie
    }
`;

//graphql resolvers
//Defines what results the server return for corresponding queries.
const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_, {id}) => client.movie.findUnique({
            where:{ id } //Find unique value which id is same as given args
        })
    },
    Mutation: {
        //_ -> root (bc we don't need it, ignores it)
        createMovie: (_, {title, year, genre}) => client.movie.create({
            data:{ //Client already knows the field information.
                title, //title:title
                year,
                genre,
            }
        }),
        deleteMovie: (_,{id}) => client.movie.delete({
            where: {id},
        }),
        updateMovie: (_,{id, title, year, genre}) => client.movie.update({
            where:{id}, //Target going to change
            data:{//Field to change
                title, 
                year, 
                genre
            }
        })
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