import React from "react";

const Header = ({ cartCount }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div className="flex items-center">
          <span className="text-xl mr-2">🛒</span>
          <span className="border-2 rounded-full bg-white text-blue-600
            w-[50px] sm:w-[200px] md:w-[50px] lg:w-[40px] xl:w-[40px] 
            h-[50px] sm:h-[200px] md:h-[50px] lg:h-[40px] xl:h-[40px] 
            flex items-center justify-center">
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;