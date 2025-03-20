import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BookingReminderEmailProps {
  fullname: string;
  start_date: string;
  class_name: string;
  category: string;
}

export const ClassReminderEmail = ({
  fullname,
  start_date,
  class_name,
  category,
}: BookingReminderEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Reminder: Your upcoming dive with Anilao Scuba Dive Center
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg"
          width="170"
          height="170"
          alt="Anilao Scuba Dive Center Logo"
          style={logo}
        />
        <Heading style={h1}>Anilao Scuba Dive Center</Heading>
        <Text style={text}>Hello {fullname},</Text>
        <Text style={text}>
          This is a friendly reminder about your upcoming dive with Anilao
          Scuba Dive Center. We're excited to see you soon!
        </Text>
        <Section style={detailsSection}>
          <div style={detailsRow}>
            <Text style={detailsColumn}>
              <strong>Date:</strong><br />
              {new Date(start_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text style={detailsColumn}>
              <strong>Class:</strong><br />
              {class_name}
            </Text>
            <Text style={detailsColumn}>
              <strong>Category:</strong><br />
              {category}
            </Text>
          </div>
        </Section>
        <Text style={text}>
          Please remember to bring all necessary equipment and documentation. If
          you have any questions or need to make changes to your booking, please
          contact us as soon as possible.
        </Text>
        <Text style={text}>
          We look forward to providing you with an unforgettable diving
          experience!
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          © {new Date().getFullYear()} Anilao Scuba Dive Center. All rights
          reserved.
          <br />
          Batangas, Anilao, Mabini 4202 Philippines
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ClassReminderEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '100%',
  maxWidth: '560px',
};

const logo = {
  margin: '0 auto',
  marginBottom: '24px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
};

const detailsSection = {
  backgroundColor: '#f0f0f0',
  borderRadius: '4px',
  padding: '24px',
  marginBottom: '24px',
};

const detailsRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const detailsColumn = {
  flex: '1',
  margin: '0 12px',
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
