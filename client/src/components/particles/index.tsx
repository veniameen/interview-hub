"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import ParticlesUI from "@/components/ui/particles";

export function Particles({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme !== "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center overflow-hidden z-[0]">
      {children}
      <ParticlesUI
        className="absolute inset-0 opacity-50"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
