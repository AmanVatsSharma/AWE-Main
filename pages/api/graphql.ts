import { createYoga } from "graphql-yoga";
import schema from "../../GraphQl/testSchema";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default createYoga({
    schema,
    graphqlEndpoint: "/api/graphql", // Customize the endpoint if needed
    graphiql: true, // Enable GraphiQL interface
    cors: {
        origin: '*', // Replace with specific origins if needed
        credentials: true,
    },
});
