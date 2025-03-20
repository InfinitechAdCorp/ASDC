'use client';

import React, { useState } from 'react';
import { Button, Card, CardBody } from "@heroui/react";
import { toast } from 'react-hot-toast';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !name.trim() || !message.trim()) {
      toast.error('All fields are required.');

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');

      return;
    }

    setLoading(true);

    try {
      const formData = {
        email,
        name,
        message,
      };

      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form.');
      }

      const data = await response.json();

      console.log('Success', data);

      setEmail('');
      setName('');
      setMessage('');
      toast.success('Message sent! We’ll be in touch shortly.');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto h-[75vh] pb-16 pt-20 md:pb-8 md:pt-8">
      <Card className="h-full" radius="none">
        <CardBody className="flex h-full flex-col p-0 md:flex-row">
          <div className="h-[70%] overflow-auto bg-gray-900 text-white md:h-full md:w-[50%]">
            <div className="flex flex-col gap-y-4 p-8">
              <h1 className="text-2xl font-bold md:text-5xl">
                Contact Information
              </h1>
              <label htmlFor="email" className="font-semibold text-white/90">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter valid email address"
                aria-label="Email"
                className="border-b border-white/30 bg-transparent text-white/90 placeholder:text-white/60 focus:border-white focus:outline-none"
              />

              <label htmlFor="name" className="font-semibold text-white/90">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                aria-label="Name"
                className="border-b border-white/30 bg-transparent text-white/90 placeholder:text-white/60 focus:border-white focus:outline-none"
              />

              <label htmlFor="message" className="font-semibold text-white/90">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                aria-label="Message"
                className="h-24 resize-y border-b border-white/30 bg-transparent text-white/90 placeholder:text-white/60 focus:border-white focus:outline-none"
              />
              <Button
                onClick={handleSubmit}
                variant="faded"
                radius="none"
                isLoading={loading}
              >
                Submit
              </Button>
            </div>
          </div>
          <div className="h-[30%] bg-[url('/img/map-portrait.jpg')] bg-cover bg-center md:h-full md:w-[50%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8322326.0038581565!2d119.17598925434736!3d11.715114400946069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd077b8b552011%3A0xa86ffeaf3163988!2sAnilao%20Scuba%20Dive%20Center%20ASDC!5e0!3m2!1sen!2sph!4v1732005634936!5m2!1sen!2sph"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Google Maps Embed for Anilao Scuba Dive Center ASDC"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactUs;
