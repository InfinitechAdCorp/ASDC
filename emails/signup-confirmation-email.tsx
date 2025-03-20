import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface SignupConfirmationEmailProps {
  first_name: string;
  last_name: string;
  email: string;
}

export const SignupConfirmationEmail = ({
  first_name,
  last_name,
  email,
}: SignupConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to Anilao Scuba Dive Center! Please verify your account before
      logging in.
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
        <Heading style={h1}>Welcome to Anilao Scuba Dive Center!</Heading>
        <Text style={text}>
          Hello {first_name} {last_name},
        </Text>
        <Text style={text}>
          Thank you for signing up for Anilao Scuba Dive Center! Before you can
          log in and start your underwater adventure, we need to verify your
          email address.
        </Text>
        <Section style={buttonContainer}>
          <Link style={button} href={`asdc-coral.vercel.app/verify/${email}`}>
            Verify your email address
          </Link>
        </Section>
        <Text style={text}>
          Please click the button above to verify your account. Once verified,
          you'll be able to log in and begin your journey with us.
        </Text>
        <Text style={text}>
          If you have any questions or need assistance, feel free to reach out
          to our team.
        </Text>
        <Text style={text}>We look forward to diving with you soon!</Text>
        <Hr style={hr} />
        <Text style={footer}>
          © 2024 Anilao Scuba Dive Center. All rights reserved.
          <br />
          Batangas, Anilao, Mabini 4202 Philippines
        </Text>
      </Container>
    </Body>
  </Html>
);

export default SignupConfirmationEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '560px',
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

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#047c9e',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
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
