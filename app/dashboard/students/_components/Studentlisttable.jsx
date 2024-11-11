import React, { useState, useEffect } from 'react';  // Add imports
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function Studentlisttable({studentslist, refreshData}) {
    const CustomButtons = (props) => {
        return (
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button size="sm" variant="destructive"><Trash /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your record
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    const [colDefs, setColDefs] = useState([
        { field: "id", filter: true },
        { field: "name", filter: true },
        { field: "enrollment", filter: true },
        { field: "email", filter: true },
        { field: 'action', cellRenderer: CustomButtons }
    ]);
    const [rowData, setRowData] = useState();
    const [searchInput, setSearchInput] = useState();

    useEffect(() => {
        if (studentslist) setRowData(studentslist);
    }, [studentslist]);

    const deleteRecord = (id) => {
        GlobalApi.deletestudentRecord(id).then(resp => {
            if (resp) {
                toast('Record deleted successfully');
                refreshData();
            }
        });
    };

    return (
        <div className='my-7'>
            <div className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
                    {/* Remove <Search /> and use the input field directly */}
                    <input
                        type='text'
                        placeholder='Search on anything...'
                        className='outline-none w-full'
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    quickFilterText={searchInput}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default Studentlisttable;
