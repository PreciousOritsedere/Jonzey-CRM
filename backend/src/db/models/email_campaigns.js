const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const email_campaigns = sequelize.define(
    'email_campaigns',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      subject: {
        type: DataTypes.TEXT,
      },

      content: {
        type: DataTypes.TEXT,
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

  email_campaigns.associate = (db) => {
    db.email_campaigns.belongsToMany(db.contacts, {
      as: 'recipients',
      foreignKey: {
        name: 'email_campaigns_recipientsId',
      },
      constraints: false,
      through: 'email_campaignsRecipientsContacts',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.email_campaigns.belongsTo(db.tenants, {
      as: 'tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.email_campaigns.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.email_campaigns.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return email_campaigns;
};
