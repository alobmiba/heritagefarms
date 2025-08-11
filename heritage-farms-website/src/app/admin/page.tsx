import { db } from "@/lib/firebase-admin";
import { Order } from "@/types/commerce";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  ShoppingCartIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  CurrencyDollarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ChartBarIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  try {
    const snap = await db.collection("orders").orderBy("createdAt", "desc").limit(50).get();
    const orders = snap.docs.map(d => ({ ...(d.data() as Order), id: d.id }));

    // Calculate summary stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending_payment').length;
    const paidOrders = orders.filter(o => o.status === 'paid').length;
    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
    const totalRevenue = orders
      .filter(o => o.status === 'paid')
      .reduce((sum, o) => sum + o.total, 0);
    
    const averageOrderValue = paidOrders > 0 ? totalRevenue / paidOrders : 0;

    // Calculate recent activity (last 7 days)
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentOrders = orders.filter(o => o.createdAt > sevenDaysAgo).length;
    const recentRevenue = orders
      .filter(o => o.status === 'paid' && o.createdAt > sevenDaysAgo)
      .reduce((sum, o) => sum + o.total, 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  Heritage Farms Admin
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Manage orders, inventory, and business operations
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-500">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date().toLocaleDateString('en-CA', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New Order
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-xl text-slate-700 bg-white/80 backdrop-blur-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                  <ChartBarIcon className="w-4 h-4 mr-2" />
                  Reports
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Total Orders */}
            <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <ShoppingCartIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">Total Orders</dt>
                      <dd className="text-2xl font-bold text-slate-900">{totalOrders}</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+{recentOrders}</span>
                    <span className="text-slate-500 ml-1">this week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <ClockIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">Pending Payment</dt>
                      <dd className="text-2xl font-bold text-slate-900">{pendingOrders}</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-yellow-600 font-medium">Requires attention</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Paid Orders */}
            <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircleIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">Paid Orders</dt>
                      <dd className="text-2xl font-bold text-slate-900">{paidOrders}</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+8%</span>
                    <span className="text-slate-500 ml-1">from last month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <CurrencyDollarIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">Total Revenue</dt>
                      <dd className="text-2xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">{formatCurrency(recentRevenue)}</span>
                    <span className="text-slate-500 ml-1">this week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 mb-8">
            <div className="px-6 py-4 border-b border-slate-200/50">
              <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <button className="group flex items-center p-4 border border-slate-200/50 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 hover:shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <PlusIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-900">Add Product</div>
                    <div className="text-xs text-slate-500">Create new inventory item</div>
                  </div>
                </button>
                
                <button className="group flex items-center p-4 border border-slate-200/50 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 hover:shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <UsersIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-900">View Customers</div>
                    <div className="text-xs text-slate-500">Manage customer data</div>
                  </div>
                </button>
                
                <button className="group flex items-center p-4 border border-slate-200/50 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 transition-all duration-200 hover:shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <ChartBarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-900">Analytics</div>
                    <div className="text-xs text-slate-500">View business insights</div>
                  </div>
                </button>
                
                <button className="group flex items-center p-4 border border-slate-200/50 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200 hover:shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <PencilIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-900">Settings</div>
                    <div className="text-xs text-slate-500">Configure system</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20">
            <div className="px-6 py-4 border-b border-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>
                  <p className="text-sm text-slate-500">Latest customer orders and their status</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                    {paidOrders} Paid
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {pendingOrders} Pending
                  </span>
                  {cancelledOrders > 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                      <TrashIcon className="w-3 h-3 mr-1" />
                      {cancelledOrders} Cancelled
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCartIcon className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No orders yet</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  Get started by creating your first order. Orders will appear here once customers start placing them.
                </p>
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create Order
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200/50">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-slate-200/50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-all duration-200">
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <span className="text-sm font-bold text-white">
                                  {order.code.slice(-2)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-slate-900 font-mono">
                                {order.code}
                              </div>
                              <div className="flex items-center text-sm text-slate-500">
                                <TagIcon className="w-3 h-3 mr-1" />
                                {order.items.length} items
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{order.name}</div>
                            <div className="text-sm text-slate-500">{order.email}</div>
                            {order.phone && (
                              <div className="text-sm text-slate-500">{order.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="text-lg font-bold text-slate-900">
                            {formatCurrency(order.total)}
                          </div>
                          <div className="text-sm text-slate-500">
                            {order.items.length} items
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${
                            order.status === 'paid' 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : order.status === 'cancelled' 
                              ? 'bg-red-100 text-red-800 border-red-200' 
                              : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          }`}>
                            {order.status === 'pending_payment' ? (
                              <>
                                <ClockIcon className="w-3 h-3 mr-1" />
                                Pending Payment
                              </>
                            ) : order.status === 'paid' ? (
                              <>
                                <CheckCircleIcon className="w-3 h-3 mr-1" />
                                Paid
                              </>
                            ) : order.status === 'cancelled' ? (
                              <>
                                <TrashIcon className="w-3 h-3 mr-1" />
                                Cancelled
                              </>
                            ) : (
                              order.status
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-sm text-slate-500">
                          <div className="font-medium">{formatDate(order.createdAt)}</div>
                          <div className="text-xs text-slate-400">
                            {new Date(order.createdAt).toLocaleTimeString('en-CA', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-all duration-200">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            {order.status !== "paid" && order.status !== "cancelled" && (
                              <button 
                                className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                                onClick={async () => {
                                  try {
                                    const response = await fetch(`/api/admin/orders/${order.id}/status`, {
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
                                <CheckCircleIcon className="w-4 h-4" />
                              </button>
                            )}
                            <button className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-8 max-w-md w-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Error loading dashboard
              </h3>
              <div className="mt-2 text-sm text-slate-500">
                Please check your Firebase configuration and try again.
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
