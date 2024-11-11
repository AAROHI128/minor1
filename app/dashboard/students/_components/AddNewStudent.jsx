"use client"
import React, { useEffect, useState } from 'react';
import Input from '@/components/ui/input';  // Assuming you're using the default export
import Button from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import GlobalApi from '@/app/_services/GlobalApi';

function AddNewStudent({ refreshData }) {
  const [open, setOpen] = useState(false);
  const [batch, setBatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);  // Add this state to track client-side rendering
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    GetAllBatch();
    setIsClient(true);  // Set to true after component is mounted
  }, []);

  const GetAllBatch = async () => {
    try {
      const resp = await GlobalApi.Getbatch();
      setBatch(resp.data);
    } catch (error) {
      console.error("Failed to fetch batches:", error);
      toast.error("Error fetching batches.");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const resp = await GlobalApi.CreateNewStudent(data);
      if (resp.data) {
        reset();
        setOpen(false);
        toast.success('New Student Added!');
        refreshData(); // Call refreshData to update the student list
      }
    } catch (error) {
      console.error("Failed to add new student:", error);
      toast.error("Error adding student.");
    } finally {
      setLoading(false);
    }
  };

  // Don't render the form until after client-side hydration
  if (!isClient) {
    return null;  // Avoid rendering the form initially
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-2'>
                  <label>Full Name</label>
                  <Input placeholder='Ex. Arnav' {...register('name', { required: true })} />
                  {errors.name && <span className="error">Name is required</span>}
                </div>
                <div className='py-2'>
                  <label>Email</label>
                  <Input type="email" placeholder='Ex. arnav@example.com' {...register('email', { required: true })} />
                  {errors.email && <span className="error">Email is required</span>}
                </div>
                <div className='py-2'>
                  <label>Enrollment</label>
                  <Input type="number" placeholder='Ex. 9922103215' {...register('enrollment', { required: true })} />
                  {errors.enrollment && <span className="error">Enrollment is required</span>}
                </div>
                <div className='py-2'>
                  <label>Batch</label>
                  <select className='p-3 border rounded-lg' {...register('batch', { required: true })}>
                    <option value="">Select Batch</option>
                    {batch.map((item, index) => (
                      <option key={index} value={item.grade}>{item.grade}</option>
                    ))}
                  </select>
                  {errors.batch && <span className="error">Batch is required</span>}
                </div>
                <div className='flex gap-3 items-center justify-end mt-5'>
                  <Button type="button" onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? <LoaderIcon className='animate-spin' /> : 'Save'}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
