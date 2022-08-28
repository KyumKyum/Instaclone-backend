import bcrypt from "bcrypt"
import client from "../../client"
import jwt from "jsonwebtoken"

export default {
    Mutation: {
        login: async(_,{userName, password}) => {
            //find the user with args.userName
            const user = await client.User.findFirst({
                where: {userName}
            })
            if(!user){
                return { //Return obj loginResult stands for error
                    ok: false,
                    error: "User not found."
                }
            }
            //check pwd with args.password
            const passwordOk = await bcrypt.compare(password, user.password);
            if(!passwordOk){
                return { ok: false, error: "Incorrect password"}
            }
            //if ok, issue(sign) a token and send it to the user
            const token = await jwt.sign({id:user.id}, process.env.PRIVATE_KEY);

            return { 
                ok: true,
                token,
            }
        }
    }
}