import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom/";

const Card = ({
  product,
  addToCartButton = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "Default title";
  const cardDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default price";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div className="card text-white border border-info card-container">
      <div className="card-header lead card-header custom-product-name">
        {cardTitle}
      </div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead card-description">{cardDescription}</p>
        <p className="btn rounded  btn-sm px-4 card-price">$ {cartPrice}</p>
        <div className="row row-container">
          <div className="col-12">
            {addToCartButton && (
              <button onClick={addToCart} className="btn btn-block card-button">
                Add to Cart
              </button>
            )}
          </div>
          <div className="col-12">
            {removeFromCart && (
              <button
                onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload);
                }}
                className="btn btn-block card-button"
              >
                Remove from Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
