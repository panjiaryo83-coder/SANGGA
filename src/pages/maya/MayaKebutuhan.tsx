import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function MayaKebutuhan({ onNavigate }: Props) {
  const { state } = useApp();
  const mission = state.mission;

  const staticNeeds = [
    {
      name: 'Respons Longsor · Bogor',
      needed: 8,
      fulfilled: 6,
      status: 'DALAM PEMENUHAN',
      statusColor: '#8B6914',
      statusBg: '#FFF7E5',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Kebutuhan</h1>
          <p className="text-sm" style={{ color: '#66736B' }}>Kelola dan pantau kebutuhan kapasitas.</p>
        </div>
        <button
          onClick={() => onNavigate('create-need')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
          style={{ background: '#2E7D32' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          Buat Kebutuhan
        </button>
      </div>

      <div className="space-y-4">
        {/* Dynamic mission */}
        {mission.status !== 'none' && (
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #DDE4DE' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-600 text-base mb-1" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
                  <div className="flex gap-3 text-sm" style={{ color: '#66736B' }}>
                    <span>{mission.confirmedByAndi} dari {mission.needed} unit terpenuhi</span>
                  </div>
                </div>
                <span
                  className="badge flex-shrink-0 mt-1"
                  style={{
                    background: mission.status === 'completed' ? '#EAF4E7' :
                                mission.status === 'in_progress' ? '#FFF7E5' :
                                mission.status === 'authorized' ? '#EAF4E7' : '#FFF0EB',
                    color: mission.status === 'completed' ? '#2E7D32' :
                           mission.status === 'in_progress' ? '#8B6914' :
                           mission.status === 'authorized' ? '#2E7D32' : '#D84315',
                  }}
                >
                  {mission.status === 'completed' ? 'SELESAI' :
                   mission.status === 'in_progress' ? 'DALAM PEMENUHAN' :
                   mission.status === 'authorized' ? 'DISETUJUI' :
                   mission.status === 'pending_auth' ? 'MENUNGGU OTORITAS' : 'PERLU DIPENUHI'}
                </span>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EAF4E7' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(mission.confirmedByAndi / mission.needed) * 100}%`, background: '#2E7D32' }}
                  />
                </div>
                <span className="font-mono text-xs" style={{ color: '#66736B' }}>{mission.confirmedByAndi}/{mission.needed}</span>
              </div>
            </div>
            <div className="px-5 py-3 flex items-center justify-between">
              {mission.status === 'completed' && mission.confirmedByAndi < mission.needed ? (
                <>
                  <p className="text-sm" style={{ color: '#D84315' }}>{mission.needed - mission.confirmedByAndi} unit masih perlu dipenuhi</p>
                  <button
                    onClick={() => onNavigate('matching')}
                    className="text-sm font-display font-600 transition-opacity hover:opacity-70"
                    style={{ color: '#FF7043' }}
                  >
                    Cari tambahan →
                  </button>
                </>
              ) : mission.status === 'pending_auth' ? (
                <p className="text-sm" style={{ color: '#66736B' }}>Menunggu persetujuan otoritas aktivasi</p>
              ) : (
                <button
                  onClick={() => onNavigate('matching')}
                  className="text-sm font-display font-600 transition-opacity hover:opacity-70"
                  style={{ color: '#2E7D32' }}
                >
                  Lihat kebutuhan →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Static missions */}
        {staticNeeds.map(need => (
          <div key={need.name} className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #DDE4DE' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-600 text-base mb-1" style={{ color: '#17211B' }}>{need.name}</h3>
                  <div className="flex gap-3 text-sm" style={{ color: '#66736B' }}>
                    <span>{need.fulfilled} dari {need.needed} unit terpenuhi</span>
                  </div>
                </div>
                <span className="badge flex-shrink-0 mt-1" style={{ background: need.statusBg, color: need.statusColor }}>{need.status}</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EAF4E7' }}>
                  <div className="h-full rounded-full" style={{ width: `${(need.fulfilled / need.needed) * 100}%`, background: '#4CAF50' }} />
                </div>
                <span className="font-mono text-xs" style={{ color: '#66736B' }}>{need.fulfilled}/{need.needed}</span>
              </div>
            </div>
            <div className="px-5 py-3">
              <button className="text-sm font-display font-600 transition-opacity hover:opacity-70" style={{ color: '#2E7D32' }}>
                Lihat kebutuhan →
              </button>
            </div>
          </div>
        ))}

        {mission.status === 'none' && (
          <div
            className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-12 gap-3"
            style={{ borderColor: '#DDE4DE' }}
          >
            <p className="text-sm" style={{ color: '#66736B' }}>Belum ada kebutuhan aktif.</p>
            <button
              onClick={() => onNavigate('create-need')}
              className="px-5 py-2.5 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#2E7D32' }}
            >
              + Buat Kebutuhan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
