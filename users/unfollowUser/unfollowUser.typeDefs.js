import { gql } from "apollo-server";

export default gql`
    type UnfollowUserResult{
        ok: Boolean!
        error: String
    }

    type Mutation {
        unfollowUser(tgtUserName: String!):UnfollowUserResult!
    }
`