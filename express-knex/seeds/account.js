/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("account").del();
  await knex("account").insert([
    { email: "sabrinamawar@gmail.com", password: "sabrina123" },
    { email: "hadin@gmail.com", password: "hadin28" },
    { email: "komeng@gmail.com", password: "spontanuhuy" },
  ]);
};
