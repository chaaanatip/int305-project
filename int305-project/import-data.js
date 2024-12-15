import admin from "firebase-admin" // ใช้ import แทน require
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" } // ใช้ assert เพื่อโหลด JSON

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

// Example data (at least 10 documents for each collection)
const restaurants = [
  {
    id: "restaurant1",
    name: "Thai Delight",
    location: { latitude: 13.7563, longitude: 100.5018 },
    type: "Thai",
    rating: 4.5,
    menu: [{ item_name: "Pad Thai", price: 120 }],
  },
  {
    id: "restaurant2",
    name: "Sushi Heaven",
    location: { latitude: 13.7456, longitude: 100.5348 },
    type: "Japanese",
    rating: 4.8,
    menu: [{ item_name: "Sushi Set", price: 300 }],
  },
  {
    id: "restaurant3",
    name: "Pizza Palace",
    location: { latitude: 13.1234, longitude: 100.1234 },
    type: "Italian",
    rating: 4.2,
    menu: [{ item_name: "Margherita Pizza", price: 250 }],
  },
  {
    id: "restaurant4",
    name: "Burger World",
    location: { latitude: 13.6543, longitude: 100.5432 },
    type: "American",
    rating: 4.0,
    menu: [{ item_name: "Cheeseburger", price: 180 }],
  },
  {
    id: "restaurant5",
    name: "Indian Spices",
    location: { latitude: 13.9876, longitude: 100.789 },
    type: "Indian",
    rating: 4.7,
    menu: [{ item_name: "Chicken Tikka Masala", price: 200 }],
  },
  {
    id: "restaurant6",
    name: "French Cafe",
    location: { latitude: 13.4567, longitude: 100.4567 },
    type: "French",
    rating: 4.6,
    menu: [{ item_name: "Croissant", price: 80 }],
  },
  {
    id: "restaurant7",
    name: "Mexican Fiesta",
    location: { latitude: 13.6547, longitude: 100.6547 },
    type: "Mexican",
    rating: 4.4,
    menu: [{ item_name: "Tacos", price: 150 }],
  },
  {
    id: "restaurant8",
    name: "Korean BBQ",
    location: { latitude: 13.7654, longitude: 100.7654 },
    type: "Korean",
    rating: 4.3,
    menu: [{ item_name: "BBQ Pork", price: 350 }],
  },
  {
    id: "restaurant9",
    name: "Chinese Delight",
    location: { latitude: 13.1235, longitude: 100.6789 },
    type: "Chinese",
    rating: 4.1,
    menu: [{ item_name: "Sweet and Sour Pork", price: 220 }],
  },
  {
    id: "restaurant10",
    name: "Vietnamese Pho",
    location: { latitude: 13.8765, longitude: 100.8765 },
    type: "Vietnamese",
    rating: 4.5,
    menu: [{ item_name: "Pho", price: 120 }],
  },
]

const tables = Array.from({ length: 10 }, (_, i) => ({
  id: `table${i + 1}`,
  restaurant_id: `restaurant${(i % 10) + 1}`,
  capacity: (i % 4) + 2,
  status: i % 2 === 0,
}))

const reservations = Array.from({ length: 10 }, (_, i) => {
  const dateString = `2024-12-${String((i % 31) + 1).padStart(
    2,
    "0"
  )}T18:00:00Z` // ตรวจสอบรูปแบบวันที่
  const dateObject = new Date(dateString) // สร้าง Date Object จาก String

  if (isNaN(dateObject.getTime())) {
    throw new Error(`Invalid Date: ${dateString}`) // ตรวจสอบความถูกต้องของวันที่
  }

  return {
    id: `reservation${i + 1}`,
    customer_name: `Customer ${i + 1}`,
    customer_contact: `081234567${i}`,
    restaurant_id: `restaurant${(i % 10) + 1}`,
    table_id: `table${(i % 10) + 1}`,
    reservation_date: admin.firestore.Timestamp.fromDate(dateObject), // ใช้ Firestore Timestamp
    party_size: (i % 5) + 1,
    status: "confirmed",
  }
})



// Function to import data
const importData = async () => {
  try {
    // Import restaurants
    for (const restaurant of restaurants) {
      await db.collection("restaurants").doc(restaurant.id).set(restaurant)
      console.log(`Restaurant ${restaurant.name} imported!`)
    }

    // Import tables
    for (const table of tables) {
      await db.collection("tables").doc(table.id).set(table)
      console.log(`Table ${table.id} imported!`)
    }

    // Import reservations
    for (const reservation of reservations) {
      await db.collection("reservations").doc(reservation.id).set(reservation)
      console.log(`Reservation ${reservation.id} imported!`)
    }

    console.log("All data imported successfully!")
  } catch (error) {
    console.error("Error importing data:", error)
  }
}

// Run the import
importData()
