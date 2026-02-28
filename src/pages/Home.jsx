import { useState, useEffect, useRef } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import DepartmentForm from '../components/DepartmentForm';
import DepartmentList from '../components/DepartmentList';
import DepartmentView from '../components/DepartmentView';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.png';

const EMPLOYEE_KEY = 'ems_employees';
const DEPARTMENT_KEY = 'ems_departments';

const Home = () => {
  /* EMPLOYEES */
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem(EMPLOYEE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  /* DEPARTMENTS */
  const [departments, setDepartments] = useState(() => {
    const stored = localStorage.getItem(DEPARTMENT_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [editDeptIndex, setEditDeptIndex] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDeptView, setShowDeptView] = useState(false);

  const handleViewDepartment = (dept) => {
    setSelectedDepartment(dept);
    setShowDeptView(true);
  };

  const [deptSearchTerm, setDeptSearchTerm] = useState('');

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(deptSearchTerm.toLowerCase()) ||
      (dept.head || '').toLowerCase().includes(deptSearchTerm.toLowerCase())
  );


  /* COMMON */
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // 'employee' | 'department'
  const [activeModule, setActiveModule] = useState('employee');

  const cancelBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

  /* FILTER */
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* STORAGE */
  useEffect(() => {
    localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(DEPARTMENT_KEY, JSON.stringify(departments));
  }, [departments]);

  /* MODAL UX */
  useEffect(() => {
    document.body.style.overflow =
      deleteIndex !== null ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [deleteIndex]);

  useEffect(() => {
    const esc = (e) => {
      if (e.key === 'Escape') {
        setDeleteIndex(null);
        setDeleteType(null);
      }
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  useEffect(() => {
    if (deleteIndex !== null && cancelBtnRef.current) {
      cancelBtnRef.current.focus();
    }
  }, [deleteIndex]);

  useEffect(() => {
    const trap = (e) => {
      if (deleteIndex === null || e.key !== 'Tab') return;
      e.preventDefault();
      document.activeElement === cancelBtnRef.current
        ? confirmBtnRef.current.focus()
        : cancelBtnRef.current.focus();
    };
    window.addEventListener('keydown', trap);
    return () => window.removeEventListener('keydown', trap);
  }, [deleteIndex]);

  /* EMPLOYEE ACTIONS */
  const addEmployee = (employee) => {
    if (editIndex !== null) {
      const updated = [...employees];
      updated[editIndex] = employee;
      setEmployees(updated);
      setEditIndex(null);
    } else {
      setEmployees([...employees, employee]);
    }
  };

  const confirmDeleteEmployee = () => {
    setEmployees(employees.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
    setDeleteType(null);
    setViewEmployee(null);
  };

  /* DEPARTMENT ACTIONS */
  const addDepartment = (dept) => {
    if (editDeptIndex !== null) {
      const updated = [...departments];
      updated[editDeptIndex] = dept;
      setDepartments(updated);
      setEditDeptIndex(null);
    } else {
      setDepartments([...departments, dept]);
    }
  };

  const confirmDeleteDepartment = () => {
    setDepartments(departments.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
    setDeleteType(null);
  };

  /* DELETE HANDLER */
  const handleConfirmDelete = () => {
    deleteType === 'employee'
      ? confirmDeleteEmployee()
      : confirmDeleteDepartment();
  };

  /* RENDER */
  return (
    <div className="page">
      {/* TITLE */}
      <div className="title-bar">
        <img src={logo} alt="EMS Logo" className="app-logo" />
        <h1 className="main-title">Employee Management System</h1>
      </div>

      {/* MODULE SWITCH */}
      <div className="module-switch">
        <button
          className={activeModule === 'employee' ? 'active' : ''}
          onClick={() => setActiveModule('employee')}
        >
          Employee Management
        </button>

        <button
          className={activeModule === 'department' ? 'active' : ''}
          onClick={() => setActiveModule('department')}
        >
          Department Management
        </button>
      </div>

      {/* EMPLOYEE MODULE */}
      {activeModule === 'employee' && (
        <div className="container">
          <div className="form-section">
            <EmployeeForm
              onAddEmployee={addEmployee}
              editEmployee={
                editIndex !== null ? employees[editIndex] : null
              }
            />
          </div>

          <div className="list-section">
            <div className="list-top-bar">
              <h2>Employee List</h2>

              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search Employee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <FaSearch className="search-icon" />
                {searchTerm && (
                  <span
                    className="clear-icon"
                    onClick={() => setSearchTerm('')}
                  >
                    ×
                  </span>
                )}
              </div>
            </div>
          </div>

          <EmployeeList
            employees={filteredEmployees}
            searchTerm={searchTerm}
            onEditEmployee={setEditIndex}
            onViewEmployee={(employee) =>
              setViewEmployee(employee)
            }
            onDeleteEmployee={(i) => {
              setDeleteIndex(i);
              setDeleteType('employee');
            }}
          />
          {/* VIEW EMPLOYEE */}
          {viewEmployee && (
            <div className="view-card">
              <h3>Employee Details</h3>

              <div className="view-row">
                <span>Name</span>
                <p>{viewEmployee.name}</p>
              </div>

              <div className="view-row">
                <span>Role</span>
                <p>{viewEmployee.role}</p>
              </div>

              <div className="view-row">
                <span>Experience</span>
                <p>{viewEmployee.experience}</p>
              </div>

              <button
                className="close-view"
                onClick={() => setViewEmployee(null)}
              >
                Close
              </button>
            </div>
          )}

        </div>
      )}

      {/* DEPARTMENT MODULE */}
      {activeModule === 'department' && (
        <div className="dept-container">
          <div className="form-section">
            <DepartmentForm
              onAddDepartment={addDepartment}
              editDepartment={
                editDeptIndex !== null
                  ? departments[editDeptIndex]
                  : null
              }
            />
          </div>
          <div className="department-list">
            <h2>Department List</h2>

            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search Department..."
                value={deptSearchTerm}
                onChange={(e) => setDeptSearchTerm(e.target.value)}
                className="search-input"
              />
              <FaSearch className="search-icon" />

              {deptSearchTerm && (
                <span
                  className="clear-icon"
                  onClick={() => setDeptSearchTerm('')}
                >
                  ×
                </span>
              )}
            </div>
          </div>
          <DepartmentList
            departments={departments}
            filteredDepartments={filteredDepartments}
            searchTerm={deptSearchTerm}
            onEditDepartment={setEditDeptIndex}
            onDeleteDepartment={(i) => {
              setDeleteIndex(i);
              setDeleteType('department');
            }}
            onViewDepartment={handleViewDepartment}
          />

          {showDeptView && selectedDepartment && (
            <DepartmentView
              selectedDepartment={selectedDepartment}
              onClose={() => setShowDeptView(false)}
            />
          )}

        </div>
      )}

      {/* DELETE MODAL */}
      {deleteIndex !== null && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete this{' '}
              <strong>{deleteType}</strong>?
            </p>

            <div className="modal-actions">
              <button
                ref={cancelBtnRef}
                className="cancel-btn"
                onClick={() => {
                  setDeleteIndex(null);
                  setDeleteType(null);
                }}
              >
                Cancel
              </button>

              <button
                ref={confirmBtnRef}
                className="confirm-btn"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
