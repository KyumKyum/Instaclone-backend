import { gql } from "apollo-server"

export default gql `
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        hashtag: [Hashtag]
        createddAt: String!
        updatedAt: String!
    }

    type Hashtag {
        id: Int!
        hsahtag: String!
        photos: [Photo]
        createdAt: String!
        updatedAt: String!
    }
`