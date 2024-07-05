/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("profile", (table) => {
    table.increments();
    table.string("username");
    table.integer("phone_number");
    table.string("job_title");
    table.string("email");
    table.date("birth_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("profile");
};
