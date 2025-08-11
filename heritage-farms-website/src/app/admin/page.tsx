import { db } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  try {
    const snap = await db.collection("orders").orderBy("createdAt", "desc").limit(50).get();
    const orders = snap.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, unknown>) }));

    return (
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-sm border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Created</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono">{o.code}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {o.name} ({o.email})
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${(o.total/100).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    o.status === 'paid' ? 'bg-green-100 text-green-800' :
                    o.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(o.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {o.status !== "paid" && (
                    <form action={`/api/admin/orders/${o.id}/status`} method="POST" className="inline">
                      <input type="hidden" name="_method" value="PATCH" />
                      <button 
                        type="submit"
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            const response = await fetch(`/api/admin/orders/${o.id}/status`, {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ status: 'paid' })
                            });
                            if (response.ok) {
                              window.location.reload();
                            }
                          } catch (error) {
                            console.error('Error updating order:', error);
                          }
                        }}
                      >
                        Mark Paid
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return (
      <div className="text-red-600">
        Error loading orders. Please check your Firebase configuration.
      </div>
    );
  }
}
