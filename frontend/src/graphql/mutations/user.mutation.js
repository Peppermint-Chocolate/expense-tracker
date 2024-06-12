// Apollo Documentation on Mutations: https://www.apollographql.com/docs/react/data/mutations


import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input){
            _id 
            name
            username
        }
    }
`; 

export const LOG_IN = gql`
    mutation LogIn($input: LoginInput!) {
        logIn(input: $input){
            _id 
            name
            username
        }
    }
`; 

export const LOG_OUT = gql`
    mutation LogOut {
        logOut{
            message
        }
    }
`; 