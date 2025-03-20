'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Chip, Button } from "@heroui/react";
import { Award, Calendar, Download, ExternalLink } from 'lucide-react';
import useSWR from 'swr';

import ScubaDiverCertificate from './cert-layout';

import BlueLoading from '@/components/admin/blue-loading';

interface Certificate {
  id: number;
  name: string;
  user_id: number;
  certificateNumber: string;
  date_issued: string;
  expiryDate: string | null;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: string;
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch(() => []);

const ASDCCertAificates: React.FC = () => {
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const id = Number(localStorage.getItem('id')) || 0;

    setUserId(id);
  }, []);

  const { data: certificates, error } = useSWR<Certificate[]>(
    `/api/certification?id=${userId}`,
    fetcher,
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (error) {
    return <BlueLoading />;
  }

  if (!certificates) {
    return <BlueLoading />;
  }

  return (
    <div className="container mx-auto min-h-screen px-4 pt-28 lg:px-0">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My PADI Certifications</h1>
        {/* <Button
          color="primary"
          variant="ghost"
          size="sm"
          startContent={<Download size={20} />}
        >
          Download All
        </Button> */}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.id} className="transition-shadow hover:shadow-lg">
            <CardBody className="space-y-4">
              <div className="flex items-start justify-between">
                <Chip color="success" variant="flat">
                  {cert.type}
                </Chip>
                <Chip color="primary" variant="flat">
                  Active
                </Chip>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>Issued: {formatDate(cert.date_issued)}</span>
                </div>
                {cert.expiryDate && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>Expires: {formatDate(cert.expiryDate)}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                {/* Pass the certificate object to the modal trigger */}
                <ScubaDiverCertificate certificate={cert} />
                {/* <Button
                  size="sm"
                  variant="flat"
                  startContent={<ExternalLink size={16} />}
                >
                  Verify
                </Button> */}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <Card>
          <CardBody className="py-8">
            <div className="text-center">
              <Award className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold">
                No Certificates Yet
              </h3>
              <p className="text-gray-500">
                You haven&apos;`t earned any PADI certifications yet. Start your
                diving journey today!
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ASDCCertAificates;
