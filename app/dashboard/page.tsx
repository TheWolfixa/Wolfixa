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

function getStatusClasses(status: string) {
  switch (status.toLowerCase()) {
    case 'pending': return 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20';
    case 'confirmed': return 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20';
    case 'shipped': return 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-purple-500/20';
    case 'delivered': return 'bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20';
    case 'cancelled': return 'bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20';
    default: return 'bg-secondary text-secondary-foreground';
  }
}

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
                          variant="outline"
                          className={`capitalize border ${getStatusClasses(order.status)}`}
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
