const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ message: "Please insert username, email and password first!" });

    const existingAcc = await db("account")
      .where("username", username)
      .orWhere("email", email)
      .first();

    if (existingAcc) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const register = await db("account")
      .insert({ username: username, email: email, password: hashedPassword })
      .returning("id_acc");

    if (register.length > 0) {
      res.status(200).json({
        message: "Account created successfully!",
        data: {
          id_acc: register[0],
          username: username,
          email: email,
        },
      });
    } else {
      res.status(400).json({
        message: "Failed to register account",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await db("account").where("username", username).first();

    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }

    const passwordMatch = await bcrypt.compare(password, account.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorect password" });
    }

    res
      .status(200)
      .json({ message: `Login successful! Hello, ${account.username}!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!!" });
  }
});

app.post("/offleft", async (req, res) => {
  const { remain_days } = req.body;
  try {
    const results = await db("offleft")
      .insert({
        offleft: remain_days,
      })
      .returning("id_off");
    return res.json({
      message: "The number of leave has been updated",
      data: { id_off: results[0], offleft: remain_days },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update the number of leave" });
  }
});

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

app.get("/typeoff", async (req, res) => {
  const typeoff = await db("typeoff").select("*");
  res.render("typeoff", { typeoff });
});

app.listen(5000, () => {
  console.log("Server on board");
});
