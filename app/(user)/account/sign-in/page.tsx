'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  Button,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Link,
} from "@heroui/react";
import { redirect, useRouter } from 'next/navigation';
import { Eye, EyeOff, MailIcon, CircleX, Check, AlertCircle } from 'lucide-react';

import { passwordValidationSchema } from '@/app/utils/validation/password-validation';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: passwordValidationSchema.fields.password,
});

interface FormValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      redirect('/home');
    }
  }, []);

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    setSuccess('');
    setError('');

    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const user = await response.json();

      if (!response.ok) {
        setError(user.message);

        return;
      }

      setSuccess('Successfully signed in');
      console.log('User signed in:', user);
      localStorage.setItem('id', user.id);
      localStorage.setItem('avatar', user.avatar);
      localStorage.setItem('first_name', user.first_name);
      localStorage.setItem('last_name', user.last_name);
      localStorage.setItem('email', user.email);
      localStorage.setItem('password', user.password);
      localStorage.setItem('isLoggedIn', 'true');

      const delay = 1000;

      setTimeout(() => {
        router.push('/');
      }, delay);
    } catch {
      setSubmitting(false);
      setError('Invalid email or password');
    }
  };

  const navigateToSignUp = () => {
    router.push('/account/sign-up');
  };

  const navigateToResetPassword = () => {
    router.push('/account/reset-password');
  };

  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Card className="w-96 p-6 md:w-[500px]" style={{ maxWidth: '90vw' }}>
          <CardHeader>
            <div className="flex w-full items-center justify-start">
              <h2 className="text-2xl font-bold text-primary">SIGN IN</h2>
            </div>
          </CardHeader>
          <CardBody>
            <Link
              onClick={navigateToSignUp}
              className="mb-4 cursor-pointer hover:underline"
            >
              <p>
                Don&apos;t have an account?{' '}
                <span className="text-primary">Sign up</span>
              </p>
            </Link>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
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
                      <Check size={20} />
                      {success}
                    </div>
                  )}
                  <Field
                    as={Input}
                    type="email"
                    label="Email"
                    name="email"
                    variant="underlined"
                    isRequired
                    endContent={
                      <MailIcon
                        size={20}
                        className="pointer-events-none flex-shrink-0 text-2xl text-primary"
                      />
                    }
                  />
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
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                  >
                    Sign in
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Link
              onClick={navigateToResetPassword}
              className="cursor-pointer hover:underline"
            >
              <p>Forgot your password?</p>
            </Link>
          </CardFooter>
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
