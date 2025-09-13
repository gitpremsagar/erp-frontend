// Auth hooks
export { default as useAttemptLogin } from './auth/useAttemptLogin';
export { default as useLogOut } from './auth/useLogOut';
export { default as useRefreshAccessToken } from './auth/useRefreshAccessToken';

// Customer hooks
export { useCreateCustomer } from './customers/useCreateCustomer';
export { useCustomers } from './customers/useCustomers';

// Product hooks
export { useAdminProducts } from './products/useAdminProducts';
export { useProducts } from './products/useProducts';

// Product Tag hooks
export { useProductTags } from './productTags/useProductTags';

// Category hooks
export { useCategories } from './categories/useCategories';

// Sub-Category hooks
// export { useSubCategories } from './subCategories/useSubCategories'; // TODO: Implement when subCategories hook is created

// Vehicle hooks
export { useCreateVehicle } from './vehicles/useCreateVehicle';
export { useVehicles } from './vehicles/useVehicles';

// App data hooks
export { useAppData } from './useAppData';
export { useAppStore } from './useAppStore';

// Utility hooks
export { useIsMobile } from './use-mobile';
