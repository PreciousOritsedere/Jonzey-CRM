const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const tenant = sequelize.define(
    'tenant',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  tenant.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.tenant.hasMany(db.users, {
      as: 'users_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenant.hasMany(db.tenants, {
      as: 'tenants_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    //end loop

    db.tenant.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tenant.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tenant;
};
