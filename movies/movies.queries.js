import client from "../client";

export default { 
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_, {id}) => client.movie.findUnique({
            where:{ id } //Find unique value which id is same as given args
        })
    }
};