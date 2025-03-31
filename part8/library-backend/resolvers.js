const { GraphQLError } = require("graphql");

const Book = require("./models/book");
const Author = require("./models/author");

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      // if (args.author && args.genre)
      //   return books.filter(
      //     (book) =>
      //       book.author === args.author && book.genres.includes(args.genre)
      //   );

      // if (args.author)
      //   return books.filter((book) => book.author === args.author);

      if (args.genre) return await Book.find({ genres: args.genre });

      return Book.find({}).populate("author");
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: (_) => 0,
    // books.filter((book) => book.author === root.name).length,
  },
  Mutation: {
    addBook: async (_, args) => {
      const existingAuthor = await Author.findOne({ name: args.author }).exec();
      let newAuthor;

      if (!existingAuthor) {
        newAuthor = new Author({ name: args.author });

        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Adding author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({ ...args, author: existingAuthor ?? newAuthor });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      return book;
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOne({ name: args.name });

      try {
        author.born = args.setBornTo;
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return author;
    },
  },
};

module.exports = resolvers;
