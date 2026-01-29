import "dotenv/config";
import express from "express";
import cors from "cors";
import paymentsRouter from "./routes/payments.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/payments", paymentsRouter);

app.get("/", (_req, res) => {
  res.send("Razorpay backend running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
