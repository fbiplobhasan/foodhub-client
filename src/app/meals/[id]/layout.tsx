import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/layout/navbar1";
import { ReactNode } from "react";

export default function ProviderLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar1 />
      {children}
      <Footer2></Footer2>
    </div>
  );
}
