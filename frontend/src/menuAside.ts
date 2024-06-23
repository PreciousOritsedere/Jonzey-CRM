import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/activities/activities-list',
    label: 'Activities',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiActivity ? icon.mdiActivity : icon.mdiTable,
    permissions: 'READ_ACTIVITIES',
  },
  {
    href: '/categories/categories-list',
    label: 'Categories',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTag ? icon.mdiTag : icon.mdiTable,
    permissions: 'READ_CATEGORIES',
  },
  {
    href: '/contacts/contacts-list',
    label: 'Contacts',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountBox ? icon.mdiAccountBox : icon.mdiTable,
    permissions: 'READ_CONTACTS',
  },
  {
    href: '/deals/deals-list',
    label: 'Deals',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiHandshake ? icon.mdiHandshake : icon.mdiTable,
    permissions: 'READ_DEALS',
  },
  {
    href: '/email_campaigns/email_campaigns-list',
    label: 'Email campaigns',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiEmail ? icon.mdiEmail : icon.mdiTable,
    permissions: 'READ_EMAIL_CAMPAIGNS',
  },
  {
    href: '/leads/leads-list',
    label: 'Leads',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiLeadPencil ? icon.mdiLeadPencil : icon.mdiTable,
    permissions: 'READ_LEADS',
  },
  {
    href: '/reports/reports-list',
    label: 'Reports',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFileDocument ? icon.mdiFileDocument : icon.mdiTable,
    permissions: 'READ_REPORTS',
  },
  {
    href: '/tasks/tasks-list',
    label: 'Tasks',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCalendarCheck ? icon.mdiCalendarCheck : icon.mdiTable,
    permissions: 'READ_TASKS',
  },
  {
    href: '/tenants/tenants-list',
    label: 'Tenants',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiDomain ? icon.mdiDomain : icon.mdiTable,
    permissions: 'READ_TENANTS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/tenant/tenant-list',
    label: 'Tenant',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_TENANT',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
