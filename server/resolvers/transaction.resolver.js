import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, _, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error gettin transactions", error);
        throw new Error("Error gettin transactions");
      }
    },
    transaction: async (_, { transcationId }) => {
      try {
        const transaction = await Transaction.findById(transcationId);
        return transaction;
      } catch (error) {
        console.error("Error gettin single transaction", error);
        throw new Error("Error gettin single transactions");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error creating transaction", error);
        throw new Error("Error creating  transactions");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transaction", error);
        throw new Error("Error updating transactions");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction", error);
        throw new Error("Error deleting transactions");
      }
    },
  },
  // TODO => ADD TRANSACTION/USER RELATION
};
export default transactionResolver;
