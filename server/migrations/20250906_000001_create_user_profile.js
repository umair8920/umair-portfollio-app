// ESM migration
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_profile', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      hero_name: { type: Sequelize.STRING, allowNull: false },
      hero_role: { type: Sequelize.STRING, allowNull: false },
      hero_description: { type: Sequelize.TEXT, allowNull: false },
      profile_image: { type: Sequelize.STRING, allowNull: true },
      login_initials: { type: Sequelize.STRING(2), allowNull: true },
      gmail: { type: Sequelize.STRING, allowNull: true },
      phone_number: { type: Sequelize.STRING, allowNull: true },
      linkedin: { type: Sequelize.STRING, allowNull: true },
      github: { type: Sequelize.STRING, allowNull: true },
      work_location: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_profile');
  },
};
