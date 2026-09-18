import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  forceColor?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  className,
  variant = "dark",
  width = 170,
  height = 85,
}: LogoProps) {
  const isDarkVariant = variant === "dark";
  
  // Use only the custom slogan logo element
  const logoSrc = "/images/slogan.png";

  return (
    <div className={cn("inline-flex items-center transition-transform hover:scale-[1.02]", className)}>
      <div className="relative h-12 md:h-20 w-auto flex items-center">
        <Image
          src={logoSrc}
          alt="Brand Slogan"
          width={width}
          height={height}
          className="w-auto h-full max-h-20 object-contain drop-shadow-md"
          priority
        />
      </div>
    </div>
  );
}
