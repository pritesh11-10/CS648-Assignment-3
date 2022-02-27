const fs = require('fs')
const express = require('express')
const { ApolloServer } = require('apollo-server-express');

const products = [
    {
        id:1,
        Category:'Jeans',
        Name:'Blue Jeans',
        Price:'20',
        Image:'https://picsum.photos/200/300'
    },
    {
        id:2,
        Category:'Shirts',
        Name:'Blue Shirt',
        Price:'30',
        Image:'https://picsum.photos/200/300'
    },
];

const resolvers = {
    Query: {
        productList,
    },
    Mutation: {
        addProduct,
    },
};

function productList() {
    return products;
  }

function addProduct(_, { product }) {
    product.id = products.length + 1;
    products.push(product);
    return product;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    });

const app = express();
app.use(express.static('public'));
server.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, function () {
    console.log('App started on port 3000');
});