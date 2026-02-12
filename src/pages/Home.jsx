import './Home.css'
import { useState, useEffect } from 'react';

export default function Home(){
    const khoa = [
    { label: "Khóa 65", value: "613" },
    { label: "Khóa 64", value: "609" },
    { label: "Khóa 63", value: "607" },
    { label: "Khóa 62", value: "603" },
    { label: "Khóa 61", value: "567" },
  ];

  const hocKi = [
    { label: "Học kì 2 2024-2025", value: "2024_2025_2" },
    { label: "Học kì 1 2024-2025", value: "2024_2025_1" },
    { label: "Học kì 2 2023-2024", value: "2023_2024_2" },
    { label: "Học kì 1 2023-2024", value: "2023_2024_1" },
    { label: "Học kì 2 2022-2023", value: "2022_2023_2" },
    { label: "Học kì 1 2022-2023", value: "2022_2023_1" },
    { label: "Học kì 2 2021-2022", value: "2021_2022_2" },
    { label: "Học kì 1 2021-2022", value: "2021_2022_1" },
    { label: "Học kì 2 2020-2021", value: "2020_2021_2" },
    { label: "Học kì 1 2020-2021", value: "2020_2021_1" },
    { label: "Học kì 2 2019-2020", value: "2019_2020_2" },
    { label: "Học kì 1 2019-2020", value: "2019_2020_1" },
  ];
  const [loading, setLoading] = useState(false);
  const [lop, setLop] = useState([]);
  const [selectedKhoa, setSelectedKhoa] = useState(khoa[0].value);
  const [selectedLop, setSelectedLop] = useState("");
  const [selectedHocKi, setSelectedHocKi] = useState(hocKi[0].value);
  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    LoadClass(khoa[0].value);
  }, []);
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
      }
    });
  }
  function ShowRanking(){
    
    if(selectedLop === "")
      return alert('vui lòng chọn lớp');
    setHtmlContent('');
    setLoading(true);
    fetch('https://gtvt2-backend.onrender.com/api/score/GetUIRanking', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(
        {
          "classID":selectedLop,
          "hocKy": selectedHocKi
        }
      )
    }).then(res=>res.text())
    .then(datas => {
      setHtmlContent(datas);
      setLoading(false); // <--- CHUYỂN VÀO ĐÂY: Xong việc mới tắt
    })
    .catch(err => {
      console.log(err);
      setLoading(false); // <--- THÊM VÀO ĐÂY: Lỗi cũng phải tắt
    });
  }
  return (
  <>
  <div className="content-container">
    <select name="khoaHoc" id="" onChange={(e) => LoadClass(e.target.value)}>
      {khoa.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
    <select name="" id="" onChange={(e) => setSelectedLop(e.target.value)}>
      {lop.map((t) => (
        <option key={t.lophoC_ID} value={t.lophoC_ID}>
          {t.teN_LOP}
        </option>
      ))}
    </select>

    <select name="" id="" onChange={(e) => setSelectedHocKi(e.target.value)}>
      {hocKi.map((t) => (
        <option key={t.value} value={t.value}>{t.label}</option>
      ))}
    </select>

    <button onClick={ShowRanking} disabled={loading}>
      Xem thứ hạng
    </button>
  </div>
  <div 
    className='ShowInfo' 
    dangerouslySetInnerHTML={{ __html: htmlContent }} 
  />
  </>
  )
}