import { useState, useEffect } from 'react';
import './Detail.css'
export default function Detail()
{
    const khoa = [
    { label: "Khóa 65", value: "613" },
    { label: "Khóa 64", value: "609" },
    { label: "Khóa 63", value: "607" },
    { label: "Khóa 62", value: "603" },
    { label: "Khóa 61", value: "567" },
  ];
    const [load, setLoad] = useState(false);
    const [lop, setLop] = useState([]);
    const [html, setHtml] = useState('');
    const [student, setStudent] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState(khoa[0].value);
    const [selectedLop, setSelectedLop] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {
        LoadClass(khoa[0].value);
    }, []);

    const LoadStudent = (value) =>{
        fetch('https://gtvt2-backend.onrender.com/api/score/getListStudentByClassID', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({
                    "classID": value
                })
        }).then(res=>res.json()).then(datas => {setStudent(datas.data)
            setSelectedStudent(datas.data[0].mA_SINHVIEN)
        })
    }

    const ViewDetail = () =>{

        setLoad(true);
        fetch('https://gtvt2-backend.onrender.com/api/score/GetUIScore', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({
                "mssv":selectedStudent,
                "classID": selectedLop
            })
        }).then(res=>res.text()).then(datas => {setHtml(datas)
            setLoad(false);
        }).catch(err=>{
            setLoad(false);
        })
    }

    function LoadClass(value)
    {
    setSelectedKhoa(value);
    fetch('https://gtvt2-backend.onrender.com/api/score/getListClassByCourseID', {
    method : 'POST',
    headers : {
    'Content-type' : 'application/json'
    },
    body: JSON.stringify({
        "courseID": value
        })
    }).then(res=>(res.json())).then(datas=> {
    setLop(datas.data);
    if (datas.data && datas.data.length > 0) {
    setSelectedLop(datas.data[0].lophoC_ID); 
    LoadStudent(datas.data[0].lophoC_ID)
    }
    });
    }
    return(
    <div className="container">
        <select name="khoaHoc" id="" onChange={(e) => LoadClass(e.target.value)}>
        {khoa.map((t) => (
            <option key={t.value} value={t.value}>
            {t.label}
            </option>
        ))}
        </select>

        <select name="" id="" onChange={(e) => {
            setSelectedLop(e.target.value);
            LoadStudent(e.target.value);
        }}>
        {lop.map((t) => (
            <option key={t.lophoC_ID} value={t.lophoC_ID}>
            {t.teN_LOP}
            </option>
        ))}
        </select>
        
        <select name="" id="" onChange={(e)=>setSelectedStudent(e.target.value)}>
        {student.map((t) => (
            <option key={t.mA_SINHVIEN} value={t.mA_SINHVIEN}>
            {t.hoten}
            </option>
        ))}
        </select>

        <button onClick={ViewDetail} disabled={load}>Xem</button>
        <div className="view-info"
            dangerouslySetInnerHTML={{__html: html}}
        >

        </div>
    </div>
    )
}