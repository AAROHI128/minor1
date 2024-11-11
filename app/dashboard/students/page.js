"use client"
import React, { useEffect, useState } from 'react';
import AddNewStudent from './_components/AddNewStudent';
 // Make sure the path is correct
import GlobalApi from '../../_services/GlobalApi';
import Studentlisttable from './_components/Studentlisttable';
function Student() {
  const [studentslist,setstudentslist]=useState([]);
  useEffect(()=>{
    GetAllStudents();
  },[])
  const GetAllStudents = () => {
    GlobalApi.GetAllStudents()
      .then(resp => {
        if (resp && resp.data) setstudentslist(resp.data);
      })
      .catch(error => console.error("Error fetching students:", error));
  };
  
  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl flex justify-between items-center'>
        Students
        <AddNewStudent /> {/* Add this line to render the AddNewStudent component */}
      </h2>
      <Studentlisttable studentslist={studentslist}
        refreshData={GetAllStudents}
      />
    </div>
  );
}

export default Student;
