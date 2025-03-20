import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Avatar,
  Input,
  Button,
  CardHeader,
  Card,
  CardBody,
} from "@heroui/react";
import { upload } from '@vercel/blob/client';
import { Eye, User, MailIcon, EyeOff, Upload, CircleX, CircleCheck, AlertCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import * as Yup from 'yup';

import { passwordValidationSchema } from '@/app/utils/validation/password-validation';

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

export function ProfileCard() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [user_id, setUserId] = useState<number | null>(null);
  const [avatarSrc, setAvatarSrc] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      redirect('/home');
    }
  }, []);

  const handleAvatarClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = parseInt(localStorage.getItem('id') || '', 10);
      const storedAvatar = localStorage.getItem('avatar') || '';
      const storedFirstName = localStorage.getItem('first_name') || '';
      const storedLastName = localStorage.getItem('last_name') || '';
      const storedEmail = localStorage.getItem('email') || '';
      const storedPassword = localStorage.getItem('password') || '';

      setUserId(isNaN(storedUserId) ? null : storedUserId);
      setAvatarSrc(storedAvatar || '');
      setFirstName(storedFirstName);
      setLastName(storedLastName);
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      let avatarUrl = avatarSrc;

      if (avatarFile) {
        const uploadedBlob = await upload(
          `user/avatar/${avatarFile.name}`,
          avatarFile,
          {
            access: 'public',
            handleUploadUrl: '/api/vercel/upload',
          },
        );

        avatarUrl = uploadedBlob.url;
      }

      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user_id,
          avatar: avatarUrl,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      localStorage.setItem('id', String(user_id));
      localStorage.setItem('avatar', avatarUrl);
      localStorage.setItem('first_name', values.first_name);
      localStorage.setItem('last_name', values.last_name);
      localStorage.setItem('email', values.email);
      localStorage.setItem('password', values.password);

      setSuccess('Profile updated successfully');
      setError('');
    } catch (error) {
      console.error(error);
      setError('An error occurred while updating the profile');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-96 p-6 md:w-[500px]" style={{ maxWidth: '90vw' }}>
      <CardHeader>
        {success && (
          <div
            className="flex w-full items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <CircleCheck size={20} />
            {success}
          </div>
        )}
        {error && (
          <div
            className="flex w-full items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <CircleX size={20} />
            {error}
          </div>
        )}
      </CardHeader>
      <CardBody>
        <div className="flex w-full items-center justify-center gap-x-4">
          <Avatar
            src={avatarSrc}
            className="h-24 w-24 cursor-pointer text-large"
            onClick={handleAvatarClick}
          />
          <Button
            size="sm"
            variant="light"
            endContent={<Upload className="h-4 w-4" />}
            onClick={handleAvatarClick}
            className="text-primary"
          >
            Upload Avatar
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <Formik
          initialValues={{ first_name, last_name, email, password }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-y-1">
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
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card >
  );
}

const ErrorMessageComponent = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center gap-1 text-sm text-red-500">
    <AlertCircle size={16} />
    <span>{children}</span>
  </div>
);
