import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Wolfixa',
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-foreground text-background text-center">
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Our Story</h1>
          <p className="text-xl text-background/80 leading-relaxed">
            Redefining essentials for the modern minimalist.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2 className="font-display">The Wolfixa Philosophy</h2>
            <p className="text-muted-foreground">
              Founded in 2024, Wolfixa was born out of a desire for simplicity and quality in an increasingly cluttered world. We believe that true luxury lies in the perfection of everyday items—the essentials that you reach for time and time again.
            </p>
            
            <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
              <div className="bg-secondary p-8 rounded-3xl">
                <h3 className="text-2xl font-display font-bold mb-4">Quality First</h3>
                <p className="text-muted-foreground">We source only the finest materials, ensuring every product is built to last a lifetime.</p>
              </div>
              <div className="bg-secondary p-8 rounded-3xl">
                <h3 className="text-2xl font-display font-bold mb-4">Minimal Impact</h3>
                <p className="text-muted-foreground">Sustainability isn't a buzzword for us; it's a core design principle embedded in our process.</p>
              </div>
            </div>

            <h2 className="font-display">Our Design Approach</h2>
            <p className="text-muted-foreground">
              We painstakingly strip away the unnecessary, leaving only what is truly functional and beautiful. Every curve, every stitch, and every material choice is deliberate. Our products are designed not just to be used, but to be cherished.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
