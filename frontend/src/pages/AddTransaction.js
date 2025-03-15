import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AddTransaction() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Add Transaction</h1>
      
      <div className="card p-4 mt-4">
        <h4>Transaction Details</h4>
        
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select className="form-select" disabled>
            <option>Income</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input type="text" className="form-control" placeholder="$0.00" disabled />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" disabled>
            <option>Food</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="text" className="form-control" placeholder="12/08/2023" disabled />
        </div>
        
        <button className="btn btn-primary w-100" disabled>Add Transaction</button>
      </div>
    </div>
  );
}

export default AddTransaction;
