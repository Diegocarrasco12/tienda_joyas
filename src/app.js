const express = require("express");
const logger = require("./middlewares/logger");
const joyasRoutes = require("./routes/joyasRoutes");

const app = express();
app.use(logger);
app.use(express.json());
app.use("/api", joyasRoutes);


app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");

  
});

