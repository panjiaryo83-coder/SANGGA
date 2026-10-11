import { useState } from 'react';
import Layout, { navIcons } from '../../components/Layout';
import { useApp } from '../../store';
import RakaHome from './RakaHome';
import RakaTinjau from './RakaTinjau';
import RakaPersetujuan from './RakaPersetujuan';
import RakaRiwayat from './RakaRiwayat';
import RakaNotifikasi from './RakaNotifikasi';

const navItems = [
  { key: 'home', label: 'Beranda', icon: navIcons.home },
  { key: 'incoming', label: 'Kebutuhan Masuk', icon: navIcons.incoming },
  { key: 'recommendations', label: 'Rekomendasi', icon: navIcons.recommendations },
  { key: 'approval', label: 'Persetujuan', icon: navIcons.approval },
  { key: 'activation', label: 'Aktivasi', icon: navIcons.activation },
  { key: 'history', label: 'Riwayat', icon: navIcons.history },
];

export default function RakaApp() {
  const { state } = useApp();
  const [page, setPage] = useState('home');

  const navigate = (p: string) => setPage(p);

  const navWithBadges = navItems.map(item => {
    if (item.key === 'incoming' && state.mission.status === 'pending_auth') {
      return { ...item, badge: 1 };
    }
    if (item.key === 'recommendations' && state.mission.status === 'pending_auth') {
      return { ...item, badge: 1 };
    }
    return item;
  });

  const renderPage = () => {
    switch (page) {
      case 'home': return <RakaHome onNavigate={navigate} />;
      case 'incoming': return <RakaTinjau onNavigate={navigate} />;
      case 'recommendations': return <RakaTinjau onNavigate={navigate} />;
      case 'approval': return <RakaPersetujuan onNavigate={navigate} />;
      case 'activation': return <RakaRiwayat onNavigate={navigate} showActive />;
      case 'history': return <RakaRiwayat onNavigate={navigate} />;
      case 'notifications': return <RakaNotifikasi onNavigate={navigate} />;
      default: return <RakaHome onNavigate={navigate} />;
    }
  };

  return (
    <Layout
      role="raka"
      currentPage={page}
      onNavigate={navigate}
      navItems={navWithBadges}
      userName="Raka Pratama"
      userInitials="RP"
    >
      {renderPage()}
    </Layout>
  );
}
