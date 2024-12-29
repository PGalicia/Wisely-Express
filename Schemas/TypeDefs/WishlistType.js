const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
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
    isComplete: { type: GraphQLBoolean },
  }),
});

module.exports = WishlistType;