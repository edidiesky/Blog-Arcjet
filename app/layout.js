import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import "react-loading-skeleton/dist/skeleton.css";
export const metadata = {
  title: "Envitab Blog",
  description:
    "Building a Secure Next.js Blog with Fly.io and Arcjet - HackMD hackmd.io",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
