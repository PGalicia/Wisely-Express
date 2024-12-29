// Import necessary GraphQL modules and dependencies.
const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
} = graphql;

const { Wishlist } = require("../models/wishlist");
const { Budget } = require("../models/budget");

const WishlistType = require("./TypeDefs/WishlistType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllWishlist: {
      type: new GraphQLList(WishlistType),
      args: {},
      async resolve(parent, args) {
        // Grab all the uncompleted wishlist items and make sure to sort them by priority first, then targetAmount
        const wishlistList = await Wishlist.find({ isComplete: false }).sort({ priority: -1, targetAmount: -1 });

        // Grab the current budget
        let { total = 0 } = await Budget.findOne();

        // Adjust each wishlist item to have the proper amount
        return wishlistList.map((wishlist) => {
          const { targetAmount } = wishlist;

          let newCurrentAmount = 0;

          if (total > 0) {
            if (targetAmount < total) {
              newCurrentAmount = targetAmount;
              total -= targetAmount;
            } else {
              newCurrentAmount = total;
              total = 0;
            }
          }

          return {
            ...wishlist.toObject(),
            id: wishlist._id.toString(), // toObject() removes virtuals like ids so I need to explicitly include it
            currentAmount: newCurrentAmount,
          }
        });
      },
    },
    getBudget: {
      type: GraphQLFloat,
      args: {},
      async resolve(parent, args) {
        const { total = 0 } = await Budget.findOne();

        return total;
      },
    },
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
      },
      async resolve(parent, args, req) {
        const newWishlist = new Wishlist({
          itemName: args.itemName,
          itemLink: args.itemLink,
          itemDescription: args.itemDescription,
          priority: args.priority,
          targetAmount: args.targetAmount,
          isComplete: false
        });

        await newWishlist.save();

        return newWishlist;
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
        isComplete: { type: GraphQLBoolean },
      },
      async resolve(parent, args, req) {
        const newWishlist = await Wishlist.findByIdAndUpdate(args.id, {
          itemName: args.itemName,
          itemLink: args.itemLink,
          itemDescription: args.itemDescription,
          priority: args.priority,
          targetAmount: args.targetAmount,
          isComplete: args.isComplete
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