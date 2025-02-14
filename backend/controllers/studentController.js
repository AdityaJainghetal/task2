
const StuModel=require("../models/studentModels");

const dataSave = async (req, res) => {
    const { rollno,name,city,fees } = req.body;

    try {
        const book = await StuModel.create({
            name: name,
            rollno: rollno,
            city: city,
            fees: fees,
            image: req.file.path // Use the Cloudinary URL
        });

        res.status(201).json(book); // Send back the created book
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving data", error });
    }
};
const dataDisplay=async(req, res)=>{
    const myData= await StuModel.find();
    res.send(myData);
}
const dataSearch=async(req, res)=>{
    const {rollno} = req.body;
    const mydata=await StuModel.find({rollno:rollno})
    res.send(mydata);
}
const deleteDataDisplay=async(req, res)=>{
       const Data= await  StuModel.find();
       res.send(Data);
}
const recordDelete=async(req, res)=>{
    const {myid} = req.body;
    const myRes=await    StuModel.findByIdAndDelete(myid);
    res.send(myRes);
}


const editDisplay=async(req, res)=>{
    const {id}=req.query;
    const Data= await StuModel.findById(id);
   
    res.send(Data)
}

const editDataSave=async(req, res)=>{
    const {id, _id, rollno, name, city, fees}= req.body;

    const myres=await StuModel.findByIdAndUpdate(id, {
        rollno:rollno,
        name:name,
        city:city,
        fees:fees,
        image: req.file.path 

    })
 
    res.send("OK");
}




module.exports={
    dataSave,
    dataDisplay,
    dataSearch,
    deleteDataDisplay,
    recordDelete,
    editDisplay,
    editDataSave,

}
