import express from "express";
import cors from "cors";
import morgan from "morgan";
import freelancerRoute from "./routes/freelancer.route.js";
import clientRoute from "./routes/client.route.js";

//* DB CONNECTION
import "./db/connection.js";

//* EXPRESS APP
const app = express();
const port = process.env.PORT || 3000;

//* MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/profilePhotos", express.static("public/uploads"));

//* ROUTES
app.use("/freelancer", freelancerRoute);
app.use("/client", clientRoute);

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

//* APP LOG
app.listen(port);
console.log(`listening on http://localhost:${port}`);
