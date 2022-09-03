import client from "../../client"

//Based on Cursor Pagination: Need to send the last item they saw.

export default{
    Query:{
        seeFollowing: async(_,{userName, lastId}) => {
            //Check User Exists
            const ok = await client.user.findUnique({
                where:{
                    userName
                },
                select:{//Optimize: Get miminal data required
                    id: true,
                }
            })

            if(!ok){
                return{
                    ok: false,
                    error:"User Not Found"
                }
            }

            const following = await client.user.findUnique({
                where:{userName}
            }).following({
                take:5,
                skip:lastId? 1 : 0, //Skip 1 if only there is lastId
                ...(lastId && {cursor: {id:lastId}}) // if cursor exists, it will be cursor: {id:cursor}
                //cursor should be unique property.
            });

            return {
                ok: true,
                following,
            }

        }
    }
}