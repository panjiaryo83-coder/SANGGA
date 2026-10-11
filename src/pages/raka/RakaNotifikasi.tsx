import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function RakaNotifikasi({ onNavigate }: Props) {
  const { state } = useApp();

  const notifications = [
    ...(state.mission.status === 'pending_auth' ? [{
      text: '1 kebutuhan baru menunggu tinjauan',
      sub: 'Respons Banjir · Bekasi',
      time: 'Baru saja',
      icon: '!',
      color: '#D84315',
      bg: '#FFF0EB',
      action: 'approval',
    }] : []),
    {
      text: '2 permintaan menunggu persetujuan',
      sub: 'Respons Longsor · Bogor',
      time: '45 menit lalu',
      icon: '⏳',
      color: '#8B6914',
      bg: '#FFF7E5',
      action: 'incoming',
    },
    {
      text: 'Aktivasi Respons Longsor disetujui',
      sub: '6 unit dikonfirmasi',
      time: '2 jam lalu',
      icon: '✓',
      color: '#2E7D32',
      bg: '#EAF4E7',
      action: 'history',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Notifikasi</h1>
        <p className="text-sm" style={{ color: '#66736B' }}>{notifications.length} notifikasi</p>
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => (
          <button
            key={i}
            onClick={() => onNavigate(n.action)}
            className="w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all hover:shadow-sm"
            style={{ background: '#fff', border: '1px solid #DDE4DE' }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-700" style={{ background: n.bg, color: n.color }}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm" style={{ color: '#17211B' }}>{n.text}</p>
              <p className="text-xs mt-0.5" style={{ color: '#66736B' }}>{n.sub} · {n.time}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5" style={{ color: '#DDE4DE' }}>
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
