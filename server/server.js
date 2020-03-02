const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const productDB = [];

 const resolvers = {
    Query: {
        productList,
    },
    Mutation: {
        productAdd,
    }
}
 
function productList() {
    return productDB;
}

function productAdd(_, { product }) {
    product.id = productDB.length + 1;
    productDB.push(product);
    return product;
}
const server = new ApolloServer(
     {  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),  resolvers, }
     );
     

const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(3000, function ()
{  
    console.log('App started on port 3000');
 });
 server.applyMiddleware({ app, path: '/graphql' });
