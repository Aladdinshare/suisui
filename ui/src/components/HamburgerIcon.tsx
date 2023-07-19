import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const HamburgerIcon = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="hamburger-icon" onClick={handleMenuToggle}>
        <AiOutlineMenu />
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
