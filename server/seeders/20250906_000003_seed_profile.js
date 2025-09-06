// server/seeders/20250906_000003_seed_profile.js

/** @type {import('sequelize-cli').Seeder} */

const initials = (name) => {
  const parts = (name || '').trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
  return (first + last).toUpperCase().slice(0, 2);
};

export default {
  async up(queryInterface, Sequelize) {
    const hero_name = 'Umair Masood';
    await queryInterface.bulkInsert('user_profile', [
      {
        hero_name,
        hero_role: 'Full Stack Developer',
        hero_description: 'I build AI-first, performant web apps.',
        profile_image: '/images/profile.png',
        login_initials: initials(hero_name),
        gmail: 'umair@gmail.com',
        phone_number: '+92 300 0000000',
        linkedin: 'https://linkedin.com/in/umair',
        github: 'https://github.com/umair',
        work_location: 'Islamabad, PK',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_profile', null, {});
  },
};
