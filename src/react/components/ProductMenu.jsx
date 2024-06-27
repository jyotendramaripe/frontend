import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const { firmId, firmName } = useParams();
  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
      //console.log(newProductData);
    } catch (error) {
      console.error("failed to fetch products", error);
    }
  };
  useEffect(() => {
    productHandler();
  }, []);

  return (
    <>
      <NavBar />
      <section className="productSection">
        <h3>{firmName}</h3>
        {products.map((item) => {
          return (
            <div className="productBox">
              <div>
                <div>
                  <strong>{item.productName}</strong>
                </div>
                <div>₹{item.price}</div>
                <div>{item.description}</div>
              </div>
              <div className="productGroup">
                <img src={`${API_URL}/uploads/${item.image}`} />
                <div className="addButton">ADD</div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ProductMenu;
