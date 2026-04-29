const fs = require("fs");
const path = require("path");

module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, "data/regency.json");

    const raw = JSON.parse(fs.readFileSync(filePath));

    const data = raw.map((item, i) => ({
      id: i + 1,
      name: item.name,
      province_id: item.province_id,
    }));

    await queryInterface.bulkInsert("regency", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("regency", null, {});
  },
};
