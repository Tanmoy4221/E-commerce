
import ProfileLayout from '../../layout'; // Import the parent layout

export default function OrderDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the existing ProfileLayout to wrap the order detail page
  return <ProfileLayout>{children}</ProfileLayout>;
}
