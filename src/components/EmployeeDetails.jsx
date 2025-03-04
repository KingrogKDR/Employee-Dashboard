import { useParams, useNavigate } from "react-router-dom";

const EmployeeDetails = ({ employees }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find((emp) => emp.id.toString() === id);

  if (!employee) {
    return <div>Employee not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl text-slate-700 mb-6">Employee Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>
          <strong>ID:</strong> {employee.id}
        </p>
        <p>
          <strong>Name:</strong> {employee.employee_name}
        </p>
        <p>
          <strong>Age:</strong> {employee.employee_age}
        </p>
        <p>
          <strong>Salary:</strong> {employee.employee_salary}
        </p>
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default EmployeeDetails;
