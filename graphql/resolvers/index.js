const postsResolvers = require('./posts');
const commentsResolvers = require('./comments');
const usersResolvers = require('./users');

module.exports = {
    Post: {
        likeCount(parent) {
            // con
            return parent.likes.length
        },
        commentCount(parent) {
            return parent.comments.length
        }
    },
    Query: {
        ...postsResolvers.Query,
        // ...usersResolvers
    },
    Mutation: {
        ...commentsResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...usersResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }

}