const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ActivitiesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.create(
      {
        id: data.id || undefined,

        type: data.type || null,
        date: data.date || null,
        notes: data.notes || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await activities.setRelated_to(data.related_to || null, {
      transaction,
    });

    await activities.setOwner(data.owner || null, {
      transaction,
    });

    await activities.setTenant(data.tenant || null, {
      transaction,
    });

    return activities;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const activitiesData = data.map((item, index) => ({
      id: item.id || undefined,

      type: item.type || null,
      date: item.date || null,
      notes: item.notes || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const activities = await db.activities.bulkCreate(activitiesData, {
      transaction,
    });

    // For each item created, replace relation files

    return activities;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const activities = await db.activities.findByPk(id, {}, { transaction });

    await activities.update(
      {
        type: data.type || null,
        date: data.date || null,
        notes: data.notes || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await activities.setRelated_to(data.related_to || null, {
      transaction,
    });

    await activities.setOwner(data.owner || null, {
      transaction,
    });

    await activities.setTenant(data.tenant || null, {
      transaction,
    });

    return activities;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of activities) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of activities) {
        await record.destroy({ transaction });
      }
    });

    return activities;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findByPk(id, options);

    await activities.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await activities.destroy({
      transaction,
    });

    return activities;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findOne({ where }, { transaction });

    if (!activities) {
      return activities;
    }

    const output = activities.get({ plain: true });

    output.related_to = await activities.getRelated_to({
      transaction,
    });

    output.owner = await activities.getOwner({
      transaction,
    });

    output.tenant = await activities.getTenant({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.contacts,
        as: 'related_to',
      },

      {
        model: db.users,
        as: 'owner',
      },

      {
        model: db.tenants,
        as: 'tenant',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.type) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('activities', 'type', filter.type),
        };
      }

      if (filter.notes) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('activities', 'notes', filter.notes),
        };
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.related_to) {
        var listItems = filter.related_to.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          related_toId: { [Op.or]: listItems },
        };
      }

      if (filter.owner) {
        var listItems = filter.owner.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ownerId: { [Op.or]: listItems },
        };
      }

      if (filter.tenant) {
        var listItems = filter.tenant.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          tenantId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.activities.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.activities.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('activities', 'type', query),
        ],
      };
    }

    const records = await db.activities.findAll({
      attributes: ['id', 'type'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['type', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.type,
    }));
  }
};
