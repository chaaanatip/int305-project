<template>
  <div>
    <header>
      <h1>Restaurant Query System</h1>
    </header>

    <main>
      <section id="queries">
        <h2>Queries</h2>
        <button @click="queryHighRatedRestaurants">
          High Rated Restaurants
        </button>
        <button @click="queryTopRestaurants">Top 5 Restaurants</button>
        <button @click="querySpecificTypes">
          Restaurants by Type (Thai, Japanese)
        </button>
        <button @click="queryCombinedConditions">
          Thai Restaurants with Rating > 4.5
        </button>
        <button @click="queryAggregateCounts">Count Restaurants by Type</button>
      </section>

      <section id="results">
        <h2>Results</h2>
        <div v-if="loading">Loading...</div>
        <div v-else-if="results.length === 0">
          No data to display. Run a query above.
        </div>
        <div v-else>
          <pre>{{ results }}</pre>
        </div>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 Restaurant Query System</p>
    </footer>
  </div>
</template>

<script>
import db from "@/firebase/init" // Import Firestore จาก init.js
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore"

export default {
  data() {
    return {
      results: [],
      loading: false,
    }
  },
  methods: {
    async executeQuery(queryFn) {
      this.loading = true
      this.results = []
      try {
        const data = await queryFn()
        this.results = data.map((doc) => doc.data())
      } catch (error) {
        console.error("Error executing query:", error)
      } finally {
        this.loading = false
      }
    },
    async queryHighRatedRestaurants() {
      await this.executeQuery(async () => {
        const q = query(
          collection(db, "restaurants"),
          where("rating", ">", 4.0)
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs
      })
    },
    async queryTopRestaurants() {
      await this.executeQuery(async () => {
        const q = query(
          collection(db, "restaurants"),
          orderBy("rating", "desc"),
          limit(5)
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs
      })
    },
    async querySpecificTypes() {
      await this.executeQuery(async () => {
        const q = query(
          collection(db, "restaurants"),
          where("type", "in", ["Thai", "Japanese"])
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs
      })
    },
    async queryCombinedConditions() {
      await this.executeQuery(async () => {
        const q = query(
          collection(db, "restaurants"),
          where("type", "==", "Thai"),
          where("rating", ">", 4.5)
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs
      })
    },
    async queryAggregateCounts() {
      this.loading = true
      this.results = []
      try {
        const querySnapshot = await getDocs(collection(db, "restaurants"))
        const typeCounts = {}
        querySnapshot.forEach((doc) => {
          const { type } = doc.data()
          typeCounts[type] = (typeCounts[type] || 0) + 1
        })
        this.results = typeCounts
      } catch (error) {
        console.error("Error executing aggregate query:", error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
header {
  text-align: center;
  margin-bottom: 20px;
}

button {
  margin: 5px;
  padding: 10px 15px;
}

#results {
  margin-top: 20px;
}

pre {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
