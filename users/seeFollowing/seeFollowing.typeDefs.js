import { gql } from "apollo-server"

export default gql `
    type SeeFollowingResult{
        ok: Boolean!
        error:String
        following: [User]
    }

    type Query{
        seeFollowing(userName: String!, lastId: Int):SeeFollowingResult!  #Cursor(lastId) shouldn't be required; it could be the first page, which means there is no cursor.
    }
`

//Cursor: ID