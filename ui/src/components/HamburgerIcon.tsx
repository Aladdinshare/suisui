import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const HamburgerIcon = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative bg-blue-600 text-white rounded-md">
      <div className="absolute top-0 right-0 m-2 z-50">
        <div className="hamburger-icon" onClick={handleMenuToggle}>
          <AiOutlineMenu />
        </div>
      </div>
      {isMenuOpen && (
        <div className="menu-items">
          {children}
        </div>
      )}
    </div>
  );
};

export default HamburgerIcon;

