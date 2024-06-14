import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import GridBackground from './components/ui/GridBackground.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  //TODO => update the uri on production 
  // uri need to be http instead of https, otherwise will get "POST https://localhost:4000/graphql net::ERR_SSL_PROTOCOL_ERROR" error in console 
  uri: import.meta.env.VITE_NODE_ENV === "development" ? 'http://localhost:4000/graphql' : "/graphql", // the URL of our GraphQL server
  cache: new InMemoryCache(), // Apollo Client uses to cache query results after fetching them
  credentials: 'include', // this tells the Apollo Client to send cookies along with every request to the server
});
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App /> 
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </React.StrictMode>,
);
