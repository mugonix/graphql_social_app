const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODBLOC } = require("./config")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGODBLOC, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongDB connected")
    return server.listen({ port: 5000 });
}).then(res => {
    console.log(`🚀 Server running at ${res.url}`);
});