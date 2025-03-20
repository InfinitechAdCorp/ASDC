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

interface ResetPasswordEmailProps {
  first_name: string;
  last_name: string;
  reset_pin: number;
}

export const ResetPasswordEmail = ({
  first_name,
  last_name,
  reset_pin,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your Anilao Scuba Dive Center password</Preview>
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
          We received a request to reset your password for your Anilao Scuba
          Dive Center account. To proceed with the password reset, please use
          the following 6-digit PIN:
        </Text>
        <Section style={pinContainer}>
          <Text style={pin}>{reset_pin}</Text>
        </Section>
        <Text style={text}>
          Enter this PIN on the password reset page to create a new password.
          This PIN will expire in 10 minutes for security reasons.
        </Text>
        <Text style={text}>
          If you didn't request a password reset, please ignore this email or
          contact our support team if you have any concerns.
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

export default ResetPasswordEmail;

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

const pinContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0 10px',
};

const pin = {
  backgroundColor: '#f3f4f6',
  borderRadius: '5px',
  color: '#333',
  fontSize: '32px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  padding: '16px 24px',
  display: 'inline-block',
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
