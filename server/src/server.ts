import express from "express";
import park from "./routes/park";

const app = express();

app.use(express.json());
app.use("/park", park);
app.use("/map", park);

app.listen(8080, () => {
  console.log("Server starts http://localhost:8080");
});
