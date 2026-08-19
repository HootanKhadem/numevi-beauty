import './globals.css';

export const metadata = {
  title: 'Numevi Beauty',
  description: 'Beauty, Elevated.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
