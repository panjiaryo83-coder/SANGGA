import { useState } from 'react';
import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function AndiKonfirmasi({ onNavigate }: Props) {
  const { state, dispatch } = useApp();
  const [selected, setSelected] = useState(3);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const available = 3;

  const confirm = () => {
    setConfirming(true);
    setTimeout(() => {
      dispatch({ type: 'ANDI_CONFIRM_CAPACITY', trucks: selected });
      setConfirming(false);
      setConfirmed(true);
    }, 1200);
  };

  if (state.andiRequest.status === 'confirmed' || confirmed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#EAF4E7' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 20l9 9 15-15" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="font-display text-2xl font-700 mb-2" style={{ color: '#17211B' }}>
          {state.andiRequest.trucksConfirmed || selected} truk berhasil dikonfirmasi.
        </h2>
        <p className="text-sm mb-2" style={{ color: '#66736B' }}>
          {state.andiRequest.trucksConfirmed || selected} truk telah <strong>direservasi</strong> untuk misi ini.
        </p>
        <p className="text-xs mb-8 px-4" style={{ color: '#66736B' }}>
          Kapasitas yang direservasi tidak tersedia untuk misi lain hingga misi ini selesai.
        </p>

        <div className="p-4 rounded-xl mb-6 text-left" style={{ background: '#EAF4E7', border: '1px solid #C8E6C9' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm" style={{ color: '#17211B' }}>Truk Logistik</span>
            <span className="font-mono text-sm font-500" style={{ color: '#2E7D32' }}>{state.andiRequest.trucksConfirmed || selected} truk direservasi</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 rounded-full overflow-hidden flex" style={{ background: '#C8E6C9' }}>
              <div className="h-full" style={{ width: `${((state.andiRequest.trucksConfirmed || selected) / 5) * 100}%`, background: '#FF7043' }} />
            </div>
            <span className="text-xs" style={{ color: '#66736B' }}>Reservasi</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('tracking')}
          className="w-full py-3.5 rounded-xl font-display font-700 text-sm text-white transition-all hover:opacity-90"
          style={{ background: '#2E7D32' }}
        >
          Pantau aktivasi →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => onNavigate('requests')} className="p-2 rounded-lg hover:bg-gray-50 transition-all" style={{ color: '#66736B' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 16l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <div>
          <h1 className="font-display text-xl font-700" style={{ color: '#17211B' }}>Konfirmasi Kapasitas</h1>
          <p className="text-sm" style={{ color: '#66736B' }}>Respons Banjir · Bekasi</p>
        </div>
      </div>

      <h2 className="font-display text-xl font-700 mb-2" style={{ color: '#17211B' }}>
        Berapa kapasitas yang dapat Anda penuhi?
      </h2>
      <p className="text-sm mb-8" style={{ color: '#66736B' }}>
        Kapasitas yang dikonfirmasi akan otomatis direservasi untuk misi ini.
      </p>

      {/* Quantity selector */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <button
          onClick={() => setSelected(s => Math.max(1, s - 1))}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-300 transition-all hover:bg-gray-50"
          style={{ border: '1.5px solid #DDE4DE', color: '#17211B' }}
        >
          −
        </button>
        <div className="text-center">
          <div className="font-display text-6xl font-800" style={{ color: '#2E7D32', lineHeight: 1 }}>{selected}</div>
          <div className="text-sm mt-2" style={{ color: '#66736B' }}>truk</div>
        </div>
        <button
          onClick={() => setSelected(s => Math.min(available, s + 1))}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-300 transition-all hover:bg-gray-50"
          style={{ border: '1.5px solid #DDE4DE', color: '#17211B' }}
        >
          +
        </button>
      </div>

      <div className="flex gap-2 justify-center mb-8">
        {[1, 2, 3].map(n => (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{
              border: `1px solid ${selected === n ? '#2E7D32' : '#DDE4DE'}`,
              background: selected === n ? '#EAF4E7' : '#fff',
              color: selected === n ? '#2E7D32' : '#66736B',
            }}
          >
            {n} truk
          </button>
        ))}
      </div>

      {/* Context info */}
      <div className="p-4 rounded-xl mb-8" style={{ background: '#EAF4E7' }}>
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: '#66736B' }}>Tersedia</span>
          <span className="font-500" style={{ color: '#17211B' }}>{available} truk</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: '#66736B' }}>Akan dikonfirmasi</span>
          <span className="font-500" style={{ color: '#2E7D32' }}>{selected} truk</span>
        </div>
        <div className="h-px my-2" style={{ background: '#C8E6C9' }} />
        <div className="flex justify-between text-sm">
          <span style={{ color: '#66736B' }}>Sisa tersedia</span>
          <span className="font-500" style={{ color: available - selected > 0 ? '#17211B' : '#D84315' }}>
            {available - selected} truk
          </span>
        </div>
      </div>

      <button
        onClick={confirm}
        disabled={confirming}
        className="w-full py-4 rounded-2xl font-display font-700 text-white text-base transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-70"
        style={{ background: '#2E7D32' }}
      >
        {confirming ? 'Mengkonfirmasi...' : 'Konfirmasi dan Reservasi'}
      </button>
      <p className="text-center text-xs mt-3" style={{ color: '#66736B' }}>
        Kapasitas yang dikonfirmasi tidak dapat digunakan untuk misi lain.
      </p>
    </div>
  );
}
