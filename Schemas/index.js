// Import necessary GraphQL modules and dependencies.
const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = graphql;

const { Wishlist } = require("../models/wishlist");

const WishlistType = require("./TypeDefs/WishlistType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllWishlist: {
      type: new GraphQLList(WishlistType),
      args: {},
      async resolve(parent, args) {
        const wishlistList = await Wishlist.find();
        return wishlistList;
      },
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createWishlist: {
      type: WishlistType,
      args: {
        itemName: { type: GraphQLString },
        itemLink: {
          type: GraphQLString,
          defaultValue: ''
        },
        itemDescription: {
          type: GraphQLString,
          defaultValue: ''
        },
        priority: {
          type: GraphQLInt,
          defaultValue: 3
        },
        targetAmount: { type: GraphQLFloat },
        currentAmount: {
          type: GraphQLFloat,
          defaultValue: 0
        },
      },
      async resolve(parent, args, req) {
        const newWishlist = new Wishlist({
          itemName: args.itemName,
          itemLink: args.itemLink,
          itemDescription: args.itemDescription,
          priority: args.priority,
          targetAmount: args.targetAmount,
          currentAmount: args.currentAmount,
        });

        await newWishlist.save();

        return newWishlist;;
      },
    },

    updateWishlist: {
      type: WishlistType,
      args: {
        id: { type: GraphQLString },
        itemName: { type: GraphQLString },
        itemLink: { type: GraphQLString },
        itemDescription: { type: GraphQLString },
        priority: { type: GraphQLInt },
        targetAmount: { type: GraphQLFloat },
        currentAmount: { type: GraphQLFloat },
      },
      async resolve(parent, args, req) {
        const newWishlist = await Wishlist.findByIdAndUpdate(args.id, {
          itemName: args.itemName,
          itemLink: args.itemLink,
          itemDescription: args.itemDescription,
          priority: args.priority,
          targetAmount: args.targetAmount,
          currentAmount: args.currentAmount
        });

        return newWishlist;
      },
    },

    deleteWishlist: {
      type: WishlistType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const deletedWishlist = await Wishlist.findByIdAndDelete(args.id);

        return args;
      },
    },
}});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});