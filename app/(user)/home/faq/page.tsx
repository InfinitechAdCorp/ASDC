import React from 'react';

import FAQ from './faq';

const FAQPage = () => {
  return (
    <div className="container mx-auto p-4 pt-8 lg:p-0 lg:pt-8">
      <h2 className="mb-4 text-center text-4xl font-bold text-primary">
        Frequently Asked Questions
      </h2>
      <FAQ />
    </div>
  );
};

export default FAQPage;
