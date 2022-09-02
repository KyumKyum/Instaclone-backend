import fs from "fs"
import bcrypt from "bcrypt"
import { protectResolver } from "../users.utils"
import client from "../../client"

//import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs"

export default {
    //Upload: GraphQLUpload,

    Mutation: {
        editProfile: protectResolver(
            async (_,{
                firstName,
                lastName,
                userName,
                email,
                password:pwd,
                bio,
                avatar
            },
            { loggedInUser, protectResolver }
            ) => {
                //console.log(loggedInUser)
                //console.log("Decrypted - id: " + id 
                
                const { file } = await avatar;
                //console.log("Received: \n " + JSON.stringify(file));
                //console.log(file.filename);
                //console.log(file.createReadStream);
                //console.log(filename,createReadStream);

                const readStream = file.createReadStream(); //get all the stream data. (file stream)
                const writestream = fs.createWriteStream(process.cwd() + "/files/" + file.filename);
                readStream.pipe(writestream);
                //Send read stream data to write stream, and the write stream writes the data to assigned path.
                //console.log(stream)

                let hashedPassword = null;
                if(pwd){
                    hashedPassword = await bcrypt.hash(pwd, 10);
                }
                const updatedUser = await client.User.update({
                    where: {
                        id: loggedInUser.id,
                    }, //Filter target based on token.
                    data:{ //Prisma doesn't sent data UNDEFINED to DB.
                        firstName,
                        lastName,
                        userName,
                        email,
                        bio,
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
        )
    }
}