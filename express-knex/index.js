const express = require("express");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/myinfo", async (req, res) => {
  //   const profile = await db("profile").select("*");
  const profile = await db("profile")
    .join("off_left", "profile.id_off", "=", "off_left.id_off")
    .select("profile.username", "profile.job_title", "off_left.off_left");
  console.log(profile);
  res.render("profile", { profile });
});

app.listen(5000, () => {
  console.log("Server on board");
});
