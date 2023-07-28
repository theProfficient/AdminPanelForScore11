import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardContentStyle.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchAllUserData = () => {
      axios
        .get("https://snakeladder1.azurewebsites.net/getAllUser")
        .then((response) => {
          const sortedUserData = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setUserData(sortedUserData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchAllUserData(); // Initial fetch

    const interval = setInterval(fetchAllUserData, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  const handleView = (userId) => {
    navigate(`/user/history?UserId=${userId}`);
  };

  const handleEdit = (userId) => {
    const updatedUserData = userData.map((user) => {
      if (user.UserId === userId) {
        return { ...user, isEditing: true };
      }
      return user;
    });
    setUserData(updatedUserData);
  };

  const handleInputChange = (e, userId) => {
    const { name, value } = e.target;
    const updatedUserData = userData.map((user) => {
      if (user.UserId === userId) {
        return { ...user, [name]: value };
      }
      return user;
    });
    setUserData(updatedUserData);
  };

  const handleSave = (userId) => {
    const user = userData.find((user) => user.UserId === userId);
    const { UserId, ...updatedData } = user;
    const queryParams = [];

    for (const field in updatedData) {
      if (updatedData.hasOwnProperty(field)) {
        queryParams.push(`${field}=${encodeURIComponent(updatedData[field])}`);
      }
    }

    const queryParamsString = queryParams.join("&");

    axios
      .put(
        `https://snakeladder1.azurewebsites.net/updateUser?UserId=${UserId}&${queryParamsString}`
      )
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        const updatedUserData = userData.map((user) => {
          if (user.UserId === userId) {
            return { ...user, ...updatedData };
          }
          return user;
        });
        setUserData(updatedUserData);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      })
      .finally(() => {
        const updatedUserData = userData.map((user) => {
          if (user.UserId === userId) {
            return { ...user, isEditing: false };
          }
          return user;
        });
        setUserData(updatedUserData);
      });
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div>
      {userData.length === 0 ? (
        <div>No data found</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">Sr. No.</th>
                <th className="table-header">UserId</th>
                {/* ... Other table header columns ... */}
                <th className="table-header">User History</th>
                <th className="table-header">Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user._id}>
                  <td className="table-cell">{startSerialNumber + index}</td>
                  <td className="table-cell">{user.UserId}</td>
                  {/* ... Other table body cells ... */}
                  <td className="table-cell">
                    <button
                      className="button userHistory-button"
                      onClick={() => handleView(user.UserId)}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                  </td>
                  <td className="table-cell">
                    {user.isEditing ? (
                      <button
                        className="button save-button"
                        onClick={() => handleSave(user.UserId)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="button edit-button"
                        onClick={() => handleEdit(user.UserId)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="button"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="button"
              onClick={goToNextPage}
              disabled={indexOfLastItem >= userData.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
