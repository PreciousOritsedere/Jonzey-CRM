import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/leads/leadsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  name: '',

  status: 'New',

  score: '',

  category: '',

  contact: '',

  owner: '',

  tenant: '',
};

const LeadsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/leads/leads-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='status' id='status' component='select'>
                  <option value='New'>New</option>

                  <option value='Qualified'>Qualified</option>

                  <option value='Proposal'>Proposal</option>

                  <option value='Won'>Won</option>

                  <option value='Lost'>Lost</option>
                </Field>
              </FormField>

              <FormField label='Score'>
                <Field type='number' name='score' placeholder='Score' />
              </FormField>

              <FormField label='Category' labelFor='category'>
                <Field
                  name='category'
                  id='category'
                  component={SelectField}
                  options={[]}
                  itemRef={'categories'}
                ></Field>
              </FormField>

              <FormField label='Contact' labelFor='contact'>
                <Field
                  name='contact'
                  id='contact'
                  component={SelectField}
                  options={[]}
                  itemRef={'contacts'}
                ></Field>
              </FormField>

              <FormField label='Owner' labelFor='owner'>
                <Field
                  name='owner'
                  id='owner'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='Tenant' labelFor='tenant'>
                <Field
                  name='tenant'
                  id='tenant'
                  component={SelectField}
                  options={[]}
                  itemRef={'tenants'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/leads/leads-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

LeadsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_LEADS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default LeadsNew;
