
import React from 'react'

function CartItem({cart ,removeFromCart,addToCart,decreaseFromCart }) {
  return (
    <div>
      {cart.map((item)=>(
     <div className="items-right"  key={item.id}>
          <img
          src={item.image}
          alt={item.title}
          className="w-12 h-12 object-contain mr-4"
        />
        <div className="flex-1">
        <h4 className="text-sm font-semibold">{item.title}</h4>
        <p className="text-gray-600">
          ${item.price} x {item.quantity}
        </p>
      </div>
      <div className='flex m-2 gap-4 '>
      <button
        onClick={()=>addToCart(item)}
        className="text-red-600 hover:text-red-800 mx-2">
        +
      </button>
      <button className='border-2 border-black px-2 min-w-[50px] sm:min-w-[200px] md:min-w-[50px] lg:min-w-[50px] xl:min-w-[50px]'>{item.quantity}</button>

      <button
        onClick={()=>decreaseFromCart(item)}  
      >
        -
      </button>
      <button
        onClick={() => removeFromCart(item)}
        className="text-red-600 hover:text-red-800 mx-2">
        Remove
      </button>
      </div>
      
      
      </div>
      ))}  
          </div>
  )
}

export default CartItem

