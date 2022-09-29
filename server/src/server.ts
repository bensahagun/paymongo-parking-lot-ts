import express from "express";
import park from "./routes/park";
import map from "./routes/map";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/park", park);
app.use("/map", map);

app.listen(8080, () => {
  console.log("Server starts http://localhost:8080");
});
