/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("dayoff", (table) => {
    table.increments();
    table.integer("id_type");
    table.date("date");
    table.string("reason");
    table.string("status");
    table.integer("id_acc");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("dayoff");
};
