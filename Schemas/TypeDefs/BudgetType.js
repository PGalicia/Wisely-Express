const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLFloat,
} = graphql;

const BudgetType = new GraphQLObjectType({
  name: "Budget",
  fields: () => ({
    total: { type: GraphQLFloat },
  }),
});

module.exports = BudgetType;