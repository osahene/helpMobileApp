const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/auth/register', component: () => import('pages/Auth/RegisterPage.vue') },
      { path: '/auth/login', component: () => import('pages/Auth/LoginPage.vue') },
      { path: '/auth/email-verify', component: () => import('pages/Auth/EmailVerify.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
