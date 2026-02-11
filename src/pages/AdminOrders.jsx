import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../constants";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.ORDERS);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch orders");
        }

        const nextOrders = Array.isArray(data) ? data : data?.orders;
        setOrders(Array.isArray(nextOrders) ? nextOrders : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-bold">Admin Orders</h2>
  
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg bg-white p-4 shadow"
            >
              {/* Order Header */}
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  Order ID: {order.id}
                </h3>
                <span className="text-sm text-gray-500">
                  Status: {order.status}
                </span>
              </div>
  
              {/* Customer Info */}
              <div className="mt-2 text-sm text-gray-600">
                <p>Name: {order.customer?.name}</p>
                <p>Phone: {order.customer?.phone}</p>
              </div>
  
              {/* Items */}
              <div className="mt-3">
                <h4 className="font-medium">Items:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.qty}
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* Total */}
              <div className="mt-3 font-semibold text-orange-600">
                Total: ${order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}
export default AdminOrders
