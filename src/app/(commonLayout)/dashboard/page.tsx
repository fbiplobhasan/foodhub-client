"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  User,
  Package,
  Clock,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !session) {
      router.push("/login");
    }
  }, [session, mounted, router]);

  if (!mounted || !session) return null;

  const orders = [
    { id: "ORD-9921", date: "24 Oct 2023", total: 850, status: "Delivered" },
    { id: "ORD-8832", date: "Today", total: 1200, status: "Preparing" },
  ];

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: User Profile */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border rounded-[2.5rem] p-8 text-center space-y-4 shadow-sm">
            <div className="relative mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <User size={40} strokeWidth={2.5} />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter">
                {session.user.name}
              </h2>
              <p className="text-zinc-400 text-sm font-medium">
                {session.user.email}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => authClient.signOut().then(() => router.push("/"))}
              className="w-full rounded-2xl border-zinc-100 font-bold text-zinc-500 hover:text-red-500 hover:bg-red-50"
            >
              <LogOut className="mr-2 size-4" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content: Order History */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              My Orders
            </h1>
            <span className="bg-zinc-100 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-zinc-500">
              {orders.length} Orders
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group bg-white border rounded-[2rem] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-lg hover:border-orange-100"
              >
                <div className="flex items-center gap-5">
                  <div className="bg-zinc-50 p-4 rounded-2xl group-hover:bg-orange-50 transition-colors">
                    <Package className="text-zinc-400 group-hover:text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">
                      Order ID
                    </p>
                    <p className="font-bold text-zinc-900">{order.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 md:ml-10">
                  <div>
                    <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">
                      Date
                    </p>
                    <p className="font-bold text-zinc-600 flex items-center gap-1">
                      <Clock size={14} /> {order.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">
                      Amount
                    </p>
                    <p className="font-black text-orange-600">৳{order.total}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">
                      Status
                    </p>
                    <span
                      className={cn(
                        "inline-block mt-1 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700",
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex rounded-full"
                >
                  <ChevronRight />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
