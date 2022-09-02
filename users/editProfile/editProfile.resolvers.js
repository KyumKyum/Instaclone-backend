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
                let avatarURL = null;

                if(avatar){
                    const { file } = await avatar;
                    const filename = `${loggedInUser.id}-${Date.now()}-${file.filename}`
                    //console.log("Received: \n " + JSON.stringify(file));
                    //console.log(file.filename);
                    //console.log(file.createReadStream);
                    //console.log(filename,createReadStream);

                    const readStream = file.createReadStream(); //get all the stream data. (file stream)
                    const writestream = fs.createWriteStream(process.cwd() + "/files/" + filename); 
                    readStream.pipe(writestream);
                    //Send read stream data to write stream, and the write stream writes the data to assigned path.
                    //console.log(stream)

                    avatarURL = `http://localhost:4000/static/${filename}`;
                }

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
                        ...(hashedPassword && {password:hashedPassword}), // ...(condition &&{Return this object if the condition is true}) 
                        ...(avatarURL && {avatar: avatarURL}) // ...(condition &&{Return this object if the condition is})
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