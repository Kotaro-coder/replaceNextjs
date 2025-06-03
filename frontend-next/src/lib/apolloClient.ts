import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL
});

const authLink = setContext((_, prevContext) => {
    if (typeof window === 'undefined') {
    // SSR: そのまま headers を返す
    return { headers: prevContext.headers };
  }
  
    const token = localStorage.getItem('token');
    return {
        headers: {
          ...prevContext.headers,
          authorization: token? `Bearer ${token}`: ''
        }
    }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client;