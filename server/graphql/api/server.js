const express = require("express");
const { createServer } = require("http");
const {
  ApolloServer,
  AddArgumentsAsVariables,
} = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("../schemas");
const resolvers = require("../resolvers");
const context = require("../context");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const multer = require("multer");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
// app.post("/create-pdf", (req, res) => {
//   pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
//     if (err) {
//       console.log(err);
//       res.send(Promise.reject());
//     }
//     res.send(Promise.resolve());
//   });
//   // res.send("test");
// });
// app.get("/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`);
// });
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
  playground: {
    settings: {
      "schema.polling.enable": false,
    },
  },
});
apolloServer.applyMiddleware({ app, path: "/api" });

const server = createServer(app);

module.exports = server;
