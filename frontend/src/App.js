import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import MyWishList from "./screens/MyWishList";
import CategoryListScreen from "./screens/CategoryListScreen";
import BrandListScreen from "./screens/BrandListScreen";
import CategoryDetailsScreen from "./screens/CategoryDetailsScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <TopBar />
      <main>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/product/:slug" component={ProductScreen} />
        <Route
          path="/product/:category/:subcategory"
          component={CategoryDetailsScreen}
        />
        <Route path="/cart" component={CartScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/favorite-items" component={MyWishList} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/admin/orderlist" component={OrderListScreen} />
        <Route path="/order/:id" component={OrderDetailsScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/admin/productlist" component={ProductListScreen} />
        <Route path="/admin/categories" component={CategoryListScreen} />
        <Route path="/admin/brands" component={BrandListScreen} />
        <Route path="/admin/product/:slug/edit" component={ProductEditScreen} />
        <Route path="/admin/product/create" component={ProductCreateScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
