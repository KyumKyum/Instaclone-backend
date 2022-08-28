import bcrypt from "bcrypt"
import client from "../client"

export default {
    Mutation: {
        createAccount: async (_,{
            firstName,
            lastName,
            userName,
            email,
            password,
        }) => {
            //Check if the unique fields are alreadt on database (username or email)
            const existingUser = await client.User.findFirst({ //Find the first result is enough to prevent duplication
                where: {
                    OR : [ //OR condition
                        {
                            userName, //If the userName is existing already
                        },
                        {
                            email, //If the email is existing already
                        }
                    ]
                }
            });
            console.log(existingUser);
            //Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            //Save and return user
            return client.User.create({
                data:{
                    userName,
                    email,
                    firstName,
                    lastName,
                    password: hashedPassword,
                }
            });
        }
    }
}