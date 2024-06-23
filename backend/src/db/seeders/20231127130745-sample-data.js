const db = require('../models');
const Users = db.users;

const Activities = db.activities;

const Categories = db.categories;

const Contacts = db.contacts;

const Deals = db.deals;

const EmailCampaigns = db.email_campaigns;

const Leads = db.leads;

const Reports = db.reports;

const Tasks = db.tasks;

const Tenants = db.tenants;

const Tenant = db.tenant;

const ActivitiesData = [
  {
    type: 'Call',

    date: new Date('2023-10-01T10:00:00Z'),

    notes: 'Called the lead to discuss requirements.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    type: 'Email',

    date: new Date('2023-10-02T11:00:00Z'),

    notes: 'Sent follow-up email with proposal.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    type: 'Meeting',

    date: new Date('2023-10-03T12:00:00Z'),

    notes: 'Meeting with the lead to finalize details.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const CategoriesData = [
  {
    name: 'Category One',

    // type code here for "relation_one" field
  },

  {
    name: 'Category Two',

    // type code here for "relation_one" field
  },

  {
    name: 'Category Three',

    // type code here for "relation_one" field
  },
];

const ContactsData = [
  {
    first_name: 'John',

    last_name: 'Doe',

    email: 'john.doe@example.com',

    phone: '123-456-7890',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Jane',

    last_name: 'Smith',

    email: 'jane.smith@example.com',

    phone: '234-567-8901',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Alice',

    last_name: 'Johnson',

    email: 'alice.johnson@example.com',

    phone: '345-678-9012',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const DealsData = [
  {
    name: 'Deal One',

    stage: 'Lost',

    amount: 1000,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Deal Two',

    stage: 'New',

    amount: 2000,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Deal Three',

    stage: 'Proposal',

    amount: 3000,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const EmailCampaignsData = [
  {
    name: 'Welcome Campaign',

    subject: 'Welcome to Our Service',

    content: '<p>Thank you for joining us!</p>',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Product Launch Campaign',

    subject: 'New Product Launch',

    content: '<p>We are excited to announce our new product.</p>',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Holiday Sale Campaign',

    subject: 'Holiday Sale',

    content: '<p>Enjoy our special holiday discounts.</p>',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const LeadsData = [
  {
    name: 'Lead One',

    status: 'Proposal',

    score: 10,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Lead Two',

    status: 'Qualified',

    score: 20,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Lead Three',

    status: 'Lost',

    score: 30,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ReportsData = [
  {
    title: 'Sales Performance Report',

    description: 'Report on the sales performance for Q3.',

    // type code here for "relation_one" field
  },

  {
    title: 'Lead Conversion Report',

    description: 'Report on the lead conversion rates.',

    // type code here for "relation_one" field
  },

  {
    title: 'Customer Retention Report',

    description: 'Report on customer retention metrics.',

    // type code here for "relation_one" field
  },
];

const TasksData = [
  {
    title: 'Task One',

    due_date: new Date('2023-10-01T10:00:00Z'),

    priority: 'High',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Task Two',

    due_date: new Date('2023-10-02T11:00:00Z'),

    priority: 'High',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Task Three',

    due_date: new Date('2023-10-03T12:00:00Z'),

    priority: 'High',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TenantsData = [
  {
    name: 'Tenant One',

    domain: 'tenantone.com',

    // type code here for "relation_one" field
  },

  {
    name: 'Tenant Two',

    domain: 'tenanttwo.com',

    // type code here for "relation_one" field
  },

  {
    name: 'Tenant Three',

    domain: 'tenantthree.com',

    // type code here for "relation_one" field
  },
];

const TenantData = [
  {
    name: 'Albert Einstein',
  },

  {
    name: 'James Watson',
  },

  {
    name: 'Frederick Gowland Hopkins',
  },
];

// Similar logic for "relation_many"

async function associateUserWithTenant() {
  const relatedTenant0 = await Tenant.findOne({
    offset: Math.floor(Math.random() * (await Tenant.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setTenant) {
    await User0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenant.findOne({
    offset: Math.floor(Math.random() * (await Tenant.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setTenant) {
    await User1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenant.findOne({
    offset: Math.floor(Math.random() * (await Tenant.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setTenant) {
    await User2.setTenant(relatedTenant2);
  }
}

async function associateActivityWithRelated_to() {
  const relatedRelated_to0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setRelated_to) {
    await Activity0.setRelated_to(relatedRelated_to0);
  }

  const relatedRelated_to1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setRelated_to) {
    await Activity1.setRelated_to(relatedRelated_to1);
  }

  const relatedRelated_to2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setRelated_to) {
    await Activity2.setRelated_to(relatedRelated_to2);
  }
}

async function associateActivityWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setOwner) {
    await Activity0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setOwner) {
    await Activity1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setOwner) {
    await Activity2.setOwner(relatedOwner2);
  }
}

async function associateActivityWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setTenant) {
    await Activity0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setTenant) {
    await Activity1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setTenant) {
    await Activity2.setTenant(relatedTenant2);
  }
}

async function associateCategoryWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Category0 = await Categories.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Category0?.setTenant) {
    await Category0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Category1 = await Categories.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Category1?.setTenant) {
    await Category1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Category2 = await Categories.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Category2?.setTenant) {
    await Category2.setTenant(relatedTenant2);
  }
}

async function associateContactWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setOwner) {
    await Contact0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setOwner) {
    await Contact1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setOwner) {
    await Contact2.setOwner(relatedOwner2);
  }
}

async function associateContactWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setTenant) {
    await Contact0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setTenant) {
    await Contact1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setTenant) {
    await Contact2.setTenant(relatedTenant2);
  }
}

async function associateDealWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Deal0 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Deal0?.setLead) {
    await Deal0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Deal1 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Deal1?.setLead) {
    await Deal1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Deal2 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Deal2?.setLead) {
    await Deal2.setLead(relatedLead2);
  }
}

async function associateDealWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Deal0 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Deal0?.setOwner) {
    await Deal0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Deal1 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Deal1?.setOwner) {
    await Deal1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Deal2 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Deal2?.setOwner) {
    await Deal2.setOwner(relatedOwner2);
  }
}

async function associateDealWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Deal0 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Deal0?.setTenant) {
    await Deal0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Deal1 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Deal1?.setTenant) {
    await Deal1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Deal2 = await Deals.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Deal2?.setTenant) {
    await Deal2.setTenant(relatedTenant2);
  }
}

// Similar logic for "relation_many"

async function associateEmailCampaignWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const EmailCampaign0 = await EmailCampaigns.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (EmailCampaign0?.setTenant) {
    await EmailCampaign0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const EmailCampaign1 = await EmailCampaigns.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (EmailCampaign1?.setTenant) {
    await EmailCampaign1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const EmailCampaign2 = await EmailCampaigns.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (EmailCampaign2?.setTenant) {
    await EmailCampaign2.setTenant(relatedTenant2);
  }
}

async function associateLeadWithCategory() {
  const relatedCategory0 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setCategory) {
    await Lead0.setCategory(relatedCategory0);
  }

  const relatedCategory1 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setCategory) {
    await Lead1.setCategory(relatedCategory1);
  }

  const relatedCategory2 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setCategory) {
    await Lead2.setCategory(relatedCategory2);
  }
}

async function associateLeadWithContact() {
  const relatedContact0 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setContact) {
    await Lead0.setContact(relatedContact0);
  }

  const relatedContact1 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setContact) {
    await Lead1.setContact(relatedContact1);
  }

  const relatedContact2 = await Contacts.findOne({
    offset: Math.floor(Math.random() * (await Contacts.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setContact) {
    await Lead2.setContact(relatedContact2);
  }
}

async function associateLeadWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setOwner) {
    await Lead0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setOwner) {
    await Lead1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setOwner) {
    await Lead2.setOwner(relatedOwner2);
  }
}

