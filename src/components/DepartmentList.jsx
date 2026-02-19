import { FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';

const highlightMatch = (text, search) => {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, 'gi');
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={i} className="dept-highlight">{part}</span>
    ) : (
      part
    )
  );
};

const DepartmentList = ({
  departments,
  filteredDepartments,
  searchTerm,
  onEditDepartment,
  onDeleteDepartment,
  onViewDepartment,
}) => {

  if (departments.length > 0 && filteredDepartments.length === 0) {
    return (
      <div className="dept-empty-search">
        <FaSearch className="dept-empty-icon" />
        <h3>No matching departments</h3>
        <p>Try searching with a different keyword</p>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="empty-state">
        <p>No departments yet</p>
        <span>Add a department using the form</span>
      </div>
    );
  }

  return (
    <>
      <div className="list-header">
        <span>Department</span>
        <span>Head</span>
        <span>Description</span>
        <span>Action</span>
      </div>

      <ul className="employee-list">
        {filteredDepartments.map((dept, index) => (
          <li key={index} className="employee-row">

            <span>
              {highlightMatch(dept.name, searchTerm)}
            </span>

            <span>
              {highlightMatch(dept.head || '-', searchTerm)}
            </span>

            <span className="truncate">
              {dept.description || '-'}
            </span>

            <div className="action-buttons">
              <button
                className="action-btn view-btn"
                onClick={() => onViewDepartment(dept)}
              >
                <FaEye /> <span>View</span>
              </button>

              <button
                className="action-btn edit-btn"
                onClick={() => onEditDepartment(index)}
              >
                <FaEdit /> <span>Edit</span>
              </button>

              <button
                className="action-btn delete-btn"
                onClick={() => onDeleteDepartment(index)}
              >
                <FaTrash /> <span>Delete</span>
              </button>
            </div>

          </li>
        ))}
      </ul>
    </>
  );
};

export default DepartmentList;
