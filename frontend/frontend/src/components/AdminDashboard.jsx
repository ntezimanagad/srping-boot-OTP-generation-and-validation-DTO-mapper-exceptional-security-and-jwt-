import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
    //const navigate = useNavigate();
    const [suggestionData, setSuggestionData] = useState([]);
    const [userData, setUserData] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(()=>{
        const handleAdmin = async ()=>{
            if (token) {
                try {
                    const response = await axios.get("http://localhost:8080/api/suggestions/userInfo",{
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    setUserData(response.data);
                } catch (error) {
                    console.log(error.response?.data)
                }
            }
        }
        handleAdmin();
        handleSugestion();
    },[])
    const handleSugestion = async ()=>{
        try {
            if (token) {
                const response = await axios.get("http://localhost:8080/api/suggestions/readSuggestion",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setSuggestionData(response.data);
            }
        } catch (error) {
            console.log(error.response?.data);
        }
    }
  return (
    <div>
        <p>{userData}</p>
        <ul>
            
  {Array.isArray(suggestionData) && suggestionData.length > 0 ? (
    suggestionData.map((suggestion, index) => (
      <li key={index}>
        <strong>{suggestion.title}</strong> - {suggestion.description} - {suggestion.status}
        <br />
        Suggestion Type: {suggestion.suggestionType?.name}
        <br />
        Employee: {suggestion.employee?.name}
        <br />
        Feedbacks:
        <ul>
          {suggestion.feedbacks?.map((fb, i) => (
            <li key={i}>{fb.comment} (by {fb.employee?.name})</li>
          ))}
        </ul>
        <hr />
      </li>
    ))
  ) : (
    <p>No suggestions available</p>
  )}
</ul>

        
    </div>

  )
}

export default AdminDashboard