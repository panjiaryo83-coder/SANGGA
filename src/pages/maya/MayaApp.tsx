import { useState } from 'react';
import Layout, { navIcons } from '../../components/Layout';
import { useApp } from '../../store';
import MayaHome from './MayaHome';
import MayaJaringan from './MayaJaringan';
import MayaKebutuhan from './MayaKebutuhan';
import MayaBuatKebutuhan from './MayaBuatKebutuhan';
import MayaMatching from './MayaMatching';
import MayaSimulasi from './MayaSimulasi';
import MayaAnalitik from './MayaAnalitik';
import MayaNotifikasi from './MayaNotifikasi';

const navItems = [
  { key: 'home', label: 'Beranda', icon: navIcons.home },
  { key: 'network', label: 'Jaringan Kesiapan', icon: navIcons.network },
  { key: 'needs', label: 'Kebutuhan', icon: navIcons.needs },
  { key: 'activation', label: 'Aktivasi', icon: navIcons.activation },
  { key: 'simulation', label: 'Simulasi', icon: navIcons.simulation },
  { key: 'analytics', label: 'Analitik', icon: navIcons.analytics },
  { key: 'partners', label: 'Mitra', icon: navIcons.partners },
];

export default function MayaApp() {
  const { state } = useApp();
  const [page, setPage] = useState('home');

  const navigate = (p: string) => setPage(p);

  const navWithBadges = navItems.map(item => {
    if (item.key === 'needs') {
      const badge = state.mission.status === 'created' || state.mission.status === 'in_progress' ? 1 : 0;
      return { ...item, badge };
    }
    return item;
  });

  const renderPage = () => {
    switch (page) {
      case 'home': return <MayaHome onNavigate={navigate} />;
      case 'network': return <MayaJaringan onNavigate={navigate} />;
      case 'needs': return <MayaKebutuhan onNavigate={navigate} />;
      case 'create-need': return <MayaBuatKebutuhan onNavigate={navigate} />;
      case 'matching': return <MayaMatching onNavigate={navigate} />;
      case 'activation': return <MayaKebutuhan onNavigate={navigate} />;
      case 'partners': return <MayaJaringan onNavigate={navigate} />;
      case 'simulation': return <MayaSimulasi />;
      case 'analytics': return <MayaAnalitik />;
      case 'notifications': return <MayaNotifikasi onNavigate={navigate} />;
      default: return <MayaHome onNavigate={navigate} />;
    }
  };

  return (
    <Layout
      role="maya"
      currentPage={page}
      onNavigate={navigate}
      navItems={navWithBadges}
      userName="Maya Putri"
      userInitials="MP"
    >
      {renderPage()}
    </Layout>
  );
}
