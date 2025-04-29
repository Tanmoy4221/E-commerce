
import ProfileLayout from '../layout'; // Import the parent layout

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the existing ProfileLayout to wrap the orders list page
  return <ProfileLayout>{children}</ProfileLayout>;
}
