import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [ transactions, setTransactions ] = useState([]);
  const [ search, setSearch ] = useState('');
  const filteredTransactions = transactions.filter( transaction => 
    transaction.description.includes(search) );

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(r => r.json())
      .then(data => setTransactions(data))
  }, []);

  function handleAddTransaction (newTransaction) {
    setTransactions([
      ...transactions,
      newTransaction
    ])
  }

  function handleSearch (searchT) {
    setSearch(searchT);
  }


  return (
    <div>
      <Search onSearch = { handleSearch }/>
      <AddTransactionForm onAddTransaction = { handleAddTransaction }/>
      <TransactionsList transactions = { filteredTransactions }/>
    </div>
  );
}

export default AccountContainer;
