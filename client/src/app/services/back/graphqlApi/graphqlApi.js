import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = process.env.REACT_APP_GRAPHQL_URL;
const link = createUploadLink({ uri });
const client = new ApolloClient({
	link,
	cache: new InMemoryCache({
		addTypename: false,
	})
});

export default client;
