import {useState} from "react"
import axios from "axios"
import * as XLSX from "xlsx"

function App() {
  const [msg, setMsg] = useState("")
  const [status, setStatus] = useState(false)
  const [emaillist, setEmailList] = useState([])
  function handlemsg(evt)
  {
    setMsg(evt.target.value)
  }
  function handlefile(event)
  {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = function(event){
        const data = event.target.result;
        const workbook =XLSX.read(data, {type:"binary"})
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName] 
        const emaillist = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalemail = emaillist.map(function(item){return item.A})
        setEmailList(totalemail)
        
        
    }
    reader.readAsBinaryString(file);
    
  }
  function send()
  {
    setStatus(true)
     axios.post("https://bulkmail-6.onrender.com/email",{msg:msg,emaillist:emaillist})
     .then(function(data){
      if(data.data === true)
      {
        alert("email  send sucessfully")
        setStatus(false)
      }else{
        alert("email failed")
      }
     })

  }
  return (
    <div>
      <div className="bg-blue-950 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-3">Bulkmail</h1>
      </div>
      <div className="bg-blue-800 text-white text-center">
        <h1 className="font-medium px-5 py-3">we can help your business wuth sending multiple email at once</h1>
      </div>
      <div className="bg-blue-600 text-white text-center">
        <h1 className="font-medium px-5 py-3">drag drop</h1>
      </div>
      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
        <textarea onChange={handlemsg} value={msg} className="w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md" placeholder="enter the email text....."></textarea>
        <div>
          <input type="file" onChange={handlefile} className="border-4 border-dashed py-4 px-4 mt-5 mb-5"></input>
         
        </div>
        <p>Total email in the file: {emaillist.length}</p>
        <button onClick={send} className="bg-blue-950 py-2 px-2 text-white font-medium rounded-md w-fit mt-2">{status?"Sending...":"Send"}</button>
      </div>
      <div className="bg-blue-600 text-white text-center py-10">
        
      </div>
      <div className="bg-blue-400 text-white text-center py-10">
        
      </div>
    </div>
  );
}

export default App;
