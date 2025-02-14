import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Edit = () => {
    const [img, setImg] = useState(null);
    const { id } = useParams();
    const [mydata, setMydata] = useState({});
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        const api = `http://localhost:8080/students/editdisplay/?id=${id}`;
        try {
            const res = await axios.get(api);
            setMydata(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert("Failed to load data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setMydata((values) => ({ ...values, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImg(e.target.files[0]); // Set the selected file
    };

    const handleSubmit = async () => {
        const api = "http://localhost:8080/students/editsave";
        const data = new FormData();
        data.append('file', img); // Append the image file
        Object.keys(mydata).forEach((key) => {
            data.append(key, mydata[key]); // Append other input fields
        });
        data.append('id', id); // Append the ID

        try {
            await axios.post(api, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Data updated successfully!");
        } catch (error) {
            console.error('Error updating data:', error);
            alert("Failed to update data. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <>
            <h1>Edit your Data</h1>
            <label>
                Edit Rollno:
                <input type="text" name="rollno" value={mydata.rollno || ''} onChange={handleInput} />
            </label>
            <br />
            <label>
                Edit Name:
                <input type="text" name="name" value={mydata.name || ''} onChange={handleInput} />
            </label>
            <br />
            <label>
                Edit City:
                <input type="text" name="city" value={mydata.city || ''} onChange={handleInput} />
            </label>
            <br />
            <label>
                Edit Fees:
                <input type="text" name="fees" value={mydata.fees || ''} onChange={handleInput} />
            </label>
            <br />
            <label>
                Edit Image:
                <input type="file" name="file" onChange={handleFileChange} />
            </label>
            <br />
            <button onClick={handleSubmit}>Update!!!</button>
        </>
    );
};

export default Edit;