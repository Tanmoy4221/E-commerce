

// Header and Footer are now handled by RootLayout
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, MapPin, Globe, Package } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <>
      {/* <Header /> */}
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex-grow">
        <div className="max-w-3xl mx-auto prose dark:prose-invert lg:prose-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 flex items-center gap-3"><Truck className="w-10 h-10" /> Shipping Policy</h1>

          <Card className="mb-8 bg-secondary/30 border-secondary">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><Clock className="w-5 h-5" /> Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Orders are typically processed and shipped within <strong>1-2 business days</strong> (Monday - Friday, excluding holidays) after payment confirmation.</p>
              <p>You will receive a shipment confirmation email with tracking information once your order has shipped.</p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold flex items-center gap-2"><MapPin className="w-6 h-6 text-primary" /> Domestic Shipping (United States)</h2>
          <p>We offer the following shipping options within the US:</p>
          <ul>
            <li><strong>Standard Shipping:</strong> Estimated delivery within <strong>3-5 business days</strong> after shipment.</li>
            <li><strong>Expedited Shipping:</strong> Estimated delivery within <strong>1-2 business days</strong> after shipment (available at checkout for an additional cost).</li>
          </ul>
          <p>Shipping costs are calculated at checkout based on the weight and destination of your order. Free standard shipping may be offered on orders exceeding a certain value (details available on the cart/checkout page).</p>

           <h2 className="text-2xl font-semibold flex items-center gap-2 mt-8"><Globe className="w-6 h-6 text-primary" /> International Shipping</h2>
           <p>Currently, <strong>ShopWave only ships to addresses within the United States</strong>. We do not offer international shipping at this time.</p>
           <p>We hope to expand our shipping capabilities in the future and appreciate your understanding.</p>

           <h2 className="text-2xl font-semibold flex items-center gap-2 mt-8"><Package className="w-6 h-6 text-primary" /> Order Tracking</h2>
           <p>Once your order is shipped, you will receive an email containing your tracking number(s). The tracking number will be active within 24 hours.</p>
           <p>You can also track your order status by logging into your account and visiting the <a href="/profile/orders" className="text-primary hover:underline">My Orders</a> section.</p>

           <h2 className="text-2xl font-semibold mt-8">Important Notes</h2>
           <ul>
             <li>Shipping times are estimates and cannot be guaranteed, as they may be affected by factors beyond our control (e.g., weather, carrier delays, holidays).</li>
             <li>Please ensure your shipping address is complete and accurate to avoid delays or misdeliveries. We are not responsible for orders shipped to incorrectly provided addresses.</li>
             <li>Business days do not include weekends or public holidays.</li>
           </ul>

           <p className="mt-8 text-sm text-muted-foreground">If you have any further questions about our shipping policy, please don't hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
