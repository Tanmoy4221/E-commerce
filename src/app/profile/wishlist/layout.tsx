
import ProfileLayout from '../layout'; // Import the parent layout

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the existing ProfileLayout to wrap the wishlist page
  return <ProfileLayout>{children}</ProfileLayout>;
}
