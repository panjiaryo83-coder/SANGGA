import { useState } from 'react';
import { useApp } from '../../store';

interface Props { onNavigate: (p: string) => void; }

export default function AndiTracking({ onNavigate }: Props) {
  const { state, dispatch } = useApp();
  const reqStatus = state.andiRequest.status;
  const [dispatching, setDispatching] = useState(false);
  const [arriving, setArriving] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [postMissionChoice, setPostMissionChoice] = useState<null | 'ready' | 'needs_update'>(
    state.andiPostMission !== 'none' ? state.andiPostMission : null
  );

  const doDispatch = () => {
    setDispatching(true);
    setTimeout(() => {
      dispatch({ type: 'ANDI_DISPATCH' });
      setDispatching(false);
    }, 1000);
  };

  const doArrive = () => {
    setArriving(true);
    setTimeout(() => {
      dispatch({ type: 'ANDI_ARRIVE' });
      setArriving(false);
    }, 1000);
  };

  const doComplete = () => {
    setCompleting(true);
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_MISSION' });
      setCompleting(false);
    }, 1000);
  };

  const handlePostMission = (choice: 'ready' | 'needs_update') => {
    dispatch({ type: 'POST_MISSION_READINESS', choice });
    setPostMissionChoice(choice);
  };

  const timelineSteps = [
    { label: 'Permintaan diterima', done: true, time: '13.45' },
    { label: 'Kapasitas dikonfirmasi', done: reqStatus !== 'accepted', time: '14.10' },
    { label: 'Kapasitas direservasi', done: reqStatus !== 'accepted', time: '14.12' },
    { label: 'Dalam persiapan', done: ['dispatched', 'arrived', 'completed'].includes(reqStatus), time: '' },
    { label: 'Dikirim', done: ['arrived', 'completed'].includes(reqStatus), time: '' },
    { label: 'Tiba di lokasi', done: ['arrived', 'completed'].includes(reqStatus), time: reqStatus === 'arrived' || reqStatus === 'completed' ? '14.32' : '' },
    { label: 'Misi selesai', done: reqStatus === 'completed', time: reqStatus === 'completed' ? '16.00' : '' },
  ];

  if (reqStatus === 'completed' && postMissionChoice === null) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#EAF4E7' }}>
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="font-display text-2xl font-700 mb-2" style={{ color: '#17211B' }}>Pemenuhan selesai.</h2>
          <p className="text-sm" style={{ color: '#66736B' }}>Respons Banjir · Bekasi</p>
        </div>

        <div className="p-4 rounded-xl mb-8" style={{ background: '#EAF4E7', border: '1px solid #C8E6C9' }}>
          <p className="text-sm font-500 mb-1" style={{ color: '#17211B' }}>
            {state.andiRequest.trucksConfirmed} truk Tiba di lokasi 14.32
          </p>
          <p className="text-xs" style={{ color: '#66736B' }}>Misi berhasil diselesaikan.</p>
        </div>

        <div className="mb-8">
          <h3 className="font-display font-600 text-lg mb-2 text-center" style={{ color: '#17211B' }}>
            Apakah sumber daya ini siap digunakan untuk misi berikutnya?
          </h3>
          <p className="text-xs text-center mb-5" style={{ color: '#66736B' }}>
            Kapasitas tidak otomatis kembali ke status SIAP setelah digunakan.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => handlePostMission('ready')}
              className="w-full py-4 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#2E7D32' }}
            >
              Ya, siap ✓
            </button>
            <button
              onClick={() => handlePostMission('needs_update')}
              className="w-full py-4 rounded-xl font-display font-600 text-sm transition-all"
              style={{ border: '1.5px solid #DDE4DE', color: '#66736B', background: '#fff' }}
            >
              Perlu diperbarui
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (postMissionChoice !== null) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
          background: postMissionChoice === 'ready' ? '#EAF4E7' : '#FFF0EB',
        }}>
          <span className="text-2xl">{postMissionChoice === 'ready' ? '✓' : '⚙️'}</span>
        </div>
        <h2 className="font-display text-xl font-700 mb-2" style={{ color: '#17211B' }}>
          {postMissionChoice === 'ready' ? 'Sumber daya siap untuk misi berikutnya.' : 'Kesiapan perlu diperbarui.'}
        </h2>
        <p className="text-sm mb-8" style={{ color: '#66736B' }}>
          {postMissionChoice === 'ready'
            ? '3 truk kini tersedia untuk aktivasi berikutnya.'
            : 'Pemilik jaringan telah dinotifikasi. Perbarui kesiapan di halaman Kapasitas Saya.'}
        </p>
        <div className="space-y-3">
          {postMissionChoice === 'needs_update' && (
            <button
              onClick={() => onNavigate('capacity')}
              className="w-full py-3 rounded-xl font-display font-600 text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#FF7043' }}
            >
              Perbarui kesiapan sekarang
            </button>
          )}
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3 rounded-xl font-display font-600 text-sm transition-all"
            style={{ border: '1.5px solid #DDE4DE', color: '#66736B' }}
          >
            Kembali ke beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-700 mb-1" style={{ color: '#17211B' }}>Pantau Aktivasi</h1>
        <p className="text-sm" style={{ color: '#66736B' }}>Respons Banjir · Bekasi</p>
      </div>

      {/* Status hero */}
      <div className="rounded-2xl p-5 mb-6" style={{
        background: reqStatus === 'completed' ? '#EAF4E7' : '#FFF7E5',
        border: `1px solid ${reqStatus === 'completed' ? '#C8E6C9' : '#FFCC80'}`,
      }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#66736B' }}>Status Misi</span>
          <span className="badge" style={{
            background: reqStatus === 'completed' ? '#C8E6C9' : reqStatus === 'arrived' ? '#EAF4E7' : '#FFF7E5',
            color: reqStatus === 'completed' ? '#2E7D32' : reqStatus === 'arrived' ? '#2E7D32' : '#8B6914',
          }}>
            {reqStatus === 'completed' ? 'SELESAI' :
             reqStatus === 'arrived' ? 'TIBA' :
             reqStatus === 'dispatched' ? 'DIKIRIM' : 'DALAM PERSIAPAN'}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display font-800 text-4xl" style={{ color: '#17211B', lineHeight: 1 }}>
            {state.andiRequest.trucksConfirmed}
          </span>
          <span className="font-display font-600" style={{ color: '#17211B' }}>dari 10 unit terpenuhi</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#fff', border: '1px solid #DDE4DE' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F4F0' }}>
          <p className="font-display font-600 text-base" style={{ color: '#17211B' }}>Linimasa Aktivasi</p>
        </div>
        <div className="px-5 py-4">
          <div className="relative">
            <div className="absolute left-3.5 top-0 bottom-0 w-px" style={{ background: '#DDE4DE' }} />
            <div className="space-y-5">
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
                  <div className="flex items-center justify-between flex-1">
                    <span
                      className="text-sm"
                      style={{ color: step.done ? '#17211B' : '#66736B', fontWeight: step.done ? 500 : 400 }}
                    >
                      {step.label}
                    </span>
                    {step.time && (
                      <span className="font-mono text-xs" style={{ color: '#66736B' }}>{step.time}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons based on status */}
      <div className="space-y-3">
        {reqStatus === 'confirmed' && (
          <button
            onClick={doDispatch}
            disabled={dispatching}
            className="w-full py-4 rounded-2xl font-display font-700 text-white text-base transition-all hover:opacity-90 disabled:opacity-70"
            style={{ background: '#FF7043' }}
          >
            {dispatching ? 'Memberangkatkan...' : 'Berangkatkan truk →'}
          </button>
        )}
        {reqStatus === 'dispatched' && (
          <button
            onClick={doArrive}
            disabled={arriving}
            className="w-full py-4 rounded-2xl font-display font-700 text-white text-base transition-all hover:opacity-90 disabled:opacity-70"
            style={{ background: '#FF7043' }}
          >
            {arriving ? 'Mengkonfirmasi...' : 'Konfirmasi tiba di lokasi →'}
          </button>
        )}
        {reqStatus === 'arrived' && (
          <button
            onClick={doComplete}
            disabled={completing}
            className="w-full py-4 rounded-2xl font-display font-700 text-white text-base transition-all hover:opacity-90 disabled:opacity-70"
            style={{ background: '#2E7D32' }}
          >
            {completing ? 'Menyelesaikan...' : 'Selesaikan misi →'}
          </button>
        )}
      </div>
    </div>
  );
}
