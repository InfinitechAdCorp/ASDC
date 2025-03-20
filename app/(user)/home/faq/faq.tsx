'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Input, Accordion, AccordionItem } from "@heroui/react";
import { Search } from 'lucide-react';

import BlueLoading from '@/components/admin/blue-loading';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FAQ() {
  const { data = [], error } = useSWR<FAQItem[]>('/api/faq', fetcher);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = data.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Loading and error handling
  if (error) return <div>Error loading FAQs</div>;
  if (!data) return <BlueLoading />;

  return (
    <div>
      <Input
        isClearable
        placeholder="Search FAQs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startContent={<Search className="text-default-400" />}
        className="mx-auto mb-4 max-w-[50%] shadow-lg"
        radius="none"
      />
      <Accordion variant="light" className="p-0">
        {filteredFAQs.map((item) => (
          <AccordionItem
            key={item.id}
            aria-label={item.question}
            title={
              <span className="font-semibold text-gray-800 hover:text-primary">
                {item.question}
              </span>
            }
          >
            <p className="font-light text-gray-600">{item.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
