import { useState } from 'react';
import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

function CapacityDetail({ onClose }: { onClose: () => void }) {
  const { state } = useApp();
  const reserved = state.andiRequest.trucksConfirmed || 0;
  const ready = state.andiPostMission === 'needs_update' ? 0 : 3;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: '#fff' }}>
        <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid #DDE4DE' }}>
          <h3 className="font-display font-700 text-lg" style={{ color: '#17211B' }}>Truk Logistik</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-50 text-xl leading-none" style={{ color: '#66736B' }}>✕</button>
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: 'Kapasitas Nominal', value: '5 truk' },
            { label: 'Kapasitas Terkomitmen', value: '5 truk' },
            { label: 'Siap Saat Ini', value: `${ready} truk` },
            { label: 'Direservasi', value: `${reserved} truk` },
            { label: 'Tersedia untuk Aktivasi', value: `${Math.max(0, ready - reserved)} truk` },
            { label: 'Terakhir diverifikasi', value: '15 September 2026' },
          ].map((row, i) => (
            <div key={row.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < 5 ? '1px solid #F0F4F0' : 'none' }}>
              <span className="text-sm" style={{ color: '#66736B' }}>{row.label}</span>
              <span className="text-sm font-500 font-mono" style={{ color: '#17211B' }}>{row.value}</span>
            </div>
          ))}
        </div>
        <div className="px-5 pb-5">
          <button onClick={onClose} className="w-full py-3 rounded-xl font-display font-600 text-sm transition-all" style={{ background: '#EAF4E7', color: '#2E7D32' }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AndiKapasitas({ onNavigate }: Props) {
  const { state, dispatch } = useApp();
  const [showDetail, setShowDetail] = useState(false);
  const [updatingReadiness, setUpdatingReadiness] = useState(false);
  const [readinessUpdated, setReadinessUpdated] = useState(false);

  const reserved = state.andiRequest.trucksConfirmed || 0;
  const needsUpdate = state.andiPostMission === 'needs_update';
  const readyNow = needsUpdate ? 0 : 3;

  const updateReadiness = () => {
    setUpdatingReadiness(true);
    setTimeout(() => {
      dispatch({ type: 'POST_MISSION_READINESS', choice: 'ready' });
      setUpdatingReadiness(false);
      setReadinessUpdated(true);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      {showDetail && <CapacityDetail onClose={() => setShowDetail(false)} />}

      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Kapasitas Saya</h1>
        <p className="text-sm" style={{ color: '#66736B' }}>Kelola dan pantau kapasitas Anda.</p>
      </div>

      {readinessUpdated && (
        <div className="p-4 rounded-xl mb-6" style={{ background: '#EAF4E7', border: '1px solid #C8E6C9' }}>
          <p className="font-display font-600 text-sm" style={{ color: '#2E7D32' }}>✓ Kesiapan berhasil diperbarui.</p>
          <p className="text-xs mt-1" style={{ color: '#66736B' }}>3 truk kini tersedia untuk aktivasi berikutnya.</p>
        </div>
      )}

      {/* Main capacity card */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-600 text-base" style={{ color: '#17211B' }}>Truk Logistik</h3>
            <span
              className="badge"
              style={{
                background: needsUpdate ? '#FFF0EB' : '#EAF4E7',
                color: needsUpdate ? '#D84315' : '#2E7D32',
              }}
            >
              {needsUpdate ? 'PERLU DIPERBARUI' : 'SIAP'}
            </span>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="font-display font-700 text-2xl" style={{ color: '#17211B' }}>5</div>
              <div className="text-xs" style={{ color: '#66736B' }}>terkomitmen</div>
            </div>
            <div>
              <div className="font-display font-700 text-2xl" style={{ color: needsUpdate ? '#D84315' : '#2E7D32' }}>{readyNow}</div>
              <div className="text-xs" style={{ color: '#66736B' }}>siap</div>
            </div>
            {reserved > 0 && (
              <div>
                <div className="font-display font-700 text-2xl" style={{ color: '#FF7043' }}>{reserved}</div>
                <div className="text-xs" style={{ color: '#66736B' }}>direservasi</div>
              </div>
            )}
          </div>
        </div>

        {/* Capacity bar */}
        <div className="px-5 py-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2.5 rounded-full overflow-hidden flex" style={{ background: '#EAF4E7' }}>
              {reserved > 0 && (
                <div className="h-full" style={{ width: `${(reserved / 5) * 100}%`, background: '#FF7043' }} />
              )}
              <div className="h-full" style={{ width: `${(readyNow / 5) * 100}%`, background: '#2E7D32' }} />
            </div>
            <span className="text-xs font-mono" style={{ color: '#66736B' }}>{readyNow}/5</span>
          </div>
          <div className="flex gap-4 text-xs" style={{ color: '#66736B' }}>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: '#2E7D32' }} />Siap</span>
            {reserved > 0 && <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: '#FF7043' }} />Reservasi</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-3">
          {needsUpdate && !readinessUpdated ? (
            <button
              onClick={updateReadiness}
              disabled={updatingReadiness}
              className="flex-1 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: '#FF7043' }}
            >
              {updatingReadiness ? 'Memperbarui...' : 'Perbarui kesiapan'}
            </button>
          ) : (
            <button
              className="flex-1 py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#2E7D32' }}
            >
              Perbarui kesiapan
            </button>
          )}
          <button
            onClick={() => setShowDetail(true)}
            className="flex-1 py-3 rounded-xl font-display font-600 text-sm transition-all"
            style={{ border: '1.5px solid #DDE4DE', color: '#66736B' }}
          >
            Lihat detail
          </button>
        </div>
      </div>

      {/* Verification info */}
      <div className="p-4 rounded-xl" style={{ background: '#EAF4E7' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-500" style={{ color: '#17211B' }}>Status Verifikasi</p>
            <p className="text-xs mt-0.5" style={{ color: '#66736B' }}>Terakhir diverifikasi: 15 September 2026</p>
          </div>
          <span className="badge" style={{ background: '#C8E6C9', color: '#2E7D32' }}>VALID</span>
        </div>
      </div>
    </div>
  );
}
