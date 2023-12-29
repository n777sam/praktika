import React from 'react';
import Button from './Button'

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
        <div className="flex-box">
            <h1>{title}</h1>
            <div className="button-box">
                <Button text="Настя" onClick={()=>{}}/>
            </div>
        </div>
    </header>
  );
};

export default Header;