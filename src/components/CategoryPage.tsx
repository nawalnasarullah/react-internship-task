// import { Category } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from './DataTable';
import DepartmentList from './DepartmentList';

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1 className='cat-heading'>Category Page</h1>
      <DataTable />
      <DepartmentList />
    </div>
  );
};

export default CategoryPage;
