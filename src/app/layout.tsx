import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React-Journey',
  description: 'My App is a studying project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
