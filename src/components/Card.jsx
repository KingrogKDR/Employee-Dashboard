import React from "react";

const Card = ({ employee }) => {
  if (!employee) {
    return <div>No employee data available.</div>;
  }

  return (
    <div className="lg:max-w-[450px] border p-4 rounded-lg shadow-md grid gap-4">
      <div>
        <img src={employee.profile_image || "placeholder.webp"} alt="profile" className="size-10 rounded-full border-2 border-gray-200" />
      </div>
      <div>
        <h2 className="text-xl font-bold">{employee.employee_name}</h2>
        <p>Age: {employee.employee_age}</p>
        <p>Salary: {employee.employee_salary}</p>
      </div>
    </div>
  );
};

export default Card;