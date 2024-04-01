import axios from "axios";
import { useState, useEffect } from "react";
import { useParams  , useNavigate} from "react-router-dom";
import NotFound from "./NotFound";
function View() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading,setLoading]= useState(false);
  const navigate = useNavigate();

  const [errorMessage,setErrorMessage]=useState('');
  useEffect(() => {
    if(!localStorage.getItem("user-info")){
      navigate('/login');
    } 
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const fetchData = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8001/api/employes/" + id);
      setUser(result.data.user); 
      // console.log(user);
      setTimeout( setLoading(true) ,400);
    } catch (error) {
      
      if (error.response && error.response.status === 404) {
        setErrorMessage("User Not Found!");
      } else {
        console.error("Error fetching user:", error);
      }    }
    
  };

  return (
    <>
      <div className="container mt-5">
        <h2>User Details</h2>
        
        {errorMessage &&
          <NotFound/>
        }

        {
          loading && <><div>
            <strong>ID:</strong> {user.id}
          </div><div>
              <strong>Name:</strong>{user.name}
            </div><div>
              {" "}
              <strong>Email:</strong>{user.email}
            </div><div>
              <strong>phone :</strong> {user.phone}
            </div><div>
              <strong>age :</strong> {user.age}
            </div><div>
              <strong>adresse:  </strong> {user.adresse}
            </div><div>
              <strong>Created At:</strong> {user.created_at}
            </div>
          
            </>   }
            
          { !loading && <div className="loader">Loading<span></span></div>}
      
      
       
      </div>
    </>
  );
}

export default View;
