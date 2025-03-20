'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, CardHeader, Card, CardBody, Link } from "@heroui/react";
import { Eye, EyeOff, MailIcon, User, CircleX, AlertCircle, CircleCheck } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import * as Yup from 'yup';

import { passwordValidationSchema } from '@/app/utils/validation/password-validation';
import { PasswordStrengthIndicator } from '@/components/global/password-strenght-indicator';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: passwordValidationSchema.fields.password,
});

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const navigateToSignIn = () => {
    router.push('/account/sign-in');
  };


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      redirect('/home');
    }
  }, []);

  const handleSubmit = async (values: FormValues, { setSubmitting, setStatus, resetForm }: any) => {
    setSuccess('');
    setError('');

    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();

        setStatus({ error: errorData.message || 'Something went wrong' });

        return;
      }

      setSuccess(
        "You're all set! Please check your email to verify your account and get started",
      );

      resetForm();
    } catch (error) {
      setError('Error creating user:');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Card className="w-96 p-6 md:w-[500px]" style={{ maxWidth: '90vw' }}>
          <CardHeader>
            <div className="flex w-full items-center justify-start">
              <h2 className="text-2xl font-bold text-primary">SIGN UP</h2>
            </div>
          </CardHeader>
          <CardBody>
            <Link
              onClick={navigateToSignIn}
              className="mb-4 cursor-pointer hover:underline"
            >
              <p>
                Already have an account?{' '}
                <span className="text-primary">Sign in</span>
              </p>
            </Link>
            <Formik
              initialValues={{ first_name: '', last_name: '', email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form className="grid gap-y-1">
                  {error && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800">
                      <CircleX size={20} />
                      {error}
                    </div>
                  )}
                  {success && (
                    <div
                      className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
                      role="alert"
                    >
                      <CircleCheck className="h-full" />
                      {success}
                    </div>
                  )}
                  <div>
                    <Field
                      as={Input}
                      label="First name"
                      name="first_name"
                      variant="underlined"
                      isRequired
                      endContent={<User size={22} className="text-primary" />}
                    />
                    <ErrorMessage
                      name="first_name"
                      render={(msg) => <ErrorMessageComponent>{msg}</ErrorMessageComponent>}
                    />
                  </div>

                  <div>
                    <Field
                      as={Input}
                      label="Last name"
                      name="last_name"
                      variant="underlined"
                      isRequired
                      endContent={<User size={22} className="text-primary" />}
                    />
                    <ErrorMessage
                      name="last_name"
                      render={(msg) => <ErrorMessageComponent>{msg}</ErrorMessageComponent>}
                    />
                  </div>

                  <div>
                    <Field
                      as={Input}
                      type="email"
                      label="Email"
                      name="email"
                      variant="underlined"
                      isRequired
                      endContent={<MailIcon size={20} className="text-primary" />}
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => <ErrorMessageComponent>{msg}</ErrorMessageComponent>}
                    />
                  </div>

                  <div>
                    <Field
                      as={Input}
                      type={isVisible ? 'text' : 'password'}
                      label="Password"
                      name="password"
                      variant="underlined"
                      isRequired
                      endContent={
                        <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                          {isVisible ? <Eye size={22} className="text-primary" /> : <EyeOff size={22} className="text-primary" />}
                        </button>
                      }
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => <ErrorMessageComponent>{msg}</ErrorMessageComponent>}
                    />
                    <PasswordStrengthIndicator password={values.password} />
                  </div>

                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                  >
                    Sign up
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

const ErrorMessageComponent = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center gap-1 text-sm text-red-500">
    <AlertCircle size={16} />
    <span>{children}</span>
  </div>
);