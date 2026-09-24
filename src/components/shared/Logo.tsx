import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnlyOnMobile?: boolean;
  width?: number;
  height?: number;
  variant?: string;
}

export default function Logo({
  className,
  iconOnlyOnMobile = false,
  width,
  height,
  variant,
}: LogoProps) {
  return (
    <div className={cn("inline-flex items-center transition-transform hover:scale-[1.02]", className)}>
      <div className="relative h-12 md:h-16 lg:h-20 w-auto flex items-center justify-center">
        {/* Full Logo - hidden on mobile if iconOnlyOnMobile is true */}
        <Image
          src="/images/logo.png"
          alt="American Legend Ice Cream Truck"
          width={240}
          height={85}
          className={cn(
            "w-auto h-full max-h-12 md:max-h-16 lg:max-h-20 object-contain drop-shadow-md",
            iconOnlyOnMobile ? "hidden md:block" : "block"
          )}
          priority
        />
        
        {/* Icon Logo - visible only on mobile if iconOnlyOnMobile is true */}
        {iconOnlyOnMobile && (
          <Image
            src="/images/icon.png"
            alt="American Legend Icon"
            width={48}
            height={48}
            className="w-auto h-full max-h-10 md:max-h-12 object-contain drop-shadow-md block md:hidden"
            priority
          />
        )}
      </div>
    </div>
  );
}

