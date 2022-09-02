import { gql } from "apollo-server-express";

export default gql`
    scalar Upload

    type File{
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Query{
        dummy:Boolean!
    }

    type Mutation {
        singleUpload(file: Upload!): File!
    }

`