"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Bike, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-[3rem] border shadow-2xl shadow-orange-100">
        
        {/* Success Icon & Animation Box */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-orange-100 rounded-full scale-150 blur-3xl opacity-50 animate-pulse"></div>
          <div className="relative bg-orange-600 p-6 rounded-full text-white shadow-xl shadow-orange-200 animate-bounce">
            <CheckCircle2 size={48} strokeWidth={3} />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
            Order Received!
          </h1>
          <p className="text-zinc-500 font-medium">
            Your delicious meal is being prepared and will be at your doorstep soon.
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-zinc-50 p-6 rounded-3xl border border-dashed border-zinc-200 flex items-center gap-4 text-left">
          <div className="bg-white p-3 rounded-2xl shadow-sm text-orange-600">
            <Bike size={24} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">Estimated Delivery</p>
            <p className="font-bold text-zinc-800">25 - 35 Minutes</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button asChild className="h-14 rounded-2xl bg-zinc-900 hover:bg-orange-600 text-white font-bold text-lg transition-all active:scale-95">
            <Link href="/dashboard">Track Your Order <ArrowRight className="ml-2 size-5" /></Link>
          </Button>
          
          <Button asChild variant="ghost" className="h-14 rounded-2xl font-bold text-zinc-500 hover:text-orange-600">
            <Link href="/">Order More Food</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}