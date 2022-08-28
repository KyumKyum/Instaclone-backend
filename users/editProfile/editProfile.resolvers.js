import bcrypt from "bcrypt"
import client from "../../client"

export default {
    Mutation: {
        editProfile: async (_,{
            firstName,
            lastName,
            userName,
            email,
            password:pwd,
        }
        ) => {
            let hashedPassword = null;
            if(pwd){
                hashedPassword = await bcrypt.hash(pwd, 10);
            }
            const updatedUser = await client.User.update({
                where: {
                    id:1,
                }, //TODO
                data:{ //Prisma doesn't sent data UNDEFINED to DB.
                    firstName,
                    lastName,
                    userName,
                    email,
                    ...(hashedPassword && {password:hashedPassword}) // ...(condition &&{Return this object if the condition is true}) 
                }
            });
            if (updatedUser.id) {
                return {ok: true};
            }else {
                return {
                    ok: false,
                    error: "Cannot Update User Data"
                };
            }
        }
    }
}