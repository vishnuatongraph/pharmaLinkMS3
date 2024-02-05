import SliderComponent from "@/components/slider/slider";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pharmalink",
  description: "Pharmalink",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-[100vh] flex lg:h-full bg-white">
          <SliderComponent />
          {children}
        </div>
      </body>
    </html>
  );
}
