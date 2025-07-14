/**
 * RudderStack Analytics Utility
 * 
 * This file provides utility functions for tracking ecommerce events
 * using RudderStack's standard event specification.
 * 
 * Reference: https://www.rudderstack.com/docs/event-spec/standard-events/
 */

// Check if RudderStack is available
const isRudderStackLoaded = () => {
  return typeof window !== 'undefined' && window.rudderanalytics;
};

// Helper function to format product data for tracking
const formatProductData = (product) => {
  return {
    product_id: product._id || product.id,
    sku: product.sku,
    name: product.name,
    category: product.category?.name || product.category,
    brand: product.brand?.name || product.brand,
    price: product.price,
    quantity: product.quantity || 1,
    image_url: product.imageUrl,
    url: `${window.location.origin}/product/${product.slug}`
  };
};

// Helper function to format cart data
const formatCartData = (cartItems) => {
  return cartItems.map(item => ({
    product_id: item._id || item.id,
    sku: item.sku,
    name: item.name,
    category: item.category?.name || item.category,
    brand: item.brand?.name || item.brand,
    price: item.price,
    quantity: item.quantity,
    image_url: item.imageUrl
  }));
};

// Helper function to calculate cart value
const calculateCartValue = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Track user identification
 * @param {Object} user - User object with id, email, firstName, lastName
 */
export const identifyUser = (user) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.identify(user.id || user._id, {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`,
    role: user.role,
    phone: user.phoneNumber
  });
};

/**
 * Track user signup
 * @param {Object} user - User object
 */
export const trackSignup = (user) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.track('User Signed Up', {
    userId: user.id || user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    method: user.provider || 'email'
  });
};

/**
 * Track user login
 * @param {Object} user - User object
 */
export const trackLogin = (user) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.track('User Logged In', {
    userId: user.id || user._id,
    email: user.email,
    method: user.provider || 'email'
  });
};

/**
 * Track user logout
 */
export const trackLogout = () => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.track('User Logged Out');
};

/**
 * Track product viewed
 * @param {Object} product - Product object
 */
export const trackProductViewed = (product) => {
  if (!isRudderStackLoaded()) return;
  
  const productData = formatProductData(product);
  
  window.rudderanalytics.track('Product Viewed', productData);
};

/**
 * Track product list viewed (category, search results, etc.)
 * @param {Array} products - Array of products
 * @param {string} listName - Name of the list (e.g., 'Category: Electronics')
 */
export const trackProductListViewed = (products, listName = '') => {
  if (!isRudderStackLoaded()) return;
  
  const productsData = products.map(formatProductData);
  
  window.rudderanalytics.track('Product List Viewed', {
    list_name: listName,
    products: productsData
  });
};

/**
 * Track product added to cart
 * @param {Object} product - Product object
 */
export const trackProductAddedToCart = (product) => {
  if (!isRudderStackLoaded()) return;
  
  const productData = formatProductData(product);
  
  window.rudderanalytics.track('Product Added', {
    ...productData,
    cart_id: localStorage.getItem('cart_id')
  });
};

/**
 * Track product removed from cart
 * @param {Object} product - Product object
 */
export const trackProductRemovedFromCart = (product) => {
  if (!isRudderStackLoaded()) return;
  
  const productData = formatProductData(product);
  
  window.rudderanalytics.track('Product Removed', {
    ...productData,
    cart_id: localStorage.getItem('cart_id')
  });
};

/**
 * Track cart viewed
 * @param {Array} cartItems - Array of cart items
 */
export const trackCartViewed = (cartItems) => {
  if (!isRudderStackLoaded()) return;
  
  const productsData = formatCartData(cartItems);
  const cartValue = calculateCartValue(cartItems);
  
  window.rudderanalytics.track('Cart Viewed', {
    cart_id: localStorage.getItem('cart_id'),
    products: productsData,
    revenue: cartValue
  });
};

/**
 * Track checkout started
 * @param {Array} cartItems - Array of cart items
 * @param {number} total - Total cart value
 */
export const trackCheckoutStarted = (cartItems, total) => {
  if (!isRudderStackLoaded()) return;
  
  const productsData = formatCartData(cartItems);
  
  window.rudderanalytics.track('Checkout Started', {
    order_id: localStorage.getItem('cart_id'),
    revenue: total,
    products: productsData
  });
};

/**
 * Track order completed
 * @param {Object} order - Order object
 */
export const trackOrderCompleted = (order) => {
  if (!isRudderStackLoaded()) return;
  
  const productsData = order.products ? formatCartData(order.products) : [];
  
  window.rudderanalytics.track('Order Completed', {
    order_id: order._id || order.id,
    revenue: order.total,
    products: productsData,
    currency: 'USD'
  });
};

/**
 * Track order cancelled
 * @param {Object} order - Order object
 */
export const trackOrderCancelled = (order) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.track('Order Cancelled', {
    order_id: order._id || order.id,
    revenue: order.total
  });
};

/**
 * Track product searched
 * @param {string} query - Search query
 */
export const trackProductSearched = (query) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.track('Products Searched', {
    query: query
  });
};

/**
 * Track product shared
 * @param {Object} product - Product object
 * @param {string} shareMethod - Method of sharing (e.g., 'facebook', 'twitter')
 */
export const trackProductShared = (product, shareMethod) => {
  if (!isRudderStackLoaded()) return;
  
  const productData = formatProductData(product);
  
  window.rudderanalytics.track('Product Shared', {
    ...productData,
    share_via: shareMethod
  });
};

/**
 * Track product review
 * @param {Object} product - Product object
 * @param {number} rating - Review rating
 * @param {string} reviewText - Review text
 */
export const trackProductReviewed = (product, rating, reviewText) => {
  if (!isRudderStackLoaded()) return;
  
  const productData = formatProductData(product);
  
  window.rudderanalytics.track('Product Reviewed', {
    ...productData,
    rating: rating,
    review_text: reviewText
  });
};

/**
 * Track wishlist product added
 * @param {Object} product - Product object
 */
export const trackWishlistProductAdded = (product) => {
  if (!isRudderStackLoaded()) return;
  
  const productData = formatProductData(product);
  
  window.rudderanalytics.track('Wishlist Product Added', productData);
};

/**
 * Track wishlist product removed
 * @param {Object} product - Product object
 */
export const trackWishlistProductRemoved = (product) => {
  if (!isRudderStackLoaded()) return;
  
  const productData = formatProductData(product);
  
  window.rudderanalytics.track('Wishlist Product Removed', productData);
};

/**
 * Track payment info entered
 * @param {Object} paymentInfo - Payment information
 */
export const trackPaymentInfoEntered = (paymentInfo) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.track('Payment Info Entered', {
    payment_method: paymentInfo.method
  });
};

/**
 * Track promotion viewed
 * @param {Object} promotion - Promotion object
 */
export const trackPromotionViewed = (promotion) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.track('Promotion Viewed', {
    promotion_id: promotion.id,
    promotion_name: promotion.name,
    creative_name: promotion.creative,
    position: promotion.position
  });
};

/**
 * Track promotion clicked
 * @param {Object} promotion - Promotion object
 */
export const trackPromotionClicked = (promotion) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.track('Promotion Clicked', {
    promotion_id: promotion.id,
    promotion_name: promotion.name,
    creative_name: promotion.creative,
    position: promotion.position
  });
};

/**
 * Track page view
 * @param {string} pageName - Name of the page
 * @param {Object} properties - Additional properties
 */
export const trackPageView = (pageName, properties = {}) => {
  if (!isRudderStackLoaded()) return;
  
  window.rudderanalytics.page(pageName, properties);
};
