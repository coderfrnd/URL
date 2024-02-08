const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const cors = require("cors")

const app = express();
const PORT = 8001;
const allowedOrigins = [
  "http://localhost:3000",
 
];



// const corsOptions = {
//   origin: function (origin,callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };


// app.use(cors(corsOptions));
connectToMongoDB("mongodb+srv://ABHISHEK:20EI02@cluster0.cilljjj.mongodb.net/?retryWrites=true&w=majority").then(() =>
  console.log("Mongodb connected")
);

// app.use(cors(corsOptions));
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
