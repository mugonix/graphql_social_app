import React from 'react';
import { useQuery } from '@apollo/client';
import  gql  from "graphql-tag";
import { Grid, Transition } from 'semantic-ui-react';


import PostCard from '../components/PostCard';

function Home(props) {
    const {
        loading,
        data
      } = useQuery(FETCH_POSTS_QUERY);
    
      if(data){
        console.log(data);
    }

    return (
        <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
           
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
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