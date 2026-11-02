# ShopZone

React + Vite + Tailwind CSS v4 + React Router + Context API e-commerce frontend.

## Run
```
npm install
npm run dev
```

## Features
- Home, Shop (search / category / sort), Product detail, Cart, Login, Signup
- Products rendered by several components: ProductCard, ProductGrid, FeaturedProducts, RelatedProducts, CategoryList
- Contexts: AuthContext (users, unique username), CartContext (cart saved per username), ProductContext (data + filters)
- Usernames are unique (case-insensitive); each user's cart is stored under their own name
- Cart page is protected; adding to cart while logged out redirects to login

Note: demo only. Users and passwords live in localStorage in plain text.
