
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you will receive an email with tracking information. You can also track your order status in the 'My Orders' section of your profile page.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on most items. Products must be returned in their original condition with tags attached. Some items, like final sale products, may be excluded. Please visit our Returns Center or contact support to initiate a return.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within the country. Expedited shipping options (1-2 business days) are available at checkout for an additional fee. Shipping times may vary based on location and carrier delays.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, ShopWave only ships within the United States. We are working on expanding our shipping destinations in the future.",
  },
  {
    question: "How can I change or cancel my order?",
    answer: "If you need to change or cancel your order, please contact our customer support team as soon as possible. We process orders quickly, but we'll do our best to accommodate your request if the order hasn't already been shipped.",
  },
   {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and ShopWave gift cards.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, absolutely. We use industry-standard SSL encryption to protect your personal and payment information during checkout. We do not store your full credit card details on our servers.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex-grow">
         <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
               <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
               <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
               <p className="text-lg text-muted-foreground">
                   Find answers to common questions about ShopWave.
               </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
               {faqs.map((faq, index) => (
                 <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg shadow-sm bg-card px-4">
                   <AccordionTrigger className="text-left font-medium text-base hover:no-underline">
                     {faq.question}
                   </AccordionTrigger>
                   <AccordionContent className="text-muted-foreground prose prose-sm max-w-none dark:prose-invert">
                     {faq.answer}
                   </AccordionContent>
                 </AccordionItem>
               ))}
            </Accordion>

             <div className="mt-12 text-center">
                 <p className="text-muted-foreground mb-4">Can't find the answer you're looking for?</p>
                 <Button asChild>
                    <a href="/contact">Contact Support</a>
                 </Button>
             </div>
         </div>
      </main>
      <Footer />
    </>
  );
}
