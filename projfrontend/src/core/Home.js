import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../../src/backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base
      title="ShopWave"
      description="A store for all your needs"
      className="bold-text"
    >
      <div className="row text-center p-4 custom-style">
        <h1 className="text-white ml-4 mb-3">All Products</h1>
        <div className="row m-2">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-3 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
