import { db } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export default async function InventoryAdmin() {
  try {
    const snap = await db.collection("inventory").orderBy("sku").get();
    const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, unknown>) }));

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Inventory Management</h2>
        
        {items.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No inventory items found. Add some products to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">SKU</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Stock</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-mono">{item.sku}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${(item.price/100).toFixed(2)} {item.unit && `per ${item.unit}`}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.stock > 10 ? 'bg-green-100 text-green-800' :
                        item.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Quick Setup</h3>
          <p className="text-sm text-blue-700">
                         To add inventory items, you can use the Firebase Console or create a simple form here later. 
             For now, you can manually add items to the &quot;inventory&quot; collection in Firestore.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return (
      <div className="text-red-600">
        Error loading inventory. Please check your Firebase configuration.
      </div>
    );
  }
}
