import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardContentStyle.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // const [editingUserIds, setEditingUserIds] = useState([]);

  useEffect(() => {
    const fetchAllUserData = () => {
      axios
        .get(`https://snakeladder1.azurewebsites.net/getAllUser?limit=${itemsPerPage} `)
        // .get("https://snakeladder1.azurewebsites.net/getAllUser")
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

    //  const interval = setInterval(fetchAllUserData, 5000); // Fetch every 5 seconds

    // return () => {
    //   clearInterval(interval); // Clean up the interval on component unmount
    // };
  }, [itemsPerPage]);

  const handleView = (userId) => {
    navigate(`/user/history?UserId=${userId}`);
  };

  // const handleEdit = (userId) => {
  //   // Toggle the editing mode for the user
  //   setEditingUserIds((prevEditingUserIds) =>
  //     prevEditingUserIds.includes(userId)
  //       ? prevEditingUserIds.filter((id) => id !== userId)
  //       : [...prevEditingUserIds, userId]
  //   );

  //   // Update the isEditing property for the user
  //   setUserData((prevUserData) =>
  //     prevUserData.map((user) =>
  //       user.UserId === userId ? { ...user, isEditing: true } : user
  //     )
  //   );
  // };

  const handleEdit = (userId) => {
    const updatedUserData = userData.map(user => {
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
      // .put(
      //   `https://snakeladder1.azurewebsites.net/updateUser?UserId=${UserId}&${queryParamsString}`
      // )
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
  // const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div>
      {userData.length === 0 ? (
        <div>No data found</div>
      ) : (
        <>
        <div className="items-per-page-label">
        <label
          htmlFor="items-per-page-select"
          style={{ textDecorationColor: "aqua", color: "#4F378B" }}
        >
          Items per page:
        </label>
        <select
          id="items-per-page-select"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={8}>8</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={100}>500</option>
          <option value={100}>1000</option>
        </select>
      </div>
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">Sr. No.</th>
                <th className="table-header">UserId</th>
                <th className="table-header">Username</th>
                <th className="table-header">Balance</th>
                <th className="table-header">Credit</th>
                <th className="table-header">Debit</th>
                <th className="table-header">Ref Code</th>
                <th className="table-header">TokenId</th>
                <th className="table-header">Email</th>
                <th className="table-header">Phone</th>
                <th className="table-header">Banned</th>
                <th className="table-header">User History</th>
                <th className="table-header">Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user._id}>
                  <td className="table-cell">{index + 1}</td>
                  <td className="table-cell">{user.UserId}</td>
                  <td className="table-cell">
                    {user.isEditing ? (
                      <input
                        type="text"
                        name="userName"
                        value={user.userName || ""}
                        onChange={(e) => handleInputChange(e, user.UserId)}
                      />
                    ) : (
                      user.userName
                    )}
                  </td>
                  <td className="table-cell">
                    {user.isEditing ? (
                      <input
                        type="text"
                        name="credits"
                        value={user.credits || ""}
                        onChange={(e) => handleInputChange(e, user.UserId)}
                      />
                    ) : (
                      user.credits
                    )}
                  </td>

                  <td className="table-cell">{user.realMoney}</td>
                  <td className="table-cell">{user.realMoney}</td>
                  <td className="table-cell">{user.referralCode}</td>
                  <td className="table-cell">{user._id}</td>
                  <td className="table-cell">
                    {user.isEditing ? (
                      <input
                        type="text"
                        name="email"
                        value={user.email || ""}
                        onChange={(e) => handleInputChange(e, user.UserId)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="table-cell">
                    {user.isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={user.phone || ""}
                        onChange={(e) => handleInputChange(e, user.UserId)}
                      />
                    ) : (
                      user.phone
                    )}
                  </td>

                  <td className="table-cell">
                    {user.isEditing ? (
                      <select
                        name="banned"
                        value={user.banned || ""}
                        onChange={(e) => handleInputChange(e, user.UserId)}
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    ) : (
                      user.banned
                    )}
                  </td>
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
                        style={{ backgroundColor: '#007bff', color: 'white' }}
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
      <Footer />
    </div>
  );
};

export default Dashboard;
