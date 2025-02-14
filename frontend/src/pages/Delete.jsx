import { useState, useEffect } from "react";
import axios from "axios";
import myimg from "../pages/download.jpeg";
import myeditimg from "../pages/Edit.jpg";
import { useNavigate } from "react-router-dom";

const Delete = () => {
    const [mydata, setMydata] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const api = "http://localhost:8080/students/deleteddisplay";
            const res = await axios.get(api);
            setMydata(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const myDel = async (id) => {
        try {
            const api = "http://localhost:8080/students/recorddelete";
            await axios.post(api, { myid: id });
            alert("Data deleted!!!");
            loadData(); // Reload data after deletion
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const myedit = (id) => {
        navigate(`/edit/${id}`);
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>; // Loading state
    }

    const ans = mydata.map((key) => (
        <tr key={key._id}>
            <td>{key.rollno}</td>
            <td>{key.name}</td>
            <td>{key.city}</td>
            <td>{key.fees}</td>
            <th><img src={key.image}  alt="" className='w-28 h-20 text-center' /></th>
            <td>
                <a href="#" onClick={() => myDel(key._id)}>
                    <img src={myimg} width="20" height="20" alt="Delete" />
                </a>
                <a href="#" onClick={() => myedit(key._id)}>
                    <img src={myeditimg} width="20" height="20" alt="Edit" />
                </a>
            </td>
          
        </tr>
    ));

    return (
        <>
            <h1>Delete Records</h1>
            <table border="1" style={{ backgroundColor: "aqua", color: "black", width: "1000px", textAlign: "center" }}>
                <thead>
                    <tr style={{ color: "black", fontSize: "20px", backgroundColor: "red" }}>
                        <th>Rollno</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Fees</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {ans}
                </tbody>
            </table>
        </>
    );
};

export default Delete;