import React, { useEffect, useState, useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import './CartPage.css';
import remove from '../../assets/delete.png';
import Table from '../Common/Table';
import QuantityInput from '../SingleProduct/QuantityInput';
import fallbackUser from "../../assets/user.png"; // fallback image
import CartContext from './../../contexts/CartContext';
// import { addToCartAPI } from './../../services/cartServices';
import { checkoutAPI } from '../../services/orderServices';
import { toast } from 'react-toastify';


const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const userObj = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      if (item && item.product && typeof item.product.price === 'number') {
        total += item.product.price * item.quantity;
      }
    });
    setSubTotal(total);
  }, [cart]);


  const checkout = () => {
       const oldCart = [...cart]
       setCart([])
       checkoutAPI().then(() => {
        toast.success("Checkout Successful!");
       
      }).catch(() => {
         toast.error("Checkout Failed!");
         setCart(oldCart); // rollback to previous state
      })
  }

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={
            userObj?.profilePic
              ? `http://localhost:5000/profile/${userObj.profilePic}`
              : fallbackUser
          }
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {userObj?.name || "Guest"}</p>
          <p className="user_email">Email: {userObj?.email || "Not Logged In"}</p>
        </div>
      </div>

      <Table headings={['Item', 'Price', 'Quantity', 'Total', 'Remove']}>
        <tbody>
          {cart
            .filter(item => item && item.product) // filter invalid items
            .map(({ product, quantity }, index) => (
              <tr key={product._id || index}>
                <td>{product.title}</td>
                <td>${product.price.toFixed(2)}</td>
                <td className="align_center table_quantity_input">
                  <QuantityInput quantity={quantity} stock={product.stock || 0} 
                    setQuantity={updateCart}
                    cartPage={true}
                    productId= {product._id}
                  />
                </td>
                <td>${(quantity * product.price).toFixed(2)}</td>
                <td>
                  <img
                    src={remove}
                    alt="remove icon"
                    className="cart_remove_icon"
                    onClick={() => removeFromCart(product._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5.00</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${(subTotal + 5).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}
      >Checkout</button>
    </section>
  );
};

export default CartPage;
