const session = require("express-session");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "12345",
    cookie: { maxAge: 360000 },
    saveUninitialized: true,
  })
);

//Halaman Documentation
app.get('/documentation/:id', (req, res) => {
  // Sample data
  const { id } = req.params;

  // Render the view and pass the data
  res.render('documentation',  {id});
});

app.get('/about/:id', (req, res) => {
  const { id } = req.params;
  res.render('about', {id});
});


//Halaman login
app.get("/", (req, res) => {
  res.render("login", { error: null });
});

// Proses login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const prof = await db("profile").where({ email, password }).first();
      console.log(prof);
      if (prof) {
        req.session.regenerate(function (err) {
          if (err) next(err);
          req.session.id_prof = prof.id_prof;
          req.session.save(function (err) {
            if (err) return next(err);
            res.redirect("/dashboard");
          });
        });
      } else {
        res.render("login", { error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error database:", error);
      res.render("login", { error: "Server error" });
    }
  } else {
    res.render("login", { error: "Please insert your email and password" });
  }
});

//Sesi logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

//Halaman register
app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// Proses register
app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  if (email && password && username) {
    try {
      const alreadyUser = await db("profile").where({ email }).first();

      if (alreadyUser) {
        res.render("register", { error: "Email already exists!!" });
      } else {
        await db("profile").insert({ email, password, username });
        res.redirect(`/`);
      }
    } catch (error) {
      console.error("Error querying databases", error);
      res.render("register", { error: "Internal server error" });
    }
  } else {
    res.render("register", { error: "please fill in all fields" });
  }
});

//Dashboard
app.get("/dashboard/", (req, res) => {
  console.log(req.session.id_prof);
  console.log(req.session);
  const id_prof = req.session.id_prof;
  console.log(id_prof);
  res.render("dashboard", { id_prof });
});

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const profile = await db("profile")
    .select(
      "id_prof",
      "username",
      "phone_number",
      "job_title",
      "email",
      "birth_date"
    )
    .where({
      id_prof: id,
    })
    .first();
  console.log(profile);
  res.render("profile", { profile });
});

//update profile routes
app.get("/profile/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    prof = await db("profile").select("*").where({ id_prof: id }).first();
    console.log("Account:", prof);
    if (!prof) {
      return res.render("update_profile", {
        profile: null,
        error: "Account not found",
      });
    }
    res.render("update_profile", { prof, error: null });
  } catch (error) {
    console.error("Error database", error);
    res.render("update_profile", {
      prof: null,
      error: "Server error",
    });
  }
});

app.post("/profile/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { method, username, job_title, phone_number, birth_date } = req.body;
  console.log(
    "method, job_title, phone_number, birth_date",
    method,
    job_title,
    phone_number,
    birth_date
  );
  if (method == "PATCH") {
    fetch(`http://localhost:5000/profile/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        job_title: job_title,
        phone_number: phone_number,
        birth_date: birth_date,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        res.redirect(`/profile/${id}`);
      });
  } else if (method == "DELETE") {
    fetch(`http://localhost:5000/profile/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_prof: id,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        res.redirect(`/`);
      });
  }
});

app.delete("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db("profile").where({ id_prof: id }).del();
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/profile/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { username, phone_number, job_title, birth_date } = req.body;
  console.log(
    "phone_number, job_title, birth_date",
    username,
    phone_number,
    job_title,
    birth_date
  );
  try {
    await db("profile")
      .where({ id_prof: id })
      .update({ username, phone_number, job_title, birth_date });

    res.json({ message: "data berhasil diubah" });
  } catch (error) {
    console.error("Error updating profile in database", error);
    res.render("update_profile", {
      prof: { id_prof: id, username, phone_number, job_title, birth_date },
      error: "Internal server error",
    });
  }
});

app.get("/dayoff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dayoff = await db("dayoff")
      .join("typeoff", "dayoff.id_type", "=", "typeoff.id_type")
      .join("profile", "profile.id_prof", "=", "dayoff.id_prof")
      .select(
        "dayoff.id_day",
        "profile.username",
        "dayoff.start_date",
        "dayoff.end_date",
        "dayoff.reason",
        "typeoff.type_name"
      )
      .where({ "dayoff.id_prof": id });

    if (dayoff.length > 0) {
      res.render("dayoff", { dayoff, id });
    }
  } catch (error) {
    console.error("Error day off request:", dayoff);
    res.status(500).send("Server error");
  }
});

app.get("/apply_leave/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const leaveTypes = await db("typeoff").select("id_type", "type_name");
    console.log(leaveTypes);
    res.render("apply_leave", { id, leaveTypes });
  } catch (error) {
    console.error("Error leave type", error);
    res.render("apply_leave", { id, leaveTypes, error: "Server Error" });
  }
});

app.post("/apply_leave/:id", async (req, res) => {
  const { id } = req.params;
  const { id_type, start_date, end_date, reason } = req.body;

  if (id_type && start_date && end_date && reason) {
    try {
      await db("dayoff").insert({
        start_date,
        end_date,
        reason,
        id_prof: id,
        id_type,
      });
      res.redirect(`/dayoff/${id}`);
    } catch (error) {
      console.error("Error database", error);
      res.render("apply_leave", { id, error: "Server error", id });
    }
  } else {
    res.render("apply_leave", {
      id,
      error: "Please fill in all required fields",
    });
  }
});

app.listen(5000, () => {
  console.log("Server on board");
});
