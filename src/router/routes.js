const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      public: true,
      isOnboarding: true,
    },
    children: [
      {
        path: '',
        name: 'onboard',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          title: 'Welcome Onboard',
        },
      },
    ],
  },
  {
    path: '/pages',
    component: () => import('layouts/PagesLayout.vue'),
    redirect: { name: 'home' },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('pages/Main/HomePage.vue'),
        meta: {
          title: 'Dashboard',
          requiresPhoneVerification: true,
        },
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('pages/Main/RegisterContacts.vue'),
        meta: {
          title: 'Edit Contacts',
          requiresPhoneVerification: true,
        },
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('pages/Main/ContactList.vue'),
        meta: {
          title: 'Contact List',
          requiresPhoneVerification: true,
        },
      },
      {
        path: 'more',
        name: 'more',
        component: () => import('pages/Main/MorePage.vue'),
        meta: {
          title: 'More Options',
          requiresPhoneVerification: true,
        },
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Auth/LoginPage.vue'),
        meta: {
          public: true,
          title: 'Login',
          guestOnly: true,
        },
      },
    ],
  },
  {
    path: '/reg',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/Auth/RegisterPage.vue'),
        meta: {
          public: true,
          title: 'Register',
          guestOnly: true,
        },
      },
      {
        path: 'email-verify',
        name: 'email-verify',
        component: () => import('pages/Auth/EmailVerify.vue'),
        meta: {
          public: true,
          title: 'Verify Email',
          requiresTempAuth: true,
        },
      },
      {
        path: 'phone-number',
        name: 'phone-number',
        component: () => import('pages/Auth/PhoneNumber.vue'),
        meta: {
          public: true,
          title: 'Phone Verification',
          requiresTempAuth: true,
        },
      },
      {
        path: 'phone-number-verify',
        name: 'phone-number-verify',
        component: () => import('pages/Auth/PhoneNumberVerify.vue'),
        meta: {
          public: true,
          title: 'Verify Phone',
          requiresTempAuth: true,
        },
      },
      {
        path: 'forgotten-password',
        name: 'forgotten-password',
        component: () => import('pages/Auth/ForgottenPassword.vue'),
        meta: {
          public: true,
          title: 'Reset Password',
          guestOnly: true,
        },
      },
      {
        path: 'confirm-password',
        name: 'confirm-password',
        component: () => import('pages/Auth/ConfirmPassword.vue'),
        meta: {
          public: true,
          title: 'New Password',
          requiresTempAuth: true,
        },
      },
    ],
  },
  // Error route should remain last
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      title: 'Page Not Found',
    },
  },
]

export default routes
