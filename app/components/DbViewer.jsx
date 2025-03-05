import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const DbViewer = ({ closeViewer }) => {
  console.log("DbViewer component rendered");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});

  const isRecordChanged = (original, edited) => {
    return JSON.stringify(original) !== JSON.stringify(edited);
  };
  
  function formatIdString(str) {
    if (str.length <= 8) {
      // If the string is too short to have a middle, return it as is
      return str;
    }
    const firstPart = str.slice(0, 4); // First 4 characters
    const lastPart = str.slice(-4);   // Last 4 characters
    return `${firstPart}...${lastPart}`;
  }

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch("/api/db");
        const result = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setData(result);
      } catch (error) {
        alert("Error fetching data. See console for details.");
        console.error("Error fetching data:", error);        
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/db/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Failed to delete record with ID: ${id}`);
      }

      setData(data.filter((record) => record._id !== id));
      alert("Record deleted successfully.");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting record. See console for details");
    }
  };

  const handleEdit = (record) => {
    setEditRow(record._id);
    setEditedRecord({ ...record });
  };

  const handleChange = (e, field) => {
    setEditedRecord({ ...editedRecord, [field]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      if (!isRecordChanged(data.find((record) => record._id === id), editedRecord)) {
        setEditRow(null);
        return;
      }
      const response = await fetch(`/api/db/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedRecord),
      });
      if (!response.ok) {
        throw new Error(`Failed to update record with ID: ${id}`);
      }
      setData(data.map((record) => (record._id === id ? editedRecord : record)));
      setEditRow(null);
      alert("Record updated successfully.");
    } catch (error) {
      console.error("Error updating record:", error);
      alert("Error updating record. See console for details.");
    }
  };

  if (loading) return <div>Loading...</div>;
console.log(data);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Database Records
          <span className="ml-2 text-sm font-medium text-gray-500">
            ({data.length} records)
          </span>
        </h3>
        <button
          onClick={closeViewer}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Close Viewer
        </button>
      </div>

      {data.length === 0 ? (
    <div className="text-center text-gray-500 py-10">
      <p className="text-lg font-medium">No records found.</p>
      <p className="text-sm">Add some data to see it here.</p>
    </div>
  ) : (<div className="overflow-x-auto pb-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              {["ID", "Updated at", "Name", "Email", "Phone", "Note", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {(data.map((record) => (
              <tr 
                key={record._id}
                className="hover:bg-blue-50 transition-colors duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                  {formatIdString(record._id)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${new Date(record.lastUpdate).getTime() > Date.now() - 86400000 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {record.lastUpdate ? new Date(record.lastUpdate).toLocaleString() : "N/A"}
                  </span>
                </td>

                {["name", "email", "phone", "note"].map((field) => (
                  <td key={field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editRow === record._id ? (
                      <input
                        type="text"
                        value={editedRecord[field] || ""}
                        onChange={(e) => handleChange(e, field)}
                        className="min-w-[120px] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      />
                    ) : (
                      <span className={!record[field] ? "text-gray-400" : ""}>
                        {record[field] || "N/A"}
                      </span>
                    )}
                  </td>
                ))}

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editRow === record._id ? (
                      <button
                        onClick={() => handleSave(record._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-green-600"
                        aria-label="Save changes"
                      >
                        <FaSave className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(record)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600"
                        aria-label={`Edit ${record.name}`}
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-red-600"
                      aria-label={`Delete ${record.name}`}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>)}
    </div>
  );
};

export default DbViewer;
