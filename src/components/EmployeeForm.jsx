import { useState, useEffect } from 'react';

const EmployeeForm = ({ onAddEmployee, editEmployee }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');

  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name);
      setRole(editEmployee.role);
      setExperience(editEmployee.experience);
    }
  }, [editEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Block empty submission
    if (!name.trim() || !role.trim() || !experience.trim()) {
      alert('Please fill all fields');
      return;
    }

    onAddEmployee({
      name: name.trim(),
      role: role.trim(),
      experience: experience.trim(),
    });

    setName('');
    setRole('');
    setExperience('');
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        type="text"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <button type="submit">
        {editEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
