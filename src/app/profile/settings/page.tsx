
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true); // Loading state for auth check
  const [isSaving, setIsSaving] = useState(false); // Saving state

  // Form state (initialize with user data if available)
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [currentPassword, setCurrentPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmNewPassword, setConfirmNewPassword] = useState('');


   useEffect(() => {
     if (isLoggedIn === false) {
       router.push('/login?redirect=/profile/settings');
     } else if (isLoggedIn === true) {
       if (user) {
          setName(user.name);
          setEmail(user.email);
       }
       setIsLoading(false);
     }
   }, [isLoggedIn, user, router]);

   const handleProfileUpdate = async (e: React.FormEvent) => {
       e.preventDefault();
       setIsSaving(true);
       // Simulate API call
       await new Promise(resolve => setTimeout(resolve, 1000));
       console.log("Updating profile:", { name, email });
       toast({ title: "Profile Updated (Simulated)", description: "Your profile information has been saved." });
       // In real app, update user context if necessary
       setIsSaving(false);
   };

   const handlePasswordChange = async (e: React.FormEvent) => {
      e.preventDefault();
       if (newPassword !== confirmNewPassword) {
           toast({ title: "Password Mismatch", description: "New passwords do not match.", variant: "destructive" });
           return;
       }
       if (!currentPassword || !newPassword) {
            toast({ title: "Missing Fields", description: "Please fill in current and new password fields.", variant: "destructive" });
            return;
       }
       setIsSaving(true);
       // Simulate API call
       await new Promise(resolve => setTimeout(resolve, 1000));
        // Add mock validation for current password
       if (currentPassword !== 'password') { // Using the mock login password
          toast({ title: "Password Change Failed", description: "Incorrect current password.", variant: "destructive" });
          setIsSaving(false);
          return;
       }

       console.log("Changing password...");
       toast({ title: "Password Changed (Simulated)", description: "Your password has been updated successfully." });
       setCurrentPassword('');
       setNewPassword('');
       setConfirmNewPassword('');
       setIsSaving(false);
   };

   if (isLoading) {
      return (
          <div className="flex justify-center items-center flex-grow p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      )
   }

  return (
    <div className="p-4 md:p-8 space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold">Account Settings</h1>

         {/* Profile Information Card */}
         <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your name and email address.</CardDescription>
            </CardHeader>
             <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSaving} required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSaving} required/>
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Changes
                    </Button>
                </CardFooter>
             </form>
         </Card>

          {/* Change Password Card */}
         <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password.</CardDescription>
            </CardHeader>
             <form onSubmit={handlePasswordChange}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} disabled={isSaving} required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={isSaving} required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                        <Input id="confirm-new-password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} disabled={isSaving} required/>
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Change Password
                    </Button>
                </CardFooter>
             </form>
         </Card>

          {/* Other Settings (Placeholder) */}
         {/* <Card>
             <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your communication preferences.</CardDescription>
             </CardHeader>
             <CardContent>
                 <p className="text-muted-foreground">Newsletter subscriptions, etc. (Coming Soon)</p>
             </CardContent>
         </Card> */}
    </div>
  );
}
