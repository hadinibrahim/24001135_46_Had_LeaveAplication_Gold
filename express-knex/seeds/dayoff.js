/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("dayoff").del();
  await knex("dayoff").insert([
    {
      id_type: "1",
      date: "2024-07-10",
      reason: "Demam",
      status: "On progress",
      total: "2",
      id_acc: "1",
    },
    {
      id_type: "4",
      date: "2024-05-30",
      reason: "Anak menikah",
      status: "Approved",
      total: "4",
      id_acc: "3",
    },
  ]);
};
