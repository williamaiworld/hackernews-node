const { GraphQLServer } = require('graphql-yoga')
require('dotenv').config();
const { db, Property, User } = require('../db')

db.sync();
console.log(`db synced at ${process.env.DATABASE_URL}`)

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

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    properties: () => Property.findAll(),
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, {id, url, description}) => {
      const linkIdx = links.indexOf(links.filter(link => {
        return link.id === `link-${id}`
      })[0])
      if(url) links[linkIdx].url = url;
      if(description) links[linkIdx].description = description;
      return links[linkIdx]
    },
    deleteLink: (parent, {id}) => {
      const linkIdx = links.indexOf(links.filter(link => {
        return link.id === `link-${id}`
      })[0])
      const link = links[linkIdx];
      delete links[linkIdx];
      return link;
    },
    addProperty: (parent, { city, address, description }) => {
      const property = Property.create({
        city,
        address,
        description,
      })
      return property
    }
  }
}
const options = {
  port: process.env.PORT,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(options, () => console.log(`Server is running on http://localhost:${options.port}`))