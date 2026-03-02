import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./assets/styles.css"   // ← THIS WAS LOST

// Disable browser scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual"
}

window.scrollTo(0, 0)

const app = createApp(App)

app.use(router)

app.mount("#app")