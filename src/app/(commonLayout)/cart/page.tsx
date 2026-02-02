"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBasket } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleCheckout = () => {
    if (!session) {
      // লগইন না থাকলে লগইন পেজে পাঠাবে এবং লগইনের পর আবার এখানে ফিরিয়ে আনবে
      router.push("/login?callbackUrl=/cart");
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <ShoppingBasket size={64} className="text-zinc-200" />
        <h2 className="text-2xl font-black uppercase tracking-tighter">Your cart is empty</h2>
        <Button asChild className="bg-orange-600 rounded-xl"><Link href="/">Order Food Now</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-black mb-10 uppercase tracking-tighter">Your Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-6 bg-white rounded-3xl border shadow-sm transition-hover hover:shadow-md">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 bg-zinc-100 rounded-2xl overflow-hidden">
                  <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} className="object-cover h-full w-full" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-zinc-500 font-medium">৳{item.price} x {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-black text-lg">৳{item.price * item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-50 p-8 rounded-[2.5rem] h-fit sticky top-28">
          <h2 className="text-xl font-black mb-6 uppercase">Summary</h2>
          <div className="space-y-4 border-b pb-6 text-zinc-600">
            <div className="flex justify-between font-medium"><span>Subtotal</span><span>৳{totalPrice()}</span></div>
            <div className="flex justify-between font-medium"><span>Delivery</span><span className="text-green-600 uppercase text-xs font-black">Free</span></div>
          </div>
          <div className="flex justify-between py-6">
            <span className="font-bold">Total Amount</span>
            <span className="text-2xl font-black text-orange-600">৳{totalPrice()}</span>
          </div>
          <Button onClick={handleCheckout} className="w-full h-14 rounded-2xl bg-zinc-900 hover:bg-orange-600 text-white font-bold text-lg uppercase tracking-widest transition-all">
            Checkout <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}