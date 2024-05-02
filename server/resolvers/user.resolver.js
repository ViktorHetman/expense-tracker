import { dummyUsers } from "../data/index.js";

const userResolver = {
  Query: {
    users: () => {
      return dummyUsers;
    },
    user: (_, { userId }) => {
      return dummyUsers.find((user) => user._id === userId);
    },
  },
  Mutation: {},
};

export default userResolver;
