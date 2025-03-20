'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Link,
  Avatar,
  Button,
  Checkbox,
  Spacer,
  Divider,
} from "@heroui/react";
import useSWR from 'swr';
import { toast, Toaster } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

import ColorPicker from './color-picker';

import BlueLoading from '@/components/admin/blue-loading';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

const AnnouncementBanner = () => {
  const { theme } = useTheme();
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, mutate } = useSWR('/api/content/banner-1', fetcher);

  useEffect(() => {
    if (data) {
      setContent(data.content || '');
      setColor(data.color || '#ffffff');
      setVisibility(data.visibility ?? true);
    }
  }, [data]);

  if (error) return <div>Failed to load</div>;

  const handleSave = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/content/banner-1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, color, visibility }),
      });

      if (!response.ok) throw new Error('Failed to update banner content');
      toast.success('Success!');
      await mutate();
    } catch (error) {
      console.error('Error updating banner content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
          },
        }}
        containerStyle={{
          position: 'relative',
        }}
      />
      <Card className="mx-auto w-full max-w-7xl p-8">
        <CardHeader className="px-6 pb-0 pt-6">
          <h1 className="text-2xl font-bold">Announcement Banner Settings</h1>
        </CardHeader>
        <CardBody>
          <div className="">
            {/* Rich Text Editor for Banner Content */}
            <div className="mb-4">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [['bold', 'italic', 'underline', 'strike']],
                }}
              />
            </div>

            {/* Banner Settings */}
            <div className="flex items-center space-x-4 pt-4">
              <span className="text-sm font-medium">Banner Color</span>
              <ColorPicker
                initialColor={color}
                onChange={(newColor) => setColor(newColor)}
              />

              <span className="ml-6 text-sm font-medium">Show Banner</span>
              <Checkbox
                isSelected={visibility}
                onChange={(e) => setVisibility(e.target.checked)}
              />
            </div>
            {/* Save Changes Button */}
            <div className="flex justify-end pb-4 pt-4">
              <Button color="primary" onClick={handleSave} isLoading={loading}>
                Save Changes
              </Button>
            </div>
          </div>
          <Divider />
          <Spacer y={4} />

          <h2 className="text-xl font-semibold">Preview</h2>
          <div className="rounded-lg border p-4 dark:bg-white">
            <div
              className={`p-2 text-center text-white ${visibility ? 'block' : 'hidden'}`}
              style={{ backgroundColor: color }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center">
                <Avatar src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg" />
                <div className="ml-2 mr-8 text-3xl font-bold text-black">
                  ASDC
                </div>
                <div className="pointer-events-none hidden items-center justify-center space-x-4 md:flex">
                  <Link href="#" className="text-black hover:text-gray-400">
                    Home
                  </Link>
                  <Link href="#" className="text-black hover:text-gray-400">
                    Shop
                  </Link>
                  <Link href="#" className="text-black hover:text-gray-400">
                    Accommodation
                  </Link>
                  <Link href="#" className="text-black hover:text-gray-400">
                    Testimonial
                  </Link>
                  <Link href="#" className="text-black hover:text-gray-400">
                    Contact
                  </Link>
                  <Link href="#" className="text-black hover:text-gray-400">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AnnouncementBanner;
