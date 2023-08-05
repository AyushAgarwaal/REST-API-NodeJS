const mongo = require("mongoose");

const clusterMongo = async () => {
    try {
        await mongo.connect("mongodb+srv://ayushagarwal:password@cluster0.josn0th.mongodb.net/?retryWrites=true&w=majority",

            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
    }
    catch (err) {
        console.log({ err: "Cluster Database Not Connected" });
    }
}

// export
module.exports = clusterMongo;