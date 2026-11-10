import { useEffect,useMemo,useState } from 'react';
import { Button } from '@fluentui/react-components';
import { ArrowRight,Buildings,Car,CurrencyCircleDollar,CarProfile as Parking,Plus,Scan,Ticket,Users,Warning } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { getDashboard,getRevenue,getParking } from '../../services/reportApi';
import { getApartments } from '../../services/apartmentApi';
import { getRegistrations } from '../../services/registrationApi';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { useAuth } from '../../hooks/useAuth';
import dashboardBuilding from '../../assets/visuals/dashboard-building.webp';

export default function Dashboard(){
  const {user}=useAuth();
  const[state,setState]=useState({summary:null,revenue:[],parking:[],apartments:[],registrations:[]});
  const[loading,setLoading]=useState(true);const[error,setError]=useState('');
  const load=async()=>{setLoading(true);setError('');try{const[summary,revenue,parking,apartments,registrations]=await Promise.all([getDashboard(),getRevenue(),getParking(),getApartments(),getRegistrations()]);setState({summary,revenue,parking,apartments,registrations});}catch(err){setError(err.message);}finally{setLoading(false);}};
  useEffect(()=>{load();},[]);
  const pending=useMemo(()=>state.registrations.filter(x=>x.status==='PENDING'),[state.registrations]);
  if(loading)return <div className="dashboard-skeleton" aria-label="Đang tải tổng quan"><span/><span/><span/><span/><b/><b/></div>;
  const s=state.summary||{};
  const firstName=user?.fullName?.trim().split(' ').slice(-1)[0]||'bạn';
  const metrics=[{label:'Cư dân',value:s.residents,icon:Users},{label:'Căn hộ',value:state.apartments.length,icon:Buildings},{label:'Phương tiện',value:s.vehicles,icon:Car},{label:'Vé hoạt động',value:s.activeTickets,icon:Ticket},{label:'Xe trong bãi',value:s.vehiclesParking,icon:Parking},{label:'Doanh thu',value:formatCurrency(s.revenue),icon:CurrencyCircleDollar,wide:true}];
  const columns=[{key:'time',label:'Ngày đăng ký',render:r=>formatDate(r.createdAt,true)},{key:'resident',label:'Cư dân',render:r=><div className="cell-main"><strong>{r.resident.user.fullName}</strong><small>{r.resident.residentCode}</small></div>},{key:'plate',label:'Biển số',render:r=><b className="plate">{r.vehicle.licensePlate}</b>},{key:'plan',label:'Gói gửi',render:r=>r.plan.name},{key:'status',label:'Trạng thái',render:r=><StatusBadge status={r.status}/>}];
  const totalRevenue=state.revenue.reduce((a,x)=>a+Number(x._sum?.amount||0),0)||0;
  return <div className="page-stack dashboard-page">
    <PageHeader title="Tổng quan vận hành" description="Theo dõi trạng thái bãi xe và công việc cần xử lý trong ngày." actions={<Button appearance="secondary" onClick={load}>Làm mới</Button>}/>
    {error&&<div className="error-banner" role="alert"><div><strong>Không thể đồng bộ dashboard</strong><span>{error}</span></div><button onClick={load}>Thử lại</button></div>}
    <section className="dashboard-hero"><div className="dashboard-welcome"><span className="eyebrow">TRUNG TÂM VẬN HÀNH</span><h2>Chào {firstName},<br/>mọi thứ đang ở đây.</h2><p>{pending.length?`${pending.length} đăng ký đang chờ bạn xác minh.`:'Không có đăng ký nào đang chờ duyệt.'}</p><div className="hero-actions"><Link className="primary-link" to="/registrations">Xử lý đăng ký <ArrowRight/></Link><Link to="/parking-sessions">Xem lượt ra vào</Link></div></div><img src={dashboardBuilding} alt="Mô hình chung cư và bãi xe"/><div className="quick-actions"><span>Thao tác nhanh</span><Link to="/registrations"><Plus/>Duyệt đăng ký</Link><Link to="/parking-sessions"><Scan/>Tra cứu lượt xe</Link><Link to="/violations"><Warning/>Xử lý vi phạm</Link></div></section>
    <section className="metric-strip">{metrics.map(({label,value,icon:Icon,wide})=><article key={label} className={wide?'wide':''}><span className="metric-icon"><Icon/></span><span>{label}</span><strong>{value??0}</strong></article>)}</section>
    <section className="dashboard-analytics"><article className="analytics-panel"><header><div><h2>Doanh thu theo phương thức</h2><p>Dữ liệu thanh toán đã xác nhận từ hệ thống.</p></div><b>{formatCurrency(totalRevenue)}</b></header><div className="revenue-bars">{state.revenue.length?state.revenue.map((item,index)=>{const amount=Number(item._sum?.amount||0);return <div key={item.method}><span>{item.method==='CASH'?'Tiền mặt':'Chuyển khoản'}</span><div><i style={{width:`${Math.max(6,totalRevenue?amount/totalRevenue*100:0)}%`}}/></div><strong>{formatCurrency(amount)}</strong><small>{item._count} giao dịch</small><em style={{'--bar-index':index}}/></div>}):<p className="analytics-empty">Chưa có giao dịch đã xác nhận.</p>}</div></article><article className="occupancy-panel"><header><h2>Công suất bãi xe</h2><span>{s.parkingUsageRate||0}%</span></header><div className="occupancy-gauge" style={{'--usage':`${s.parkingUsageRate||0}%`}}><strong>{s.vehiclesParking||0}</strong><small>xe đang gửi</small></div><div className="area-list">{state.parking.map(a=><div key={a.id}><span>{a.name}</span><b>{a._count?.sessions||0}/{a.capacity}</b></div>)}</div><Link to="/parking-areas">Xem các bãi xe <ArrowRight/></Link></article></section>
    <section className="data-panel"><header><div><h2>Đăng ký chờ duyệt</h2><p>Cần xác minh xe và gói gửi trước khi phê duyệt.</p></div><Link to="/registrations">Xem tất cả ({pending.length}) <ArrowRight/></Link></header><DataTable columns={columns} data={pending.slice(0,6)} emptyTitle="Không có hồ sơ chờ duyệt" emptyDescription="Các đăng ký mới sẽ xuất hiện tại đây."/></section>
    <section className="dashboard-alerts"><article><Warning/><div><strong>{s.openViolations||0} vi phạm chưa xử lý</strong><span>Cần cập nhật kết quả xử lý biên bản.</span></div><Link to="/violations">Mở danh sách</Link></article><article><Ticket/><div><strong>{s.expiringTickets||0} vé sắp hết hạn</strong><span>Hệ thống đang tự động gửi nhắc hạn.</span></div><Link to="/parking-tickets">Kiểm tra vé</Link></article></section>
  </div>;
}
