import React, { useEffect, useState } from "react";
import ALayout from "../../components/Layout/ALayout";
import TransactionTable from "../../components/Table/TransactionTable";
import ActionButton from "../../components/ActionButtons/ActionButton";
import { IoMdSearch } from "react-icons/io";
import "./Transactions.css";
import Pagination from "../../components/Pagination/Pagination";
import TransactionForm from "../../components/Forms/TransactionForm";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost/api/getTransaction.php?search=${searchQuery}&status=${selectedStatus}&page=${currentPage}`
        );
        const data = await response.json();
        console.log("Fetched Transactions:", data);
        setTransactions(data.transactions || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [searchQuery, selectedStatus, currentPage]);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost/api/addTransaction.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const result = await response.json();
      console.log("Add Transaction Response:", result);

      if (response.ok) {
        alert(result.message || "Transaction added successfully");
        setCurrentPage(1);
        setSearchQuery("");
        setSelectedStatus("all");
      } else {
        alert(result.error || "Failed to add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("An error occurred while adding the transaction");
    }
  };

  const handleEditTransaction = async (transactionID, updatedTransaction) => {
    try {
      const response = await fetch(
        `http://localhost/api/editTransaction.php?id=${transactionID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTransaction),
        }
      );

      const result = await response.json();
      console.log("Edit Transaction Response:", result);

      if (response.ok) {
        alert(result.message || "Transaction updated successfully");
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.transactionID === transactionID
              ? { ...transaction, ...updatedTransaction }
              : transaction
          )
        );
      } else {
        alert(result.error || "Failed to update transaction");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("An error occurred while updating the transaction");
    }
  };

  const handleDeleteTransaction = async (transactionID) => {
    try {
      const response = await fetch(
        `http://localhost/api/deleteTransaction.php?id=${transactionID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      console.log("Delete Transaction Response:", result);

      if (response.ok) {
        alert(result.message || "Transaction deleted successfully");
        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction.transactionID !== transactionID
          )
        );
      } else {
        alert(result.error || "Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("An error occurred while deleting the transaction");
    }
  };

  return (
    <ALayout title="Transactions">
      <div className="transactions-content">
        <header className="transaction-header">
          <div className="transaction-filter">
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search by book or borrower . . . . . . ."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <IoMdSearch className="search-icon" />
            </div>

            <select
              className="filter-status"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="transaction-buttons">
            <ActionButton
              label="+ Add Transaction"
              onClick={() => setIsTransactionFormOpen(true)}
            />
          </div>
        </header>

        <TransactionTable
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleEditTransaction}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {isTransactionFormOpen && (
        <TransactionForm
          onClose={() => setIsTransactionFormOpen(false)}
          mode="add"
          onSubmit={(formData) => {
            handleAddTransaction(formData);
            setIsTransactionFormOpen(false);
          }}
        />
      )}
    </ALayout>
  );
};

export default Transactions;