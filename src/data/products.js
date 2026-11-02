const img = (seed) => `https://picsum.photos/seed/${seed}/600/450`;

export const CATEGORIES = ["Electronics", "Fashion", "Home", "Sports"];

export const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 89.99, rating: 4.6, featured: true, image: img("headphones"), description: "Over-ear Bluetooth headphones with noise cancellation and 30-hour battery life." },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 149.0, rating: 4.4, featured: true, image: img("smartwatch"), description: "Track your steps, heart rate and sleep with a bright AMOLED display." },
  { id: 3, name: "Portable Speaker", category: "Electronics", price: 59.5, rating: 4.3, featured: false, image: img("speaker"), description: "Water-resistant mini speaker with deep bass and 12 hours of playtime." },
  { id: 4, name: "Mechanical Keyboard", category: "Electronics", price: 74.0, rating: 4.7, featured: true, image: img("keyboard"), description: "Compact RGB mechanical keyboard with hot-swappable switches." },
  { id: 5, name: "Classic Denim Jacket", category: "Fashion", price: 64.0, rating: 4.2, featured: true, image: img("jacket"), description: "Timeless denim jacket with a comfortable relaxed fit." },
  { id: 6, name: "Running Sneakers", category: "Fashion", price: 79.99, rating: 4.5, featured: false, image: img("sneakers"), description: "Lightweight breathable sneakers built for daily runs." },
  { id: 7, name: "Leather Backpack", category: "Fashion", price: 95.0, rating: 4.8, featured: true, image: img("backpack"), description: "Premium leather backpack with a padded 15-inch laptop sleeve." },
  { id: 8, name: "Ceramic Coffee Mug Set", category: "Home", price: 24.99, rating: 4.1, featured: false, image: img("mugs"), description: "Set of four handcrafted ceramic mugs, dishwasher safe." },
  { id: 9, name: "Table Lamp", category: "Home", price: 39.0, rating: 4.4, featured: false, image: img("lamp"), description: "Minimal LED table lamp with adjustable brightness and warm light." },
  { id: 10, name: "Cozy Throw Blanket", category: "Home", price: 34.5, rating: 4.6, featured: true, image: img("blanket"), description: "Soft knitted throw blanket for the couch or bed." },
  { id: 11, name: "Yoga Mat", category: "Sports", price: 29.0, rating: 4.5, featured: false, image: img("yogamat"), description: "Non-slip 6mm yoga mat with a carrying strap." },
  { id: 12, name: "Adjustable Dumbbells", category: "Sports", price: 119.0, rating: 4.7, featured: true, image: img("dumbbells"), description: "Space-saving adjustable dumbbell pair from 2 to 20 kg." },
];
