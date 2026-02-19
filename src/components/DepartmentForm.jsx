import { useState, useEffect } from 'react';

const DepartmentForm = ({ onAddDepartment, editDepartment }) => {
  const [name, setName] = useState('');
  const [head, setHead] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editDepartment) {
      setName(editDepartment.name);
      setHead(editDepartment.head || '');
      setDescription(editDepartment.description || '');
    }
  }, [editDepartment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !head.trim() || !description.trim()) {
      alert('Please fill all fields');
      return;
    }

    onAddDepartment({
      name: name.trim(),
      head: head.trim(),
      description: description.trim(),
    });

    setName('');
    setHead('');
    setDescription('');
  };

  return (
    <form className="department-form" onSubmit={handleSubmit}>
      <h3>Department Details</h3>

      <input
        type="text"
        placeholder="Department Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Department Head *"
        value={head}
        onChange={(e) => setHead(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        {editDepartment ? 'Update Department' : 'Add Department'}
      </button>

      <div className="dept-form-divider"></div>
    </form>
  );
};

export default DepartmentForm;
