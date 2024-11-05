import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-purple-950 text-white py-1 items-center">
      <div className="logo">
        <span className="text-2xl font-bold">ToDoEase</span>
      </div>

      <ul className="flex gap-10">
        <li className="cursor-pointer text-gray-300 hover:text-white duration-75">Home</li>
        <li className="cursor-pointer text-gray-300 hover:text-white duration-75">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
