import React from 'react';
import { 
  User, Users, Briefcase, MapPin, Building2, ShieldAlert, Calendar, Plus, Trash2, Sliders
} from 'lucide-react';
import { BSPSAppState, RecipientProfile, KpbProfile, TflProfile, TokoProfile, DesaProfile, GeneralProjectState } from '../types';

interface ProfileManagerProps {
  state: BSPSAppState;
  onChange: (updater: (prev: BSPSAppState) => BSPSAppState) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({ state, onChange, activeTab, setActiveTab }) => {
  const updateRecipient = <K extends keyof RecipientProfile>(key: K, value: RecipientProfile[K]) => {
    onChange((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, [key]: value }
    }));
  };

  const updateKpb = <K extends keyof KpbProfile>(key: K, value: KpbProfile[K]) => {
    onChange((prev) => ({
      ...prev,
      kpb: { ...prev.kpb, [key]: value }
    }));
  };

  const updateTfl = <K extends keyof TflProfile>(key: K, value: TflProfile[K]) => {
    onChange((prev) => ({
      ...prev,
      tfl: { ...prev.tfl, [key]: value }
    }));
  };

  const updateToko = <K extends keyof TokoProfile>(key: K, value: TokoProfile[K]) => {
    onChange((prev) => ({
      ...prev,
      toko: { ...prev.toko, [key]: value }
    }));
  };

  const updateDesa = <K extends keyof DesaProfile>(key: K, value: DesaProfile[K]) => {
    onChange((prev) => ({
      ...prev,
      desa: { ...prev.desa, [key]: value }
    }));
  };

  const updateProject = <K extends keyof GeneralProjectState>(key: K, value: GeneralProjectState[K]) => {
    onChange((prev) => ({
      ...prev,
      project: { ...prev.project, [key]: value }
    }));
  };

  const updateCustomField = (key: string, value: string) => {
    onChange((prev) => ({
      ...prev,
      customFields: { ...prev.customFields, [key]: value }
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_#000]">
      <div className="flex text-xs font-bold border-b-2 border-black bg-[#EAEAE5] flex-wrap">
        <button
          onClick={() => setActiveTab('penerima')}
          className={`flex-1 py-3 px-1.5 flex items-center justify-center gap-1 border-r border-[#1A1A1A] font-mono transition-none ${
            activeTab === 'penerima' 
              ? 'bg-black text-white font-bold' 
              : 'text-[#1A1A1A] bg-[#EAEAE5] hover:bg-white'
          }`}
          id="tab-penerima"
        >
          <User size={13} className="shrink-0" />
          <span>Penerima</span>
        </button>
        <button
          onClick={() => setActiveTab('kpb')}
          className={`flex-1 py-3 px-1.5 flex items-center justify-center gap-1 border-r border-[#1A1A1A] font-mono transition-none ${
            activeTab === 'kpb' 
              ? 'bg-black text-white font-bold' 
              : 'text-[#1A1A1A] bg-[#EAEAE5] hover:bg-white'
          }`}
          id="tab-kpb"
        >
          <Users size={13} className="shrink-0" />
          <span>Kelompok</span>
        </button>
        <button
          onClick={() => setActiveTab('tfl')}
          className={`flex-1 py-3 px-1.5 flex items-center justify-center gap-1 border-r border-[#1A1A1A] font-mono transition-none ${
            activeTab === 'tfl' 
              ? 'bg-black text-white font-bold' 
              : 'text-[#1A1A1A] bg-[#EAEAE5] hover:bg-white'
          }`}
          id="tab-tfl"
        >
          <Briefcase size={13} className="shrink-0" />
          <span>TFL</span>
        </button>
        <button
          onClick={() => setActiveTab('toko')}
          className={`flex-1 py-3 px-1.5 flex items-center justify-center gap-1 border-r border-[#1A1A1A] font-mono transition-none ${
            activeTab === 'toko' 
              ? 'bg-black text-white font-bold' 
              : 'text-[#1A1A1A] bg-[#EAEAE5] hover:bg-white'
          }`}
          id="tab-toko"
        >
          <Building2 size={13} className="shrink-0" />
          <span>Toko</span>
        </button>
        <button
          onClick={() => setActiveTab('desa')}
          className={`flex-1 py-3 px-1.5 flex items-center justify-center gap-1 border-r border-[#1A1A1A] font-mono transition-none ${
            activeTab === 'desa' 
              ? 'bg-black text-white font-bold' 
              : 'text-[#1A1A1A] bg-[#EAEAE5] hover:bg-white'
          }`}
          id="tab-desa"
        >
          <MapPin size={13} className="shrink-0" />
          <span>Desa</span>
        </button>
        <button
          onClick={() => setActiveTab('project')}
          className={`flex-1 py-3 px-1.5 flex items-center justify-center gap-1 font-mono transition-none ${
            activeTab === 'project' 
              ? 'bg-black text-white font-bold' 
              : 'text-[#1A1A1A] bg-[#EAEAE5] hover:bg-white'
          }`}
          id="tab-project"
        >
          <Calendar size={13} className="shrink-0" />
          <span>Proyek</span>
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto max-h-[460px] bg-white scrollbar-thin">
        {activeTab === 'penerima' && (
          <div className="space-y-3 font-sans text-xs">
            <h3 className="text-slate-800 font-semibold uppercase text-[10px] tracking-wider mb-2 border-l-2 border-emerald-500 pl-1.5">
              Demografi & Identitas Calon Penerima Bantuan
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={state.recipient.nama} 
                  onChange={(e) => updateRecipient('nama', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                  placeholder="Nama Lengkap"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">NIK (KTP)</label>
                <input 
                  type="text" 
                  value={state.recipient.nik} 
                  onChange={(e) => updateRecipient('nik', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                  placeholder="16 Digit NIK"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Umur (Tahun)</label>
                <input 
                  type="text" 
                  value={state.recipient.umur} 
                  onChange={(e) => updateRecipient('umur', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                  placeholder="Contoh: 34"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Pekerjaan Utama</label>
                <input 
                  type="text" 
                  value={state.recipient.pekerjaan} 
                  onChange={(e) => updateRecipient('pekerjaan', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                  placeholder="Pekerjaan"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Alamat Lengkap (RT/RW/Dusun)</label>
              <input 
                type="text" 
                value={state.recipient.alamatSecaraLengkap} 
                onChange={(e) => updateRecipient('alamatSecaraLengkap', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                placeholder="RT. 04 RW. 02 Dusun Sinar Baru"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">No Rekening Bank</label>
                <input 
                  type="text" 
                  value={state.recipient.noRekening} 
                  onChange={(e) => updateRecipient('noRekening', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                  placeholder="No Rekening Bank"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Bank Penyalur</label>
                <input 
                  type="text" 
                  value={state.recipient.bankPenyalur} 
                  onChange={(e) => updateRecipient('bankPenyalur', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                  placeholder="Bank Penyalur"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="col-span-2">
                <h4 className="text-[10px] font-bold text-slate-700 bg-[#EAEAE5] px-2 py-1 border-2 border-black">IDENTIFIKASI KESWADAYAAN PENERIMA (FORMAT II-12)</h4>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Jumlah Swadaya (Uang)</label>
                <input 
                  type="text" 
                  value={state.recipient.jumlahSwadayaUang} 
                  onChange={(e) => updateRecipient('jumlahSwadayaUang', e.target.value)}
                  className="w-full text-xs p-1.5 border-2 border-black focus:outline-none" 
                  placeholder="Contoh: Rp 5.000.000"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Bentuk Swadaya Bahan/Jasa</label>
                <input 
                  type="text" 
                  value={state.recipient.bentukSwadayaBarang} 
                  onChange={(e) => updateRecipient('bentukSwadayaBarang', e.target.value)}
                  className="w-full text-xs p-1.5 border-2 border-black focus:outline-none" 
                  placeholder="Contoh: Kayu Pagar, Pasir"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="col-span-2">
                <h4 className="text-[10px] font-bold text-slate-700 bg-[#EAEAE5] px-2 py-1 border-2 border-black">MITRA TUKANG KERJA (1 CPB : 1 TUKANG)</h4>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Lengkap Tukang</label>
                <input 
                  type="text" 
                  value={state.customFields.namaTukang1 || ''} 
                  onChange={(e) => updateCustomField('namaTukang1', e.target.value)}
                  className="w-full text-xs p-1.5 border-2 border-black focus:outline-none" 
                  placeholder="Contoh: Ahmad M. Thoyib"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">No KTP (NIK) Tukang</label>
                <input 
                  type="text" 
                  value={state.customFields.nikTukang1 || ''} 
                  onChange={(e) => updateCustomField('nikTukang1', e.target.value)}
                  className="w-full text-xs p-1.5 border-2 border-black focus:outline-none" 
                  placeholder="Contoh: 5206081203880005"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kpb' && (
          <div className="space-y-3 font-sans text-xs">
            <h3 className="text-slate-800 font-semibold uppercase text-[10px] tracking-wider mb-2 border-l-2 border-emerald-500 pl-1.5">
              Profil Kelompok Penerima Bantuan (KPB)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Kelompok (KPB)</label>
                <input 
                  type="text" 
                  value={state.kpb.namaKpb} 
                  onChange={(e) => updateKpb('namaKpb', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                  placeholder="Misal: KPB Sinar Jaya II"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">No SK Pengesahan KPB</label>
                <input 
                  type="text" 
                  value={state.customFields.noSuratKeputusanKPB || ''} 
                  onChange={(e) => updateCustomField('noSuratKeputusanKPB', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                  placeholder="Contoh: KPB/053/VIII/2026"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1">Nama Ketua KPB</label>
                <input 
                  type="text" 
                  value={state.kpb.ketua} 
                  onChange={(e) => updateKpb('ketua', e.target.value)}
                  className="w-full text-[11px] p-1.5 border border-slate-200 bg-white rounded-md focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1">Nama Sekretaris</label>
                <input 
                  type="text" 
                  value={state.kpb.sekretaris} 
                  onChange={(e) => updateKpb('sekretaris', e.target.value)}
                  className="w-full text-[11px] p-1.5 border border-slate-200 bg-white rounded-md focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1">Nama Bendahara</label>
                <input 
                  type="text" 
                  value={state.kpb.bendahara} 
                  onChange={(e) => updateKpb('bendahara', e.target.value)}
                  className="w-full text-[11px] p-1.5 border border-slate-200 bg-white rounded-md focus:border-emerald-500" 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-medium text-slate-600">Daftar Anggota Kelompok (Max 10)</label>
                <button
                  type="button"
                  onClick={() => {
                    const next = [...state.kpb.anggota, 'Anggota Baru'];
                    updateKpb('anggota', next);
                  }}
                  className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
                >
                  <Plus size={11} /> Tambah Anggota
                </button>
              </div>
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto border border-slate-200 rounded p-1.5">
                {state.kpb.anggota.map((ang, idx) => (
                  <div key={idx} className="flex gap-1 items-center">
                    <span className="text-slate-400 font-mono text-[10px] w-4">{idx + 1}.</span>
                    <input 
                      type="text" 
                      value={ang} 
                      onChange={(e) => {
                        const copy = [...state.kpb.anggota];
                        copy[idx] = e.target.value;
                        updateKpb('anggota', copy);
                      }}
                      className="flex-1 text-[11px] p-1 py-0.5 border border-slate-200 rounded bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const copy = state.kpb.anggota.filter((_, i) => i !== idx);
                        updateKpb('anggota', copy);
                      }}
                      className="p-1 text-rose-500 hover:bg-rose-55 hover:text-rose-600 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tfl' && (
          <div className="space-y-3 font-sans text-xs">
            <h3 className="text-slate-800 font-semibold uppercase text-[10px] tracking-wider mb-2 border-l-2 border-emerald-500 pl-1.5">
              Tenaga Fasilitator Lapangan (TFL) / Pendamping
            </h3>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama TFL Pendamping</label>
              <input 
                type="text" 
                value={state.tfl.namaTfl} 
                onChange={(e) => updateTfl('namaTfl', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                placeholder="Misal: Subhan Al-Fatih, S.T."
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Koordinator Kabupaten/Kota</label>
              <input 
                type="text" 
                value={state.tfl.koordinatorKabupaten} 
                onChange={(e) => updateTfl('koordinatorKabupaten', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                placeholder="Misal: Ir. H. Muhammad Ilyas, M.T."
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Tim Konsultan Pendamping Provinsi</label>
              <input 
                type="text" 
                value={state.tfl.timPendampingProvinsi} 
                onChange={(e) => updateTfl('timPendampingProvinsi', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                placeholder="Misal: Tim Konsultan Manajemen Swadaya NTB"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Lokasi Kerja</label>
              <input 
                type="text" 
                value={state.tfl.lokasi} 
                onChange={(e) => updateTfl('lokasi', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                placeholder="Misal: Kecamatan Sanggar"
              />
            </div>
          </div>
        )}

        {activeTab === 'toko' && (
          <div className="space-y-3 font-sans text-xs">
            <h3 className="text-slate-800 font-semibold uppercase text-[10px] tracking-wider mb-2 border-l-2 border-emerald-500 pl-1.5">
              Toko / Penyedia Bahan Bangunan Terpilih
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Toko</label>
                <input 
                  type="text" 
                  value={state.toko.namaToko} 
                  onChange={(e) => updateToko('namaToko', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                  placeholder="Contoh: UD. TOKO KARYA AGUNG"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Pemilik Toko</label>
                <input 
                  type="text" 
                  value={state.toko.pemilikToko} 
                  onChange={(e) => updateToko('pemilikToko', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                  placeholder="H. Syamsuddin HM"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">NIK Pemilik Toko</label>
                <input 
                  type="text" 
                  value={state.toko.nikPemilik} 
                  onChange={(e) => updateToko('nikPemilik', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">NPWP Usaha Toko</label>
                <input 
                  type="text" 
                  value={state.toko.npwpUsaha} 
                  onChange={(e) => updateToko('npwpUsaha', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Alamat Kantor Toko</label>
              <input 
                type="text" 
                value={state.toko.alamat} 
                onChange={(e) => updateToko('alamat', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">No SIUP Toko</label>
                <input 
                  type="text" 
                  value={state.toko.siupNomor} 
                  onChange={(e) => updateToko('siupNomor', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">No SITU Toko</label>
                <input 
                  type="text" 
                  value={state.toko.situNomor} 
                  onChange={(e) => updateToko('situNomor', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">No Rekening Toko</label>
                <input 
                  type="text" 
                  value={state.toko.noRekeningToko} 
                  onChange={(e) => updateToko('noRekeningToko', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Bank Toko</label>
                <input 
                  type="text" 
                  value={state.toko.bankToko} 
                  onChange={(e) => updateToko('bankToko', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'desa' && (
          <div className="space-y-3 font-sans text-xs">
            <h3 className="text-slate-800 font-semibold uppercase text-[10px] tracking-wider mb-2 border-l-2 border-emerald-500 pl-1.5">
              Pemerintah Desa / Lurah Setempat
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Kepala Desa / Lurah</label>
                <input 
                  type="text" 
                  value={state.desa.namaKepalaDesa} 
                  onChange={(e) => updateDesa('namaKepalaDesa', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                  placeholder="Misal: Arifin Ahmad, S.Sos."
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">NIP Kepala Desa (Bila PNS)</label>
                <input 
                  type="text" 
                  value={state.desa.nipKepalaDesa} 
                  onChange={(e) => updateDesa('nipKepalaDesa', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                  placeholder="Contoh: 1982..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama Desa / Kelurahan</label>
                <input 
                  type="text" 
                  value={state.desa.desa} 
                  onChange={(e) => {
                    const val = e.target.value;
                    updateDesa('desa', val);
                    updateRecipient('desa', val);
                    updateKpb('desa', val);
                  }}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Kecamatan</label>
                <input 
                  type="text" 
                  value={state.desa.kecamatan} 
                  onChange={(e) => {
                    const val = e.target.value;
                    updateDesa('kecamatan', val);
                    updateRecipient('kecamatan', val);
                    updateKpb('kecamatan', val);
                  }}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Kabupaten</label>
                <input 
                  type="text" 
                  value={state.desa.kabupaten} 
                  onChange={(e) => {
                    const val = e.target.value;
                    updateDesa('kabupaten', val);
                    updateRecipient('kabupaten', val);
                  }}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Provinsi</label>
                <input 
                  type="text" 
                  value={state.desa.provinsi} 
                  onChange={(e) => {
                    const val = e.target.value;
                    updateDesa('provinsi', val);
                    updateRecipient('provinsi', val);
                  }}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Alamat Kantor Desa</label>
              <input 
                type="text" 
                value={state.desa.alamatKantor} 
                onChange={(e) => updateDesa('alamatKantor', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
              />
            </div>
          </div>
        )}

        {activeTab === 'project' && (
          <div className="space-y-3 font-sans text-xs">
            <h3 className="text-slate-800 font-semibold uppercase text-[10px] tracking-wider mb-2 border-l-2 border-emerald-500 pl-1.5">
              Parameter Proyek BSPS & Pejabat Pembuat Komitmen
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Nama PPK Rumah Swadaya</label>
                <input 
                  type="text" 
                  value={state.project.namaPPK} 
                  onChange={(e) => updateProject('namaPPK', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Tahun Anggaran</label>
                <input 
                  type="text" 
                  value={state.project.tahunAnggaran} 
                  onChange={(e) => updateProject('tahunAnggaran', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Satuan Kerja PPK</label>
              <input 
                type="text" 
                value={state.project.satuanKerjaPPK} 
                onChange={(e) => updateProject('satuanKerjaPPK', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-250 bg-slate-50/50 rounded-md focus:border-emerald-500" 
              />
            </div>

            <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100/85">
              <span className="text-[10px] font-bold text-emerald-800 block uppercase mb-1">Data Rembuk Sosialisasi & Rembuk Warga</span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] font-medium text-slate-500">Tanggal/Hari Rembuk</label>
                  <input 
                    type="text" 
                    value={state.project.tanggalRembuk} 
                    onChange={(e) => updateProject('tanggalRembuk', e.target.value)}
                    className="w-full text-[10px] p-1 border border-slate-200 bg-white rounded" 
                    placeholder="Senin, 10 Feb 2026"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-500">Tempat Rapat</label>
                  <input 
                    type="text" 
                    value={state.project.tempatRembuk} 
                    onChange={(e) => updateProject('tempatRembuk', e.target.value)}
                    className="w-full text-[10px] p-1 border border-slate-200 bg-white rounded" 
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-500">Jumlah Peserta</label>
                  <input 
                    type="text" 
                    value={state.project.pesertaRembuk} 
                    onChange={(e) => updateProject('pesertaRembuk', e.target.value)}
                    className="w-full text-[10px] p-1 border border-slate-200 bg-white rounded" 
                  />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 p-2.5 rounded-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-700 block uppercase">Field Dokumen Kustom (Kamus Administrasi)</span>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-medium text-slate-600">Nomor Surat Tanah (Desa)</label>
                  <input 
                    type="text" 
                    value={state.customFields.noSuratKeteranganTanah || ''} 
                    onChange={(e) => updateCustomField('noSuratKeteranganTanah', e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-slate-200 rounded" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-600">No SPTJM PPK</label>
                  <input 
                    type="text" 
                    value={state.customFields.noSuratSPTJM || ''} 
                    onChange={(e) => updateCustomField('noSuratSPTJM', e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-slate-200 rounded" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-medium text-slate-600">Nama Saksi 1 (Tanah)</label>
                  <input 
                    type="text" 
                    value={state.customFields.namaWargaSaksi1 || ''} 
                    onChange={(e) => updateCustomField('namaWargaSaksi1', e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-slate-200 rounded" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-600">Nama Saksi 2 (Tanah)</label>
                  <input 
                    type="text" 
                    value={state.customFields.namaWargaSaksi2 || ''} 
                    onChange={(e) => updateCustomField('namaWargaSaksi2', e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-slate-200 rounded" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] font-medium text-slate-600">Nama Tukang 1 (Utama)</label>
                  <input 
                    type="text" 
                    value={state.customFields.namaTukang1 || ''} 
                    onChange={(e) => updateCustomField('namaTukang1', e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-slate-200 rounded" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-600">NIK Tukang 1</label>
                  <input 
                    type="text" 
                    value={state.customFields.nikTukang1 || ''} 
                    onChange={(e) => updateCustomField('nikTukang1', e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-slate-200 rounded" 
                  />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
      
      <div className="bg-emerald-50 px-3.5 py-2.5 border-t border-emerald-150 flex items-center justify-between text-[11px] text-emerald-800">
        <div className="flex items-center gap-1.5 font-medium">
          <Sliders size={13} className="text-emerald-600" />
          <span>Profil & Variabel Terhubung Otomatis</span>
        </div>
        <span className="text-[9px] bg-emerald-600 text-white font-mono px-1.5 py-0.5 rounded-full uppercase">Sinkron</span>
      </div>
    </div>
  );
};
