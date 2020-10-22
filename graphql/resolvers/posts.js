const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);

                if (post)
                    return post;
                throw new Error("Post not found")
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Body can not be empty")
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save();
            context.pubsub.publish("NEW_POST", { newPost: post })
            return post;
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);


            try {
                const post = await Post.findById(postId)

                if (post) {
                    if (user.id == post.user._id) {
                        await post.deleteOne();
                        return "Post deleted successfully";
                    } else {
                        throw new AuthenticationError("Action not allowed!");
                    }
                } else {
                    throw new Error("Post doesn't exist");
                }

            } catch (err) {
                throw new Error(err);
            }

        },

        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);

            try {
                const post = await Post.findById(postId)

                if (!post) {
                    throw new Error("Post doesn't exist");
                }

                const likeIndex = post.likes.findIndex(l => l.username === username);

                if (likeIndex < 0) {
                    post.likes.unshift({
                        username,
                        createdAt: new Date().toISOString()
                    });
                } else {
                    post.likes.splice(likeIndex, 1);
                }

                await post.save();
                return post;

            } catch (err) {
                throw new Error(err);
            }
        }

    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST")
        }
    }
}