// Apollo Documentation on Queries: https://www.apollographql.com/docs/react/data/queries

import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql` # send query to th authUser in resolvers/user.resolver.js  
	query GetAuthenticatedUser {
		authUser {
			_id
			username
			name
			profilePicture
		}
	}
`;