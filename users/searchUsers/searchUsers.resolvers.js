import client from "../../client"

export default {
    Query: {
        searchUsers: async (_, {keyword, lastId}) =>
            await client.user.findMany({
                where:{
                    userName:{  
                        startsWith: keyword.toLowerCase(), //Search Username starts with the keyword
                    },
                },
                //Apply Cursor Pagination
                take:5,
                skip: lastId? 1 : 0,
                ...(lastId && {cursor: {id:lastId}}),
            })
    }
}