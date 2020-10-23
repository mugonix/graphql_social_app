 import React, { useState } from 'react';
 import { Button, Form } from "semantic-ui-react";

 import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

 const Register = () => {
     const [values, setValues] = useState({
         username:'',
         password:'',
         confirmPassword:'',
         email:'',
     });

     const onChange = (event)=>{
         setValues({...values, [event.target.name]:event.target.value});
     }

     const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION,{
         update(proxy, result){
             console.log(result)
         },
         variables: values
     })

     const onSubmit = (event)=>{
         event.preventDefault();
         addUser();

     }

         

     return ( <div className="form-container">
         <Form onSubmit={onSubmit} noValidate>
             <h1>Register</h1>
             <Form.Input
             label="Username"
             placeholder="Username..."
             name="username"
             value={values.username}
             onChange={onChange}/>
        <Form.Input
             label="E-mail"
             placeholder="E-mail..."
             name="email"
             value={values.email}
             onChange={onChange}/>
        <Form.Input type="password"
             label="Password"
             placeholder="Password..."
             name="password"
             value={ values.password }
             onChange={onChange}/>
        <Form.Input type="password"
             label="Confirm Password"
             placeholder="Confirm Password..."
             name="confirmPassword"
             value={ values.confirmPassword }
             onChange={onChange}/>
             <Button type="submit" primary>
                 Register
             </Button>
        </Form> 
         </div>
     );
 };

 const REGISTER_USER_MUTATION = gql`
 mutation register(
     $username:String!,
     $password:String!,
     $confirmPassword:String!,
     $email:String!){
         register(
             registerInput:{
                 username: $username
                 email: $email
                 password: $password
                 confirmPassword: $confirmPassword
             }
         ){
     id
     username
     email
     token
     createdAt
 }
     }`;

 export default Register;