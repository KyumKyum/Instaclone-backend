import {finished} from "stream/promises"

export default {
    Mutation: {
        singleUpload: async (_, { file }) => {
            const {createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream(filename, mimetype, encoding);
            const out = require("fs").createWriteStream('local-file-output.txt');
            stream.pipe(out);

            await finished(out);

            return {filename, mimetype, encoding};
        }
    }
}