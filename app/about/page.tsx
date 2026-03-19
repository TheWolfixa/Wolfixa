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
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">About Wolfixa</h1>
          <p className="text-xl text-background/80 leading-relaxed font-medium">
            Born from a passion for quality and style
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl space-y-24">
          
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2 className="font-display text-4xl font-bold mb-6 text-foreground">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wolfixa was founded with one simple mission — to make premium Electronics and Clothing accessible to everyone. We believe that great design and durability should not come at a luxury price.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              From cutting-edge gadgets to timeless wardrobe essentials, every product at Wolfixa is carefully selected to meet our high standards of quality, functionality, and style.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4 font-medium text-foreground">
              We are not just a store — we are a lifestyle brand built for the modern generation.
            </p>
          </div>

          <div className="bg-secondary/30 p-12 rounded-3xl border border-border/50 text-center">
            <h2 className="font-display text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              "To deliver premium products with honest pricing, exceptional service, and a seamless shopping experience that keeps our customers coming back."
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center">
                <h3 className="text-xl font-bold mb-4">Quality First</h3>
                <p className="text-muted-foreground">We never compromise on the quality of our products.</p>
              </div>
              <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center">
                <h3 className="text-xl font-bold mb-4">Customer Trust</h3>
                <p className="text-muted-foreground">Your satisfaction is our biggest achievement.</p>
              </div>
              <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center">
                <h3 className="text-xl font-bold mb-4">Modern Design</h3>
                <p className="text-muted-foreground">Products that look good, feel good, and perform great.</p>
              </div>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto border-t border-border pt-16">
            <h2 className="font-display text-3xl font-bold mb-6">Built with Passion</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wolfixa is a team of young, passionate individuals who love technology and fashion. We work every day to bring you the best products and the best experience.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
