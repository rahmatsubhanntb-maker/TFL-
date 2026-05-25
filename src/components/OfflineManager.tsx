import React, { useState } from 'react';
import { 
  Sliders, Layout, Database, RefreshCw, PenTool, Download, 
  Upload, Copy, Plus, Trash2, Sparkles, CheckCircle, Info
} from 'lucide-react';
import { BSPSAppState } from '../types';
import { ProfileManager } from './ProfileManager';
import { BOQEditor } from './BOQEditor';

interface OfflineManagerProps {
  state: BSPSAppState;
  setState: React.Dispatch<React.SetStateAction<BSPSAppState>>;
  hierarchyDb: { [key: string]: any };
  setHierarchyDb: React.Dispatch<React.SetStateAction<any>>;
  applyHierarchicalCPB: (kecName: string, dName: string, cpbIdx: number, customDb?: any) => void;
  hierarchyKecamatan: string;
  setHierarchyKecamatan: React.Dispatch<React.SetStateAction<string>>;
  hierarchyDesa: string;
  setHierarchyDesa: React.Dispatch<React.SetStateAction<string>>;
  hierarchyCPBIndex: number;
  setHierarchyCPBIndex: React.Dispatch<React.SetStateAction<number>>;
  saveSuccess: boolean;
  activeProfileTab: string;
  setActiveProfileTab: React.Dispatch<React.SetStateAction<string>>;
  handleStateChange: (updater: (prev: BSPSAppState) => BSPSAppState) => void;
}

