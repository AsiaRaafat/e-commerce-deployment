import { useCart } from './CartContext';

const AddToCartButton = ({ Products }) => {
  const { addToCart } = useCart();

  return (
    <button className='Show' onClick={() => addToCart(Products)}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;




