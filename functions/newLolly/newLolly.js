const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb");
const shortid = require("shortid")
const q = faunadb.query;
const dotenv = require("dotenv");
dotenv.config()

const typeDefs = gql`

  type Query {
    lolly : [Lolly!]
    getLolly(lollyPath:String!):Lolly
  }

  type Lolly {
    flavourTop    : String!
    flavourMiddle : String!
    flavourBottom : String!
    recipientName : String!
    message       : String!
    senderName    : String!
    lollyPath     : String
  }

  type Mutation {
    addLolly(flavourTop:String! , flavourMiddle :String! , flavourBottom:String! , recipientName:String! , message:String! , senderName:String! , lollyPath:String  ):Lolly
  }

`

const resolvers = {
  Mutation : {
    addLolly : async (_ , args) => {
      try {
        const client = new faunadb.Client({secret : process.env.FAUNADB_SECRET_KEY});
        const id = shortid.generate();
        args.lollyPath = id

        const result = await client.query(
          q.Create(q.Collection("lollies") , {
            data : args
          } )
        )
        return result.data
        // console.log("faunadb result" , JSON.stringify(result.data))
      }
      catch(err){
          console.log(`error ${err}`)
      }
    } 
  },

  Query : {
    getLolly : async (_ , {lollyPath}) => {
        console.log("LOLLY ID : " , lollyPath)
      try {
        const client = new faunadb.Client({secret : process.env.FAUNADB_SECRET_KEY});
        console.log(`getLolly function invoked`);
        console.log("connection established");
         const result = await client.query(
          q.Get(q.Match(q.Index("lollies_by_path") , lollyPath ))
         )
        
          return result.data
        }
      
      catch(err){

      }
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
