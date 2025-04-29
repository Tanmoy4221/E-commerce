
"use client";

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending the message
    console.log("Sending message:", { name, email, subject, message });
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    // Clear form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex-grow">
         <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Get In Touch</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you!
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Form - Left/Main Column */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll respond as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="e.g., Question about an order" value={subject} onChange={(e) => setSubject(e.target.value)} required disabled={isLoading} />
                     </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        disabled={isLoading}
                      />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                      {isLoading ? (
                         <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                         </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

             {/* Contact Info - Right Column */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="bg-secondary/50 border-secondary shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                         <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Email</h4>
                                <a href="mailto:support@shopwave.example.com" className="text-muted-foreground hover:text-primary transition-colors">support@shopwave.example.com</a>
                                <p className="text-xs text-muted-foreground/80">For support and inquiries</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Phone</h4>
                                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
                                <p className="text-xs text-muted-foreground/80">Mon-Fri, 9am - 5pm PST</p>
                            </div>
                         </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Address</h4>
                                <p className="text-muted-foreground">123 ShopWave Ave,<br />Commerce City, CA 90210<br />United States</p>
                                <p className="text-xs text-muted-foreground/80">(Not a real address)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card border shadow-sm">
                     <CardHeader>
                        <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <p className="text-sm text-muted-foreground mb-4">Find answers to common questions about orders, shipping, returns, and more.</p>
                         <Button variant="outline" asChild>
                             <Link href="/faq">Visit FAQ Page</Link>
                         </Button>
                     </CardContent>
                </Card>
            </div>
         </div>
      </main>
      <Footer />
    </>
  );
}
