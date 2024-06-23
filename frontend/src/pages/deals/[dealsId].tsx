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

import { update, fetch } from '../../stores/deals/dealsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditDeals = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    stage: '',

    amount: '',

    lead: '',

    owner: '',

    tenant: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { deals } = useAppSelector((state) => state.deals);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { dealsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: dealsId }));
  }, [dealsId]);

  useEffect(() => {
    if (typeof deals === 'object') {
      setInitialValues(deals);
    }
  }, [deals]);

  useEffect(() => {
    if (typeof deals === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = deals[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [deals]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: dealsId, data }));
    await router.push('/deals/deals-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit deals')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit deals'}
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

              <FormField label='Stage' labelFor='stage'>
                <Field name='Stage' id='Stage' component='select'>
                  <option value='New'>New</option>

                  <option value='Qualified'>Qualified</option>

                  <option value='Proposal'>Proposal</option>

                  <option value='Won'>Won</option>

                  <option value='Lost'>Lost</option>
                </Field>
              </FormField>

              <FormField label='Amount'>
                <Field type='number' name='amount' placeholder='Amount' />
              </FormField>

              <FormField label='Lead' labelFor='lead'>
                <Field
                  name='lead'
                  id='lead'
                  component={SelectField}
                  options={initialValues.lead}
                  itemRef={'leads'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Owner' labelFor='owner'>
                <Field
                  name='owner'
                  id='owner'
                  component={SelectField}
                  options={initialValues.owner}
                  itemRef={'users'}
                  showField={'firstName'}
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
                  onClick={() => router.push('/deals/deals-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditDeals.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DEALS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDeals;
