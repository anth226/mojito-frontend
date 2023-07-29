import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { APP_API_URL } from './env';
import { getAccessToken } from 'utils/helpers';
import { ErrorLink, onError } from '@apollo/client/link/error';
import { store } from 'app/store';
import { logout } from 'reduxSlices/auth/auth';
import { AuthenticationPaths } from 'pages/paths';

const httpLink = createHttpLink({
  uri: APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: `${token}`,
    },
  };
});

const errorLink = onError((({ networkError }) => {
  if (networkError) {
    if (
      networkError &&
      'statusCode' in networkError &&
      networkError.statusCode === 401
    ) {
      store.dispatch(logout());
      localStorage.clear();
      window.location.replace(AuthenticationPaths.LOGINPATH);
    }
  }
}) as ErrorLink.ErrorHandler);

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
