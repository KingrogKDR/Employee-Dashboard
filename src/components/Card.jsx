import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ employee, onDelete, onSelect, isSelected }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/employee/${employee.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(employee.id);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect(employee.id);
  };

  if (!employee) {
    return <div>No employee data available.</div>;
  }

  return (
    <div
      className={`lg:max-w-[450px] border p-4 rounded-lg shadow-md grid gap-4 cursor-pointer hover:shadow-lg transition-shadow ${
        isSelected ? "bg-blue-200" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between">
        <img
          src={employee.profile_image || "placeholder.jpg"}
          alt="profile"
          className="size-10 rounded-full border-2 border-gray-200"
        />
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          onClick={(e) => e.stopPropagation()}
          className="mr-2 size-4"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">{employee.employee_name}</h2>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleDelete}
            className="px-2 py-1 bg-red-600 text-white rounded cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
