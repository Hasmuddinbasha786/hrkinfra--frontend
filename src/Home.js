import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // axios.get("https://hrkinfra.onrender.com/properties/")
      axios.get(`${process.env.REACT_APP_API_URL}/properties/`)
      .then(res => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // ✅ Filtering logic
  const filteredProperties = properties.filter(p => {
    const matchesLocation = p.location
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesPrice =
      maxPrice === "" || p.price <= Number(maxPrice);

    return matchesLocation && matchesPrice;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>

      {/* Header */}
      <div
        style={{
          backgroundColor: "#0d6efd",
          color: "white",
          padding: "15px 20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2 style={{ margin: 0 }}>HRK Infra</h2>
        <span>Real Estate</span>
      </div>

      {/* Search Inputs */}
      <div style={{ padding: "0 20px" }}>
        <input
          type="text"
          placeholder="Search by Location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="number"
          placeholder="Max Price..."
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        <h1>HRK Infra Properties</h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center"
          }}
        >

          {/* ✅ No Results */}
          {filteredProperties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (

            /* ✅ Property Cards */
            filteredProperties.map(p => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #eee",
                  padding: "10px",
                  width: "260px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                  transition: "0.3s"
                }}
              >
                <h3 style={{ margin: "10px 0" }}>{p.title}</h3>

                <img
                  src={p.image}
                  alt="property"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover"
                  }}
                />

                <p style={{ fontWeight: "bold", color: "green" }}>
                  ₹ {p.price.toLocaleString()}
                </p>

                <p>{p.location}</p>

                <Link to={`/property/${p.id}`}>
                  <button
                    style={{
                      marginTop: "10px",
                      padding: "8px",
                      width: "100%",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
}

export default Home;