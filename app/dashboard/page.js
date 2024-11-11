"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from 'react';





function Dashboard() {
    const { setTheme } = useTheme();
    const [selectedMonth, setSelectedMonth] = useState();

    useEffect(() => {
        setTheme('dark');
    }, [setTheme]);

    return (
        <div className='p-10'>
            <h2 className='font-bold text-2xl'>Dashboard</h2>
            <div>
                {/* Pass selectedMonth, not setSelectedMonth */}
 
            </div>
        </div>
    );
}

export default Dashboard;
