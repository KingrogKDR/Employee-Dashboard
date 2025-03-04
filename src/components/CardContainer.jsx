import Card from "./Card";

const CardContainer = ({ employees, onDelete, onSelect, selectedEmployees }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {employees.map((employee) => (
        <Card
          key={employee.id}
          employee={employee}
          onDelete={onDelete}
          onSelect={onSelect}
          isSelected={selectedEmployees.includes(employee.id)}
        />
      ))}
    </div>
  );
};

export default CardContainer;