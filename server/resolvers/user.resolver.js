import { dummyUsers } from "../data/index.js";

const userResolver = {
  Query: {
    users: (_, _, { req, res }) => {
      return dummyUsers;
    },
    user: (_, { userId }, { req, res }) => {
      return dummyUsers.find((user) => user._id === userId);
    },
  },
  Mutation: {},
};

export default userResolver;