async function associateLeadWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setTenant) {
    await Lead0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setTenant) {
    await Lead1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setTenant) {
    await Lead2.setTenant(relatedTenant2);
  }
}

async function associateReportWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Report0 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Report0?.setTenant) {
    await Report0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Report1 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Report1?.setTenant) {
    await Report1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Report2 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Report2?.setTenant) {
    await Report2.setTenant(relatedTenant2);
  }
}

async function associateTaskWithAssigned_to() {
  const relatedAssigned_to0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setAssigned_to) {
    await Task0.setAssigned_to(relatedAssigned_to0);
  }

  const relatedAssigned_to1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setAssigned_to) {
    await Task1.setAssigned_to(relatedAssigned_to1);
  }

  const relatedAssigned_to2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setAssigned_to) {
    await Task2.setAssigned_to(relatedAssigned_to2);
  }
}

async function associateTaskWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setTenant) {
    await Task0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setTenant) {
    await Task1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setTenant) {
    await Task2.setTenant(relatedTenant2);
  }
}

async function associateTenantWithTenant() {
  const relatedTenant0 = await Tenant.findOne({
    offset: Math.floor(Math.random() * (await Tenant.count())),
  });
  const Tenant0 = await Tenants.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Tenant0?.setTenant) {
    await Tenant0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenant.findOne({
    offset: Math.floor(Math.random() * (await Tenant.count())),
  });
  const Tenant1 = await Tenants.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Tenant1?.setTenant) {
    await Tenant1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenant.findOne({
    offset: Math.floor(Math.random() * (await Tenant.count())),
  });
  const Tenant2 = await Tenants.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Tenant2?.setTenant) {
    await Tenant2.setTenant(relatedTenant2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Activities.bulkCreate(ActivitiesData);

    await Categories.bulkCreate(CategoriesData);

    await Contacts.bulkCreate(ContactsData);

    await Deals.bulkCreate(DealsData);

    await EmailCampaigns.bulkCreate(EmailCampaignsData);

    await Leads.bulkCreate(LeadsData);

    await Reports.bulkCreate(ReportsData);

    await Tasks.bulkCreate(TasksData);

    await Tenants.bulkCreate(TenantsData);

    await Tenant.bulkCreate(TenantData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithTenant(),

      await associateActivityWithRelated_to(),

      await associateActivityWithOwner(),

      await associateActivityWithTenant(),

      await associateCategoryWithTenant(),

      await associateContactWithOwner(),

      await associateContactWithTenant(),

      await associateDealWithLead(),

      await associateDealWithOwner(),

      await associateDealWithTenant(),

      // Similar logic for "relation_many"

      await associateEmailCampaignWithTenant(),

      await associateLeadWithCategory(),

      await associateLeadWithContact(),

      await associateLeadWithOwner(),

      await associateLeadWithTenant(),

      await associateReportWithTenant(),

      await associateTaskWithAssigned_to(),

      await associateTaskWithTenant(),

      await associateTenantWithTenant(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('activities', null, {});

    await queryInterface.bulkDelete('categories', null, {});

    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('deals', null, {});

    await queryInterface.bulkDelete('email_campaigns', null, {});

    await queryInterface.bulkDelete('leads', null, {});

    await queryInterface.bulkDelete('reports', null, {});

    await queryInterface.bulkDelete('tasks', null, {});

    await queryInterface.bulkDelete('tenants', null, {});

    await queryInterface.bulkDelete('tenant', null, {});
  },
};
