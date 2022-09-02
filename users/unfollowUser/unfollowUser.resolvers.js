import client from "../../client"
import {protectResolver} from "../users.utils"

export default {
    Mutation: {
        unfollowUser: protectResolver(async (
            _,{tgtUserName},{loggedInUser}) => {
                //check
                const checkUserExists = await client.User.findUnique({
                    where: {
                        userName: tgtUserName
                    }
                })

                if(!checkUserExists){
                    return{
                        ok:false,
                        error: "User Not Exists"
                    }
                }

                await client.User.update({
                    where: {
                        id: loggedInUser.id
                    }, 
                    data: {
                        following:{
                            disconnect: {
                                userName: tgtUserName
                            }
                        }
                    }
                });

                return{
                    ok: true
                }
            }
        )
    }
}