import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Access the passed user object
  const [details, setDetails] = useState(null); // State to store fetched details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (user && user.staff_id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://webuyam-vjgt.onrender.com/details/?staff=${user.staff_id}`
          );
          setDetails(response.data); // Set fetched data to state
        } catch (err) {
          setError(err); // Set error if the request fails
        } finally {
          setLoading(false); // Set loading to false after the request
        }
      };

      fetchData();
    } else {
      setLoading(false); // If no user or staff_id, stop loading
    }
  }, [user]); // Run effect when user changes

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>; // Display loading state
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>; // Display error if any
  }

  // Render details if available
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {details && details.length > 0 ? (
        <div className="space-y-4">
          {Object.entries(details[0]).map(([key, value]) => (
            <div key={key} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="font-semibold">
                {key.replace(/_/g, " ").toUpperCase()}:
              </h3>
              <p>{value || "N/A"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No details found.</p>
      )}
    </div>
  );
};

export default Details;
