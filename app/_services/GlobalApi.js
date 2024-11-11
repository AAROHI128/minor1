import axios from "axios";

const GetAllBatch = () => axios.get('/api/batch');
const CreateNewStudent = (data) => axios.post('/api/student', data);
const GetAllStudents = () => axios.get('/api/student');
const deletestudentRecord = (id) => axios.delete(`/api/student?id=${id}`);

export default {
  GetAllBatch,
  CreateNewStudent,
  GetAllStudents,
  deletestudentRecord
};
