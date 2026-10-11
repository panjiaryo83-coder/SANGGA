import { ReactNode } from 'react';
import { useApp, UserRole } from '../store';

interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
  badge?: number;
}

interface LayoutProps {
  children: ReactNode;
  role: UserRole;
  currentPage: string;
  onNavigate: (page: string) => void;
  navItems: NavItem[];
  userName: string;
  userInitials: string;
}

function IconHome() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 7.5L9 2l7 5.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 17V10.5h5V17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}
function IconNetwork() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="3" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="15" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="3" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="15" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M4.5 4L7 7M11 7l2.5-3M4.5 14L7 11M11 11l2.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconCheck() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 5L7 13l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconList() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M3 9h12M3 13h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconBell() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 015 5v3l1.5 2.5H2.5L4 10V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 14.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function IconAnalytics() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 13l4-5 3 3 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function IconSim() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M9 6v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconPartners() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="13" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M1 15.5c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 10c2 0 4 1 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconCapacity() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="11" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="7" y="7" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="12" y="3" width="4" height="13" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function IconRequest() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3h12a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/><path d="M6 8h6M6 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconHistory() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M9 6v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconApproval() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function IconActivation() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v4M9 12v4M2 9h4M12 9h4M4.22 4.22l2.83 2.83M10.95 10.95l2.83 2.83M4.22 13.78l2.83-2.83M10.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconRecommendation() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 4.5L16 7.6l-3.5 3.3.8 4.6L9 13.2l-4.3 2.3.8-4.6L2 7.6l5.2-1.1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}
function IconLogout() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 3H3a1 1 0 00-1 1v10a1 1 0 001 1h4M12 13l4-4-4-4M16 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export const navIcons: Record<string, ReactNode> = {
  home: <IconHome />,
  network: <IconNetwork />,
  readiness: <IconCapacity />,
  needs: <IconList />,
  activation: <IconActivation />,
  simulation: <IconSim />,
  analytics: <IconAnalytics />,
  partners: <IconPartners />,
  incoming: <IconRequest />,
  recommendations: <IconRecommendation />,
  approval: <IconApproval />,
  history: <IconHistory />,
  capacity: <IconCapacity />,
  requests: <IconRequest />,
  request: <IconRequest />,
  bell: <IconBell />,
};

const roleColors: Record<UserRole, { primary: string; bg: string; light: string }> = {
  maya: { primary: '#2E7D32', bg: '#EAF4E7', light: '#F2FAF2' },
  raka: { primary: '#FF7043', bg: '#FFF0EB', light: '#FFF5F2' },
  andi: { primary: '#8B6914', bg: '#FFF7E5', light: '#FFFBF0' },
};

export default function Layout({ children, role, currentPage, onNavigate, navItems, userName, userInitials }: LayoutProps) {
  const { dispatch, state } = useApp();
  const colors = roleColors[role];
  const totalNotifications = state.notifications[role];

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FAFAF8' }}>
      {/* Sidebar — desktop */}
      <aside
        className="hidden lg:flex flex-col w-56 flex-shrink-0 h-full py-5 px-3"
        style={{ background: '#fff', borderRight: '1px solid #DDE4DE' }}
      >
        {/* Logo */}
        <div className="flex items-center px-3 mb-6">
          <img src="/src/assets/logo-app.png" alt="SANGGA" className="h-7 w-auto" />
        </div>

        {/* Role chip */}
        <div className="px-3 mb-5">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: colors.bg }}
          >
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-700 font-display flex-shrink-0"
              style={{ background: colors.primary, color: '#fff' }}
            >
              {userInitials}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-600 truncate" style={{ color: '#17211B' }}>{userName}</div>
              <div className="text-xs truncate font-mono" style={{ color: colors.primary, fontSize: 10 }}>
                {role === 'maya' ? 'Pemilik Jaringan' : role === 'raka' ? 'Otoritas Aktivasi' : 'Penyedia Kapasitas'}
              </div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto scrollable">
          {navItems.map(item => {
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all"
                style={{
                  background: isActive ? colors.bg : 'transparent',
                  color: isActive ? colors.primary : '#66736B',
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: isActive ? "'Plus Jakarta Sans', sans-serif" : "'Inter', sans-serif",
                }}
              >
                <span style={{ color: isActive ? colors.primary : '#66736B', flexShrink: 0 }}>{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span
                    className="text-xs font-700 font-mono px-1.5 py-0.5 rounded-full"
                    style={{ background: '#FF7043', color: '#fff', minWidth: 18, textAlign: 'center' }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="mt-4 pt-4 space-y-0.5" style={{ borderTop: '1px solid #DDE4DE' }}>
          <button
            onClick={() => onNavigate('notifications')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all hover:bg-gray-50"
            style={{ color: '#66736B' }}
          >
            <span style={{ color: '#66736B' }}><IconBell /></span>
            <span className="flex-1">Notifikasi</span>
            {totalNotifications > 0 && (
              <span className="text-xs font-700 font-mono px-1.5 py-0.5 rounded-full" style={{ background: '#FF7043', color: '#fff' }}>
                {totalNotifications}
              </span>
            )}
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all hover:bg-red-50"
            style={{ color: '#66736B' }}
          >
            <IconLogout />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ background: '#fff', borderBottom: '1px solid #DDE4DE' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center font-display font-800 text-white text-xs" style={{ background: '#FF7043' }}>S</div>
            <span className="font-display font-700 text-base" style={{ color: '#174D2A' }}>SANGGA</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('notifications')} className="relative p-2 rounded-lg transition-all hover:bg-gray-50">
              <IconBell />
              {totalNotifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs font-700" style={{ background: '#FF7043', color: '#fff', fontSize: 9 }}>
                  {totalNotifications}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollable pb-16 lg:pb-0">
          <div className="page-enter">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 mobile-safe"
        style={{ background: '#fff', borderTop: '1px solid #DDE4DE', zIndex: 50 }}
      >
        <div className="flex items-stretch">
          {navItems.slice(0, 4).map(item => {
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all"
                style={{ color: isActive ? colors.primary : '#66736B' }}
              >
                <span style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.15s' }}>
                  {item.icon}
                </span>
                <span className="text-xs" style={{ fontFamily: isActive ? "'Plus Jakarta Sans'" : "'Inter'", fontWeight: isActive ? 600 : 400, fontSize: 10 }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
