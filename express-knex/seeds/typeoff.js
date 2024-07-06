/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("offtype").del();
  await knex("offtype").insert([
    { type_name: "Cuti sakit" },
    { type_name: "Cuti tahunan" },
    { type_name: "Cuti menikah" },
    { type_name: "Cuti menikahi anak" },
    { type_name: "Cuti istri melahirkan" },
    { type_name: "Cuti keluarga meninggal" },
  ]);
};
