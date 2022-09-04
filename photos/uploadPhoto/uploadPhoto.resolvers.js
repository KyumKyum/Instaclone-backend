import client from "../../client"
import {protectResolver} from "../../users/users.utils"

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, {file, caption}, {loggedInUser}) => { //Protect Resolver: upload mutation should be performed with logined user,
            //Parse Caption
            let hashtagObjects = [];
            if(caption){
                const hashtags = caption.match(/#[\w]+/g) //REGEXP
                hashtagObjects = hashtags.map(hashtag => ({where: {hashtag}, create: {hashtag}})) //returns an array
                console.log(hashtagObjects)
            }

            return client.photo.create({
                data:{
                    file,
                    caption,
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        }
                    },
                    ...(hashtagObjects.length > 0 && {hashtags:{ //If the object length is longer than 0 (if exists), it will fill the hashtag fields
                            connectOrCreate: hashtagObjects, // connectOrCreate gets arrays
                    }})
                }
            })
        })
    }
}