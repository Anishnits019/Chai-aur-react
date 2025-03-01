{
  // import React, { useEffect, useState } from "react";
// import ProductList from "./Components/ProductList";
// import Header from "./Components/Header";
// import CartItem from "./Components/CartItem";

// const App = () => {
//   const [product, setProduct] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [cartlen, setCartlen] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setProduct(data);
//       } catch (error) {
//         setError("Error fetching products: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//     setCartlen(savedCart.reduce((total, item) => total + item.quantity, 0));
//   }, []);

//   // Save cart to localStorage whenever cart changes
//   useEffect(() => {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     //  else {
//     //   localStorage.removeItem("cart"); // Clear cart from localStorage when empty
//     // }
//   }, []);

//   // Update cart length based on the current cart state
//   const updateCartLength = (newCart) => {
//     const totalQuantity = newCart.reduce((total, item) => total + item.quantity, 0);
//     setCartlen(totalQuantity);
//   };

//   // Add product to cart
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       let updatedCart;
//       if (existingItem) {
//         updatedCart = prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         updatedCart = [...prevCart, { ...product, quantity: 1 }];
//       }
//       updateCartLength(updatedCart);  // Recalculate and update the cart length
//       return updatedCart;
//     });
//   };

//   // Remove product from cart
//   const removeFromCart = (product) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.filter((item) => item.id !== product.id);
//       updateCartLength(updatedCart);  // Recalculate and update the cart length
//       return updatedCart;
//     });
//   };

//   // Decrease quantity of product in cart
//   const decreaseFromCart = (product) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart
//         .map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0);  // Filter out items with 0 quantity
//       updateCartLength(updatedCart);  // Recalculate and update the cart length
//       return updatedCart;
//     });
//   };

//   return (
//     <div>
//       <Header cartCount={cartlen} />
//       <div>
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div className="error">{error}</div>
//         ) : (
//           <div className="flex">
//             <ProductList products={product} addToCart={addToCart} />
//             <div className="w-1/4 bg-white p-4 rounded-lg shadow-md top-0 right-0">
//               <CartItem
//                 cart={cart}
//                 removeFromCart={removeFromCart}
//                 addToCart={addToCart}
//                 decreaseFromCart={decreaseFromCart}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
}
import React, { useEffect, useState } from "react";
import ProductList from "./Components/ProductList";
import Header from "./Components/Header";
import CartItem from "./Components/CartItem";
import { getDatabase, ref, set, onValue, remove,get } from "firebase/database";
import { app } from "./Components/firebaseConfig"; // Adjust as needed

const App = () => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartlen, setCartlen] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getDatabase(app);


  // Fetch products from a new API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data.products);
      } catch (error) {
        setError("Error fetching products: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Load cart from Firebase on initial render
  useEffect(() => {
    const cartRef = ref(db, "cart");
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        const cartItems = Object.values(data);
        setCart(cartItems);
        setCartlen(cartItems.reduce((total, item) => total + item.quantity, 0));
      } else {
        setCart([]);
        setCartlen(0);
      }
    });
  }, []); {// what is the basicllay use of db as it not presnet app still works properly}

  // Add product to cart in Firebase
  const addToCart = (product) => {
    const cartRef = ref(db, `cart/${product.id}`);
    get(cartRef).then((snapshot)=>{
      set(cartRef,{...product,quantity:snapshot.val()?snapshot.val().quantity+1:1})
    })
  }

  // Remove product from cart in Firebase
  const removeFromCart = (product) => {
    const cartRef = ref(db, `cart/${product.id}`);
    remove(cartRef);
  };

  // Decrease quantity of product in cart in Firebase
  const decreaseFromCart = (product) => {
    const cartRef = ref(db, `cart/${product.id}`);
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem && existingItem.quantity > 1) {
      set(cartRef, {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      });
    } else {
      remove(cartRef);
    }
  };

  return (
    <div>
      <Header cartCount={cartlen} />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="flex">
            <ProductList products={product} addToCart={addToCart} />
            <div className="w-1/4 bg-white p-4 rounded-lg shadow-md top-0 right-0">
              <CartItem
                cart={cart}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                decreaseFromCart={decreaseFromCart}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
}
export default App;

