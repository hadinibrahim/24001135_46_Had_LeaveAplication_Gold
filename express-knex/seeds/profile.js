/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("profile").del();
  await knex("profile").insert([
    {
      username: "sabrina mawar",
      phone_number: "8123456",
      job_tite: "web administrator",
      email: "sabrinamawar@gmail.com",
      birth_date: "1999-05-02",
    },
    {
      username: "hadin ibrahim",
      phone_number: "878764350",
      job_tite: "fullstack developer",
      email: "hadin@gmail.com",
      birth_date: "1999-03-28",
    },
    {
      username: "komeng",
      phone_number: "851253476",
      job_tite: "frontend engineer",
      email: "komeng@gmail.com",
      birth_date: "1970-08-25",
    },
  ]);
};
