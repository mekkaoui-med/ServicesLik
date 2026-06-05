export type Workspace = {
  id: number;
  name: string;
  city: string;
  category: string;
  rating: number;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  address: string;
  reviews: { user: string; rating: number; comment: string }[];
};

export const CATEGORIES = [
  "Coworking Space",
  "Shared Office",
  "Startup Hub",
  "Meeting Room",
  "Library",
  "Study Space",
  "Work-Friendly Café",
];

export const CITIES = ["Rabat", "Casablanca", "Marrakech", "Tangier", "Agadir", "Fes"];

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

const photos = [
  "photo-1497366216548-37526070297c",
  "photo-1521737604893-d14cc237f11d",
  "photo-1504384308090-c894fdcc538d",
  "photo-1556761175-5973dc0f32e7",
  "photo-1497366811353-6870744d04b2",
  "photo-1542621334-a254cf47733d",
  "photo-1572025442646-866d16c84a54",
  "photo-1517502884422-41eaead166d4",
  "photo-1524758631624-e2822e304c36",
  "photo-1568992687947-868a62a9f521",
  "photo-1531973576160-7125cd663d86",
  "photo-1559136555-9303baea8ebd",
  "photo-1564069114553-7215e1ff1890",
  "photo-1600508774634-4e11d34730e2",
  "photo-1604328698692-f76ea9498e76",
  "photo-1543269664-7eef42226a21",
  "photo-1453738773917-9c3eff1db985",
  "photo-1607082348824-0a96f2a4b9da",
  "photo-1518709268805-4e9042af2176",
  "photo-1577962917302-cd874c4e31d2",
];

const amenitiesPool = ["WiFi", "Meeting Rooms", "Coffee", "Parking", "Printer", "AC", "Lounge", "Phone Booth", "Kitchen", "24/7 Access"];

const names = [
  "Cowork Hub", "Startup Loft", "The Studio", "Workspace 360", "Hive Offices",
  "Nomad Café", "The Library", "Focus Room", "Atlas Coworking", "Medina Hub",
  "Ocean Workspace", "Riad Workspace", "Casablanca Tower", "Tangier Loft", "Agadir Beach Hub",
  "Fes Heritage Hub", "The Garden Office", "Sunset Studio", "Innovation Lab", "Skyline Suites",
];

export const WORKSPACES: Workspace[] = Array.from({ length: 20 }, (_, i) => {
  const city = CITIES[i % CITIES.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  return {
    id: i + 1,
    name: `${city} ${names[i]}`,
    city,
    category,
    rating: Math.round((4 + Math.random()) * 10) / 10,
    price: 80 + (i % 8) * 30,
    image: img(photos[i]),
    gallery: [img(photos[i]), img(photos[(i + 1) % photos.length]), img(photos[(i + 2) % photos.length])],
    description: `${names[i]} is a premium ${category.toLowerCase()} located in the heart of ${city}. Designed for creators, founders and remote teams, it blends inspiring architecture with the tools you need to do your best work.`,
    amenities: amenitiesPool.slice(0, 4 + (i % 5)),
    address: `${20 + i} Avenue Mohammed V, ${city}`,
    reviews: [
      { user: "Sara", rating: 5, comment: "Beautiful space, super fast WiFi." },
      { user: "Youssef", rating: 4, comment: "Great vibe, helpful staff." },
      { user: "Amine", rating: 5, comment: "My favorite spot in town." },
    ],
  };
});
