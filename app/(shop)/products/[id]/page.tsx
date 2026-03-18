import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductGrid } from '@/components/products/ProductGrid';
import { AddToCartButton } from './AddToCartButton'; // Using a client component for button interaction
import { Metadata } from 'next';

export const revalidate = 60; // optionally cache for 60 seconds

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: product } = await supabase.from('products').select('name').eq('id', params.id).single();
  return {
    title: product ? `${product.name} | Wolfixa` : 'Product Not Found | Wolfixa',
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(4);

  const images = product.images.length > 0 ? product.images : ['/placeholder.png'];

  return (
    <div className="bg-background pb-24">
      {/* Breadcrumb / Back Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4 h-fit sticky top-28">
            {/* Thumbnails (vertical on desktop, horizontal on mobile) */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible shrink-0">
              {images.map((img: string, i: number) => (
                <button 
                  key={i} 
                  className={`relative w-24 h-24 lg:w-20 lg:h-20 shrink-0 bg-secondary rounded-xl overflow-hidden border-2 ${i === 0 ? 'border-foreground' : 'border-transparent hover:border-border'} transition-colors`}
                >
                  <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:min-h-[600px] bg-secondary rounded-3xl overflow-hidden flex-1">
              <Image
                src={images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-1 border-l border-border pl-4">
                <Star className="w-5 h-5 fill-foreground text-foreground" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground underline cursor-pointer text-sm ml-1">Reviews</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.description || "A premium essential designed for everyday luxury."}
            </p>

            <div className="mb-8 p-4 bg-secondary/50 rounded-2xl border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Availability</span>
                <span className={`font-semibold ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>
              <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-orange-500' : 'bg-destructive'}`} 
                  style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                />
              </div>
            </div>

            <AddToCartButton product={product} />

            <div className="grid grid-cols-2 gap-6 mt-12 py-8 border-y border-border">
              <div className="flex flex-col gap-2">
                <Truck className="w-6 h-6 text-foreground" />
                <h4 className="font-semibold">Fast Global Shipping</h4>
                <p className="text-sm text-muted-foreground">Free shipping on orders over $150.</p>
              </div>
              <div className="flex flex-col gap-2">
                <ShieldCheck className="w-6 h-6 text-foreground" />
                <h4 className="font-semibold">Lifetime Quality Guarantee</h4>
                <p className="text-sm text-muted-foreground">Built to last a lifetime, or we replace it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="bg-secondary/30 py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-display font-bold">You Might Also Like</h2>
              <Link href={`/products?category=${product.category}`} className="font-medium hover:underline text-primary">
                View more
              </Link>
            </div>
            <ProductGrid products={relatedProducts} isLoading={false} />
          </div>
        </div>
      )}
    </div>
  );
}
