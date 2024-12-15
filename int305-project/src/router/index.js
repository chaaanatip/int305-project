import { createRouter, createWebHistory } from "vue-router"
import QuerySystemView from "../views/QuerySystemView.vue"
import ProductManagementView from "@/views/ProductManagementView.vue"
import OrderManagementView from "@/views/OrderManagementView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: QuerySystemView,
    },
    {
      path: "/",
      name: "product",
      component: ProductManagementView,
    },
    {
      path: "/",
      name: "order",
      component: OrderManagementView,
    },
  ],
})

export default router
