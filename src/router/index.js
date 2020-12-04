import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile';
import Admin from '../views/Admin';
import store from '../store';
import { users } from '../assets/users';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

//This is the route guard to make sure people dont go to pages they aren't suppose to be on
router.beforeEach(async (to, from, next) => { 

  const user = store.state.User.user;

  if (!user) { 
    await store.dispatch('User/setUser', users[0]);
  }

  const isAdmin = true;
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAdmin && !isAdmin) {
    next({ name: 'Home' });
  }
  else { 
    next();
  }
})

export default router
