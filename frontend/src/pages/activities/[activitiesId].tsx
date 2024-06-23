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

import { update, fetch } from '../../stores/activities/activitiesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditActivities = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    type: '',

    date: new Date(),

    notes: '',

    related_to: '',

    owner: '',

    tenant: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { activities } = useAppSelector((state) => state.activities);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { activitiesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: activitiesId }));
  }, [activitiesId]);

  useEffect(() => {
    if (typeof activities === 'object') {
      setInitialValues(activities);
    }
  }, [activities]);

  useEffect(() => {
    if (typeof activities === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = activities[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [activities]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: activitiesId, data }));
    await router.push('/activities/activities-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit activities')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit activities'}
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
              <FormField label='Type'>
                <Field name='type' placeholder='Type' />
              </FormField>

              <FormField label='Date'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.date
                      ? new Date(
                          dayjs(initialValues.date).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, date: date })
                  }
                />
              </FormField>

              <FormField label='Notes' hasTextareaHeight>
                <Field name='notes' as='textarea' placeholder='Notes' />
              </FormField>

              <FormField label='RelatedTo' labelFor='related_to'>
                <Field
                  name='related_to'
                  id='related_to'
                  component={SelectField}
                  options={initialValues.related_to}
                  itemRef={'contacts'}
                  showField={'email'}
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
                  onClick={() => router.push('/activities/activities-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditActivities.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ACTIVITIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditActivities;
