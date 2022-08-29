import jwt from "jsonwebtoken"
import client from "../client"


export const getUser = async (token) => {
    try {
        if(!token){
            return null; //User doens't have token (if the user is in incognito mode)
        }
        const { id } = await jwt.verify(token, process.env.PRIVATE_KEY); 
        //Decrypt token, check private key to verify the token is not corrupted or modified
        //Open the returning object, retrieve its id value. (es6 syntatic sugar)
        const user = await client.User.findUnique({
            where: { 
                id
            }
        });

        if(user){
            return user;
        } else {
            return null;//if the user doesn't exist'
        }
    }catch {
        return null; //Error we don;t catch
    }
};

export const protectResolver = (ourResolver) => (root, args, context, info) => {
    if(!context.loggedInUser){
        return {
            ok: false,
            error:"The User is not logged in: Please log in to perform this action."
        };
    }
    return ourResolver(root, args, context, info); //First Argument: receieved resolver.
}
