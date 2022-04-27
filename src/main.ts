import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import registerGlobalComponents from './plugins/global-components'
import 'src/assets/css/main.css'
const app = createApp(App)
app.use(router)
registerGlobalComponents(app)

app.mount('#app')
