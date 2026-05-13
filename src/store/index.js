import { createStore } from 'vuex'
import features from './modules/features'
import learningPaths from './modules/learningPaths'
import instructors from './modules/instructors'
import testimonials from './modules/testimonials'
import catalog from './modules/catalog'
import courseDetail from './modules/courseDetail'
import checkout from './modules/checkout'
import learning from './modules/learning'
import dashboard from './modules/dashboard'
import ui from './modules/ui'
import blog from './modules/blog'
import auth from './modules/auth'
import wishlist from './modules/wishlist'
import cart from './modules/cart'

const store = createStore({
  modules: {
    features,
    learningPaths,
    instructors,
    testimonials,
    catalog,
    courseDetail,
    checkout,
    learning,
    dashboard,
    blog,
    ui,
    auth,
    wishlist,
    cart
  }
})

export default store
