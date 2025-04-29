
"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/seed/hero1/1600/600",
    alt: "Hero Banner 1",
    title: "Summer Collection Arrived",
    subtitle: "Discover the latest trends for the season.",
    buttonText: "Shop Now",
    buttonLink: "/shop?category=fashion",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/seed/hero2/1600/600",
    alt: "Hero Banner 2",
    title: "Electronics Super Sale",
    subtitle: "Up to 40% off on selected gadgets.",
    buttonText: "View Deals",
    buttonLink: "/deals",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/seed/hero3/1600/600",
    alt: "Hero Banner 3",
    title: "Upgrade Your Home",
    subtitle: "Find stylish and functional home essentials.",
    buttonText: "Explore Home Goods",
    buttonLink: "/shop?category=home-goods",
  },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

   const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }) // Autoplay every 5 seconds
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full mb-8 md:mb-12">
      <Carousel
        setApi={setApi}
        className="w-full"
         plugins={[plugin.current]}
         onMouseEnter={plugin.current.stop}
         onMouseLeave={plugin.current.reset}
         opts={{
            loop: true, // Enable looping
         }}
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <Card className="border-none rounded-none shadow-none bg-transparent">
                <CardContent className="flex aspect-[8/3] items-center justify-center p-0 relative overflow-hidden">
                   <Image
                    src={slide.imageUrl}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={slide.id === 1} // Prioritize loading the first image
                  />
                   <div className="absolute inset-0 bg-black/40 z-10"></div> {/* Overlay */}
                   <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                     <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 drop-shadow-md">
                       {slide.title}
                     </h2>
                     <p className="text-lg md:text-xl mb-4 md:mb-6 max-w-xl drop-shadow-sm">
                       {slide.subtitle}
                     </p>
                     <Link href={slide.buttonLink}>
                        <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                         {slide.buttonText}
                       </Button>
                     </Link>
                   </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
         {/* Custom Navigation Buttons */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 bg-background/50 hover:bg-background/80 text-foreground border-none" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 bg-background/50 hover:bg-background/80 text-foreground border-none" />

         {/* Dots Indicator */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full ${
                index === current ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
              } transition-all`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
