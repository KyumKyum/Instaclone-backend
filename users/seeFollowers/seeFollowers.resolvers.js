import client from "../../client"

const PAGE = parseInt(process.env.PAGE_SIZE);

//Based on Offset Pagination
export default {
    Query: {
        seeFollowers: async(_, //Not protecting resolvers: it is public.
            {userName, page}) => {
                //check the user exists.
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

                //Get Followers of the user.
                const followers = await client.user.findUnique({ //Find a user we are looking for
                    where: {userName}
                }).followers({
                    take:PAGE, //Show result
                    skip: (page - 1)*PAGE //Skip Result for every pages
                });//Find Followers

                const totalFollowers = await client.user.count({
                    where: {
                        following:{
                            some:{
                                userName
                            }
                        }
                    }
                });

                //console.log("Computed total pages: " + Math.ceil(totalFollowers/PAGE));

                return {
                    ok: true,
                    followers,
                    totalPages: Math.ceil(totalFollowers/PAGE)
                };
            }
    }
}