const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const tenants = sequelize.define(
    'tenants',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      domain: {
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

  tenants.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.tenants.hasMany(db.activities, {
      as: 'activities_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.categories, {
      as: 'categories_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.contacts, {
      as: 'contacts_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.deals, {
      as: 'deals_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.email_campaigns, {
      as: 'email_campaigns_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.leads, {
      as: 'leads_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.reports, {
      as: 'reports_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.tasks, {
      as: 'tasks_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    //end loop

    db.tenants.belongsTo(db.tenant, {
      as: 'tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tenants.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tenants;
};
