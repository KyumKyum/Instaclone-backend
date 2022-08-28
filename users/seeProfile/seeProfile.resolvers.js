import client from "../../client"

export default {
    Query: {
        seeProfile: (_, {userName}) => 
            client.User.findUnique({
                where:{
                    userName
                }
            })
    }
};