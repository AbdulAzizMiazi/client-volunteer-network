import React, { useEffect, useState } from "react";
import './Admin.css';
import dateImg from '../../resources/logos/trash-2 9.png';

const VolunteerList = () => {
    const [allRegistrations, setAllRegistrations] = useState([]);
    let [deleteState, setDeleteState] = useState("");

    useEffect(()=>{
        fetch("https://still-cliffs-89513.herokuapp.com/allRegistrations")
        .then(res => res.json())
        .then(data => setAllRegistrations(data))
    },[deleteState])

    const deleteEvent = (id) => {
        fetch(`https://still-cliffs-89513.herokuapp.com/cancel/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => data.deleted &&  setDeleteState(deleteState = id))
    }

  return (
    <div className="ml-3 pt-3">

      <h4 className="mb-4 ml-3 font-weight-bold">Volunteer register list</h4>

      <div className="myTable pt-3 pb-5 px-2 shadow-lg">
        <table className="table table-borderless table-hover" >
          <thead className="bg-light">
            <tr className="text-secondary">
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Registration date</th>
              <th scope="col">Volunteer List</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
                allRegistrations.map(eachEvent => {
                    const {_id, name, email, date, eventTitle} = eachEvent;
                    return<tr>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{date}</td>
                        <td>{eventTitle}</td>
                        <td className="deleteOpt">
                            <img 
                            src={dateImg}
                            alt=""
                            onClick={()=> deleteEvent(_id)}
                            />
                        </td>
                  </tr>
                })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerList;
