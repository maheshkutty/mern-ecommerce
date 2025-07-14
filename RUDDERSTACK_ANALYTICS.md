# RudderStack Analytics Implementation

This document outlines the RudderStack analytics events implemented in the MERN ecommerce application following the [RudderStack Standard Events Specification](https://www.rudderstack.com/docs/event-spec/standard-events/).

## Setup

RudderStack is already configured in the application via the JavaScript SDK snippet in `client/public/index.html`. The tracking utility functions are located in `client/app/utils/rudderstack.js`.

## Implemented Events

### User Events

#### 1. User Identification

- **Function**: `identifyUser(user)`
- **Triggered**: On login and signup
- **Location**:
  - `client/app/containers/Login/actions.js` - `login()` function
  - `client/app/containers/Signup/actions.js` - `signUp()` function
- **Properties**: email, firstName, lastName, name, role, phone

#### 2. User Signed Up

- **Function**: `trackSignup(user)`
- **Triggered**: When user completes registration
- **Location**: `client/app/containers/Signup/actions.js` - `signUp()` function
- **Properties**: userId, email, firstName, lastName, method

#### 3. User Logged In

- **Function**: `trackLogin(user)`
- **Triggered**: When user successfully logs in
- **Location**: `client/app/containers/Login/actions.js` - `login()` function
- **Properties**: userId, email, method

#### 4. User Logged Out

- **Function**: `trackLogout()`
- **Triggered**: When user signs out
- **Location**: `client/app/containers/Login/actions.js` - `signOut()` function

### Product Events

#### 5. Product Viewed

- **Function**: `trackProductViewed(product)`
- **Triggered**: When a user views a product detail page
- **Location**: `client/app/containers/Product/actions.js` - `fetchStoreProduct()` function
- **Properties**: product_id, sku, name, category, brand, price, quantity, image_url, url

#### 6. Product List Viewed

- **Function**: `trackProductListViewed(products, listName)`
- **Triggered**: When users view product lists (category, brand, search results)
- **Location**: `client/app/containers/Product/actions.js` - `filterProducts()` function
- **Properties**: list_name, products array

#### 7. Products Searched

- **Function**: `trackProductSearched(query)`
- **Triggered**: When users search for products
- **Location**: `client/app/containers/Product/actions.js` - `filterProducts()` function
- **Properties**: query

### Cart Events

#### 8. Product Added

- **Function**: `trackProductAddedToCart(product)`
- **Triggered**: When a product is added to cart
- **Location**: `client/app/containers/Cart/actions.js` - `handleAddToCart()` function
- **Properties**: product_id, sku, name, category, brand, price, quantity, cart_id

#### 9. Product Removed

- **Function**: `trackProductRemovedFromCart(product)`
- **Triggered**: When a product is removed from cart
- **Location**: `client/app/containers/Cart/actions.js` - `handleRemoveFromCart()` function
- **Properties**: product_id, sku, name, category, brand, price, quantity, cart_id

#### 10. Cart Viewed

- **Function**: `trackCartViewed(cartItems)`
- **Triggered**: When cart is opened/viewed
- **Location**: `client/app/containers/Cart/index.js` - component lifecycle methods
- **Properties**: cart_id, products, revenue

### Checkout Events

#### 11. Checkout Started

- **Function**: `trackCheckoutStarted(cartItems, total)`
- **Triggered**: When user clicks checkout or "Proceed To Checkout"
- **Location**: `client/app/containers/Cart/actions.js` - `handleCheckout()` function
- **Properties**: order_id, revenue, products

### Order Events

#### 12. Order Completed

- **Function**: `trackOrderCompleted(order)`
- **Triggered**: When an order is successfully placed
- **Location**: `client/app/containers/Order/actions.js` - `addOrder()` function
- **Properties**: order_id, revenue, products, currency

#### 13. Order Cancelled

- **Function**: `trackOrderCancelled(order)`
- **Triggered**: When an order is cancelled
- **Location**: `client/app/containers/Order/actions.js` - `cancelOrder()` function
- **Properties**: order_id, revenue

### Wishlist Events

#### 14. Wishlist Product Added

- **Function**: `trackWishlistProductAdded(product)`
- **Triggered**: When a product is added to wishlist
- **Location**: `client/app/containers/WishList/actions.js` - `updateWishlist()` function
- **Properties**: product_id, sku, name, category, brand, price, quantity

#### 15. Wishlist Product Removed

- **Function**: `trackWishlistProductRemoved(product)`
- **Triggered**: When a product is removed from wishlist
- **Location**: `client/app/containers/WishList/actions.js` - `updateWishlist()` function
- **Properties**: product_id, sku, name, category, brand, price, quantity

### Review Events

#### 16. Product Reviewed

- **Function**: `trackProductReviewed(product, rating, reviewText)`
- **Triggered**: When a user submits a product review
- **Location**: `client/app/containers/Review/actions.js` - `addProductReview()` function
- **Properties**: product_id, sku, name, category, brand, price, rating, review_text

### Page Events

#### 17. Page Views

- **Function**: `trackPageView(pageName, properties)`
- **Triggered**: When key pages are loaded
- **Locations**:
  - `client/app/containers/Homepage/index.js` - Homepage
  - `client/app/containers/Shop/index.js` - Shop Page
  - `client/app/containers/ProductPage/index.js` - Product Page
  - `client/app/containers/CategoryShop/index.js` - Category Shop
  - `client/app/containers/BrandsShop/index.js` - Brand Shop
  - `client/app/containers/Login/index.js` - Login Page
  - `client/app/containers/Signup/index.js` - Signup Page
  - `client/app/containers/OrderSuccess/index.js` - Order Success Page

## Available Helper Functions

The following additional tracking functions are available but not yet implemented:

- `trackProductShared(product, shareMethod)` - For social sharing
- `trackPaymentInfoEntered(paymentInfo)` - For payment flow
- `trackPromotionViewed(promotion)` - For banner/promotion tracking
- `trackPromotionClicked(promotion)` - For promotion interactions

## Data Flow

1. **Event Triggering**: Events are triggered from React components and Redux actions
2. **Data Formatting**: Product and cart data is formatted using helper functions
3. **RudderStack Integration**: Events are sent to RudderStack via the JavaScript SDK
4. **Data Destinations**: RudderStack forwards events to configured destinations (analytics tools, databases, etc.)

## Configuration

The RudderStack configuration is in `client/public/index.html`:

- **Write Key**: `2zrEN8NICTIPHFyvv7z3HClo36y`
- **Data Plane URL**: `http://localhost:8080`
- **Config URL**: `http://localhost:5050`

## Testing

To verify events are firing:

1. Open browser developer tools
2. Check Network tab for requests to RudderStack endpoints
3. Use RudderStack's Live Events feature in the dashboard
4. Enable debug mode by adding `debug: true` to the RudderStack load options

## Best Practices

1. **Error Handling**: All tracking calls are wrapped in checks for RudderStack availability
2. **Performance**: Tracking calls are non-blocking and won't affect user experience
3. **Data Quality**: Product data is consistently formatted across all events
4. **Privacy**: User data is handled according to privacy policies and consent

## Future Enhancements

Consider implementing:

- Enhanced ecommerce tracking for Google Analytics
- A/B testing event tracking
- Performance monitoring events
- Error tracking events
- Custom business events specific to your use case
