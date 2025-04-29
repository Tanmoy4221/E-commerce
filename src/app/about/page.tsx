

// Header and Footer are now handled by RootLayout
import Image from 'next/image';
import { Building, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* <Header /> */}
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About ShopWave</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your premier destination for discovering the latest trends and quality products, all in one place.
            </p>
          </section>

          {/* Mission/Vision Section */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
              <div className="space-y-4">
                 <h2 className="text-3xl font-semibold flex items-center gap-2">
                   <Target className="w-7 h-7 text-primary" /> Our Mission
                 </h2>
                 <p className="text-muted-foreground leading-relaxed">
                   To provide an unparalleled online shopping experience by offering a curated selection of high-quality products, exceptional customer service, and a seamless, secure platform. We aim to connect customers with products they love, effortlessly.
                 </p>
                 <h2 className="text-3xl font-semibold flex items-center gap-2 mt-6">
                    <Building className="w-7 h-7 text-primary" /> Our Vision
                 </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the most trusted and customer-centric e-commerce platform, constantly innovating to exceed expectations and build lasting relationships with our shoppers and partners.
                  </p>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                 <Image
                   src="https://picsum.photos/seed/aboutus-vision/800/600"
                   alt="Team collaboration or modern office"
                   fill
                   sizes="(max-width: 768px) 100vw, 50vw"
                   className="object-cover"
                 />
              </div>
           </section>

          {/* Our Values Section */}
           <section className="mb-12 md:mb-16">
              <h2 className="text-3xl font-semibold text-center mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { title: "Customer Focus", description: "Putting our customers' needs and satisfaction at the heart of everything we do." },
                   { title: "Quality Assurance", description: "Offering products that meet high standards of quality and reliability." },
                   { title: "Integrity & Trust", description: "Operating with transparency, honesty, and building trust with our community." },
                   { title: "Innovation", description: "Continuously improving our platform, services, and product offerings." },
                 ].map((value, index) => (
                   <div key={index} className="bg-card p-6 rounded-lg shadow-sm border text-center">
                     <h3 className="text-xl font-medium mb-2 text-primary">{value.title}</h3>
                     <p className="text-sm text-muted-foreground">{value.description}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* Team Section (Optional Placeholder) */}
           <section className="text-center">
               <h2 className="text-3xl font-semibold flex items-center justify-center gap-2 mb-4">
                   <Users className="w-7 h-7 text-primary" /> Meet the (Imaginary) Team
               </h2>
               <p className="text-muted-foreground mb-8">
                  We're a passionate (and currently fictional) team dedicated to making ShopWave awesome!
               </p>
                {/* Add team member cards here if desired later */}
           </section>

        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
