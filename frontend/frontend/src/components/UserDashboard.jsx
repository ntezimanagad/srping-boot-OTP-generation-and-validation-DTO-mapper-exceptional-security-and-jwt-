import React, { useState, useEffect } from 'react'
import axios from 'axios'
function UserDashboard() {
    const token = localStorage.getItem("token")
    const [info, setInfo] = useState([])
    const [getInfos, setGetInfo] = useState([])
    const [suggestionTypes, setSuggestionTypes] = useState([]);
    //const [form, setForm] = useState({title:"", description:"", status:"", suggestionType:"", employee:""})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [suggestionType, setSuggestionType] = useState("")
    const [employee, setEmployee] = useState("")
    const [loading, setLoading] = useState(false)
    const [displayId, setdisplayId] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const handleUser = async ()=>{
        try {
            const response = await axios.get("http://localhost:8080/api/suggestions/userInfo",{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            setInfo(response.data)
        } catch (error) {
            console.log(error,"error")
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/suggestions/getInfo", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //setInfo(response.data.employee);  // set employee
                setGetInfo(response.data); // set suggestions
                //setEmployee(response.data.employeeId)
            } catch (error) {
                console.error(error.response?.data || "Error fetching data");
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchSuggestionType = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/suggestion-types/readSuggestionType", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Fetched raw data:", response.data);
      
            // Fix: check if data is wrapped in an object (e.g., response.data.data)
            const types = Array.isArray(response.data)
              ? response.data
              : response.data.data || [];
      
            setSuggestionTypes(types);
          } catch (error) {
            console.error(error.response?.data || "Error fetching data");
          }
        };
        fetchSuggestionType();
      }, []);
      useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/suggestions/getEmpInfo", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Fetched raw data:", response.data);
      
            // Fix: check if data is wrapped in an object (e.g., response.data.data)
           
      
            setEmployee(response.data.id);
          } catch (error) {
            console.error(error.response?.data || "Error fetching data");
          }
        };
        fetchEmployee();
      }, []);
    //   useEffect(() => {
    //     const dummyData = [
    //       { id: "1", name: "Software" },
    //       { id: "2", name: "Hardware" },
    //     ];
    //     setSuggestionTypes(dummyData);
    //   }, []);
      
    useEffect(()=>{
        handleUser();
        //handleGetInfo();
    },[])
    const handleInsert = async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8080/api/suggestions/createSuggestion", {title, description, status, suggestionTypeId: suggestionType,
              employeeId: employee}, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            setSuccess(response.data)
            fetchData();
            setError("")
        } catch (error) {
            setError(error.response?.data || "Suggestion Failled")
            console.log(error.response?.data)
        } finally{
            setLoading(false)
        }
    }
    const handleUpdate = async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.put(`http://localhost:8080/api/suggestions/changeSuggestion/${displayId}`, 
              {
                title,
                description,
                status,
                suggestionTypeId: suggestionType,
                employeeId: employee
              }, 
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            
            setSuccess(response.data)
            fetchData();
            setError("")
        } catch (error) {
            setError(error.response?.data || "Suggestion Failled Update")
            console.log(error.response?.data)
        } finally{
            setLoading(false)
        }
    }
    const handleDelete = async (id)=>{
      if (!id) {
        console.error("Suggestion ID is null or undefined");
        return;
    }
        try {
            setLoading(true)
            const response = await axios.delete(`http://localhost:8080/api/suggestions/removeSuggestionById/${id}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            setSuccess(response.data)
            fetchData();
            setError("")
        } catch (error) {
            setError(error.response?.data || "Suggestion Failled Update")
            console.log(error.response?.data)
        } finally{
            setLoading(false)
        }
    }
  return (
    <>
    {success && <p style={{color: "green"}}>{success}</p>}
    {error && <p style={{color: "red"}}>{error}</p>}
      <div>{info}</div>
      <div>
        <div>
          <label htmlFor="">title</label>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Description</label>
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Status</label>
          <div>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Suggestion Type</label>
          <div>
            <select
              value={suggestionType}
              onChange={(e) => setSuggestionType(e.target.value)}
            >
              <option value="">-- Select Suggestion Type --</option>
              {Array.isArray(suggestionTypes) &&
                suggestionTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="">Employee</label>
          <div>
          <input type="text" value={employee} readOnly />

          </div>
        </div>
        <div>
          <button onClick={displayId ? handleUpdate : handleInsert}>
            {displayId ? "Update Suggestion" : "Add Suggestion"}
          </button>
        </div>
      </div>
      <div>
        <ul>
          {Array.isArray(getInfos) && getInfos.length > 0 ? (
            getInfos.map((infos, index) => (
              <li key={index}>
                {infos.id} - {infos.title} - {infos.description} - {infos.status} -{" "}
                {infos.suggestions} - {infos.suggestions}
                <button
                  onClick={() => {
                    setdisplayId(infos.id);
                    setTitle(infos.title);
                    setDescription(infos.description);
                    setStatus(infos.status);
                    setSuggestionType(infos.suggestionType?.id || "");
                    setEmployee(infos.employee?.id || employee); 
                   
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(infos.id)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No suggestions available</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default UserDashboard