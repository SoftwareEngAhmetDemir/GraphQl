var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const Event = require("./models/event");

var events = [];
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`


type Event{
    _id:ID!
    title:String!
    description:String!
    price:Float!
    date:String!
}
  type Query {
    events:[Event!]!
  }
  
  

  ${
    /*
    type Mutation {
  createEvent(title:String!,description:String!,price:Float!,date:String!):String
  } */ ""
  }


 ${/* another way to write input type*/ ""}


 
 input EventInput{
    title:String!
    description:String!
    price:Float!
    date:String!
}

type Mutation{
    createEvent(eventInput:EventInput!):Event
}
  
  
`);

// The root provides a resolver function for each API endpoint
var root = {
  events: () => {
    return Event.find().then(events=>
         {return events.map(event=>{
            //  id: event._doc._id.toString() for print id on 
            // screen we should to convert it to string
            // or event.id
             return {...event._doc , _id: event.id};
         })

    }).catch(err=>console.log('error'))
  },
  createEvent: (args) => {
    //     const event = {
    //       _id: Math.random().toString(),
    //       title: args.eventInput.title,
    //       description: args.eventInput.description,
    //       price: +args.eventInput.price,
    //       date: args.eventInput.date,
    //     };
    //     events.push(event);
    // console.log(args.eventInput)
    //     return event;

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date( args.eventInput.date),
    });
  return   event.save().then(result=>{
        console.log(result);
        return {...result._doc};
    }).catch(err=> console.log('error'));
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

/*

# mutation {
#   createEvent(
#   eventInput: {title:"A Test", description:"Does desc",
#       price: 9.99, date:"2021-05-04T16:05:02.623Z"}
#   ){

#  title 
#   description

#   }
#   }
  
  
  
  
  #  query{
  #   events{
  #   _id
  #   price
  # }
  # }



*/
