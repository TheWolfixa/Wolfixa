'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/products?' + createQueryString('q', searchTerm));
  };

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'newest';

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl shadow-sm border border-border">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search essentials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-10 rounded-xl bg-background border-border/50"
        />
      </form>

      <div className="flex flex-1 md:flex-none items-center gap-4 w-full md:w-auto">
        {/* Category Filter */}
        <Select
          value={currentCategory}
          onValueChange={(value) => {
            router.push('/products?' + createQueryString('category', value === 'all' ? '' : value));
          }}
        >
          <SelectTrigger className="h-10 rounded-xl bg-background border-border/50 min-w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="home">Home & Living</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={currentSort}
          onValueChange={(value) => {
            router.push('/products?' + createQueryString('sort', value));
          }}
        >
          <SelectTrigger className="h-10 rounded-xl bg-background border-border/50 min-w-[140px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
