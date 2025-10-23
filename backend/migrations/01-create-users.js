/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: { type: Sequelize.DATE, allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Add unique index on username for faster lookups
  await queryInterface.addIndex('users', ['username'], { name: 'users_username_unique_index', unique: true
  });

  // Add unique index on email for faster lookups
  await queryInterface.addIndex('users', ['email'], { name: 'users_email_unique_index', unique: true });
}

export async function down(queryInterface, Sequelize) {
  // Remove indexes first
  await queryInterface.removeIndex('users', 'users_email_unique_index');
  await queryInterface.removeIndex('users', 'users_username_unique_index');
  
  // Drop the table
  await queryInterface.dropTable('users');
}