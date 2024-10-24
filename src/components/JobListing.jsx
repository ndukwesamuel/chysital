import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobListing = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch data from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://webuyam-vjgt.onrender.com/icsusers"
        );
        setUsers(response.data); // Set the fetched data to state
        setLoading(false); // Stop loading
      } catch (err) {
        setError(`Error fetching users data ${err}`);
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const handleNavigate = (user) => {
    navigate("/user-details", { state: { user } }); // Navigate with state
  };

  // Filter users based on the search query for Staff ID
  const filteredUsers = users.filter(
    (user) => user.staff_id?.toLowerCase().includes(searchQuery.toLowerCase()) // Safely check if staff_id exists
  );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Users List</h1>

      {/* Search Input */}
      <div className="mb-5 text-center">
        <input
          type="text"
          placeholder="Search by Staff ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          className="border border-gray-300 p-2 rounded w-1/3"
        />
      </div>

      {/* User Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Staff ID</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Surname</th>
            <th className="py-2 px-4 border-b">Email Address</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {user.staff_id}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.firstname}
              </td>
              <td className="py-2 px-4 border-b text-center">{user.surname}</td>
              <td className="py-2 px-4 border-b text-center">
                {user.email_address}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleNavigate(user)} // Call the navigate function on button click
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobListing;
