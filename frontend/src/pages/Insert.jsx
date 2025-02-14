import { useState } from "react";
 import axios from "axios";
import { message } from 'antd';
const Insert=()=>{
    const [input, setInput] =useState({})
    const [img, setImg] = useState(null);

    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setInput(values=>({...values, [name]:value}))
    }

    const handleFileChange = (e) => {
        setImg(e.target.files[0]); // Set the file directly
      };





    const handleSubmit= async(e)=>{
       
        e.preventDefault(); // Prevent default form submission

        // Validate input fields
      
    let api="http://localhost:8080/students/datasave";
    const data = new FormData();

    // Append form data
    data.append('file', img); // Append the image file
    Object.keys(input).forEach((key) => {
      data.append(key, input[key]); // Append other input fields
    });

    try {
      const response = await axios.post(api, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success("Book Inserted Successfully");
    
    } catch (error) {
      console.error('Error uploading data:', error);
      message.error("Failed to insert book. Please try again.");
    }
  };

    return(
        <>
          <h1> Insert page</h1>
          Enter Rollno: <input type="number" name="rollno" onChange={handleInput} />
          <br/>
          Enter Name: <input type="text" name="name" onChange={handleInput} />
          <br/>
          Enter City: <input type="text" name="city" onChange={handleInput} />
          <br/>
          Enter Fees: <input type="text" name="fees" onChange={handleInput} />
          <br/>
          Enter Image: <input type="file" name="file" onChange={handleFileChange} />
          <br/>
          <button onClick={handleSubmit}> Data save!</button>
        </>
    )
}

export default Insert;




