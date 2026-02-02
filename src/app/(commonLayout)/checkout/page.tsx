"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Phone, User, CreditCard, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // যদি কার্ট খালি থাকে তবে হোম পেজে পাঠিয়ে দাও
    if (mounted && items.length === 0) {
      router.push("/");
    }
  }, [items, mounted, router]);

  if (!mounted || !session) return null;

  const handlePlaceOrder = async () => {
    console.log("Order Placed for:", items);
    alert("Order Placed Successfully! 🍕");
    clearCart();
    router.push("/order-success"); // বা অর্ডার সাকসেস পেজ
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-black mb-10 uppercase tracking-tighter">
        Confirm Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* বাম পাশ: ডেলিভারি ফরম */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MapPin className="text-orange-600" /> Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-400 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-4 size-4 text-zinc-400" />
                  <Input
                    defaultValue={session.user.name}
                    className="pl-11 h-12 rounded-xl border-zinc-100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-400 ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 size-4 text-zinc-400" />
                  <Input
                    placeholder="+880 1XXX XXXXXX"
                    className="pl-11 h-12 rounded-xl border-zinc-100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-zinc-400 ml-1">
                Detailed Address
              </label>
              <Input
                defaultValue={session.user.email}
                placeholder="House, Road, Area..."
                className="h-12 rounded-xl border-zinc-100"
              />
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="text-orange-600" /> Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-orange-600 bg-orange-50 rounded-2xl cursor-pointer">
                <p className="font-bold">Cash on Delivery</p>
                <p className="text-xs text-orange-700">
                  Pay when you receive the food
                </p>
              </div>
              <div className="p-4 border border-zinc-100 rounded-2xl opacity-50 cursor-not-allowed">
                <p className="font-bold">Online Payment</p>
                <p className="text-xs text-zinc-500">
                  Bkash/Nagad (Coming Soon)
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ডান পাশ: অর্ডার সামারি */}
        <div className="space-y-6">
          <div className="bg-zinc-900 text-white p-8 rounded-[3rem] sticky top-28">
            <h2 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-2">
              <Truck size={20} className="text-orange-500" /> Your Order
            </h2>

            <div className="max-h-[300px] overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3"
                >
                  <div className="flex flex-col">
                    <span className="font-bold">{item.name}</span>
                    <span className="text-zinc-500 text-xs">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-black">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Subtotal</span>
                <span>৳{totalPrice()}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Delivery Fee</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="border-t border-zinc-800 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-orange-500">
                  ৳{totalPrice()}
                </span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              className="w-full h-16 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-lg uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-orange-900/20"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
