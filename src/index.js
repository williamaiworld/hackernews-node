const { GraphQLServer } = require('graphql-yoga')

// 1
const typeDefs = `
type Query {
  info: String!
}
`

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}
const options = {
  port: 8000,
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(options, () => console.log(`Server is running on http://localhost:${options.port}`))