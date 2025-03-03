import React from "react";
import Card from "./Card";

const CardContainer = ({ employees }) => {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
      {employees.map((employee) => (
        <Card key={employee.id} employee={employee}/>
      ))}
    </div>
  );
};

export default CardContainer;
