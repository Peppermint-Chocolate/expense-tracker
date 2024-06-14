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

export const GET_USER_AND_TRANSACTIONS = gql` # able to get user profile and transactions in one single query with the help of relationships 
	query GetUserAndTransactions($userId: ID!) {
		user(userId: $userId) { 
			_id 
			name 
			username 
			profilePicture 
			# relationships 
			transactions { 
				_id 
				description  
				paymentType 
				category 
				amount 
				location 
				date 
			}
		} 
	}
`; 