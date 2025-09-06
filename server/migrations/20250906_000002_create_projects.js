// ESM migration
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },

      user_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'user_profile', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // <-- cascade delete when profile is removed
      },

      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      skills: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: false, defaultValue: [] },
      link: { type: Sequelize.STRING, allowNull: true },
      repo: { type: Sequelize.STRING, allowNull: true },
      image_path: { type: Sequelize.STRING, allowNull: true },

      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.addIndex('projects', ['user_profile_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  },
};
