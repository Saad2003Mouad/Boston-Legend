import { prisma } from "@/lib/prisma";
import PackagesClient from "./PackagesClient";

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  let dbPackages: any[] = [];
  try {
    dbPackages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' }
    });
  } catch (err) {
    console.error("[Packages] Failed to fetch packages:", err);
  }

  const formattedPackages = dbPackages.map((pkg) => {
    let featuresList: string[] = [];
    try {
      featuresList = pkg.features ? JSON.parse(pkg.features) : [];
    } catch {
      // fallback
    }

    const durationHrs = Math.floor(pkg.durationMins / 60);
    const durationMinsRem = pkg.durationMins % 60;
    const durationLabel = pkg.durationMins === 0 
      ? "Custom Duration" 
      : (durationHrs > 0 ? `${durationHrs}h ` : "") + (durationMinsRem > 0 ? `${durationMinsRem}m` : "") + " Service";

    return {
      id: pkg.id,
      slug: pkg.slug,
      name: pkg.name,
      tagline: pkg.description || "The perfect ice cream experience",
      description: pkg.description || "",
      imageUrl: pkg.imageUrl,
      vehicleType: pkg.serviceType,
      vehicleLabel: pkg.serviceType === "TRUCK" ? "Ice Cream Truck" : pkg.serviceType === "VAN" ? "Premium Van" : "Custom",
      servings: pkg.servings,
      price: pkg.price,
      extraGuestPrice: pkg.extraGuestPrice ?? 5,
      durationMins: pkg.durationMins,
      durationLabel: durationLabel.trim(),
      badge: pkg.badge,
      badgeVariant: pkg.badge === "Most Popular" || pkg.badge?.includes("Value") ? "coral" : (pkg.badge === "Corporate Choice" || pkg.badge?.includes("Luxury") ? "gold" : "mint"),
      features: featuresList,
      isPopular: pkg.badge === "Most Popular",
      isCustom: pkg.serviceType === "CUSTOM",
      sortOrder: pkg.sortOrder,
    };
  });

  const truckPackages = formattedPackages.filter(p => p.vehicleType === "TRUCK");
  const vanPackages = formattedPackages.filter(p => p.vehicleType === "VAN");
  const customPackages = formattedPackages.filter(p => p.vehicleType === "CUSTOM");

  return (
    <PackagesClient 
      truckPackages={truckPackages} 
      vanPackages={vanPackages} 
      customPackages={customPackages} 
    />
  );
}
