import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart | Wolfixa',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
