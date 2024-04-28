import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/BookRoute.js";
import connectDb from "./config/Db.js";
import userRouter from "./routes/UserRoute.js";
import authRouter from "./routes/AuthRoute.js";
import commentRouter from "./routes/CommentRoute.js";
import ratingRouter from "./routes/RatingRoute.js";
import cors from "cors";

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true, //cookie, authorization işlemlerine izin verir !!!
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/ratings", ratingRouter);

app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
    <title>Bostorek</title>
    </head>
    <body>
    <h1 style="color:red; text-align:center">BOSTOREK</h1>
    <div>
    <ul>
      <li><a href="https://www.google.com" target="_blank">Books</a></li>
      <li><a href="/books">Books</a></li>
      <li><a href="/books">Books</a></li>
      <li><a href="/books">Books</a></li>
    </ul>
    </div>
    </body>
    </html>
  `);
});

try {
  await connectDb();
  app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
  });
} catch (err) {
  console.log(err);
}
