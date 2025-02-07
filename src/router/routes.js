const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { public: true },
    children: [{ path: '', name: 'onboard', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/pages',
    component: () => import('layouts/PagesLayout.vue'),
    redirect: { name: 'home' },
    children: [
      { path: '/pages/home', name: 'home', component: () => import('pages/Main/HomePage.vue') },
      {
        path: '/pages/edit',
        name: 'edit',
        component: () => import('pages/Main/RegisterContacts.vue'),
      },
      { path: '/pages/list', name: 'list', component: () => import('pages/Main/ContactList.vue') },
      { path: '/pages/more', name: 'more', component: () => import('pages/Main/MorePage.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: '/auth/register',
        name: 'register',
        component: () => import('pages/Auth/RegisterPage.vue'),
        meta: { public: true },
      },
      {
        path: '/auth/email-verify',
        name: 'email-verify',
        component: () => import('pages/Auth/EmailVerify.vue'),
        meta: { public: true },
      },
      {
        path: '/auth/phone-number',
        name: 'phone-number',
        component: () => import('pages/Auth/PhoneNumber.vue'),
        meta: { public: true },
      },
      {
        path: '/auth/phone-number-verify',
        name: 'phone-number-verify',
        component: () => import('pages/Auth/PhoneNumberVerify.vue'),
        meta: { public: true },
      },
      {
        path: '/auth/forgotten-password',
        name: 'forgotten-password',
        component: () => import('pages/Auth/ForgottenPassword.vue'),
        meta: { public: true },
      },
      {
        path: '/auth/confirm-password',
        name: 'confirm-password',
        component: () => import('pages/Auth/ConfirmPassword.vue'),
        meta: { public: true },
      },
      {
        path: '/auth/login',
        name: 'login',
        component: () => import('pages/Auth/LoginPage.vue'),
        meta: { public: true },
      },
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
