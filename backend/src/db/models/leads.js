const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const leads = sequelize.define(
    'leads',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['New', 'Qualified', 'Proposal', 'Won', 'Lost'],
      },

      score: {
        type: DataTypes.INTEGER,
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

  leads.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.leads.hasMany(db.deals, {
      as: 'deals_lead',
      foreignKey: {
        name: 'leadId',
      },
      constraints: false,
    });

    //end loop

    db.leads.belongsTo(db.categories, {
      as: 'category',
      foreignKey: {
        name: 'categoryId',
      },
      constraints: false,
    });

    db.leads.belongsTo(db.contacts, {
      as: 'contact',
      foreignKey: {
        name: 'contactId',
      },
      constraints: false,
    });

    db.leads.belongsTo(db.users, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.leads.belongsTo(db.tenants, {
      as: 'tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.leads.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.leads.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return leads;
};
