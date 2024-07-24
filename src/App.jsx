import { useState, useEffect } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  //initial cart
  const initialCartState = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCartState);
  //Def
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addCart(item) {
    console.log("agregando...");
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    console.log(itemExist);
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      //Copia de carrito
      const prevstate = [...cart];
      prevstate[itemExist].quantity++;
      setCart(prevstate);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
    console.log(cart);
  }
  function removeFromCart(id) {
    console.log(`Eliminando... ${id}`);
    setCart((prevcart) => prevcart.filter((guitar) => guitar.id !== id));
  }
  function increseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);

    console.log("Incrementando cantidad");
  }
  function decreseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (item.quantity > MIN_ITEMS)
          return { ...item, quantity: item.quantity - 1 };
      }
      //Si es 0 eliminar de el state

      return item;
    });
    setCart(updatedCart);

    console.log("Decrementando cantidad");
  }
  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increseQuantity={increseQuantity}
        decreseQuantity={decreseQuantity}
        clearCart={clearCart}
      />
      <Content cart={cart} addCart={addCart} />
      <Footer />
    </>
  );
}
