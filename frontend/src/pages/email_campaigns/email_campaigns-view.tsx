import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/email_campaigns/email_campaignsSlice';
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

const Email_campaignsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email_campaigns } = useAppSelector((state) => state.email_campaigns);

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
        <title>{getPageTitle('View email_campaigns')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View email_campaigns')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{email_campaigns?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Subject</p>
            <p>{email_campaigns?.subject}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Content</p>
            {email_campaigns.content ? (
              <p
                dangerouslySetInnerHTML={{ __html: email_campaigns.content }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <>
            <p className={'block font-bold mb-2'}>Recipients</p>
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
                    {email_campaigns.recipients &&
                      Array.isArray(email_campaigns.recipients) &&
                      email_campaigns.recipients.map((item: any) => (
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
              {!email_campaigns?.recipients?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Tenant</p>

            <p>{email_campaigns?.tenant?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/email_campaigns/email_campaigns-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Email_campaignsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_EMAIL_CAMPAIGNS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Email_campaignsView;
