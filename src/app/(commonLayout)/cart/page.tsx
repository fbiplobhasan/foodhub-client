"use client";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, totalPrice, removeFromCart } = useCartStore();

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-black mb-10">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-4">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>Qty: {item.quantity} x ৳{item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <div className="text-2xl font-bold pt-4">Total: ৳{totalPrice()}</div>
        </div>
      )}
    </div>
  );
}