const userTypeDef = `#graphql
    type User {
        _id: ID! 
        username: String! 
        name: String!
        password: String! 
        profilePicture: String 
        gender: String! 
        transactions: [Transaction!]  
    }

    type Query {
        # users: [User!] # don't want to show all users 
        authUser: User # don't put ! because might return null if not authenticated user 
        user(userId: ID!): User 
    }

    type Mutation {
        signUp(input: SignUpInput!): User 
        logIn(input: LoginInput!): User 
        logOut: LogoutResponse 
    }

    input SignUpInput {
        username: String! 
        name: String! 
        password: String! 
        gender: String! 
    }

    input LoginInput {
        username: String! 
        password: String! 
    }

    type LogoutResponse {
        message: String!  
    }
`; 

export default userTypeDef; 