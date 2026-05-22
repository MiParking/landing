import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

type WaitlistRole = "host" | "driver" | "both";

type WaitlistConfirmationEmailProps = {
  fullName: string;
  role: WaitlistRole;
};

const ROLE_LABELS: Record<WaitlistRole, string> = {
  host: "Anfitrion",
  driver: "Conductor",
  both: "Anfitrion y Conductor",
};

export function WaitlistConfirmationEmail({ fullName, role }: WaitlistConfirmationEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Ya estas en la lista de espera de MiParking</Preview>
      <Body style={main}>
        <Container style={card}>
          <Section style={logoWrap}>
            <Img
              src="https://assets.miparking.cl/landing/Logo-texto-dark.png"
              alt="MiParking"
              width={188}
              style={logo}
            />
            <Text style={logoFallback}>MiParking</Text>
          </Section>

          <Heading style={title}>Tu registro en la lista de espera esta confirmado</Heading>

          <Text style={paragraph}>Hola {fullName},</Text>
          <Text style={paragraph}>
            Gracias por unirte a la lista de espera de MiParking. Tu rol seleccionado es: <strong>{ROLE_LABELS[role]}</strong>.
          </Text>
          <Text style={paragraph}>
            Te enviaremos noticias por correo cuando tengamos novedades sobre el lanzamiento y beneficios para
            primeros usuarios.
          </Text>

          <Section style={footerWrap}>
            <Text style={footer}>Este correo fue enviado desde noreply@miparking.cl.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#0c1321",
  backgroundImage:
    "radial-gradient(circle at 18% 10%, rgba(180, 197, 255, 0.18) 0%, rgba(180, 197, 255, 0.02) 36%, transparent 72%), radial-gradient(circle at 84% 16%, rgba(74, 225, 118, 0.14) 0%, rgba(74, 225, 118, 0.02) 34%, transparent 70%)",
  margin: "0",
  padding: "24px 12px",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const card = {
  maxWidth: "560px",
  width: "100%",
  margin: "0 auto",
  backgroundColor: "#19202e",
  borderRadius: "16px",
  padding: "28px 20px",
  border: "1px solid #434655",
};

const logoWrap = {
  marginBottom: "16px",
};

const logo = {
  display: "block",
  height: "auto",
  margin: "0",
};

const logoFallback = {
  display: "none",
  margin: "0",
  color: "#dce2f6",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const title = {
  margin: "0 0 16px",
  color: "#dce2f6",
  fontSize: "24px",
  lineHeight: "1.3",
};

const paragraph = {
  margin: "0 0 14px",
  color: "#c3c6d7",
  fontSize: "16px",
  lineHeight: "1.6",
};

const footerWrap = {
  marginTop: "20px",
  paddingTop: "14px",
  borderTop: "1px solid #434655",
};

const footer = {
  margin: "0",
  color: "#a5aabd",
  fontSize: "12px",
  lineHeight: "1.5",
};

export default WaitlistConfirmationEmail;
