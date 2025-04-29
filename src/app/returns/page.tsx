
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, CalendarDays, PackageCheck, AlertTriangle, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex-grow">
        <div className="max-w-3xl mx-auto prose dark:prose-invert lg:prose-lg">
           <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 flex items-center gap-3"><RotateCw className="w-10 h-10" /> Return & Refund Policy</h1>

           <p className="lead">We want you to be completely satisfied with your purchase from ShopWave. If you're not happy with your order, we're here to help.</p>

           <Card className="mb-8 bg-secondary/30 border-secondary">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><CalendarDays className="w-5 h-5" /> 30-Day Return Window</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You can return most new, unopened items within <strong>30 days</strong> of delivery for a full refund or exchange.</p>
              <p>The return window begins on the date the item is delivered according to the carrier's tracking information.</p>
            </CardContent>
          </Card>

           <h2 className="text-2xl font-semibold flex items-center gap-2"><PackageCheck className="w-6 h-6 text-primary" /> Conditions for Return</h2>
           <p>To be eligible for a return, items must be:</p>
           <ul>
             <li>In their original, unused, and unopened condition.</li>
             <li>With all original tags, labels, and packaging intact.</li>
             <li>Accompanied by the original proof of purchase (order confirmation email or packing slip).</li>
           </ul>

           <h2 className="text-2xl font-semibold flex items-center gap-2 mt-8"><AlertTriangle className="w-6 h-6 text-destructive" /> Non-Returnable Items</h2>
           <p>Certain items cannot be returned, including:</p>
           <ul>
             <li>Gift cards</li>
             <li>Downloadable software products</li>
             <li>Some health and personal care items</li>
             <li>Items marked as "Final Sale" or "Non-Returnable" on the product page.</li>
           </ul>

           <h2 className="text-2xl font-semibold mt-8">How to Initiate a Return</h2>
           <ol className="list-decimal pl-5 space-y-2">
              <li>
                 <strong>Contact Us (Recommended):</strong> Please <Link href="/contact" className="text-primary hover:underline">contact our customer support team</Link> or visit our (future) online Returns Center to initiate the return process. Provide your order number and the reason for the return.
              </li>
              <li>
                 <strong>Receive Instructions:</strong> Our team will provide you with return instructions and, if applicable, a return shipping label.
              </li>
               <li>
                 <strong>Package Your Return:</strong> Securely package the item(s) in the original packaging if possible. Include the proof of purchase.
              </li>
               <li>
                 <strong>Ship Your Return:</strong> Send the package back to the address provided in the return instructions. We recommend using a trackable shipping service. Customers are typically responsible for return shipping costs unless the return is due to our error (e.g., wrong item sent, damaged item).
               </li>
           </ol>

           <h2 className="text-2xl font-semibold mt-8">Refunds</h2>
           <ul>
             <li>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item.</li>
             <li>If your return is approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.</li>
             <li>Shipping costs are non-refundable unless the return is due to our error.</li>
           </ul>

            <h2 className="text-2xl font-semibold mt-8">Exchanges</h2>
            <p>If you need to exchange an item for a different size or color (if applicable), please initiate a return for the original item and place a new order for the desired item. This ensures the fastest processing time.</p>

            <Card className="mt-10 border-primary/50">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><Mail className="w-5 h-5" /> Questions?</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">If you have any questions about our return policy, please don't hesitate to reach out.</p>
                    <Button variant="default" className="mt-4" asChild>
                        <Link href="/contact">Contact Customer Support</Link>
                    </Button>
                </CardContent>
            </Card>

        </div>
      </main>
      <Footer />
    </>
  );
}
