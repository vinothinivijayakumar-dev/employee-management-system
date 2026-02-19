const EmployeeCard = ({ employee, onDelete, index }) => {
  return (
    <div className="employee-card">
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Experience:</strong> {employee.experience}</p>

      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
};

export default EmployeeCard;
