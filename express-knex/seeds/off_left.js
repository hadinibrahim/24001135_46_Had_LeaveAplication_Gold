/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("off_left").del();
  await knex("off_left").insert([
    { off_left: "6 days" },
    { off_left: "8 days" },
    { off_left: "12 days" }
  ]);
};