export const OfflineManager: React.FC<OfflineManagerProps> = ({
  state,
  setState,
  hierarchyDb,
  setHierarchyDb,
  applyHierarchicalCPB,
  hierarchyKecamatan,
  setHierarchyKecamatan,
  hierarchyDesa,
  setHierarchyDesa,
  hierarchyCPBIndex,
  setHierarchyCPBIndex,
  saveSuccess,
  activeProfileTab,
  setActiveProfileTab,
  handleStateChange,
}) => {
  const [editorTab, setEditorTab] = useState<'variabel' | 'desain' | 'database' | 'sync'>('variabel');
  const [dbEditTarget, setDbEditTarget] = useState<'kecamatan' | 'desa' | 'cpb'>('kecamatan');
  const [tempImportCode, setTempImportCode] = useState('');
  const [syncClipboardSuccess, setSyncClipboardSuccess] = useState(false);

  const updateLayoutField = (key: string, value: string) => {
    setState(prev => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [key]: value
      }
    }));
  };

  return (
    <section className="w-[380px] border-r-2 border-black bg-[#EAEAE5] flex flex-col shrink-0 flex-none print:hidden h-full">
      {/* Title block */}
      <div className="p-3 border-b-2 border-black flex items-center justify-between text-[#1A1A1A] bg-stone-100 shrink-0">
        <div className="flex items-center gap-1.5">
          <Sliders size={13} className="text-black" />
          <span className="text-[10px] font-black uppercase tracking-wider">PANEL KONTROL SISTEM</span>
        </div>
        {saveSuccess && (
          <span className="text-[9px] font-mono font-bold text-black bg-emerald-100 border-2 border-black px-1.5 py-0.5 flex items-center gap-0.5">
            <CheckCircle size={9} /> TERSIMPAN
          </span>
        )}
      </div>

      {/* Tab bar header */}
      <div className="flex bg-neutral-900 p-0.5 text-xs font-mono shrink-0 select-none text-white border-b-2 border-black">
        <button 
          onClick={() => setEditorTab('variabel')}
          className={`flex-1 text-center py-2 px-1 font-black uppercase text-[9px] tracking-tighter cursor-pointer ${editorTab === 'variabel' ? 'bg-[#F4F4F1] text-black' : 'text-zinc-400 hover:text-white hover:bg-neutral-800'}`}
        >
          📝 Form Isian
        </button>
        <button 
          onClick={() => setEditorTab('desain')}
          className={`flex-1 text-center py-2 px-1 font-black uppercase text-[9px] tracking-tighter cursor-pointer ${editorTab === 'desain' ? 'bg-[#F4F4F1] text-black' : 'text-zinc-400 hover:text-white hover:bg-neutral-800'}`}
        >
          🎨 Cetak & Font
        </button>
        <button 
          onClick={() => setEditorTab('database')}
          className={`flex-1 text-center py-2 px-1 font-black uppercase text-[9px] tracking-tighter cursor-pointer ${editorTab === 'database' ? 'bg-[#F4F4F1] text-black' : 'text-zinc-400 hover:text-white hover:bg-neutral-800'}`}
        >
          🗺️ Atur Wilayah
        </button>
        <button 
          onClick={() => setEditorTab('sync')}
          className={`flex-1 text-center py-2 px-1 font-black uppercase text-[9px] tracking-tighter cursor-pointer ${editorTab === 'sync' ? 'bg-[#F4F4F1] text-black' : 'text-zinc-400 hover:text-white hover:bg-neutral-800'}`}
        >
          ♻️ Cadangan
        </button>
      </div>

      {/* Scrollable Main tab container */}
      <div className="flex-1 p-3 space-y-4 overflow-y-auto scrollbar-thin">
        
        {/* TAB 1: FORM UTAMA */}
        {editorTab === 'variabel' && (
          <div className="space-y-4">
            {/* DATABASE NAVIGATOR */}
            <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_#000] space-y-3">
              <div className="text-[10px] font-black text-black uppercase tracking-wider border-b-2 border-black pb-1 flex items-center gap-1.5 font-mono">
                <Sparkles size={12} className="text-black shrink-0" />
                <span>PILIHAN BASIS DATA YANG RUNNING</span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[8px] font-bold text-gray-700 uppercase font-mono mb-1">1. PILIH KECAMATAN ({Object.keys(hierarchyDb).length} PILIHAN)</label>
                  <select
                    value={hierarchyKecamatan}
                    onChange={(e) => {
                      const kecName = e.target.value;
                      setHierarchyKecamatan(kecName);
                      const firstDesa = Object.keys(hierarchyDb[kecName]?.desas || {})[0] || '';
                      setHierarchyDesa(firstDesa);
                      setHierarchyCPBIndex(0);
                      if (firstDesa) applyHierarchicalCPB(kecName, firstDesa, 0);
                    }}
                    className="w-full bg-white border-2 border-black p-1.5 text-xs font-mono font-semibold"
                  >
                    {Object.keys(hierarchyDb).map(kec => (
                      <option key={kec} value={kec}>Kecamatan {kec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[8px] font-bold text-gray-700 uppercase font-mono mb-1">2. PILIH DESA ({Object.keys(hierarchyDb[hierarchyKecamatan]?.desas || {}).length} DESA)</label>
                  <select
                    value={hierarchyDesa}
                    onChange={(e) => {
                      const dName = e.target.value;
                      setHierarchyDesa(dName);
                      setHierarchyCPBIndex(0);
                      applyHierarchicalCPB(hierarchyKecamatan, dName, 0);
                    }}
                    className="w-full bg-white border-2 border-black p-1.5 text-xs font-mono font-semibold"
                  >
                    {Object.keys(hierarchyDb[hierarchyKecamatan]?.desas || {}).map(desaKey => (
                      <option key={desaKey} value={desaKey}>{desaKey}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[8px] font-bold text-gray-700 uppercase font-mono mb-1">3. PILIH PENERIMA / CPB ({hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs?.length || 0} ORANG)</label>
                  <select
                    value={hierarchyCPBIndex}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setHierarchyCPBIndex(idx);
                      applyHierarchicalCPB(hierarchyKecamatan, hierarchyDesa, idx);
                    }}
                    className="w-full bg-white border-2 border-black p-1.5 text-xs font-mono font-semibold text-black"
                  >
                    {(hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs || []).map((cpb: any, idx: number) => (
                      <option key={cpb.id} value={idx}>
                        NO. {idx + 1}: {cpb.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Summary attributes status board */}
              <div className="bg-[#EAEAE2] p-2 border-2 border-black space-y-1 font-mono text-[9px] text-[#1A1A1A]">
                <div className="flex justify-between border-b border-black/20 pb-0.5">
                  <span className="font-bold">👔 TFL DAMPINGAN:</span>
                  <span className="font-semibold text-right">{state.tfl.namaTfl}</span>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-0.5">
                  <span className="font-bold">🏢 TOKO MATERIAL:</span>
                  <span className="font-semibold text-right max-w-[160px] truncate" title={state.toko.namaToko}>{state.toko.namaToko}</span>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-0.5">
                  <span className="font-bold">👤 REK. BANK CPB:</span>
                  <span className="font-semibold text-right">{state.recipient.noRekening}</span>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-0.5">
                  <span className="font-bold">👷 MITRA TUKANG:</span>
                  <span className="font-semibold text-right text-emerald-990 font-bold text-emerald-800">{state.customFields.namaTukang1 || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">🪪 NIK KTP TUKANG:</span>
                  <span className="font-semibold text-right">{state.customFields.nikTukang1 || '-'}</span>
                </div>
              </div>
            </div>

            {/* Profiles manager */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-black/70 uppercase tracking-wider block">PROFIL DETAIL VARIABEL</span>
              <ProfileManager 
                state={state} 
                onChange={handleStateChange} 
                activeTab={activeProfileTab} 
                setActiveTab={setActiveProfileTab} 
              />
            </div>

            {/* BOQ Editor */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-black text-black/70 uppercase tracking-wider block">ANGGARAN DETIL SPESIFIKASI (RAB & DRPB)</span>
              <BOQEditor 
                state={state} 
                onChange={handleStateChange} 
              />
            </div>
          </div>
        )}

        {/* TAB 2: EDIT LAYOUT & DESIGN DOKUMEN */}
        {editorTab === 'desain' && (
          <div className="space-y-4">
            <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000] space-y-3">
              <div className="text-[10px] font-black text-black uppercase tracking-wider border-b-2 border-black pb-1.5 flex items-center gap-1.5 font-mono">
                <Layout size={12} className="text-black shrink-0" />
                <span>PENGATURAN KERTAS & TATA LETAK</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[8px] font-semibold text-black uppercase font-mono mb-1">📐 UKURAN KERTAS ACUAN</label>
                  <div className="grid grid-cols-3 gap-1.5 p-0.5 bg-zinc-200 border-2 border-black">
                    {['a4', 'f4', 'letter'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => updateLayoutField('layoutPaperSize', sz)}
                        className={`py-1 text-[10px] font-mono font-bold uppercase cursor-pointer ${
                          (state.customFields?.layoutPaperSize || 'a4') === sz
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-zinc-100'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                  <p className="text-[8px] text-zinc-600 mt-1 font-mono leading-tight">
                    * Format A4 (Utama Resmi), F4 (Tinggi Folio), Letter (Slightly shorter/wider).
                  </p>
                </div>

                <div>
                  <label className="block text-[8px] font-semibold text-black uppercase font-mono mb-1">🔤 JENIS HURUF (FONTS)</label>
                  <div className="grid grid-cols-3 gap-1.5 p-0.5 bg-zinc-200 border-2 border-black">
                    {[
                      { id: 'serif', label: 'serif' },
                      { id: 'sans', label: 'sans' },
                      { id: 'mono', label: 'mono' }
                    ].map((fnt) => (
                      <button
                        key={fnt.id}
                        type="button"
                        onClick={() => updateLayoutField('layoutFontFamily', fnt.id)}
                        className={`py-1 text-[10px] font-mono font-bold uppercase cursor-pointer ${
                          (state.customFields?.layoutFontFamily || 'serif') === fnt.id
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-zinc-100'
                        }`}
                      >
                        {fnt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-semibold text-black uppercase font-mono mb-1">📏 UKURAN FONT UTAMA</label>
                  <div className="grid grid-cols-3 gap-1.5 p-0.5 bg-zinc-200 border-2 border-black">
                    {[
                      { id: 'sm', label: '9px - Kecil' },
                      { id: 'md', label: '11px - Standar' },
                      { id: 'lg', label: '13px - Besar' }
                    ].map((fsz) => (
                      <button
                        key={fsz.id}
                        type="button"
                        onClick={() => updateLayoutField('layoutFontSize', fsz.id)}
                        className={`py-1 text-[9px] font-mono font-bold uppercase cursor-pointer ${
                          (state.customFields?.layoutFontSize || 'md') === fsz.id
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-zinc-100'
                        }`}
                      >
                        {fsz.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-semibold text-black uppercase font-mono mb-1">↕️ JARAK BARIS (LEADING)</label>
                  <div className="grid grid-cols-3 gap-1.5 p-0.5 bg-zinc-200 border-2 border-black">
                    {[
                      { id: 'compact', label: 'Compact' },
                      { id: 'normal', label: 'Normal' },
                      { id: 'spacious', label: 'Spacious' }
                    ].map((sp) => (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => updateLayoutField('layoutLineSpacing', sp.id)}
                        className={`py-1 text-[9px] font-mono font-bold uppercase cursor-pointer ${
                          (state.customFields?.layoutLineSpacing || 'normal') === sp.id
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-zinc-100'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-semibold text-black uppercase font-mono mb-1">↔️ MARGIN HALAMAN KERTAS</label>
                  <select
                    value={state.customFields?.layoutPageMargin || '40px'}
                    onChange={(e) => updateLayoutField('layoutPageMargin', e.target.value)}
                    className="w-full bg-white border-2 border-black p-1.5 text-xs font-mono font-semibold"
                  >
                    <option value="15px">Sempit (15px / Hemat Kertas)</option>
                    <option value="25px">Sedang (25px)</option>
                    <option value="40px">Lebar Standar (40px)</option>
                    <option value="50px">Ekstra Lebar (50px)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* EXCLUSIVE DOCUMENT OVERRIDES */}
            <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000] space-y-3 text-black">
              <div className="text-[10px] font-black text-black uppercase tracking-wider border-b-2 border-black pb-1 flex items-center gap-1.5 font-mono">
                <PenTool size={11} className="text-black shrink-0" />
                <span>DATA PENULISAN & PPK UTAMA</span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-[8px] font-black text-black uppercase font-mono mb-1">NAMA PPK RUMAH SWADAYA NTB</label>
                  <input
                    type="text"
                    value={state.project.namaPPK}
                    onChange={(e) => {
                      const val = e.target.value;
                      setState(prev => ({
                        ...prev,
                        project: { ...prev.project, namaPPK: val }
                      }));
                    }}
                    className="w-full bg-white border-2 border-black p-1.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-black text-black uppercase font-mono mb-1">SATUAN KERJA PPK</label>
                  <input
                    type="text"
                    value={state.project.satuanKerjaPPK}
                    onChange={(e) => {
                      const val = e.target.value;
                      setState(prev => ({
                        ...prev,
                        project: { ...prev.project, satuanKerjaPPK: val }
                      }));
                    }}
                    className="w-full bg-white border-2 border-black p-1.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-black text-black uppercase font-mono mb-1">TAHUN ANGGARAN</label>
                  <input
                    type="text"
                    value={state.project.tahunAnggaran}
                    onChange={(e) => {
                      const val = e.target.value;
                      setState(prev => ({
                        ...prev,
                        project: { ...prev.project, tahunAnggaran: val }
                      }));
                    }}
                    className="w-full bg-white border-2 border-black p-1.5 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OFFLINE LOCATION DATABASE MANAGER */}
        {editorTab === 'database' && (
          <div className="space-y-4">
            <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000] space-y-3 text-black">
              <div className="text-[10px] font-black text-black uppercase tracking-wider border-b-2 border-black pb-1.5 flex items-center justify-between font-mono">
                <span className="flex items-center gap-1.5">
                  <Database size={12} className="text-black shrink-0" />
                  <span>BASIS DATA WILAYAH</span>
                </span>
                <span className="text-[8px] font-bold bg-amber-400 text-black border border-black px-1.5 py-0.5">MODUS EDIT</span>
              </div>

              {/* Db selector targets tab */}
              <div>
                <label className="block text-[8px] font-black text-black font-mono mb-1 uppercase">PILIH TINGKAT REKAP DATA</label>
                <div className="grid grid-cols-3 gap-1 border-2 border-black p-0.5 bg-zinc-200">
                  {[
                    { id: 'kecamatan', label: '1. Kecamatan' },
                    { id: 'desa', label: '2. Desa & Toko' },
                    { id: 'cpb', label: '3. Penerima (CPB)' }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setDbEditTarget(lvl.id as any)}
                      className={`py-1 text-[8px] xl:text-[9px] font-mono font-bold uppercase cursor-pointer ${
                        dbEditTarget === lvl.id
                          ? 'bg-black text-white font-bold'
                          : 'bg-white text-black hover:bg-zinc-100'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editable Field Form - Kecamatan */}
              {dbEditTarget === 'kecamatan' && (
                <div className="space-y-3 pt-1.5 max-h-[350px] overflow-y-auto pr-1">
                  <div className="p-2 bg-yellow-400/10 border-2 border-dashed border-black/30 rounded text-[9px] font-mono leading-relaxed mb-1">
                    Atur data pembagian Kecamatan dan database TFL pendamping yang melayani sasaran program.
                  </div>
                  <div>
                    <label className="block text-[8px] font-mono font-bold text-gray-700">PILIH KECAMATAN AKTIF</label>
                    <select
                      value={hierarchyKecamatan}
                      onChange={(e) => {
                        const name = e.target.value;
                        setHierarchyKecamatan(name);
                        const firstDesa = Object.keys(hierarchyDb[name]?.desas || {})[0] || '';
                        setHierarchyDesa(firstDesa);
                        setHierarchyCPBIndex(0);
                        if (firstDesa) applyHierarchicalCPB(name, firstDesa, 0);
                      }}
                      className="w-full bg-white border border-black p-1 text-[11px] font-mono font-bold"
                    >
                      {Object.keys(hierarchyDb).map((kName) => (
                        <option key={kName} value={kName}>Kecamatan {kName}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[8px] font-mono font-bold text-gray-700">NAMA KECAMATAN</label>
                    <input
                      type="text"
                      value={hierarchyKecamatan}
                      onChange={(e) => {
                        const oldName = hierarchyKecamatan;
                        const newName = e.target.value.trim();
                        if (!newName || newName === oldName) return;
                        setHierarchyDb((prev: any) => {
                          const cloned = { ...prev };
                          cloned[newName] = {
                            ...cloned[oldName],
                            nama: newName,
                            tfl: { ...cloned[oldName].tfl, lokasi: `Kecamatan ${newName}` }
                          };
                          delete cloned[oldName];
                          return cloned;
                        });
                        setHierarchyKecamatan(newName);
                      }}
                      className="w-full bg-white border border-black p-1 text-xs font-mono font-semibold text-black uppercase"
                      placeholder="E.g. Sape"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] font-mono font-bold text-gray-700">TENAGA FASILITATOR LAPANGAN (TFL)</label>
                    <input
                      type="text"
                      value={hierarchyDb[hierarchyKecamatan]?.tfl?.namaTfl || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setHierarchyDb((prev: any) => {
                          const cloned = { ...prev };
                          if (cloned[hierarchyKecamatan]) {
                            cloned[hierarchyKecamatan].tfl.namaTfl = val;
                          }
                          return cloned;
                        });
                      }}
                      className="w-full bg-white border border-black p-1 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] font-mono font-bold text-gray-700">KOORDINATOR KABUPATEN (KORKAB)</label>
                    <input
                      type="text"
                      value={hierarchyDb[hierarchyKecamatan]?.tfl?.koordinatorKabupaten || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setHierarchyDb((prev: any) => {
                          const cloned = { ...prev };
                          if (cloned[hierarchyKecamatan]) {
                            cloned[hierarchyKecamatan].tfl.koordinatorKabupaten = val;
                          }
                          return cloned;
                        });
                      }}
                      className="w-full bg-white border border-black p-1 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] font-mono font-bold text-gray-700">PENDAMPING PROVINSI (TKM SWADAYA)</label>
                    <input
                      type="text"
                      value={hierarchyDb[hierarchyKecamatan]?.tfl?.timPendampingProvinsi || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setHierarchyDb((prev: any) => {
                          const cloned = { ...prev };
                          if (cloned[hierarchyKecamatan]) {
                            cloned[hierarchyKecamatan].tfl.timPendampingProvinsi = val;
                          }
                          return cloned;
                        });
                      }}
                      className="w-full bg-white border border-black p-1 text-xs font-mono"
                    />
                  </div>

                  {/* Add Delete Kecamatan buttons */}
                  <div className="flex gap-2 pt-2 border-t border-black/10">
                    <button
                      type="button"
                      onClick={() => {
                        const Name = prompt('Nama Kecamatan Baru:', 'Woha');
                        if (Name) {
                          const trimmed = Name.trim();
                          if (hierarchyDb[trimmed]) {
                            alert('Kecamatan ini sudah ada.');
                            return;
                          }
                          setHierarchyDb((prev: any) => ({
                            ...prev,
                            [trimmed]: {
                              nama: trimmed,
                              tfl: {
                                namaTfl: 'TFL Pendamping Swakarsa, S.T.',
                                lokasi: `Kecamatan ${trimmed}`,
                                koordinatorKabupaten: 'Korkab Baru Bima, M.T.',
                                timPendampingProvinsi: 'Tim Konsultan Swadaya NTB'
                              },
                              desas: {}
                            }
                          }));
                          setHierarchyKecamatan(trimmed);
                          setHierarchyDesa('');
                          setHierarchyCPBIndex(0);
                        }
                      }}
                      className="flex-1 bg-emerald-500 text-white font-bold font-mono py-1.5 px-2 text-[9px] uppercase border-2 border-black shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] hover:bg-emerald-600 active:shadow-none pointer cursor-pointer text-center"
                    >
                      ➕ Tambah Kecamatan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const keys = Object.keys(hierarchyDb);
                        if (keys.length <= 1) {
                          alert('Minimal harus ada satu Kecamatan.');
                          return;
                        }
                        if (confirm(`Hapus Kecamatan ${hierarchyKecamatan} beserta Desanya?`)) {
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            delete cloned[hierarchyKecamatan];
                            const next = Object.keys(cloned)[0];
                            setHierarchyKecamatan(next);
                            const firstDesa = Object.keys(cloned[next]?.desas || {})[0] || '';
                            setHierarchyDesa(firstDesa);
                            setHierarchyCPBIndex(0);
                            return cloned;
                          });
                        }
                      }}
                      className="bg-rose-100 hover:bg-rose-600 hover:text-white text-black font-bold font-mono py-1.5 px-2 text-[9px] uppercase border-2 border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer text-center"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              )}

              {/* Editable Field Form - Desa & Toko */}
              {dbEditTarget === 'desa' && (
                <div className="space-y-2 pt-1 max-h-[400px] overflow-y-auto pr-1">
                  <div className="p-1.5 bg-emerald-100/30 border-2 border-dashed border-emerald-950/10 rounded text-[9px] font-mono leading-relaxed mb-1">
                    Atur biodata Kantor Desa, Kepala Desa, dan Toko penyedia material khusus desa aktif.
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-700">KECAMATAN TERPILIH</label>
                      <select
                        value={hierarchyKecamatan}
                        onChange={(e) => {
                          const name = e.target.value;
                          setHierarchyKecamatan(name);
                          const firstDesa = Object.keys(hierarchyDb[name]?.desas || {})[0] || '';
                          setHierarchyDesa(firstDesa);
                          setHierarchyCPBIndex(0);
                          if (firstDesa) applyHierarchicalCPB(name, firstDesa, 0);
                        }}
                        className="w-full bg-white border border-black p-1 text-[10px] font-mono"
                      >
                        {Object.keys(hierarchyDb).map((kName) => (
                          <option key={kName} value={kName}>{kName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-700">DESA SASARAN</label>
                      <select
                        value={hierarchyDesa}
                        onChange={(e) => {
                          const name = e.target.value;
                          setHierarchyDesa(name);
                          setHierarchyCPBIndex(0);
                          applyHierarchicalCPB(hierarchyKecamatan, name, 0);
                        }}
                        className="w-full bg-white border border-black p-1 text-[10px] font-mono font-bold text-stone-900"
                      >
                        {Object.keys(hierarchyDb[hierarchyKecamatan]?.desas || {}).map((dName) => (
                          <option key={dName} value={dName}>{dName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border border-black/15 p-2 bg-zinc-50 space-y-2 mt-2">
                    <span className="text-[9px] font-black uppercase text-black font-mono border-b border-black block pb-0.5">👤 BIODATA KEPALA DESA & KANTOR</span>
                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-600 text-gray-500">NAMA LENGKAP KEPALA DESA / LURAH</label>
                      <input
                        type="text"
                        value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.kepalaDesa || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]) {
                              cloned[hierarchyKecamatan].desas[hierarchyDesa].kepalaDesa = val;
                            }
                            return cloned;
                          });
                        }}
                        className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-500">NIP KADES (JIKA PNS)</label>
                      <input
                        type="text"
                        value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.nipKepalaDesa || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]) {
                              cloned[hierarchyKecamatan].desas[hierarchyDesa].nipKepalaDesa = val;
                            }
                            return cloned;
                          });
                        }}
                        className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-500">ALAMAT LENGKAP KANTOR BALAI DESA</label>
                      <input
                        type="text"
                        value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.alamatKantor || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]) {
                              cloned[hierarchyKecamatan].desas[hierarchyDesa].alamatKantor = val;
                            }
                            return cloned;
                          });
                        }}
                        className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="border border-black/15 p-2 bg-stone-50 space-y-2">
                    <span className="text-[9px] font-black uppercase text-black font-mono border-b border-black block pb-0.5">🏪 ALOKASI TOKO PENYEDIA UTAMA</span>
                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-500">NAMA TOKO MATERIAL</label>
                      <input
                        type="text"
                        value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.toko?.namaToko || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.toko) {
                              cloned[hierarchyKecamatan].desas[hierarchyDesa].toko.namaToko = val;
                            }
                            return cloned;
                          });
                        }}
                        className="w-full bg-white border border-gray-300 p-1 text-xs font-mono uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-500">PEMILIK TOKO</label>
                      <input
                        type="text"
                        value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.toko?.pemilikToko || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.toko) {
                              cloned[hierarchyKecamatan].desas[hierarchyDesa].toko.pemilikToko = val;
                            }
                            return cloned;
                          });
                        }}
                        className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-1 px-0.5">
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-gray-500">NO. REKENING TOKO</label>
                        <input
                          type="text"
                          value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.toko?.noRekeningToko || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setHierarchyDb((prev: any) => {
                              const cloned = { ...prev };
                              if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.toko) {
                                cloned[hierarchyKecamatan].desas[hierarchyDesa].toko.noRekeningToko = val;
                              }
                              return cloned;
                            });
                          }}
                          className="w-full bg-white border border-gray-300 p-1 text-[11px] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-gray-500">NAMA BANK TOKO</label>
                        <input
                          type="text"
                          value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.toko?.bankToko || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setHierarchyDb((prev: any) => {
                              const cloned = { ...prev };
                              if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.toko) {
                                cloned[hierarchyKecamatan].desas[hierarchyDesa].toko.bankToko = val;
                              }
                              return cloned;
                            });
                          }}
                          className="w-full bg-white border border-gray-300 p-1 text-[10px] font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Add Delete Desa controls */}
                  <div className="flex gap-2 pt-2 border-t border-black/10">
                    <button
                      type="button"
                      onClick={() => {
                        const Name = prompt('Nama Desa Baru:', 'Desa Woha');
                        if (Name) {
                          let dPrefix = Name.trim();
                          if (!dPrefix.startsWith('Desa ')) {
                            dPrefix = `Desa ${dPrefix}`;
                          }
                          if (hierarchyDb[hierarchyKecamatan]?.desas[dPrefix]) {
                            alert('Desa ini sudah ada di kecamatan ini.');
                            return;
                          }
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]) {
                              cloned[hierarchyKecamatan].desas[dPrefix] = {
                                nama: dPrefix,
                                kepalaDesa: 'Kepala Desa Terpilih, S.H.',
                                nipKepalaDesa: '198101012010011002',
                                alamatKantor: `Balai Desa Utama Sektor ${dPrefix.replace('Desa ', '')}`,
                                toko: {
                                  namaToko: 'UD. TOKO KARYA MANDIRI',
                                  pemilikToko: 'H. Ruslan HM',
                                  nikPemilik: '5206082103750002',
                                  npwpUsaha: '24.123.456.7-367.000',
                                  alamat: `Jl. Lintas Kabupaten No. 5, RT 01/01 ${dPrefix.replace('Desa ', '')}`,
                                  siupNomor: '503/SIUP-M/150/X/2024',
                                  siupTanggal: '15-10-2024',
                                  situNomor: '503/SITU/145/X/2024',
                                  situTanggal: '12-10-2024',
                                  noRekeningToko: '0032-01-081273-53-2',
                                  bankToko: 'Bank Rakyat Indonesia (BRI)'
                                },
                                cpbs: [
                                  {
                                    id: `cpb-${dPrefix.toLowerCase().replace(/\s+/g, '-')}-1`,
                                    nama: 'Keluarga Penerima Manfaat Baru',
                                    nik: '5206081010770001',
                                    umur: '48',
                                    pekerjaan: 'Buruh Tani',
                                    alamatSecaraLengkap: `RT. 02 RW. 01 Dusun Sejahtera, ${dPrefix}`,
                                    noRekening: '0032-01-081289-50-5',
                                    jumlahSwadayaUang: 'Rp 4.000.000',
                                    bentukSwadayaBarang: 'Bambu Pagar (25 btg), Kayu Lokal',
                                    namaTukang: 'Tukang Konstruksi Swakarsa',
                                    nikTukang: '5206082203840001'
                                  }
                                ]
                              };
                            }
                            return cloned;
                          });
                          setHierarchyDesa(dPrefix);
                          setHierarchyCPBIndex(0);
                        }
                      }}
                      className="flex-1 bg-emerald-500 text-white font-bold font-mono py-1.5 px-2 text-[9px] uppercase border-2 border-black shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] hover:bg-emerald-600 cursor-pointer text-center"
                    >
                      ➕ Tambah Desa
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const keys = Object.keys(hierarchyDb[hierarchyKecamatan]?.desas || {});
                        if (keys.length <= 1) {
                          alert('Minimal harus ada 1 desa pada kecamatan ini.');
                          return;
                        }
                        if (confirm(`Hapus Desa ${hierarchyDesa}?`)) {
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]?.desas) {
                              delete cloned[hierarchyKecamatan].desas[hierarchyDesa];
                            }
                            const nextDesa = Object.keys(cloned[hierarchyKecamatan]?.desas || {})[0] || '';
                            setHierarchyDesa(nextDesa);
                            setHierarchyCPBIndex(0);
                            return cloned;
                          });
                        }
                      }}
                      className="bg-rose-100 hover:bg-rose-600 hover:text-white text-black font-bold font-mono py-1.5 px-2 text-[9px] uppercase border-2 border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer text-center"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              )}

              {/* Editable Field Form - CPBs */}
              {dbEditTarget === 'cpb' && (
                <div className="space-y-2 pt-1 max-h-[460px] overflow-y-auto pr-1">
                  <div className="p-1.5 bg-blue-50 border border-dashed border-blue-900/10 rounded text-[9px] font-mono leading-relaxed mb-1 text-sky-950">
                    Modifikasi rekapitulasi 14 CPB per Desa untuk dijalankan 100% offline. Perubahan di sini dapat di-sinkronisasikan langsung ke Form Aktif.
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-700">DESA TARGET</label>
                      <select
                        value={hierarchyDesa}
                        onChange={(e) => {
                          const name = e.target.value;
                          setHierarchyDesa(name);
                          setHierarchyCPBIndex(0);
                          applyHierarchicalCPB(hierarchyKecamatan, name, 0);
                        }}
                        className="w-full bg-white border border-gray-300 p-1 text-[10px] font-mono"
                      >
                        {Object.keys(hierarchyDb[hierarchyKecamatan]?.desas || {}).map((dName) => (
                          <option key={dName} value={dName}>{dName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono font-bold text-gray-700">SELECT CPB</label>
                      <select
                        value={hierarchyCPBIndex}
                        onChange={(e) => {
                          const idx = Number(e.target.value);
                          setHierarchyCPBIndex(idx);
                          applyHierarchicalCPB(hierarchyKecamatan, hierarchyDesa, idx);
                        }}
                        className="w-full bg-white border border-gray-300 p-1 text-[10px] font-mono"
                      >
                        {(hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs || []).map((c: any, index: number) => (
                          <option key={c.id} value={index}>
                            {index + 1}: {c.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex] && (
                    <div className="border border-black/15 p-2 bg-zinc-50 space-y-2 mt-2">
                      <span className="text-[9px] font-black uppercase text-black font-mono border-b border-black block pb-0.5">👤 BIODATA CPB INDIVIDUAL</span>
                      
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-gray-500">NAMA LENGKAP PENERIMA</label>
                        <input
                          type="text"
                          value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.nama || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setHierarchyDb((prev: any) => {
                              const cloned = { ...prev };
                              if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].nama = val;
                              }
                              return cloned;
                            });
                          }}
                          className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-mono font-bold text-gray-500">NIK (KTP ELEKTRONIK)</label>
                          <input
                            type="text"
                            value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.nik || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setHierarchyDb((prev: any) => {
                                const cloned = { ...prev };
                                if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                  cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].nik = val;
                                }
                                return cloned;
                              });
                            }}
                            className="w-full bg-white border border-gray-300 p-1 text-[11px] font-mono font-bold text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono font-bold text-gray-500">REK REKENING BRI</label>
                          <input
                            type="text"
                            value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.noRekening || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setHierarchyDb((prev: any) => {
                                const cloned = { ...prev };
                                if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                  cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].noRekening = val;
                                }
                                return cloned;
                              });
                            }}
                            className="w-full bg-white border border-gray-300 p-1 text-[11px] font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-mono font-bold text-gray-500">UMUR (TAHUN)</label>
                          <input
                            type="text"
                            value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.umur || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setHierarchyDb((prev: any) => {
                                const cloned = { ...prev };
                                if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                  cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].umur = val;
                                }
                                return cloned;
                              });
                            }}
                            className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono font-bold text-gray-500">PEKERJAAN CPB</label>
                          <input
                            type="text"
                            value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.pekerjaan || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setHierarchyDb((prev: any) => {
                                const cloned = { ...prev };
                                if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                  cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].pekerjaan = val;
                                }
                                return cloned;
                              });
                            }}
                            className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-mono font-bold text-gray-500">SWADAYA UANG</label>
                          <input
                            type="text"
                            value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.jumlahSwadayaUang || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setHierarchyDb((prev: any) => {
                                const cloned = { ...prev };
                                if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                  cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].jumlahSwadayaUang = val;
                                }
                                return cloned;
                              });
                            }}
                            className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono font-bold text-gray-500">SWADAYA BARANG</label>
                          <input
                            type="text"
                            value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.bentukSwadayaBarang || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setHierarchyDb((prev: any) => {
                                const cloned = { ...prev };
                                if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                  cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].bentukSwadayaBarang = val;
                                }
                                return cloned;
                              });
                            }}
                            className="w-full bg-white border border-gray-300 p-1 text-xs font-mono"
                          />
                        </div>
                      </div>

                      {/* Tukang Sub forms */}
                      <div className="border border-black/10 p-2 bg-zinc-200 mt-2 space-y-2">
                        <span className="text-[8px] font-black tracking-wider uppercase text-zinc-600 block">👷 BIODATA MITRA TUKANG PENERIMA</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[7px] font-mono font-bold">NAMA TUKANG</label>
                            <input
                              type="text"
                              value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.namaTukang || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setHierarchyDb((prev: any) => {
                                  const cloned = { ...prev };
                                  if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                    cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].namaTukang = val;
                                  }
                                  return cloned;
                                });
                              }}
                              className="w-full bg-white border border-gray-300 p-1 text-[10px] font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[7px] font-mono font-bold">NIK TUKANG</label>
                            <input
                              type="text"
                              value={hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]?.nikTukang || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setHierarchyDb((prev: any) => {
                                  const cloned = { ...prev };
                                  if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs[hierarchyCPBIndex]) {
                                    cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs[hierarchyCPBIndex].nikTukang = val;
                                  }
                                  return cloned;
                                });
                              }}
                              className="w-full bg-white border border-gray-300 p-1 text-[10px] font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => applyHierarchicalCPB(hierarchyKecamatan, hierarchyDesa, hierarchyCPBIndex)}
                          className="w-full bg-black hover:bg-zinc-800 text-white font-black font-mono py-1.5 px-3 text-[10px] uppercase border cursor-pointer text-center"
                        >
                          📥 SINKRONKAN DATA INI KE FORM
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add Delete CPB buttons */}
                  <div className="flex gap-2 pt-2 border-t border-black/10">
                    <button
                      type="button"
                      onClick={() => {
                        const Name = prompt('Nama CPB Baru:', 'Rahmat Subhan');
                        if (Name) {
                          const cName = Name.trim();
                          const array = hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs || [];
                          const newId = `cpb-${hierarchyDesa.toLowerCase().replace(/\s+/g, '-')}-${array.length + 1}`;
                          const newItem = {
                            id: newId,
                            nama: cName,
                            nik: `520608220${11 + array.length}000${array.length + 1}`,
                            umur: '39',
                            pekerjaan: 'Petani Swadaya',
                            alamatSecaraLengkap: `RT. 04 RW. 02 Dusun Terang Baru, ${hierarchyDesa}`,
                            noRekening: `0032-01-0812${400 + array.length}-50-3`,
                            jumlahSwadayaUang: 'Rp 4.000.000',
                            bentukSwadayaBarang: 'Kayu Lokal (Pagar), Pasir Kali (5 M3)',
                            namaTukang: 'Tukang Swakarsa Baru',
                            nikTukang: `520608250${11 + array.length}0008`
                          };
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]) {
                              cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs.push(newItem);
                            }
                            return cloned;
                          });
                          setHierarchyCPBIndex(array.length);
                          setTimeout(() => {
                            applyHierarchicalCPB(hierarchyKecamatan, hierarchyDesa, array.length);
                          }, 100);
                        }
                      }}
                      className="flex-1 bg-emerald-500 text-white font-bold font-mono py-1.5 px-2 text-[9px] uppercase hover:bg-emerald-600 border-2 border-black shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] cursor-pointer text-center"
                    >
                      ➕ Tambah CPB Baru
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const array = hierarchyDb[hierarchyKecamatan]?.desas[hierarchyDesa]?.cpbs || [];
                        if (array.length <= 1) {
                          alert('Minimal harus ada 1 CPB.');
                          return;
                        }
                        if (confirm(`Hapus Penerima Bantuan ${array[hierarchyCPBIndex]?.nama}?`)) {
                          setHierarchyDb((prev: any) => {
                            const cloned = { ...prev };
                            if (cloned[hierarchyKecamatan]?.desas[hierarchyDesa]) {
                              cloned[hierarchyKecamatan].desas[hierarchyDesa].cpbs.splice(hierarchyCPBIndex, 1);
                            }
                            return cloned;
                          });
                          const nextIdx = Math.max(0, hierarchyCPBIndex - 1);
                          setHierarchyCPBIndex(nextIdx);
                          setTimeout(() => {
                            applyHierarchicalCPB(hierarchyKecamatan, hierarchyDesa, nextIdx);
                          }, 100);
                        }
                      }}
                      className="bg-rose-100 hover:bg-rose-600 hover:text-white text-black font-bold font-mono py-1.5 px-2 text-[9px] uppercase border-2 border-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer text-center"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SINKRONISASI / BACKUP & RESTORE */}
        {editorTab === 'sync' && (
          <div className="space-y-4">
            <div className="bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000] space-y-3 text-black">
              <div className="text-[10px] font-black text-black uppercase tracking-wider border-b-2 border-black pb-1.5 flex items-center gap-1.5 font-mono">
                <RefreshCw size={12} className="text-black shrink-0" />
                <span>SINKRONISASI & TRANSFER KODE DATA</span>
              </div>

              <div className="p-2 bg-yellow-405 bg-yellow-50 border-2 border-black space-y-2 mt-1">
                <span className="text-[10px] font-black text-black uppercase tracking-widest block font-mono">💾 EKSPOR DATABASE CADANGAN</span>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      const packageData = { state, hierarchyDb };
                      const blob = new Blob([JSON.stringify(packageData, null, 2)], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const anchor = document.createElement("a");
                      anchor.href = url;
                      anchor.download = `BSPS_BIMA_GEN_DATABASE_FULL_${state.recipient.nama.replace(/\s+/g, '_')}.json`;
                      anchor.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full bg-black text-white hover:bg-zinc-800 font-mono font-bold text-xs py-2 px-3 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all pointer cursor-pointer"
                  >
                    <Download size={13} />
                    <span>UNDUH FILE DATA DETAIL</span>
                  </button>
                  <p className="text-[8px] text-zinc-500 font-mono leading-tight mt-1">
                    * Berkas JSON mencakup seluruh rekam formulir, BOQ, rekap KPB dan modifikasi database spasial yang Anda buat!
                  </p>
                </div>
              </div>

              {/* Text serialized copier */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-black uppercase tracking-wider block font-mono">📋 SALIN KATEGORI DATA SEBAGAI KODE</span>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      const packageData = { state, hierarchyDb };
                      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(packageData))));
                      navigator.clipboard.writeText(encoded);
                      setSyncClipboardSuccess(true);
                      setTimeout(() => setSyncClipboardSuccess(false), 2000);
                    }}
                    className="w-full bg-zinc-100 hover:bg-zinc-200 text-black border-2 border-black font-mono font-bold text-[11px] py-1.5 px-3 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy size={11} className="text-zinc-650" />
                    <span>{syncClipboardSuccess ? '✔️ SALINAN KODE AMAN!' : 'SALIN KODE STRING DATA'}</span>
                  </button>
                  <p className="text-[8px] text-zinc-500 font-mono leading-tight">
                    * Salin database dalam bentuk string padat ke clipboard untuk ditransfer offline tanpa berkas rekap USB!
                  </p>
                </div>
              </div>

              {/* Paste Importer input */}
              <div className="border-t border-black/10 pt-3 space-y-2.5">
                <span className="text-[10px] font-black text-black uppercase tracking-wider block font-mono">📥 UNGGGAH & IMPOR DISINI</span>
                <div>
                  <textarea
                    value={tempImportCode}
                    onChange={(e) => setTempImportCode(e.target.value)}
                    placeholder="Masukkan teks kode enkripsi cadangan OR rekatkan JSON utuh di sini..."
                    className="w-full bg-white border-2 border-black p-2 text-[10px] font-mono h-24 text-black placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!tempImportCode.trim()) {
                        alert('Tolong tempelkan kode cadangan di kotak input terlebih dahulu.');
                        return;
                      }
                      try {
                        let parsed: any = null;
                        const trimmed = tempImportCode.trim();
                        if (trimmed.startsWith('{')) {
                          parsed = JSON.parse(trimmed);
                        } else {
                          try {
                            const decoded = decodeURIComponent(escape(atob(trimmed)));
                            parsed = JSON.parse(decoded);
                          } catch {
                            parsed = JSON.parse(trimmed);
                          }
                        }

                        if (parsed.state) {
                          setState(parsed.state);
                          if (parsed.hierarchyDb) {
                            setHierarchyDb(parsed.hierarchyDb);
                            alert('✔️ INTEGRASI DAN RE-ALOKASI BASIS DATA OFFLINE BERHASIL! Seluruh data rekap, KPB, dan letak berkas berhasil diperbarui.');
                          } else {
                            alert('✔️ Sinkronisasi formulir isian berhasil.');
                          }
                          setTempImportCode('');
                        } else if (parsed.recipient && parsed.boqItems) {
                          setState(parsed);
                          setTempImportCode('');
                          alert('✔️ Sinkronisasi data form berhasil.');
                        } else {
                          alert('Skema database tidak cocok. Harap divalidasi kembali.');
                        }
                      } catch (e) {
                        alert('Error decoding: Format string data rusak/tidak valid.');
                      }
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-mono font-black text-xs py-2 px-3 border-2 border-black shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-[1px] cursor-pointer text-center uppercase"
                  >
                    UNGGAH & RESTORE SEKARANG
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
