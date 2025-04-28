import React from "react";

const CrafterTemplates = () => {
  // Dummy templates for now
  const templates = [
    {
      _id: "1",
      name: "Rustic Oak Coffee Table",
      description: "Handmade oak table with a rustic finish.",
      mainImage: "https://via.placeholder.com/250x150?text=Oak+Table",
    },
    {
      _id: "2",
      name: "Handmade Leather Wallet",
      description: "Genuine leather wallet crafted by hand.",
      mainImage: "https://via.placeholder.com/250x150?text=Leather+Wallet",
    },
    {
      _id: "3",
      name: "Custom Embroidered Pillow",
      description: "Pillow with personalized embroidery design.",
      mainImage: "https://via.placeholder.com/250x150?text=Embroidered+Pillow",
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎨 Your Templates</h1>

      {templates.length === 0 ? (
        <p>No templates found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1rem" }}>
          {templates.map((template) => (
            <div
              key={template._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                width: "250px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>🎨 {template.name}</h3>
              <img
                src={template.mainImage}
                alt={template.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#555" }}>
                {template.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrafterTemplates;
