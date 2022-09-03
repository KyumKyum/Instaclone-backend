import client from "../client"

export default{
    User: {
        totalFollowing: ({id}) => //root: user being requested
            client.user.count({
                where:{
                    followers:{
                        some:{id}
                    }
                }
            }),
        
        totalFollowers: ({id}) => //Graphql automatically calls 'await'
            client.user.count({
                where:{
                    following:{
                        some:{id}
                    }
                }
            }),
        isMe: ({id}, _, {loggedInUser}) => {
            if(!loggedInUser){ //return false if the use is not logged in
                return false;
            }

            return id === loggedInUser.id; //return true if the current user is same user logged in. Otherwise, return false.
        },
        isFollowing: async ({id}, _, {loggedInUser}) => {
            if(!loggedInUser){
                return false;
            }
            // const exists = await client.user.findUnique({//Find the user currently logged in
            //     where:{
            //         userName: loggedInUser.userName
            //     }
            // }).following({ //From the returning user, get the following list
            //     where: { //Find the id of requested user to check if the user is currently followed
            //         id
            //     }
            // });

            const exists = await client.user.count({ //return number; it will only return 0 or 1
                where:{
                    userName: loggedInUser.userName, //User name is same as the user logged in
                    following:{
                        some:{id} //and also, the id of the user requested is on the following list.
                    }
                }
            })

            //return exists.length !== 0 //If the returning array lenth is 0, it means current user didn't follow the requested user. (It returns nothing)
            return Boolean(exists); //exists i
        }
    }
}