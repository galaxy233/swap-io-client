import React from 'react';

const Header = ({ name }) => {
  return (
    <div className="header-text">
      <div>
        { name }
      </div>
    </div>
  )
}

export default Header;
