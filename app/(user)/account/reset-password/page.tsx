'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardBody, CardHeader } from "@heroui/react";
import { AlertCircle, ChevronLeft, CircleAlert } from 'lucide-react';
import Swal from 'sweetalert2';
import OtpInput from 'react-otp-input';

import { passwordValidationSchema } from '@/app/utils/validation/password-validation';

const validationSchema = Yup.object().shape({
  newPassword: passwordValidationSchema.fields.password,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

type Step = 'email' | 'otp' | 'newPassword';

export default function ResetPassword() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (step === 'email') {
        await sendResetEmail();
      } else if (step === 'otp') {
        await verifyOTP();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  const sendResetEmail = async () => {
    const response = await fetch('/api/user/reset-password/send-otp-email', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setStep('otp');
    } else {
      const data = await response.json();

      setError(data.message || 'Something went wrong');
    }
  };

  const verifyOTP = async () => {
    const response = await fetch('/api/user/reset-password/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp: parseInt(otp) }),
    });

    if (response.ok) {
      setStep('newPassword');
    } else {
      const data = await response.json();

      setError(data.message || 'Something went wrong');
    }
  };

  const resetPassword = async (newPassword: string) => {
    const response = await fetch('/api/user/reset-password/reset', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp: parseInt(otp), newPassword }),
    });

    if (response.ok) {
      Swal.fire({
        title: 'Password reset successfully!',
        icon: 'success',
        confirmButtonColor: '#0072F5',
        confirmButtonText: 'Sign in',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/home');
        }
      });
    } else {
      const data = await response.json();

      setError(data.message || 'Something went wrong');
    }
  };

  const handleBack = () => {
    if (step === 'newPassword') {
      setStep('otp');
    } else if (step === 'otp') {
      setStep('email');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-96 p-6 md:w-[500px]" style={{ maxWidth: '90vw' }}>
        <CardHeader>
          <h2 className="text-2xl font-bold text-primary">RESET PASSWORD</h2>
        </CardHeader>
        <CardBody>
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800">
              <CircleAlert size={20} />
              {error}
            </div>
          )}
          {step === 'email' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                variant="underlined"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? '' : 'Send OTP'}
              </Button>
            </form>
          )}
          {step === 'otp' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="mx-2 text-gray-500">-</span>}
                inputType="number"
                renderInput={(props) => (
                  <input
                    {...props}
                    className="h-12 w-full border-0 border-b-2 border-gray-300 text-center text-2xl focus:border-black focus:outline-none focus:ring-0"
                    aria-label="OTP input"
                    style={{}}
                  />
                )}
              />
              <div className="flex items-center justify-between">
                <Button isIconOnly onClick={handleBack} variant="light">
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                  className="min-w-40"
                >
                  {isLoading ? '' : 'Verify OTP'}
                </Button>
              </div>
            </form>
          )}
          {step === 'newPassword' && (
            <Formik
              initialValues={{ newPassword: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                resetPassword(values.newPassword);
                setSubmitting(true);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="grid gap-y-1">
                  <Field
                    as={Input}
                    type="password"
                    name="newPassword"
                    variant="underlined"
                    label="New Password"
                    placeholder="Enter your new password"
                  />
                  <ErrorMessage
                    name="newPassword"
                    render={(msg) => <ErrorMessageComponent>{msg}</ErrorMessageComponent>}
                  />
                  <Field
                    as={Input}
                    type="password"
                    name="confirmPassword"
                    variant="underlined"
                    label="Confirm Password"
                    placeholder="Confirm your new password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    render={(msg) => <ErrorMessageComponent>{msg}</ErrorMessageComponent>}
                  />
                  <div className="flex items-center justify-between">
                    <Button isIconOnly onClick={handleBack} variant="light">
                      <ChevronLeft size={16} />
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      isLoading={isSubmitting}
                      className="min-w-40"
                    >
                      {isSubmitting ? '' : 'Reset Password'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

const ErrorMessageComponent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1 text-red-500">
    <AlertCircle size={16} />
    <small>{children}</small>
  </div>
);