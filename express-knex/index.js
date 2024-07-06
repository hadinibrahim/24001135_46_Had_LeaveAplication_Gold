const express = require("express");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/myinfo/:id_prof", async (req, res) => {
  const { id_prof } = req.params;
  console.log(id_prof);
  const profile = await db("profile")
    .select("username", "phone_number", "job_title", "email", "birth_date")
    .where({
      id_prof: id_prof,
    });
  res.render("profile", { profile });
});

app.get("/myinfo", async (req, res) => {
  //   const profile = await db("profile").select("*");
  const profile = await db("profile")
    .join("off_left", "profile.id_off", "=", "off_left.id_off")
    .select("profile.username", "profile.job_title", "off_left.off_left");
  console.log(profile);
  res.render("profile", { profile });
});

app.get("/offDays", async (req, res) => {
  const dayoff = await db("dayoff")
    .join(
      "type_name",
      "typeoff.id_type",
      "=",
      "dayoff.id_type",
      "username",
      "profile.id_acc",
      "=",
      "dayoff.id_acc"
    )
    // .join("username", "profile.id_acc", "=", "dayoff.id_acc")
    .select(
      "profile.username",
      "dayoff.date",
      "dayoff.reason",
      "dayoff.status",
      "typeoff.type_name"
    );
  console.log(dayoff);
  res.render("dayoff", { dayoff });
});
app.listen(5000, () => {
  console.log("Server on board");
});
