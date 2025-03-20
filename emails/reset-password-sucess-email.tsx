import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordEmailProps {
  first_name: string;
  last_name: string;
}

export const ResetPasswordSuccessEmail = ({
  first_name,
  last_name,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Password successfully changed for Anilao Scuba Dive Center
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
        <Text style={text}>
          Hello {first_name} {last_name},
        </Text>
        <Text style={text}>
          We wanted to confirm that your password has been successfully changed
          to a new one for your Anilao Scuba Dive Center account.
        </Text>
        <Text style={text}>
          If you did not make this change or if you have any concerns, please
          contact our support team immediately.
        </Text>
        <Text style={text}>
          Thank you for choosing Anilao Scuba Dive Center!
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

export default ResetPasswordSuccessEmail;

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

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
