const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} = graphql;

const WishlistType = new GraphQLObjectType({
  name: "Wishlist",
  fields: () => ({
    id: { type: GraphQLString },
    itemName: { type: GraphQLString },
    itemLink: { type: GraphQLString },
    itemDescription: { type: GraphQLString },
    priority: { type: GraphQLInt },
    targetAmount: { type: GraphQLFloat },
    currentAmount: { type: GraphQLFloat },
  }),
});

module.exports = WishlistType;