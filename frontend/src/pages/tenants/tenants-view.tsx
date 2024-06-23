import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/tenants/tenantsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const TenantsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tenants } = useAppSelector((state) => state.tenants);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View tenants')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View tenants')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{tenants?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Domain</p>
            <p>{tenants?.domain}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>tenant</p>

            <p>{tenants?.tenant?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Activities Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>

                      <th>Date</th>

                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.activities_tenant &&
                      Array.isArray(tenants.activities_tenant) &&
                      tenants.activities_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/activities/activities-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='type'>{item.type}</td>

                          <td data-label='date'>
                            {dataFormatter.dateTimeFormatter(item.date)}
                          </td>

                          <td data-label='notes'>{item.notes}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.activities_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Categories Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.categories_tenant &&
                      Array.isArray(tenants.categories_tenant) &&
                      tenants.categories_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/categories/categories-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.categories_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Contacts Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>FirstName</th>

                      <th>LastName</th>

                      <th>Email</th>

                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.contacts_tenant &&
                      Array.isArray(tenants.contacts_tenant) &&
                      tenants.contacts_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/contacts/contacts-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='first_name'>{item.first_name}</td>

                          <td data-label='last_name'>{item.last_name}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='phone'>{item.phone}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.contacts_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Deals Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Stage</th>

                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.deals_tenant &&
                      Array.isArray(tenants.deals_tenant) &&
                      tenants.deals_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/deals/deals-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='stage'>{item.stage}</td>

                          <td data-label='amount'>{item.amount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.deals_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Email_campaigns Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Subject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.email_campaigns_tenant &&
                      Array.isArray(tenants.email_campaigns_tenant) &&
                      tenants.email_campaigns_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/email_campaigns/email_campaigns-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='subject'>{item.subject}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.email_campaigns_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Leads Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Status</th>

                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.leads_tenant &&
                      Array.isArray(tenants.leads_tenant) &&
                      tenants.leads_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/leads/leads-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='status'>{item.status}</td>

                          <td data-label='score'>{item.score}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.leads_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Reports Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.reports_tenant &&
                      Array.isArray(tenants.reports_tenant) &&
                      tenants.reports_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/reports/reports-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='description'>{item.description}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.reports_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Tasks Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>DueDate</th>

                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.tasks_tenant &&
                      Array.isArray(tenants.tasks_tenant) &&
                      tenants.tasks_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/tasks/tasks-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='due_date'>
                            {dataFormatter.dateTimeFormatter(item.due_date)}
                          </td>

                          <td data-label='priority'>{item.priority}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.tasks_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/tenants/tenants-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TenantsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_TENANTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default TenantsView;
