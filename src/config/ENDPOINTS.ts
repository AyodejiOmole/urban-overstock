const ENDPOINTS = {
  UPLOAD_FILE: `files/upload`,
  PRODUCTS: `products`,
  CATEGORIES: `categories`,
  NOTIFICATIONS: `notification`,
  CUSTOMERS: `user/customer`,
  RETURN_REQUEST: `return-request`,
  SIGN_IN_FIREBASE: `auth/login/firebase`,
  SIGN_IN: `auth/login`,
  SIGN_UP: `auth/register`,
  CONFIRM_EMAIL_OTP: `auth/confirm-email`,
  VERIFY_OTP: `auth/verify-otp`,
  FORGOT_PASSWORD: `auth/forgot`,
  RESET_PASSWORD: `auth/reset`,
  RESEND_OTP: `auth/resend-otp`,
  SLIDER_IMAGE: `settings/slider-image`,
  ORDERS: 'order',
  USER_ORDER_HISTORY: `order/user`,
  DISCOUNT_CODE: `discount-code`,

  // Landing Page Settings
  LANDING_PAGE_SETTINGS: `settings/landing-page`,

  COLOR_SETTINGS: `settings/color`,
  BRAND_SETTINGS: `settings/brand`,
  SIZE_SETTINGS: `settings/size`,

  // Dashboard
  DASHBOARD_TOP_CHART: `dashboard/top-chart`,
  DASHBOARD_TOP_SELLERS: `dashboard/top-sellers`,
};

export default ENDPOINTS;
