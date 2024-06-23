const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TenantsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tenants = await db.tenants.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        domain: data.domain || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tenants.setTenant(data.tenant || null, {
      transaction,
    });

    return tenants;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const tenantsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      domain: item.domain || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const tenants = await db.tenants.bulkCreate(tenantsData, { transaction });

    // For each item created, replace relation files

    return tenants;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const tenants = await db.tenants.findByPk(id, {}, { transaction });

    await tenants.update(
      {
        name: data.name || null,
        domain: data.domain || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tenants.setTenant(data.tenant || null, {
      transaction,
    });

    return tenants;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tenants = await db.tenants.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of tenants) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of tenants) {
        await record.destroy({ transaction });
      }
    });

    return tenants;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tenants = await db.tenants.findByPk(id, options);

    await tenants.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await tenants.destroy({
      transaction,
    });

    return tenants;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const tenants = await db.tenants.findOne({ where }, { transaction });

    if (!tenants) {
      return tenants;
    }

    const output = tenants.get({ plain: true });

    output.activities_tenant = await tenants.getActivities_tenant({
      transaction,
    });

    output.categories_tenant = await tenants.getCategories_tenant({
      transaction,
    });

    output.contacts_tenant = await tenants.getContacts_tenant({
      transaction,
    });

    output.deals_tenant = await tenants.getDeals_tenant({
      transaction,
    });

    output.email_campaigns_tenant = await tenants.getEmail_campaigns_tenant({
      transaction,
    });

    output.leads_tenant = await tenants.getLeads_tenant({
      transaction,
    });

    output.reports_tenant = await tenants.getReports_tenant({
      transaction,
    });

    output.tasks_tenant = await tenants.getTasks_tenant({
      transaction,
    });

    output.tenant = await tenants.getTenant({
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
        model: db.tenant,
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

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tenants', 'name', filter.name),
        };
      }

      if (filter.domain) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tenants', 'domain', filter.domain),
        };
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
          count: await db.tenants.count({
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
      : await db.tenants.findAndCountAll({
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
          Utils.ilike('tenants', 'name', query),
        ],
      };
    }

    const records = await db.tenants.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
