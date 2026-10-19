import { siteConfig } from "@/config/site.config";

interface JsonLdProps {
  car?: any;
}

export function JsonLd({ car }: JsonLdProps) {
  const dealershipSchema = {
    "@context": "https://schema.org",
    "@type": ["AutoDealer", "LocalBusiness"],
    "@id": `${siteConfig.seo.siteUrl}/#dealership`,
    name: siteConfig.brand.name,
    legalName: siteConfig.brand.name,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    logo: `${siteConfig.seo.siteUrl}/images/logo.png`,
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    priceRange: "₹₹₹",
    hasMap: siteConfig.contact.googleMapsEmbedUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.6139",
      longitude: "77.2090",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
      siteConfig.socials.youtube,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter,
    ].filter(Boolean),
  };

  const carSchema = car
    ? {
        "@context": "https://schema.org",
        "@type": "Car",
        name: `${car.year} ${car.brand} ${car.model} ${car.variant}`,
        brand: {
          "@type": "Brand",
          name: car.brand,
        },
        model: car.model,
        vehicleModelDate: car.year.toString(),
        vehicleConfiguration: car.variant,
        fuelType: car.fuelType,
        vehicleTransmission: car.transmission,
        mileageFromOdometer: {
          "@type": "QuantitativeValue",
          value: car.kilometers,
          unitCode: "KMT",
        },
        color: car.color,
        itemCondition: "https://schema.org/UsedCondition",
        offers: {
          "@type": "Offer",
          price: car.price,
          priceCurrency: "INR",
          availability:
            car.status === "available"
              ? "https://schema.org/InStock"
              : "https://schema.org/SoldOut",
          seller: {
            "@id": `${siteConfig.seo.siteUrl}/#dealership`,
          },
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dealershipSchema) }}
      />
      {carSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(carSchema) }}
        />
      )}
    </>
  );
}
