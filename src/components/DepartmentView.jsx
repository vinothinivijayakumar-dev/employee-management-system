const DepartmentView = ({ selectedDepartment, onClose }) => {
  return (
    <div className="View-DepartmentCard">
      <h3>Department Details</h3>

      <div className="view-row">
        <span>Department</span>
        <p>{selectedDepartment.name}</p>
      </div>

      <div className="view-row">
        <span>Head</span>
        <p>{selectedDepartment.head || '-'}</p>
      </div>

      <div className="view-row">
        <span>Description</span>
        <p>{selectedDepartment.description || '-'}</p>
      </div>

      <button className="close-view" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default DepartmentView;
