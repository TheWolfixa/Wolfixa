import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="bg-background min-h-[80vh] py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-display font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground mb-12">
          Welcome back, {profile?.full_name || session.user.email}
        </p>

        <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
          <h2 className="text-2xl font-display font-bold mb-6">Order History</h2>
          
          {!orders || orders.length === 0 ? (
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-medium">
                        {order.id.split('-')[0].toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={order.status === 'delivered' ? 'default' : order.status === 'pending' ? 'secondary' : 'outline'}
                          className="capitalize"
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${order.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
