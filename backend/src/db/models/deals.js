const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const deals = sequelize.define(
    'deals',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      stage: {
        type: DataTypes.ENUM,

        values: ['New', 'Qualified', 'Proposal', 'Won', 'Lost'],
      },

      amount: {
        type: DataTypes.DECIMAL,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  deals.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.deals.belongsTo(db.leads, {
      as: 'lead',
      foreignKey: {
        name: 'leadId',
      },
      constraints: false,
    });

    db.deals.belongsTo(db.users, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.deals.belongsTo(db.tenants, {
      as: 'tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.deals.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.deals.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return deals;
};
