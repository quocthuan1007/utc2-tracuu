import './Navbar.css'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className='navbar'>
            <img src="https://nhapdiem.utc2.edu.vn/Asset/Web/images/logodhgtvt1.png" alt="" />
            <div className="menu-wrap">
                <button className='btn-menu' onClick={() => navigate('/')}>Xem thứ hạng sinh viên</button>
                <button className='btn-menu' onClick={() => navigate('/detail')}>Xem điểm sinh viên</button>
            </div>
        </div>
    )
}