'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  CardFooter,
  Input,
} from "@heroui/react";

export default function LoginPage() {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        console.log('Login API: Received password:', password);
        window.location.href = '/admin';
      } else {
        alert('Invalid password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white p-8 dark:bg-black">
      <Card className="w-full max-w-[600px] p-8">
        <CardHeader className="flex justify-start">
          <h1 className="text-2xl">Admin Login</h1>
        </CardHeader>
        <CardBody>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
