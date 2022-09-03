import {gql} from "apollo-server";

export default gql `
    
    type SeeFollowersResult {
        ok: Boolean!
        error: String
        followers: [User]
        totalPages: Int
    }

    type Query {
        seeFollowers(userName:String!, page:Int!): SeeFollowersResult!
    }
`

//Offest Pagination: Based on 'Pages' Shows result pages and their numbers which is also able to jump over