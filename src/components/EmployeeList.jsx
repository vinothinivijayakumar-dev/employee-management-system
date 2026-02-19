import { FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';

/* Highlight helper */
const highlightText = (text, searchTerm) => {
  if (!searchTerm || !text) return text || '-';

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
};

const EmployeeList = ({
  employees,
  searchTerm,
  onDeleteEmployee,
  onEditEmployee,
  onViewEmployee,
}) => {

  // Search empty state (when search term exists)
  if (employees.length === 0) {
    if (searchTerm) {
      return (
        <div className="no-search-results">
          <FaSearch className="search-icon-empty" />
          <h3>No search results</h3>
          <p>Try a different name or role</p>
        </div>
      );
    }
  }

  // Default empty state (no employees added)
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No employees found</p>
        <span>Add an employee using the form</span>
      </div>
    );
  }

  /* LIST */
  return (
    <>
      <div className="list-header">
        <span>Name</span>
        <span>Role</span>
        <span>Experience</span>
        <span>Action</span>
      </div>

      <ul className="employee-list">
        {employees.map((emp, index) => {
          const isDisabled =
            !emp?.name || !emp?.role || !emp?.experience;

          return (
            <li key={index} className="employee-row">
              <span>{highlightText(emp.name, searchTerm)}</span>
              <span>{highlightText(emp.role, searchTerm)}</span>
              <span>{emp.experience || '-'}</span>

              <div className="action-buttons">
                <button
                  className="action-btn view-btn"
                  disabled={isDisabled}
                  onClick={() => onViewEmployee(emp)}
                >
                  <FaEye /> <span>View</span>
                </button>

                <button
                  className="action-btn edit-btn"
                  disabled={isDisabled}
                  onClick={() => onEditEmployee(index)}
                >
                  <FaEdit /> <span>Edit</span>
                </button>

                <button
                  className="action-btn delete-btn"
                  disabled={isDisabled}
                  onClick={() => onDeleteEmployee(index)}
                >
                  <FaTrash /> <span>Delete</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default EmployeeList;

