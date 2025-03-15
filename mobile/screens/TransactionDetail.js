import React from "react";

function TransactionDetails() {
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Transaction Details</h1>
      
      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <h4>Transaction Title</h4>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Date</span>
          <span>3/11/2025</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Type</span>
          <span>Expense</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Amount</span>
          <span>$50</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Categories</span>
          <span>Education</span>
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Notes</span>
          <p style={{ color: "#666" }}>Further details about the transaction can go here.</p>
        </div>
        
        <button style={{ width: "100%", padding: "10px", borderRadius: "5px", background: "#6a5acd", color: "white", border: "none", marginBottom: "10px" }}>
          ✏️ Update
        </button>
        <button style={{ width: "100%", padding: "10px", borderRadius: "5px", background: "#dc3545", color: "white", border: "none" }}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionDetails;
