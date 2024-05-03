import bcrypt from "bcryptjs";

import { dummyUsers } from "../data/index.js";
import User from "../models/user.model.js";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender)
          throw new Error("Please fill all the fields");
        const existingUser = await User.findOne({ username });
        if (existingUser) throw new Error("User already exists");

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === male ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Error in signup: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Query: {
    users: (_, _, { req, res }) => {
      return dummyUsers;
    },
    user: (_, { userId }, { req, res }) => {
      return dummyUsers.find((user) => user._id === userId);
    },
  },
};

export default userResolver;
