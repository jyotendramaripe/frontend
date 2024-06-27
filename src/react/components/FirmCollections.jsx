import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors);
      //console.log("firmData", newFirmData);
    } catch (error) {
      alert("failed to fetch firm data");
      console.error("failed to fetch firm data", error);
    }
  };
  useEffect(() => {
    firmDataHandler();
  }, []);

  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActiveCategory(category);
  };
  return (
    <>
      <h2>Restaurants with online food delivery in Hyderabad</h2>
      <div className="filterButton">
        <button
          onClick={() => filterHandler("All", "All")}
          className={activeCategory === "All" ? "activeButton" : ""}
        >
          All
        </button>
        <button
          onClick={() => filterHandler("South-Indian", "South-Indian")}
          className={activeCategory === "South-Indian" ? "activeButton" : ""}
        >
          South-Indian
        </button>
        <button
          onClick={() => filterHandler("North-Indian", "North-Indian")}
          className={activeCategory === "North-Indian" ? "activeButton" : ""}
        >
          North-Indian
        </button>
        <button
          onClick={() => filterHandler("Chinese", "Chinese")}
          className={activeCategory === "Chinese" ? "activeButton" : ""}
        >
          Chinese
        </button>
        <button
          onClick={() => filterHandler("Bakery", "Bakery")}
          className={activeCategory === "Bakery" ? "activeButton" : ""}
        >
          Bakery
        </button>
      </div>
      <section className="firmSection">
        {firmData.map((thing) => {
          return thing.firm.map((item) => {
            if (
              selectedRegion == "All" ||
              item.region.includes(selectedRegion)
            ) {
              return (
                <Link
                  to={`/products/${item._id}/${item.firmName}`}
                  className="link"
                >
                  <div className="firmGroupBox">
                    <div className="firmGroup">
                      <img src={`${API_URL}/uploads/${item.image}`} />
                      <div className="firmOffer">{item.offer}</div>
                    </div>
                    <div className="firmDetails">
                      <div className="firmName">
                        <strong>{item.firmName}</strong>
                      </div>
                      <div className="firmArea">{item.region.join(",")}</div>
                      <div className="firmArea">{item.area}</div>
                    </div>
                  </div>
                </Link>
              );
            }
          });
          return null;
        })}
      </section>
    </>
  );
};

export default FirmCollections;
