import React, { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  }

  function handleSubmit () {
    fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(r => r.json())
      .then(newTransaction => onAddTransaction(newTransaction));

    setFormData({
      date: "",
      description: "",
      category: "",
      amount: 0,
    });
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit = { handleSubmit }>
        <div className="inline fields">
          <input type="date" name="date" onChange = { handleChange }/>
          <input type="text" name="description" placeholder="Description" onChange = { handleChange } />
          <input type="text" name="category" placeholder="Category" onChange = { handleChange }/>
          <input type="number" name="amount" placeholder="Amount" step="0.01" onChange = { handleChange }/>
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
