import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
//gql i s a function of apollo boost

import { store, persistor } from './redux/store';
import { resolvers, typeDefs } from './graphql/resolvers';

import './index.css';
import App from './App';

//create link for our new graphQL method

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

//for cache that memory for local storage application

const cache = new InMemoryCache();

//make the client what we request for and our cache memory

const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs
});

client.writeData({
  data: {
    cartHidden: true,
    cartItems: []
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
