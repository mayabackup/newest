import React from "react";

import { useHistory } from "react-router-dom";
import "./css/confirmation.css";
import { useState, useEffect } from "react";
import axios from "axios";


//confirmation component
const Confirmation = ({ props }) => {
  
  let [citizenship, setCitizenship] = useState();
  let [location, setLocation] = useState();
  let [airport, setAirport] = useState();
  let [entered, setEnterd] = useState(false);

  let locationMap;;
  useEffect(() => {
    const getItems= async()=>{
    const resp= await axios.get("http://localhost:5000/confirmation")
    if(resp.data.message!=null){

      if ( resp.data.message.citizenship!=null){
        setCitizenship(resp.data.message.citizenship)
      }
      else{
        setCitizenship("Data Not Entered")
      }

      if(resp.data.message.location!==null){
        setLocation(resp.data.message.location)
      }
      else{
        setLocation("Data Not Entered" )
      }
      if(resp.data.message.airport!==null){
        setAirport(resp.data.message.airport)
      }
      
      else{
        setAirport("Data Not Entered")
      }
      setEnterd(resp.data.message.entered)
    } 
    else{
      setCitizenship("Data Not Entered")
      setLocation("Data Not Entered" )
      setAirport("Data Not Entered")
    }
  }
  
    getItems();
    console.log(entered)
    if(entered===false){
      getItems();
    }

  }, [])

  function handelClick(){
    const selected={
      entered:true
    }
    //setConfirm(e)
    const post= async() => await axios
    .post('http://localhost:5000/confirmation',selected)
    .then(() => console.log('Sent form data'))
    .catch(err => {
      console.error(err);
    });
    post()
    history.push("/top_locations");
  }
  locationMap=location;
  const loc =
    "https://maps.google.com/maps?q=" +
    locationMap +
    "&t=&z=13&ie=UTF8&iwloc=&output=embed";
  let history = useHistory();
  // transfer pages after confirmation 
  function setConfirm() {
    history.push("/top_locations");
  }

  // go back to home
  function setHome() {
    history.push("/");
  }
  // return the component
  return (
    <div>
      <div className="user-data">
        <h1 className='page-title'>Confirmation</h1>
        <h3>
          Your Citizenship: <span className="user-input"> {citizenship}</span>
        </h3>
        <h3>
          Current Location: <span className="user-input"> {location}</span>
        </h3>
        <h3>
          Desired Departure Airport:{" "}
          <span className="user-input"> {airport}</span>
        </h3>
      </div>
      <div class="flex-container">
        <iframe
          title='map'
          width="100%"
          height="600"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
         
          src={loc}
        ></iframe>
      </div>
      <br></br>
      <div>
        <button onClick={handelClick} className="confirm" type="button">
          confirm and view results
        </button>
        <br></br>
        <button onClick={e => setHome(e)} className="back" type="button">
          return to calculator
        </button>
      </div>
    </div>
  );
};

export default Confirmation;