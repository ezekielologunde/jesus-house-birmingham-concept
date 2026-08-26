import "./globals.css";

export const metadata = {
  title: "Jesus House Birmingham",
  description: "Unofficial redesign concept",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
