
import ProfileLayout from '../layout'; // Import the parent layout

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the existing ProfileLayout to wrap the settings page
  return <ProfileLayout>{children}</ProfileLayout>;
}
