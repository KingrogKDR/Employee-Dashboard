import { useState, useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Search from "./components/Search";
import { Routes, Route } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails";

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = "employeesData";

  const fetchData = async () => {
    try {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);

        if (Date.now() - timestamp < 5 * 60 * 1000) {
          setEmployees(data);
          setFilteredEmployees(data);
          setLoading(false);
          return;
        }
      }

      const response = await fetch("/proxy/api/v1/employees", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Cookie: "humans_21909=1",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 429) {
          setRateLimitExceeded(true);
          throw new Error("Too many requests. Rate limit exceeded.");
        }
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();

      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: responseData.data, timestamp: Date.now() })
      );

      setEmployees(responseData.data || []);
      setFilteredEmployees(responseData.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (id) => {
    if (!id) {
      setFilteredEmployees(employees);
      return;
    }

    const filtered = employees.filter(
      (employee) => employee.id.toString() === id
    );

    setFilteredEmployees(filtered);
  };

  const handleDelete = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
    setFilteredEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  const handleSelect = (id) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter(
        (employee) => !selectedEmployees.includes(employee.id)
      )
    );
    setFilteredEmployees((prevEmployees) =>
      prevEmployees.filter(
        (employee) => !selectedEmployees.includes(employee.id)
      )
    );
    setSelectedEmployees([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-6">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="text-4xl text-slate-700 text-center mb-6">
                Employee Dashboard
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Search for employees by their ID and view their details below.
              </p>
              <div className="mt-4">
                <div>
                  <Search onSearch={handleSearch} />
                </div>
                <div>
                  <div className="mt-4 mb-3">
                    <button
                      onClick={handleDeleteSelected}
                      className="px-4 py-2 bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded"
                      disabled={selectedEmployees.length === 0}
                    >
                      Delete Selected
                    </button>
                  </div>
                  {loading ? (
                    <div>Loading...</div>
                  ) : error ? (
                    <div className="text-gray-500 mt-20 flex justify-center items-center gap-3">
                      {error}
                      <button
                        onClick={() => window.location.reload()}
                        className="ml-2 px-4 py-2 bg-blue-500 w-20 text-white rounded"
                      >
                        Retry
                      </button>
                    </div>
                  ) : rateLimitExceeded ? (
                    <div className="text-gray-500 mt-20 flex justify-center items-center gap-3">
                      Too many requests. Please try again later.
                      <button
                        onClick={() => window.location.reload()}
                        className="ml-2 px-4 py-2 bg-blue-500 w-20 text-white rounded"
                      >
                        Retry
                      </button>
                    </div>
                  ) : filteredEmployees.length === 0 ? (
                    <div className="text-gray-500 mt-8 text-center">
                      No employees found. Please try a different ID.
                    </div>
                  ) : (
                    <CardContainer
                      employees={filteredEmployees}
                      onDelete={handleDelete}
                      onSelect={handleSelect}
                      selectedEmployees={selectedEmployees}
                    />
                  )}
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/employee/:id"
          element={<EmployeeDetails employees={employees} />}
        />
      </Routes>
    </main>
  );
}

export default App;
