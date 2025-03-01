import React, { useState } from 'react';
// import ProductCard from './ProductCard';

function ProductList({ products,addToCart}) {
  return (
<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-[1150px] text-bold text-xl relative max-h-[800px] ">
{products.map((product) => (
        <div key={product.id}> {/* Add a key prop for each product */}
         <div > 
          <img 
          src={product.image} 
          alt={`Product ${product.id}`} />
          </div>
          <p className="text-center">{product.title}</p>
          <p>Price: ${product.price}</p>
          <button 
          className="bg-blue-800 text-white p-3 rounded-lg"
          onClick={()=>addToCart(product)}>
          Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
