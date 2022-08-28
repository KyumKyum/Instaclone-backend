import client from "../client";

//graphql resolvers
//Defines what results the server return for corresponding queries.
export default {
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