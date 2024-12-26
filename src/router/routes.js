const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/pages',
    component: () => import('layouts/PagesLayout.vue'),
    children: [
      { path: '/pages/home', component: () => import('pages/Main/HomePage.vue') },
      { path: '/pages/edit', component: () => import('pages/Main/RegisterContacts.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/auth/register', component: () => import('pages/Auth/RegisterPage.vue') },
      { path: '/auth/email-verify', component: () => import('pages/Auth/EmailVerify.vue') },
      { path: '/auth/phone-number', component: () => import('pages/Auth/PhoneNumber.vue') },
      {
        path: '/auth/phone-number-verify',
        component: () => import('pages/Auth/PhoneNumberVerify.vue'),
      },
      {
        path: '/auth/forgotten-password',
        component: () => import('pages/Auth/ForgottenPassword.vue'),
      },
      {
        path: '/auth/confirm-password',
        component: () => import('pages/Auth/ConfirmPassword.vue'),
      },
      { path: '/auth/login', component: () => import('pages/Auth/LoginPage.vue') },
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
