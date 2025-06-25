import React, { useContext } from 'react';
import './Navbar.css';
import rocket from '../../assets/rocket.png';
import star from '../../assets/glowing_star.png';
import idButton from '../../assets/id-button.png';
import memo from '../../assets/creative-writing.png';
import order from '../../assets/box.png';
import lock from '../../assets/lock.png';
import LinkWithIcon from './LinkWithIcon';
import { NavLink } from 'react-router-dom';
import UserContext from './../../contexts/UserContext';
import { UseContext } from 'react';
import CartContext from '../../contexts/CartContext';

const Navbar = ({ user }) => {
  const {cart} = useContext(CartContext)
  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">Amazone</h1>
        <form className="align_center navbar_form">
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />

        {!user && (
          <>
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}

        {user && (
          <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
