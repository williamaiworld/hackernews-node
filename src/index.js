const { GraphQLServer } = require('graphql-yoga')
require('dotenv').config();
// 1

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}
type Link {
  id: ID!
  description: String!
  url: String!
}
`
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
{
  id: 'link-1',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL, SECOND example'
},
{
  id: 'link-2',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL, THIRD example'
}]

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Link: {
    // id: (parent) => parent.id,
    // description: (parent) => parent.description,
    // url: (parent) => parent.url,
  }
}
const options = {
  port: process.env.PORT,
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
console.log('port: ', process.env.PORT)

server.start(options, () => console.log(`Server is running on http://localhost:${options.port}`))