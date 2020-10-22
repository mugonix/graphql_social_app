import React from 'react';
import { useQuery } from '@apollo/client';
import  gql  from "graphql-tag";

function Home(props) {
    const { loading, data: {getPosts: posts} } = useQuery(FETCH_POSTS_QUERY);
    if(posts){
        console.log(posts);
    }
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts {
        id
        body
        username
        likeCount
        commentCount
        likes {
            username
        }
        comments {
            id
            username
            body
            createdAt
        }
    }
}`

export default Home;