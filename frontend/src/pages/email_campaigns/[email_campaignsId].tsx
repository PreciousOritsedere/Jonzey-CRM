import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/email_campaigns/email_campaignsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditEmail_campaigns = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    subject: '',

    content: '',

    recipients: [],

    tenant: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { email_campaigns } = useAppSelector((state) => state.email_campaigns);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { email_campaignsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: email_campaignsId }));
  }, [email_campaignsId]);

  useEffect(() => {
    if (typeof email_campaigns === 'object') {
      setInitialValues(email_campaigns);
    }
  }, [email_campaigns]);

  useEffect(() => {
    if (typeof email_campaigns === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = email_campaigns[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [email_campaigns]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: email_campaignsId, data }));
    await router.push('/email_campaigns/email_campaigns-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit email_campaigns')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit email_campaigns'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Subject'>
                <Field name='subject' placeholder='Subject' />
              </FormField>

              <FormField label='Content' hasTextareaHeight>
                <Field
                  name='content'
                  id='content'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Recipients' labelFor='recipients'>
                <Field
                  name='recipients'
                  id='recipients'
                  component={SelectFieldMany}
                  options={initialValues.recipients}
                  itemRef={'contacts'}
                  showField={'email'}
                ></Field>
              </FormField>

              <FormField label='Tenant' labelFor='tenant'>
                <Field
                  name='tenant'
                  id='tenant'
                  component={SelectField}
                  options={initialValues.tenant}
                  itemRef={'tenants'}
                  showField={'name'}
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
                  onClick={() =>
                    router.push('/email_campaigns/email_campaigns-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditEmail_campaigns.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_EMAIL_CAMPAIGNS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditEmail_campaigns;
