import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function PropertyDetail() {

  // 🔹 URL param
  const { id } = useParams();

  // 🔹 Property data
  const [property, setProperty] = useState(null);

  // 🔹 Form states (FIXED: moved inside component)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Fetch property
  useEffect(() => {
    axios.get(`http://localhost:8000/properties/${id}/`)
      .then(res => setProperty(res.data))
      .catch(err => console.log(err));
  }, [id]);

  // 🔹 Submit form
  const submitForm = () => {
    axios.post("http://localhost:8000/inquiry/", {
      name,
      phone,
      message
    })
    .then(() => {
      alert("Submitted Successfully");
      setName("");
      setPhone("");
      setMessage("");
    })
    .catch(err => console.log(err));
  };

  // 🔹 WhatsApp share
  const shareOnWhatsApp = () => {
    // change here number for whatsapp details IMPORTANT *************
    const phoneNumber = "91786786786";

    const text = `🏠 *HRK Infra Property*

📌 *${property.title}*

💰 Price: ₹${property.price.toLocaleString()}
📍 Location: ${property.location}

👉 View Details:
http://localhost:3000/property/${property.id}`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`);
  };

  // 🔹 Loading
  if (!property) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>

      <img
        src={property.image}
        alt="property"
        style={{
          width: "300px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      <h2>{property.title}</h2>
      <p><strong>Price:</strong> ₹ {property.price.toLocaleString()}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p>{property.description}</p>

      {/* Buttons */}
      <div style={{ marginTop: "10px" }}>
        <a href="tel:123456789">
          <button style={{ marginRight: "10px" }}>Call Now</button>
        </a>

        <button onClick={shareOnWhatsApp}>
          Chat on WhatsApp
        </button>
      </div>

      {/* Contact Form */}
      <div style={{ marginTop: "30px" }}>
        <h3>Contact</h3>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "8px", width: "250px" }}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "8px", width: "250px" }}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ display: "block", marginBottom: "10px", padding: "8px", width: "250px" }}
        />

        <button onClick={submitForm}>
          Submit
        </button>
      </div>

    </div>
  );
}

export default PropertyDetail;