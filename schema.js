import { makeExecutableSchema } from "@graphql-tools/schema"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge"
//Uses Patters language.
/*
** : Inside of every folders
* : Every files
. : which finishes with
 */

//loadFilesSync: get default exports from files.
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`); //Look every folders and files, get files which ends with typeDefs.js
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`); //Look every folders and files, get files witch ends with either 'queries.js' or 'mutations.js'

const typeDefs = mergeTypeDefs(loadedTypes); //Merge all loaded type definitions.
const resolvers = mergeResolvers(loadedResolvers); //Merge all loaded resolvers.

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
export default schema;