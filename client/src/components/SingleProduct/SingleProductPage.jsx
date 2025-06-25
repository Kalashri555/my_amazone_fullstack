import React, { useContext, useState } from 'react'
import './SingleProductPage.css'
import config from '../../config.json';
import QuantityInput from './QuantityInput';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';
import Loader from '../Common/Loader';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';


// const product = {
//   id: 1,
//   title: "Product Title",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
//   price: 9.99,
//   images: [
//     "https://picsum.photos/id/237/500/500", // Dog
//     "https://picsum.photos/id/238/500/500", // Random image
//     "https://picsum.photos/id/239/500/500",
//     "https://picsum.photos/id/240/500/500",
//   ],
//   stock: 10,
// };

const SingleProductPage = () => {
    
    
    const [selectedImage, setselectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext); 

    const user = useContext(UserContext);
    const {id} = useParams()

    const {data: product, error, isLoading} = useData(`/products/${id}`)
  return (
   <section className='align_center single_product'>
    {error && <em className='form_error'>{error}</em>}
    {isLoading && <Loader />}
     {product && <>
       <div className='align_center'>
         <div className="single_product_thumbnails">
            {
               product.images.map((image, index) => (
                    <img
                    key={index}
                     src={`${config.backendURL}/products/${image}`}
                    alt={product.title}
                    className={selectedImage === index ? 'selected_image' : ''}
                   onClick={() => setselectedImage(index)}
  />
))

            }
        </div>
        <img src={`${config.backendURL}/products/${product.images[selectedImage]}`} alt={product.title}
        className='single_product_display' />
     </div>
    
     <div className='single_product_details'>
        <h1 className="single_product_title">{product.title}</h1>
        <p className="single_product_desctiption">{product.description}
        </p>
        <p className='single_product_price'>${product.price.toFixed(2)}
        </p>
        {user && <> <h2 className="quantity_title">Quantity:</h2>
        <div className="align_center quantity_input">
          <QuantityInput  quantity={quantity} 
          setQuantity={setQuantity} 
          stock={product.stock}  />
        </div>

        <button className='search_button add_cart' onClick={() => addToCart(product, quantity)}>
          Add to Cart</button> </> }
     </div>
     </>
     }
   </section>
  )
}



export default SingleProductPage
