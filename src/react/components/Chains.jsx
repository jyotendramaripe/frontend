import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { Hourglass } from "react-loader-spinner";

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newData = await response.json();
      setVendorData(newData);
      console.log("this is api Data ", newData);
      setLoading(false);
    } catch (error) {
      alert("failed to fetch data");
      console.error("failed to fetch data");
      setLoading(true);
    }
  };
  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="mediaChainSection">
      <div className="loaderSection">
        {loading && (
          <>
            <div className="loader">Your 🥣 is Loading....</div>
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          </>
        )}
      </div>
      <div className="btnSection">
        <button onClick={() => handleScroll("left")}>
          <IoIosArrowDropleft className="btnIcons" />
        </button>
        <button onClick={() => handleScroll("right")}>
          <IoIosArrowDropright className="btnIcons" />
        </button>
      </div>
      <h3>Top restaurant chains in Hyderabad</h3>
      <section
        className="chainSection"
        id="chainGallery"
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
      >
        {vendorData.vendors &&
          vendorData.vendors.map((vendor) => {
            return (
              <>
                <div className="vendorBox">
                  {vendor.firm.map((item) => {
                    return (
                      <>
                        <div>{/* {item.firmName} */}</div>
                        <div className="firmImage">
                          <img
                            src={`${API_URL}/uploads/${item.image}`}
                            alt=""
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
      </section>
    </div>
  );
};

export default Chains;
