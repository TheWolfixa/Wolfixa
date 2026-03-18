-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  address JSONB NOT NULL,
  payment_method TEXT DEFAULT 'cod',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter table
CREATE TABLE newsletter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies:
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone." ON products FOR SELECT USING (true);
CREATE POLICY "Only admins can modify products" ON products FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
);
CREATE POLICY "Users can insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can modify orders" ON orders FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
);

ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert newsletter" ON newsletter FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view newsletter" ON newsletter FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Trigger for auto-creating profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
