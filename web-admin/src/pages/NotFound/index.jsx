import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import emptyParking from '../../assets/visuals/empty-parking.webp';

export default function NotFound(){return <main className="not-found"><img src={emptyParking} alt="Vị trí đỗ xe trống"/><span>404 · LẠC LỐI ĐIỀU HƯỚNG</span><h1>Không tìm thấy trang.</h1><p>Đường dẫn này không thuộc khu vực vận hành hiện tại.</p><Link to="/dashboard"><ArrowLeft/> Trở về tổng quan</Link></main>}
