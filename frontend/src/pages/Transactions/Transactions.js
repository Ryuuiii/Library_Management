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
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // for editing
  const [formMode, setFormMode] = useState("add"); // add or edit
  const [formData, setFormData] = useState(null);
  
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

  useEffect(() => {
    fetchTransactions();
  }, [searchQuery, selectedStatus, currentPage]);

  const handleAddTransaction = async (newTransaction) => {
    console.log("Transaction Data Sent to Backend:", newTransaction); // Debugging

    try {
      const response = await fetch("http://localhost/api/addTransaction.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        const errorData = await response.text(); // Read the raw response
        console.error("Error Response:", errorData);
        alert("Failed to add transaction. Check the backend for errors.");
        return;
      }

      const result = await response.json();
      console.log("Add Transaction Response:", result);

      alert(result.message || "Transaction added successfully");
      fetchTransactions(); // Refresh the transactions list
      setIsTransactionFormOpen(false); // Close the form
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("An error occurred while adding the transaction");
    }
  };

  const handleEditTransaction = async (transactionID, updatedTransaction) => {
    console.log("Transaction Data Sent to Backend:", updatedTransaction); // Debugging

    try {
      const response = await fetch(`http://localhost/api/editTransaction.php?id=${transactionID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (!response.ok) {
        const errorData = await response.text(); // Read the raw response
        console.error("Error Response:", errorData);
        alert("Failed to update transaction. Check the backend for errors.");
        return;
      }

      const result = await response.json();
      console.log("Edit Transaction Response:", result);

      alert(result.message || "Transaction updated successfully");
      fetchTransactions(); // Refresh the transactions list
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("An error occurred while updating the transaction");
    }
  };

  const handleDeleteTransaction = async (transactionID) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost/api/deleteTransaction.php?id=${transactionID}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();
      console.log("Delete Transaction Response:", result);

      if (response.ok) {
        alert(result.message || "Transaction deleted successfully");
        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction.TransactionID !== transactionID
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoMdSearch className="search-icon" />
            </div>

            <select
              className="filter-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
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
        onEditClick={(transaction) => {
          setSelectedTransaction(transaction);
          setFormMode("edit");
          setIsTransactionFormOpen(true);
          }}
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
    mode={formMode}
    initialData={selectedTransaction}
    onSubmit={(formData) => {
      const formattedData = {
        transactionID: formData.transactionID,
        BorrowerID: formData.borrowerID,
        BookID: formData.bookID,
        TransactionType: formData.transactionType,
        Status: formData.status,
        BorrowDate: formData.borrowDate,
        DueDate: formData.dueDate,
        returnDate: formData.returnDate
      };
    
      if (formMode === "edit") {
        handleEditTransaction(selectedTransaction.TransactionID, formattedData);
      } else {
        handleAddTransaction(formattedData); // Make sure `addTransaction.php` accepts same keys
      }
      setIsTransactionFormOpen(false);
    }}
  />
)}
    </ALayout>
  );
};

export default Transactions;