/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate ,NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import './assets/style.css';

function Users() {
  const [utilisateur, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate=useNavigate();
  useEffect(() => {
  if(!localStorage.getItem("user-info")){
    navigate('/login');
  } 
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8001/api/employes');
      setUsers(response.data.employe);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(true);
    }
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8001/api/deleteemploye/${id}`);
          console.log(`User with ID ${id} deleted successfully.`);
          fetchData();
        } catch (error) {
          console.error(`Error deleting user with ID ${id}:`, error);
          Swal.fire({
            title: 'Error!',
            text: `Error deleting user with ID ${id}. Please try again later.`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'User deletion cancelled :)', 'error');
      }
    });
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className="nav-link" >Add User</Link>
      <div className="table-responsive">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <table className="table table-dark table-striped-columns mx-auto">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th colSpan={3}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {utilisateur.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <NavLink to={`/edit/${user.id}`}>
                      <button className="Btn">
                        Edit 
                        <svg className="svg" viewBox="0 0 512 512">
                          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                        </svg>
                      </button>
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/view/${user.id}`} className="btn btn-warning">View</NavLink>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;
