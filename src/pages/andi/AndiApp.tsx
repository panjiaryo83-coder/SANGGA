import { useState } from 'react';
import Layout, { navIcons } from '../../components/Layout';
import { useApp } from '../../store';
import AndiHome from './AndiHome';
import AndiKapasitas from './AndiKapasitas';
import AndiPermintaan from './AndiPermintaan';
import AndiKonfirmasi from './AndiKonfirmasi';
import AndiTracking from './AndiTracking';
import AndiNotifikasi from './AndiNotifikasi';

const navItems = [
  { key: 'home', label: 'Beranda', icon: navIcons.home },
  { key: 'capacity', label: 'Kapasitas Saya', icon: navIcons.capacity },
  { key: 'requests', label: 'Permintaan', icon: navIcons.requests },
  { key: 'history', label: 'Riwayat', icon: navIcons.history },
];

export default function AndiApp() {
  const { state } = useApp();
  const [page, setPage] = useState('home');

  const navigate = (p: string) => setPage(p);

  const navWithBadges = navItems.map(item => {
    if (item.key === 'requests' && state.andiRequest.status === 'received') {
      return { ...item, badge: 1 };
    }
    return item;
  });

  const renderPage = () => {
    switch (page) {
      case 'home': return <AndiHome onNavigate={navigate} />;
      case 'capacity': return <AndiKapasitas onNavigate={navigate} />;
      case 'requests': return <AndiPermintaan onNavigate={navigate} />;
      case 'confirm': return <AndiKonfirmasi onNavigate={navigate} />;
      case 'tracking': return <AndiTracking onNavigate={navigate} />;
      case 'history': return <AndiTracking onNavigate={navigate} />;
      case 'notifications': return <AndiNotifikasi onNavigate={navigate} />;
      default: return <AndiHome onNavigate={navigate} />;
    }
  };

  return (
    <Layout
      role="andi"
      currentPage={page}
      onNavigate={navigate}
      navItems={navWithBadges}
      userName="Andi Saputra"
      userInitials="AS"
    >
      {renderPage()}
    </Layout>
  );
}
