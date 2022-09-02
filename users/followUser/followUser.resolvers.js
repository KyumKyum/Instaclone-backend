import { protectResolver } from "../users.utils"
import client from "../../client"

export default {
    Mutation: {
        followUser: protectResolver(
            async(_, {tgtUserName}, {loggedInUser}) => {
                try{
                    //check
                    const userExists = await client.User.findUnique({
                        where: {
                            userName: tgtUserName
                        }
                    });
                
                    if(!userExists) {
                        return {
                            ok:false,
                            error:"User Not Found"
                        };
                    }


                    await client.User.update({ //Update user's following list
                        where: {
                            id:loggedInUser.id
                        },
                        data: {
                            following: { //will update following list
                                connect: { //find & connect new user with the
                                    userName: tgtUserName, //username given
                                }
                            }
                        }
                    });
                    return {
                        ok: true,
                    }
                }catch (e) {
                    throw new Error(e.message);
                }
        })
    }
}