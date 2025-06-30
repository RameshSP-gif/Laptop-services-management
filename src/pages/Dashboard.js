import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({ user_id: '', device_model: '', issue_description: '', status: 'pending' });
  const [editId, setEditId] = useState(null);

  const fetchRequests = () => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/api/services/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/api/services', form);
    }
    setForm({ user_id: '', device_model: '', issue_description: '', status: 'pending' });
    fetchRequests();
  };

  const handleEdit = (req) => {
    setForm(req);
    setEditId(req.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/services/${id}`);
    fetchRequests();
  };

  return (
    <div>
      <h2>Service Requests</h2>

      <div>
        <input placeholder="User ID" value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })} />
        <input placeholder="Device Model" value={form.device_model} onChange={e => setForm({ ...form, device_model: e.target.value })} />
        <input placeholder="Issue Description" value={form.issue_description} onChange={e => setForm({ ...form, issue_description: e.target.value })} />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="delivered">Delivered</option>
        </select>
        <button onClick={handleSubmit}>{editId ? 'Update' : 'Add'} Request</button>
      </div>

      <ul>
        {requests.map(req => (
          <li key={req.id}>
            {req.device_model} - {req.issue_description} - {req.status}
            <button onClick={() => handleEdit(req)}>Edit</button>
            <button onClick={() => handleDelete(req.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
