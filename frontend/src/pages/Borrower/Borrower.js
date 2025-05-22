import React, {  useState, useEffect, useCallback } from 'react';
import ALayout from '../../components/Layout/ALayout';
import ActionButton from '../../components/ActionButtons/ActionButton';
import BorrowerForm from '../../components/Forms/BorrowerForm';
import BorrowerTable from '../../components/Table/BorrowerTable';
import Pagination from '../../components/Pagination/Pagination';
import { IoMdSearch } from 'react-icons/io';
import './Borrower.css';
import { toast } from 'react-toastify';


const Borrower = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [isBorrowerFormOpen, setIsBorrowerFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formInitialData, setFormInitialData] = useState({});
  const [formMode, setFormMode] = useState('add');

  
    const fetchBorrowers = useCallback(async () => {
  try {
    const response = await fetch(
      `http://localhost/api/borrowers.php?search=${searchQuery}&type=${selectedType}&yearLevel=${selectedYearLevel}&page=${currentPage}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();

    if (response.ok) {
      setBorrowers(data.borrowers || []);
      setTotalPages(data.totalPages || 1);
    } else {
      console.error('Failed to fetch borrowers:', data.error);
    }
  } catch (error) {
    console.error('Error fetching borrowers:', error);
  }
}, [searchQuery, selectedType, selectedYearLevel, currentPage]);

useEffect(() => {
  fetchBorrowers();
}, [fetchBorrowers]);

  const handleEdit = async (borrowerID, updatedData) => {
    try {
      const response = await fetch(`http://localhost/api/editBorrower.php?id=${borrowerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Borrower updated successfully');
        setBorrowers((prevBorrowers) =>
          prevBorrowers.map((borrower) =>
            borrower.BorrowerID === borrowerID ? { ...borrower, ...updatedData } : borrower
          )
        );
      } else {
        alert(result.error || 'Failed to update borrower');
      }
    } catch (error) {
      console.error('Error updating borrower:', error);
      alert('An error occurred while updating the borrower');
    }
  };

  const handleDelete = async (borrowerID) => {
    try {
      const response = await fetch(`http://localhost/api/deleteBorrower.php?id=${borrowerID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Borrower deleted successfully');
        setBorrowers((prevBorrowers) =>
          prevBorrowers.filter((borrower) => borrower.BorrowerID !== borrowerID)
        );
      } else {
        alert(result.error || 'Failed to delete borrower');
      }
    } catch (error) {
      console.error('Error deleting borrower:', error);
      alert('An error occurred while deleting the borrower');
    }
  };

  const handleAdd = (newBorrower) => {
  const normalizedBorrower = {
    BorrowerID: newBorrower.borrowerID,
    EmailAddress: newBorrower.emailAddress,
    Name: newBorrower.Name,
    BorrowerTypeID: newBorrower.borrowerTypeID,
    ProgramID: newBorrower.programID,
    YearLevel: newBorrower.yearLevel,
  };

  setBorrowers(prev => [...prev, normalizedBorrower]);
};

  const handleAddClick = () => {
    setFormInitialData({});
    setFormMode('add');
    setIsBorrowerFormOpen(true);
  };

  return (
    <ALayout title='Borrower Management'>
      <div className='borrower-content'>
        <header className='borrower-header'>
          <div className='borrower-filter'>
            <div className='search-bar'>
              <input
                type='search'
                placeholder='Search by name or ID . . . . . . .'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoMdSearch className='search-icon' />
            </div>

            <select className='type' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value='all'>All Borrower Type ID</option>
              <option value='ST01'>Student</option>
              <option value='FC01'>Faculty</option>
            </select>

            <select className='year-level' value={selectedYearLevel} onChange={(e) => setSelectedYearLevel(e.target.value)}>
              <option value='all'>All Year Level</option>
              <option value='1'>1st Year</option>
              <option value='2'>2nd Year</option>
              <option value='3'>3rd Year</option>
              <option value='4'>4th Year</option>
            </select>
          </div>

          <div className='buttons'>
            <ActionButton label='+ Add Borrower' onClick={handleAddClick} />
          </div>
        </header>

        <BorrowerTable
          borrowers={borrowers}
          onDeleteBorrower={handleDelete}
          onEditBorrower={(borrower) => {
            setFormInitialData(borrower);
            setFormMode('edit');
            setIsBorrowerFormOpen(true);
          }}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {isBorrowerFormOpen && (
  <BorrowerForm
    onClose={() => setIsBorrowerFormOpen(false)}
    mode={formMode}
    initialData={formInitialData}
    onSubmit={async (formData) => {        
      if (formMode === 'edit') {
        handleEdit(formData.borrowerID, formData);
      } else {
        handleAdd(formData);
      }
      await fetchBorrowers();
      setIsBorrowerFormOpen(false);
    }}
  />
)}
    </ALayout>
  );
};

export default Borrower;
