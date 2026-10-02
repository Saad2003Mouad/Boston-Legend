import { PACKAGES } from "@/lib/packages-data";
import PackagesClient from "./PackagesClient";

export default async function PackagesPage() {
  const formattedPackages = PACKAGES.map((pkg) => {
    return {
      id: pkg.id,
      slug: pkg.slug,
      name: pkg.name,
      tagline: pkg.tagline,
      description: pkg.description,
      imageUrl: pkg.imageUrl || `/images/${pkg.vehicleType === "VAN" ? "van" : "truck"}_packages/${pkg.slug}.jpg`,
      vehicleType: pkg.vehicleType,
      vehicleLabel: pkg.vehicleLabel,
      servings: pkg.servings,
      price: pkg.price,
      extraGuestPrice: pkg.extraGuestPrice,
      durationMins: pkg.durationMins,
      durationLabel: pkg.durationLabel,
      badge: pkg.badge,
      badgeVariant: pkg.badgeVariant || (pkg.badge === "Most Popular" || pkg.badge?.includes("Value") ? "coral" : (pkg.badge === "Corporate Choice" || pkg.badge?.includes("Luxury") ? "gold" : "mint")),
      features: pkg.features,
      isPopular: pkg.isPopular,
      isCustom: pkg.isCustom,
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
