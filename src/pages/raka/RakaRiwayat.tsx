import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; showActive?: boolean; }

export default function RakaRiwayat({ onNavigate, showActive }: Props) {
  const { state } = useApp();

  const timelineSteps = [
    { label: 'Diajukan', done: true },
    { label: 'Dikonfirmasi', done: ['authorized', 'in_progress', 'completed'].includes(state.mission.status) },
    { label: 'Direservasi', done: state.mission.confirmedByAndi > 0 },
    { label: 'Dalam persiapan', done: state.andiRequest.status === 'dispatched' || state.andiRequest.status === 'arrived' || state.andiRequest.status === 'completed' },
    { label: 'Dikirim', done: state.andiRequest.status === 'arrived' || state.andiRequest.status === 'completed' },
    { label: 'Tiba', done: state.andiRequest.status === 'arrived' || state.andiRequest.status === 'completed' },
    { label: 'Selesai', done: state.mission.status === 'completed' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>
          {showActive ? 'Aktivasi Berjalan' : 'Riwayat Aktivasi'}
        </h1>
        <p className="text-sm" style={{ color: '#66736B' }}>
          {showActive ? 'Pantau misi yang sedang berjalan.' : 'Rekam jejak semua aktivasi.'}
        </p>
      </div>

      {/* Active mission */}
      {(showActive || state.mission.status !== 'none') && (
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
              <span className="badge" style={{
                background: state.mission.status === 'completed' ? '#EAF4E7' : '#FFF7E5',
                color: state.mission.status === 'completed' ? '#2E7D32' : '#8B6914',
              }}>
                {state.mission.status === 'completed' ? 'SELESAI' : 'DALAM PERSIAPAN'}
              </span>
            </div>
            <p className="text-sm" style={{ color: '#66736B' }}>
              {state.mission.confirmedByAndi} dari 10 unit terpenuhi
            </p>
          </div>

          {/* Timeline */}
          <div className="px-5 py-4">
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#66736B' }}>Linimasa Aktivasi</p>
            <div className="relative">
              <div className="absolute left-3.5 top-0 bottom-0 w-px" style={{ background: '#DDE4DE' }} />
              <div className="space-y-4">
                {timelineSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4 relative">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                      style={{
                        background: step.done ? '#2E7D32' : '#fff',
                        border: `2px solid ${step.done ? '#2E7D32' : '#DDE4DE'}`,
                      }}
                    >
                      {step.done ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <div className="w-2 h-2 rounded-full" style={{ background: '#DDE4DE' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <span
                        className="text-sm"
                        style={{
                          color: step.done ? '#17211B' : '#66736B',
                          fontWeight: step.done ? 500 : 400,
                        }}
                      >
                        {step.label}
                      </span>
                      {step.done && i < 3 && (
                        <span className="text-xs ml-2 font-mono" style={{ color: '#66736B' }}>
                          {['16 Sep 13.45', '16 Sep 14.10', '16 Sep 14.20'][i] || ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historical */}
      {!showActive && (
        <div className="space-y-3">
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-600 text-sm" style={{ color: '#17211B' }}>Respons Longsor · Bogor</h3>
                <span className="badge" style={{ background: '#EAF4E7', color: '#2E7D32' }}>SELESAI</span>
              </div>
              <p className="text-xs" style={{ color: '#66736B' }}>8 unit · 10 September 2026</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-600 text-sm" style={{ color: '#17211B' }}>Evakuasi Gunung Merapi</h3>
                <span className="badge" style={{ background: '#EAF4E7', color: '#2E7D32' }}>SELESAI</span>
              </div>
              <p className="text-xs" style={{ color: '#66736B' }}>15 unit · 2 Agustus 2026</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
