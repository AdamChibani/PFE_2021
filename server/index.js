require("dotenv").config();

const server = require("./graphql/api/server");

const port = process.env.PORT || 6969;

const db = require("./database/models");

process.on("uncaughtException", (err) => {
  console.error(`${new Date().toUTCString()} uncaughtException:`, err);
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.error(`${new Date().toUTCString()} unhandledRejection:`, err);
});

server.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}/api`)
);
