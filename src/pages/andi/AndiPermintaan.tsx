import { useState } from 'react';
import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function AndiPermintaan({ onNavigate }: Props) {
  const { state, dispatch } = useApp();
  const requestStatus = state.andiRequest.status;
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const hasRequest = requestStatus !== 'none';
  const isReceived = requestStatus === 'received';
  const isAlreadyAccepted = ['accepted', 'confirmed', 'dispatched', 'arrived', 'completed'].includes(requestStatus);

  const accept = () => {
    setAccepting(true);
    setTimeout(() => {
      dispatch({ type: 'ANDI_ACCEPT_REQUEST' });
      setAccepting(false);
      setAccepted(true);
    }, 1000);
  };

  if (!hasRequest) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Permintaan Aktivasi</h1>
          <p className="text-sm" style={{ color: '#66736B' }}>Permintaan aktivasi yang masuk.</p>
        </div>
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#EAF4E7' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12l3 3 6-6" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="#2E7D32" strokeWidth="1.5"/></svg>
          </div>
          <p className="text-sm" style={{ color: '#66736B' }}>Belum ada permintaan aktivasi.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Permintaan Aktivasi</h1>
        <p className="text-sm" style={{ color: '#66736B' }}>Tinjau dan tanggapi permintaan.</p>
      </div>

      {/* Important distinction */}
      <div className="p-4 rounded-xl mb-6" style={{ background: '#FFF7E5', border: '1px solid #FFCC80' }}>
        <p className="text-xs" style={{ color: '#8B6914' }}>
          <strong>Menerima ≠ Mengkonfirmasi.</strong> Setelah menerima, Anda masih perlu mengkonfirmasi jumlah kapasitas yang dapat dipenuhi.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
        <div
          className="px-5 py-4"
          style={{
            borderBottom: '1px solid #F0F4F0',
            background: isReceived && !accepted ? '#FFF0EB' : '#FAFAF8',
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-600 text-lg" style={{ color: '#17211B' }}>Respons Banjir · Bekasi</h3>
            <span className="badge" style={{
              background: isAlreadyAccepted || accepted ? '#EAF4E7' : '#FFF0EB',
              color: isAlreadyAccepted || accepted ? '#2E7D32' : '#D84315',
            }}>
              {isAlreadyAccepted ? 'DITERIMA' : accepted ? 'DITERIMA' : 'BARU'}
            </span>
          </div>
          <p className="text-sm" style={{ color: '#66736B' }}>
            {state.andiRequest.trucksRequested} truk dibutuhkan
          </p>
        </div>

        <div className="px-5 py-4">
          <div className="space-y-3 mb-5">
            {[
              { label: 'Lokasi', value: 'Bekasi, Jawa Barat' },
              { label: 'Waktu', value: 'Hari ini · 14.00' },
              { label: 'Mobilisasi maksimal', value: '3 jam' },
              { label: 'Jenis kapasitas', value: 'Truk Logistik' },
              { label: 'Diotorisasi oleh', value: 'Raka Pratama' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid #F0F4F0' }}>
                <span className="text-sm" style={{ color: '#66736B' }}>{row.label}</span>
                <span className="text-sm font-500" style={{ color: '#17211B' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Capacity match */}
          <div className="p-3 rounded-xl mb-5" style={{ background: '#EAF4E7' }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#17211B' }}>Kapasitas Anda yang tersedia</span>
              <span className="font-display font-700 text-base" style={{ color: '#2E7D32' }}>3 truk</span>
            </div>
            <p className="text-xs mt-1" style={{ color: '#66736B' }}>Memenuhi permintaan {state.andiRequest.trucksRequested} truk</p>
          </div>

          {/* Actions */}
          {(isReceived && !accepted) && (
            <div className="space-y-3">
              <button
                onClick={accept}
                disabled={accepting}
                className="w-full py-3.5 rounded-xl font-display font-700 text-sm text-white transition-all hover:opacity-90 disabled:opacity-70"
                style={{ background: '#FF7043' }}
              >
                {accepting ? 'Memproses...' : 'Terima permintaan'}
              </button>
              <button className="w-full py-3 rounded-xl font-display font-600 text-sm transition-all" style={{ border: '1.5px solid #DDE4DE', color: '#66736B' }}>
                Tolak permintaan
              </button>
            </div>
          )}

          {(accepted || isAlreadyAccepted) && requestStatus !== 'confirmed' && (
            <div>
              <div className="p-3 rounded-xl mb-4" style={{ background: '#EAF4E7' }}>
                <p className="font-display font-600 text-sm" style={{ color: '#2E7D32' }}>✓ Permintaan telah diterima.</p>
                <p className="text-xs mt-1" style={{ color: '#66736B' }}>Langkah berikutnya: konfirmasi kapasitas yang dapat Anda penuhi.</p>
              </div>
              <button
                onClick={() => onNavigate('confirm')}
                className="w-full py-3.5 rounded-xl font-display font-700 text-sm text-white transition-all hover:opacity-90"
                style={{ background: '#2E7D32' }}
              >
                Konfirmasi kapasitas →
              </button>
            </div>
          )}

          {requestStatus === 'confirmed' && (
            <div>
              <div className="p-3 rounded-xl mb-4" style={{ background: '#EAF4E7' }}>
                <p className="font-display font-600 text-sm" style={{ color: '#2E7D32' }}>
                  ✓ {state.andiRequest.trucksConfirmed} truk berhasil dikonfirmasi dan direservasi.
                </p>
              </div>
              <button
                onClick={() => onNavigate('tracking')}
                className="w-full py-3 rounded-xl font-display font-600 text-sm transition-all"
                style={{ border: '1.5px solid #2E7D32', color: '#2E7D32', background: '#EAF4E7' }}
              >
                Pantau aktivasi →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
