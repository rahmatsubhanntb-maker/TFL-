import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import { 
  FileText, Printer, CheckCircle, RotateCcw, Download, Upload, 
  HelpCircle, Search, Sparkles, Check, ChevronRight, UserCheck, 
  Sliders, Settings, Info, Library, AlertCircle,
  Database, Copy, RefreshCw, Plus, Trash2, Layout, BookOpen
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FormatType, BSPSAppState } from './types';
import { INITIAL_APP_STATE, LIST_FORMATS } from './data/defaultTemplates';
import { ProfileManager } from './components/ProfileManager';
import { BOQEditor } from './components/BOQEditor';
import { DocumentPreview } from './components/DocumentPreview';
import { OfflineManager } from './components/OfflineManager';
import { BSPS_HIERARCHY_DATA } from './data/hierarchyData';

// Map each FormatType to its corresponding TFL Reporting Month and sequence
const TFL_TIMELINE_MAPPING: Record<string, { month: string; seq: number }> = {
  // Bulan I: Survey, Verifikasi, Validasi BNBA & Sosialisasi
  'FORMAT_II_19': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 1 },
  'LAMPIRAN_KTP_KK': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 2 },
  'FORMAT_II_20': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 3 },
  'SURAT_KETERANGAN_TANAH_DESA': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 4 },
  'SURAT_PERNYATAAN_TANAH_PENERIMA': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 5 },
  'FORMAT_II_22': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 6 },
  'FORMAT_II_12': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 7 },
  'FORMAT_II_27': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 8 },
  'DAFTAR_HADIR_REMBUK': { month: 'BULAN I: Survey, Verifikasi & Validasi (Data)', seq: 9 },

  // Bulan II: Perencanaan Proposal, KPB & Seleksi Toko Terbuka
  'FORMAT_II_13': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 1 },
  'FORMAT_II_14': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 2 },
  'FORMAT_II_23': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 3 },
  'FORMAT_II_10': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 4 },
  'FORMAT_II_6': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 5 },
  'FORMAT_II_35': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 6 },
  'FORMAT_II_11': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 7 },
  'FORMAT_II_16': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 8 },
  'FORMAT_II_15': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 9 },
  'FORMAT_II_17': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 10 },
  'PENAWARAN_HARGA_TOKO': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 11 },
  'PEMILIHAN_TERBUKA_TOKO': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 12 },
  'FORMAT_II_32': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 13 },
  'FORMAT_II_18': { month: 'BULAN II: Perencanaan Proposal & Rekomendasi Toko', seq: 14 },

  // Bulan III: Penyaluran Dana & Pelaksanaan Fisik Tahap 1
  'FORMAT_II_30': { month: 'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)', seq: 1 },
  'FORMAT_II_40': { month: 'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)', seq: 2 },
  'FORMAT_II_33': { month: 'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)', seq: 3 },
  'FORMAT_II_34': { month: 'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)', seq: 4 },
  'FORMAT_II_37': { month: 'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)', seq: 5 },
  'FORMAT_II_38': { month: 'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)', seq: 6 },
  'FORMAT_II_41': { month: 'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)', seq: 7 },
  'FORMAT_II_31': { month: 'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)', seq: 8 },

  // Bulan IV: Pelaksanaan Fisik Tahap 2 & Swadaya Upah Kerja
  'FORMAT_II_42': { month: 'BULAN IV: Pelaksanaan/Konstruksi Fisik (30-100%)', seq: 1 },
  'FORMAT_II_39': { month: 'BULAN IV: Pelaksanaan/Konstruksi Fisik (30-100%)', seq: 2 },
  'ABSENSI_PEKERJA': { month: 'BULAN IV: Pelaksanaan/Konstruksi Fisik (30-100%)', seq: 3 },
  'FORMAT_II_43': { month: 'BULAN IV: Pelaksanaan/Konstruksi Fisik (30-100%)', seq: 4 },
  'FORMAT_II_7': { month: 'BULAN IV: Pelaksanaan/Konstruksi Fisik (30-100%)', seq: 5 },

  // Bulan V: Konstruksi Selesai, Serah Terima & Wasdal QAQC
  'FORMAT_II_44': { month: 'BULAN V: Dokumen Akhir & Sertifikasi Kepatuhan', seq: 1 },
  'FORMAT_II_46': { month: 'BULAN V: Dokumen Akhir & Sertifikasi Kepatuhan', seq: 2 },
  'FORMAT_II_47': { month: 'BULAN V: Dokumen Akhir & Sertifikasi Kepatuhan', seq: 3 },
  'FORMAT_II_48': { month: 'BULAN V: Dokumen Akhir & Sertifikasi Kepatuhan', seq: 4 },
  'FORMAT_II_49': { month: 'BULAN V: Dokumen Akhir & Sertifikasi Kepatuhan', seq: 5 },
  'FORMAT_II_45': { month: 'BULAN V: Dokumen Akhir & Sertifikasi Kepatuhan', seq: 6 },
  'PAKTA_INTEGRITAS': { month: 'BULAN V: Dokumen Akhir & Sertifikasi Kepatuhan', seq: 7 },

  // Laporan Rutin Bulanan & Mingguan TFL
  'FORMAT_II_50': { month: 'LAPORAN RUTIN PENDAMPINGAN TFL (Tiap Bulan)', seq: 1 },
  'FORMAT_OUTLINE_PROPOSAL': { month: 'LAPORAN RUTIN PENDAMPINGAN TFL (Tiap Bulan)', seq: 2 },
  'FORMAT_II_51': { month: 'LAPORAN RUTIN PENDAMPINGAN TFL (Tiap Bulan)', seq: 3 },
  'FORMAT_II_52': { month: 'LAPORAN RUTIN PENDAMPINGAN TFL (Tiap Bulan)', seq: 4 },
  'FORMAT_II_53': { month: 'LAPORAN RUTIN PENDAMPINGAN TFL (Tiap Bulan)', seq: 5 },
  'FORMAT_II_54': { month: 'LAPORAN RUTIN PENDAMPINGAN TFL (Tiap Bulan)', seq: 6 },
};

// Weight budget per document following the TFL checklist standard (allocated proportionally to 100 max per month)
const FORMAT_BOBOT_MAP: Record<string, number> = {
  'FORMAT_II_19': 15,
  'LAMPIRAN_KTP_KK': 10,
  'FORMAT_II_20': 10,
  'SURAT_KETERANGAN_TANAH_DESA': 15,
  'SURAT_PERNYATAAN_TANAH_PENERIMA': 10,
  'FORMAT_II_22': 10,
  'FORMAT_II_12': 15,
  'FORMAT_II_27': 10,
  'DAFTAR_HADIR_REMBUK': 5,

  'FORMAT_II_13': 15,
  'FORMAT_II_14': 15,
  'FORMAT_II_23': 5,
  'FORMAT_II_10': 5,
  'FORMAT_II_6': 5,
  'FORMAT_II_35': 5,
  'FORMAT_II_11': 5,
  'FORMAT_II_16': 10,
  'FORMAT_II_15': 10,
  'FORMAT_II_17': 5,
  'PENAWARAN_HARGA_TOKO': 10,
  'PEMILIHAN_TERBUKA_TOKO': 5,
  'FORMAT_II_32': 5,
  'FORMAT_II_18': 5,

  'FORMAT_II_30': 20,
  'FORMAT_II_40': 20,
  'FORMAT_II_33': 10,
  'FORMAT_II_34': 10,
  'FORMAT_II_37': 15,
  'FORMAT_II_38': 10,
  'FORMAT_II_41': 10,
  'FORMAT_II_31': 5,

  'FORMAT_II_42': 30,
  'FORMAT_II_39': 20,
  'ABSENSI_PEKERJA': 15,
  'FORMAT_II_43': 20,
  'FORMAT_II_7': 15,

  'FORMAT_II_44': 25,
  'FORMAT_II_46': 15,
  'FORMAT_II_47': 15,
  'FORMAT_II_48': 15,
  'FORMAT_II_49': 10,
  'FORMAT_II_45': 15,
  'PAKTA_INTEGRITAS': 5,

  'FORMAT_II_50': 20,
  'FORMAT_OUTLINE_PROPOSAL': 25,
  'FORMAT_II_51': 20,
  'FORMAT_II_52': 20,
  'FORMAT_II_53': 20,
  'FORMAT_II_54': 20,
};

const TFL_MONTHS = [
  'BULAN I: Survey, Verifikasi & Validasi (Data)',
  'BULAN II: Perencanaan Proposal & Rekomendasi Toko',
  'BULAN III: Pelaksanaan Fisik Tahap 1 (0-30% Fisik)',
  'BULAN IV: Pelaksanaan/Konstruksi Fisik (30-100%)',
  'BULAN V: Dokumen Akhir & Sertifikasi Kepatuhan',
  'LAPORAN RUTIN PENDAMPINGAN TFL (Tiap Bulan)'
];

export default function App() {
  const [state, setState] = useState<BSPSAppState>(() => {
    const saved = localStorage.getItem('bsps_document_generator_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_APP_STATE;
      }
    }
    return INITIAL_APP_STATE;
  });

  const [activeProfileTab, setActiveProfileTab] = useState('penerima');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupingMode, setGroupingMode] = useState<'kategori' | 'tfl_timeline'>('tfl_timeline');
  const [showPrintHint, setShowPrintHint] = useState(true);

  // Helper functions for checklist & compliance progress
  const isFormatCompleted = (formatId: string) => {
    const list = state.customFields?.completedFormats || '';
    return list.split(',').includes(formatId);
  };

  const toggleFormatCompleted = (formatId: string, event?: MouseEvent) => {
    if (event) event.stopPropagation(); // prevent selecting the format
    setState(prev => {
      const currentListStr = prev.customFields?.completedFormats || '';
      let list = currentListStr ? currentListStr.split(',') : [];
      if (list.includes(formatId)) {
        list = list.filter(id => id !== formatId);
      } else {
        list.push(formatId);
      }
      return {
        ...prev,
        customFields: {
          ...prev.customFields,
          completedFormats: list.join(',')
        }
      };
    });
  };

  const getOverallComplianceStats = () => {
    let total = 0;
    let earned = 0;
    LIST_FORMATS.forEach(fmt => {
      const b = FORMAT_BOBOT_MAP[fmt.id] || 2;
      total += b;
      if (isFormatCompleted(fmt.id)) {
        earned += b;
      }
    });
    const percentage = total > 0 ? Math.round((earned / total) * 100) : 0;
    return { earned, total, percentage };
  };

  const getTimelineProgress = (timelineName: string) => {
    const formatsInMonth = LIST_FORMATS.filter(fmt => {
      const mapping = TFL_TIMELINE_MAPPING[fmt.id];
      return mapping && mapping.month === timelineName;
    });
    
    if (formatsInMonth.length === 0) return 0;
    
    let totalWeightAllocated = 0;
    let earnedWeight = 0;
    
    formatsInMonth.forEach(fmt => {
      const b = FORMAT_BOBOT_MAP[fmt.id] || 2;
      totalWeightAllocated += b;
      if (isFormatCompleted(fmt.id)) {
        earnedWeight += b;
      }
    });
    
    return totalWeightAllocated > 0 ? Math.round((earnedWeight / totalWeightAllocated) * 100) : 0;
  };
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hierarchical state selectors
  const [hierarchyKecamatan, setHierarchyKecamatan] = useState<string>('Sanggar');
  const [hierarchyDesa, setHierarchyDesa] = useState<string>('Desa Sangiang');
  const [hierarchyCPBIndex, setHierarchyCPBIndex] = useState<number>(0);

  // Editable location and beneficiary database for complete offline execution
  const [hierarchyDb, setHierarchyDb] = useState<{ [key: string]: any }>(() => {
    const saved = localStorage.getItem('bsps_hierarchy_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return BSPS_HIERARCHY_DATA;
      }
    }
    return BSPS_HIERARCHY_DATA;
  });

  const [editorTab, setEditorTab] = useState<'variabel' | 'database' | 'desain' | 'sync'>('variabel');
  const [dbEditTarget, setDbEditTarget] = useState<'kecamatan' | 'desa' | 'cpb'>('kecamatan');
  const [tempImportCode, setTempImportCode] = useState('');
  const [syncClipboardSuccess, setSyncClipboardSuccess] = useState(false);

  // Trigger auto-saving location database offline
  useEffect(() => {
    localStorage.setItem('bsps_hierarchy_db', JSON.stringify(hierarchyDb));
  }, [hierarchyDb]);

  // Auto-save state to localStorage
  useEffect(() => {
    localStorage.setItem('bsps_document_generator_state', JSON.stringify(state));
  }, [state]);

  // Synchronize dropdown selectors with current state variables if available
  useEffect(() => {
    const currentKec = state.recipient.kecamatan;
    let currentDesa = state.recipient.desa;
    if (currentDesa && !currentDesa.startsWith('Desa ')) {
      currentDesa = `Desa ${currentDesa}`;
    }

    if (hierarchyDb[currentKec]) {
      setHierarchyKecamatan(currentKec);
      if (hierarchyDb[currentKec].desas[currentDesa]) {
        setHierarchyDesa(currentDesa);
        const cpbs = hierarchyDb[currentKec].desas[currentDesa].cpbs;
        const index = cpbs.findIndex((c: any) => c.nama === state.recipient.nama);
        if (index !== -1) {
          setHierarchyCPBIndex(index);
        }
      }
    }
  }, [state.recipient.nama, state.recipient.desa, state.recipient.kecamatan, hierarchyDb]);

  const applyHierarchicalCPB = (kecName: string, dName: string, cpbIdx: number, customDb = hierarchyDb) => {
    const kecData = customDb[kecName];
    if (!kecData) return;
    const dData = kecData.desas[dName];
    if (!dData) return;
    const cpb = dData.cpbs[cpbIdx];
    if (!cpb) return;

    // Set members list based on first 10 names from this Desa
    const members = dData.cpbs.slice(0, Math.min(10, dData.cpbs.length)).map((c: any) => c.nama);

    setState((prev) => ({
      ...prev,
      recipient: {
        id: cpb.id,
        nama: cpb.nama,
        nik: cpb.nik,
        umur: cpb.umur,
        pekerjaan: cpb.pekerjaan,
        alamatSecaraLengkap: cpb.alamatSecaraLengkap,
        desa: dData.nama,
        kecamatan: kecName,
        kabupaten: 'Bima',
        provinsi: 'Nusa Tenggara Barat',
        noRekening: cpb.noRekening,
        bankPenyalur: 'Bank Rakyat Indonesia (BRI) Kantor Cabang Bima',
        limitBantuanBahan: 17500000,
        limitBantuanUpah: 2500000,
        jumlahSwadayaUang: cpb.jumlahSwadayaUang,
        bentukSwadayaBarang: cpb.bentukSwadayaBarang,
      },
      kpb: {
        id: `kpb-${dName.toLowerCase().replace(/\s+/g, '-')}`,
        namaKpb: `KPB ${dName.replace('Desa ', '')} Makmur ${cpbIdx < 7 ? 'I' : 'II'}`,
        desa: dData.nama,
        kecamatan: kecName,
        ketua: cpb.nama,
        sekretaris: dData.cpbs[(cpbIdx + 1) % dData.cpbs.length]?.nama || cpb.nama,
        bendahara: dData.cpbs[(cpbIdx + 2) % dData.cpbs.length]?.nama || cpb.nama,
        anggota: members
      },
      tfl: {
        id: `tfl-${kecName.toLowerCase()}`,
        namaTfl: kecData.tfl.namaTfl,
        lokasi: kecData.tfl.lokasi,
        kabupaten: 'Bima',
        provinsi: 'Nusa Tenggara Barat',
        koordinatorKabupaten: kecData.tfl.koordinatorKabupaten,
        timPendampingProvinsi: kecData.tfl.timPendampingProvinsi
      },
      toko: {
        id: `toko-${dName.toLowerCase().replace(/\s+/g, '-')}`,
        namaToko: dData.toko.namaToko,
        pemilikToko: dData.toko.pemilikToko,
        nikPemilik: dData.toko.nikPemilik,
        npwpUsaha: dData.toko.npwpUsaha,
        alamat: dData.toko.alamat,
        siupNomor: dData.toko.siupNomor,
        siupTanggal: dData.toko.siupTanggal,
        situNomor: dData.toko.situNomor,
        situTanggal: dData.toko.situTanggal,
        noRekeningToko: dData.toko.noRekeningToko,
        bankToko: dData.toko.bankToko
      },
      desa: {
        id: `desa-${dName.toLowerCase().replace(/\s+/g, '-')}`,
        namaKepalaDesa: dData.kepalaDesa,
        alamatKantor: dData.alamatKantor,
        desa: dData.nama.replace('Desa ', ''),
        kecamatan: kecName,
        kabupaten: 'Bima',
        provinsi: 'Nusa Tenggara Barat',
        nipKepalaDesa: dData.nipKepalaDesa
      },
      customFields: {
        ...prev.customFields,
        noSuratKeteranganTanah: `593/0${cpbIdx + 11}/Pem-Desa.${dName.replace('Desa ', '')}/II/2026`,
        noSuratKeputusanKPB: `KPB/0${cpbIdx + 21}/${dName.replace('Desa ', '').toUpperCase()}/2026`,
        namaWargaSaksi1: dData.cpbs[(cpbIdx + 3) % dData.cpbs.length]?.nama || cpb.nama,
        namaWargaSaksi2: dData.cpbs[(cpbIdx + 4) % dData.cpbs.length]?.nama || cpb.nama,
        namaTukang1: cpb.namaTukang,
        nikTukang1: cpb.nikTukang,
        noPermohonan: `01/KPB-${dName.replace('Desa ', '')}/II/2026`,
      }
    }));

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleStateChange = (updater: (prev: BSPSAppState) => BSPSAppState) => {
    setState((prev) => updater(prev));
  };

  const handleSelectFormat = (format: FormatType) => {
    setState((prev) => ({ ...prev, selectedFormat: format }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleQuickFillSample = (recipientName: string) => {
    if (recipientName === 'rahmat') {
      setState((prev) => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          nama: 'Rahmat Subhan',
          nik: '5206082505920002',
          umur: '34',
          pekerjaan: 'Petani / Pekebun',
          alamatSecaraLengkap: 'RT. 04 RW. 02 Dusun Sinar Baru',
          noRekening: '0032-01-054690-50-4',
          jumlahSwadayaUang: 'Rp 5.500.000',
          bentukSwadayaBarang: 'Kayu Lokal (Pagar), Pasir Kali (6 M3), Batu Kali (10 M3)'
        },
        kpb: {
          ...prev.kpb,
          namaKpb: 'KPB Sinar Jaya II',
          ketua: 'Rahmat Subhan',
        }
      }));
    } else {
      setState((prev) => ({
        ...prev,
        recipient: {
          ...prev.recipient,
          nama: 'Ahmad Fauzi HM',
          nik: '5206081109860005',
          umur: '40',
          pekerjaan: 'Nelayan Tradisional',
          alamatSecaraLengkap: 'RT. 01 RW. 01 Dusun Bahari Indah',
          noRekening: '0032-01-089201-50-2',
          jumlahSwadayaUang: 'Rp 3.000.000',
          bentukSwadayaBarang: 'Bambu Pagar (20 batang), Pasir Laut (4 M3)'
        },
        kpb: {
          ...prev.kpb,
          namaKpb: 'KPB Nelayan Bersatu I',
          ketua: 'Ahmad Fauzi HM',
        }
      }));
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `BSPS_BIMA_BACKUP_${state.recipient.nama.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string);
          if (parsed.recipient && parsed.boqItems) {
            setState(parsed);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
          } else {
            alert('File backup JSON tidak valid atau struktur berbeda.');
          }
        } catch {
          alert('Error gagal membaca file JSON.');
        }
      };
    }
  };

  const handleResetAll = () => {
    if (confirm('Apakah Anda yakin ingin menyetel ulang seluruh data formulir kembali ke standard awal?')) {
      setState(INITIAL_APP_STATE);
      localStorage.removeItem('bsps_document_generator_state');
    }
  };

  // Group formats by category
  const filteredFormats = LIST_FORMATS.filter(fmt => 
    fmt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    fmt.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(LIST_FORMATS.map(f => f.category)));

  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#1A1A1A] flex flex-col font-sans select-none antialiased print:bg-white print:text-black">
      
      {/* HEADER SECTION - Hidden on print */}
      <header className="bg-[#F4F4F1] border-b-2 border-black px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-black bg-black flex items-center justify-center text-white font-black text-xl tracking-tighter shrink-0">
            B
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter leading-none text-[#1A1A1A]">
              KUTIP.ULANG / SI-BSPS
            </h1>
            <p className="text-[10px] font-bold tracking-[0.15em] opacity-65 font-mono uppercase">
              REKAPITULASI PEMENUHAN BERKAS FISIK BIMA
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="text-[11px] font-mono font-bold text-[#1A1A1A] mr-2 flex items-center gap-1.5 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
            <span className="w-2.5 h-2.5 border border-black bg-emerald-400 rounded-full animate-pulse"></span>
            <span>PROFIL_AKTIF: <strong className="underline">{state.recipient.nama.toUpperCase()}</strong></span>
          </div>

          <div className="flex bg-white border-2 border-black p-0.5 shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => handleQuickFillSample('rahmat')}
              className="text-[11px] font-mono font-bold px-2.5 py-1 hover:bg-black hover:text-white transition-all text-[#1A1A1A] flex items-center gap-1"
              title="Isi database dengan data Rahmat Subhan (Desa Bolo)"
            >
              <Sparkles size={11} className="text-amber-500" />
              <span>SIMULASI_1</span>
            </button>
            <div className="w-[2px] bg-black my-1"></div>
            <button
              onClick={() => handleQuickFillSample('fauzi')}
              className="text-[11px] font-mono font-bold px-2.5 py-1 hover:bg-black hover:text-white transition-all text-[#1A1A1A] flex items-center gap-1"
              title="Isi database dengan data Ahmad Fauzi (Nelayan Sanggar)"
            >
              <Sparkles size={11} className="text-cyan-600" />
              <span>SIMULASI_2</span>
            </button>
          </div>

          <button
            onClick={handleExportBackup}
            className="text-[11px] font-mono font-bold bg-white hover:bg-black hover:text-white border-2 border-black px-2.5 py-1.5 flex items-center gap-1 text-[#1A1A1A] transition-all shadow-[2px_2px_0px_#000]"
            title="Download seluruh data pengisian formulir sebagai file JSON"
          >
            <Download size={12} />
            <span>BACKUP.JSON</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-mono font-bold bg-white hover:bg-black hover:text-white border-2 border-black px-2.5 py-1.5 flex items-center gap-1 text-[#1A1A1A] transition-all shadow-[2px_2px_0px_#000]"
            title="Import file backup JSON"
          >
            <Upload size={12} />
            <span>RESTORE.JSON</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportBackup} 
            accept=".json" 
            className="hidden" 
          />

          <button
            onClick={handleResetAll}
            className="text-[11px] font-mono font-bold bg-rose-100 hover:bg-rose-600 hover:text-white border-2 border-black px-2.5 py-1.5 flex items-center gap-1 text-[#1A1A1A] transition-all shadow-[2px_2px_0px_#000]"
            title="Kembalikan semua form ke setelan pabrik kosong"
          >
            <RotateCcw size={12} />
            <span>RESET_FORM</span>
          </button>
        </div>
      </header>

      {/* CORE WORKSPACE */}
      <main className="flex-1 flex overflow-hidden w-full max-w-8xl mx-auto print:block print:p-0 print:border-none">
        
        {/* LEFT COLUMN: Selector of 40+ Formats (Hidden on print) */}
        <section className="w-80 border-r-2 border-black bg-[#EAEAE5] flex flex-col shrink-0 flex-none print:hidden text-[#1A1A1A]">
          
          {/* QUICK-ACCESS MAIN OFFICIAL TFL REPORT BANNER */}
          <div className="p-3.5 bg-yellow-400 border-b-2 border-black text-black">
            <span className="text-[10px] font-black uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <Sparkles size={11} className="animate-bounce" />
              <span>DOKUMEN KONTRAK UTAMA</span>
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => handleSelectFormat('FORMAT_II_50')}
                className={`w-full text-left py-2 px-3 border-2 border-black text-[11px] font-mono font-black uppercase flex items-center justify-between gap-2 shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                  state.selectedFormat === 'FORMAT_II_50'
                    ? 'bg-black text-white hover:bg-neutral-900 shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-white text-black hover:bg-black hover:text-white hover:shadow-[1px_1px_0px_rgba(0,0,0,1)]'
                }`}
                id="quick-open-report-btn"
              >
                <span>📖 OUTLINE BULANAN TFL</span>
                <FileText size={13} className="shrink-0" />
              </button>

              <button
                onClick={() => handleSelectFormat('FORMAT_OUTLINE_PROPOSAL')}
                className={`w-full text-left py-2 px-3 border-2 border-black text-[11px] font-mono font-black uppercase flex items-center justify-between gap-2 shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                  state.selectedFormat === 'FORMAT_OUTLINE_PROPOSAL'
                    ? 'bg-black text-white hover:bg-neutral-900 shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-white text-black hover:bg-black hover:text-white hover:shadow-[1px_1px_0px_rgba(0,0,0,1)]'
                }`}
                id="quick-open-proposal-btn"
              >
                <span>📂 OUTLINE PROPOSAL CPB</span>
                <Library size={13} className="shrink-0" />
              </button>
            </div>
            <p className="text-[9px] mt-2 leading-tight font-mono font-medium text-black/85">
              Klik navigasi di atas untuk langsung melihat <strong>Laporan Bulanan TFL (7 Bab)</strong> atau <strong>Outline Proposal CPB (11 Form PDF Utama)</strong>.
            </p>
          </div>

          <div className="p-4 border-b-2 border-black">
            <span className="text-[10px] font-black uppercase mb-2 tracking-widest block">DAFTAR FORMAT & PROGRES TFL</span>
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-3 text-[#1A1A1A]" size={13} />
              <input 
                type="text" 
                placeholder="Cari format berkas..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white border-2 border-black text-xs font-mono text-[#1A1A1A] placeholder-zinc-500 focus:outline-none focus:bg-white"
              />
            </div>

            {/* TAB SELECTOR: Kategori vs Timeline TFL */}
            <div className="grid grid-cols-2 gap-1 bg-white border-2 border-black p-0.5">
              <button
                onClick={() => setGroupingMode('tfl_timeline')}
                className={`py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                  groupingMode === 'tfl_timeline' 
                    ? 'bg-black text-white' 
                    : 'text-black hover:bg-zinc-100'
                }`}
              >
                Timeline TFL
              </button>
              <button
                onClick={() => setGroupingMode('kategori')}
                className={`py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                  groupingMode === 'kategori' 
                    ? 'bg-black text-white' 
                    : 'text-black hover:bg-zinc-100'
                }`}
              >
                Kategori
              </button>
            </div>
          </div>

          {/* COMPLIANCE CORE SCORECARD */}
          <div className="p-3.5 border-b-2 border-black bg-stone-100/80">
            {(() => {
              const stats = getOverallComplianceStats();
              return (
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span>SKOR KEPATUHAN CPB:</span>
                    <span className="bg-black text-yellow-400 px-1 py-0.5 font-black">{stats.percentage}%</span>
                  </div>
                  {/* Neon retro progress bar */}
                  <div className="w-full h-3.5 border-2 border-black bg-white relative overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 border-r border-black transition-all duration-300" 
                      style={{ width: `${stats.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[8px] font-bold opacity-75">
                    <span>TERVERIFIKASI: {stats.earned} PTS</span>
                    <span>TARGET: {stats.total} PTS</span>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-4 scrollbar-thin bg-[#EAEAE5]">
            {groupingMode === 'tfl_timeline' ? (
              // RENDER GROUPED BY TFL TIMELINE PHASE
              TFL_MONTHS.map((monthName) => {
                const formatsInMonth = filteredFormats.filter(f => {
                  const mapping = TFL_TIMELINE_MAPPING[f.id];
                  return mapping && mapping.month === monthName;
                });
                if (formatsInMonth.length === 0) return null;

                const progressPercent = getTimelineProgress(monthName);

                return (
                  <div key={monthName} className="space-y-1 text-[#1A1A1A]">
                    <div className="px-1 py-1 bg-white border border-black mb-1.5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-[9px] font-black text-black uppercase tracking-tight line-clamp-1">{monthName}</h3>
                        <span className="text-[8px] font-mono font-bold bg-black text-white px-1 leading-normal shrink-0">{progressPercent}%</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {formatsInMonth.map((fmt) => {
                        const isSelected = state.selectedFormat === fmt.id;
                        const isCompleted = isFormatCompleted(fmt.id);
                        return (
                          <div 
                            key={fmt.id}
                            onClick={() => handleSelectFormat(fmt.id)}
                            className={`w-full text-left p-2 transition-all flex items-start gap-2 border-2 border-black cursor-pointer bg-white group/item ${
                              isSelected 
                                ? 'shadow-[1px_1px_0px_#000] bg-stone-100 ring-1 ring-black/40' 
                                : 'hover:bg-zinc-50'
                            }`}
                            id={`format-btn-${fmt.id}`}
                          >
                            {/* Checkbox */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFormatCompleted(fmt.id, e);
                              }}
                              className={`mt-0.5 w-4 h-4 border-2 border-black flex items-center justify-center cursor-pointer transition-all duration-150 shrink-0 select-none ${
                                isCompleted ? 'bg-emerald-500 text-white' : 'bg-white text-transparent hover:bg-stone-100'
                              }`}
                              title={isCompleted ? "Tandai Belum Selesai" : "Tandai Sudah Selesai/Diterima"}
                            >
                              {isCompleted && <Check size={10} strokeWidth={4} />}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-1">
                                <span className="text-[11px] font-black uppercase tracking-tight block leading-tight text-black group-hover/item:underline">{fmt.title}</span>
                                <span className="text-[8px] font-mono leading-none font-bold bg-stone-200/90 text-stone-700 px-1 py-0.5 shrink-0 border border-black/10">
                                  PTS {FORMAT_BOBOT_MAP[fmt.id] || 2}
                                </span>
                              </div>
                              <span className="text-[9px] block mt-0.5 leading-snug line-clamp-2 opacity-70 font-mono text-stone-600">{fmt.description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              // RENDER GROUPED BY ADMINISTRATIVE CATEGORY (STANDARD)
              categories.map((cat) => {
                const formatsInCat = filteredFormats.filter(f => f.category === cat);
                if (formatsInCat.length === 0) return null;

                return (
                  <div key={cat} className="space-y-1 text-[#1A1A1A]">
                    <h3 className="px-2 text-[10px] font-black text-black uppercase tracking-widest border-b border-black/30 pb-0.5 mt-3">{cat}</h3>
                    <div className="space-y-1.5">
                      {formatsInCat.map((fmt) => {
                        const isSelected = state.selectedFormat === fmt.id;
                        const isCompleted = isFormatCompleted(fmt.id);
                        return (
                          <div
                            key={fmt.id}
                            onClick={() => handleSelectFormat(fmt.id)}
                            className={`w-full text-left p-2 transition-all flex items-start gap-2 border-2 border-black cursor-pointer bg-white group/item ${
                              isSelected 
                                ? 'shadow-[1px_1px_0px_#000] bg-stone-100 ring-1 ring-black/40' 
                                : 'hover:bg-zinc-50'
                            }`}
                            id={`format-btn-${fmt.id}`}
                          >
                            {/* Checkbox */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFormatCompleted(fmt.id, e);
                              }}
                              className={`mt-0.5 w-4 h-4 border-2 border-black flex items-center justify-center cursor-pointer transition-all duration-150 shrink-0 select-none ${
                                isCompleted ? 'bg-emerald-500 text-white' : 'bg-white text-transparent hover:bg-stone-100'
                              }`}
                              title={isCompleted ? "Tandai Belum Selesai" : "Tandai Sudah Selesai/Diterima"}
                            >
                              {isCompleted && <Check size={10} strokeWidth={4} />}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-1">
                                <span className="text-[11px] font-black uppercase tracking-tight block leading-tight text-black group-hover/item:underline">{fmt.title}</span>
                                <span className="text-[8px] font-mono leading-none font-bold bg-stone-200/90 text-stone-700 px-1 py-0.5 shrink-0 border border-black/10">
                                  PTS {FORMAT_BOBOT_MAP[fmt.id] || 2}
                                </span>
                              </div>
                              <span className="text-[9px] block mt-0.5 leading-snug line-clamp-2 opacity-70 font-mono text-stone-600">{fmt.description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-3 border-t-2 border-black bg-[#EAEAE5] text-[9px] text-[#1A1A1A] uppercase font-bold opacity-75 leading-relaxed">
            SISTEM TELAH MEMETAKAN FORMAT ADMINISTRASI UNTUK PEMENUHAN BERKAS FISIK BSPS 2026 BERDASARKAN OUTPUT LAPORAN BULANAN TFL.
          </div>
        </section>

        {/* MIDDLE COLUMN: Variables & Fields Editor (Hidden on print) */}
        <OfflineManager
          state={state}
          setState={setState}
          hierarchyDb={hierarchyDb}
          setHierarchyDb={setHierarchyDb}
          applyHierarchicalCPB={applyHierarchicalCPB}
          hierarchyKecamatan={hierarchyKecamatan}
          setHierarchyKecamatan={setHierarchyKecamatan}
          hierarchyDesa={hierarchyDesa}
          setHierarchyDesa={setHierarchyDesa}
          hierarchyCPBIndex={hierarchyCPBIndex}
          setHierarchyCPBIndex={setHierarchyCPBIndex}
          saveSuccess={saveSuccess}
          activeProfileTab={activeProfileTab}
          setActiveProfileTab={setActiveProfileTab}
          handleStateChange={handleStateChange}
        />

        {/* RIGHT COLUMN: Real A4 preview sheet (Takes remaining flex space) */}
        <section className="flex-1 bg-[#F4F4F1] p-6 overflow-y-auto flex flex-col justify-between items-center print:bg-white print:p-0 print:block text-[#1A1A1A]">
          
          {/* Header Action controls block */}
          <div className="w-full max-w-[800px] bg-white border-2 border-black p-4 shadow-[6px_6px_0px_#000] mb-4 flex flex-col sm:flex-row justify-between items-center gap-3 print:hidden shrink-0">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-zinc-500 tracking-wider">TEMPLATE TERPILIH</span>
              <h2 className="text-sm font-bold text-black mt-0.5 uppercase tracking-wide">
                {LIST_FORMATS.find(f => f.id === state.selectedFormat)?.title || 'SURAT ADMINISTRASI'}
              </h2>
            </div>
            
            <button
              onClick={handlePrint}
              className="bg-[#D9EAF0] text-[#1A1A1A] font-bold border-2 border-black px-5 py-2.5 text-xs flex items-center gap-1.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer"
              id="print-btn"
            >
              <Printer size={13} />
              <span>CETAK / EKSPOR PDF</span>
            </button>
          </div>

          {/* CHROME PRINT HELP HINTS */}
          <AnimatePresence>
            {showPrintHint && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-[800px] border-2 border-dashed border-black bg-yellow-105 p-4 mb-4 flex justify-between items-center shadow-[4px_4px_0px_#000] relative print:hidden bg-yellow-100"
              >
                <button
                  onClick={() => setShowPrintHint(false)}
                  className="absolute top-2 right-2 hover:text-black p-0.5 text-xs font-bold font-mono text-zinc-650"
                  title="Sembunyikan panduan"
                >
                  ✕
                </button>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-black flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">!</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase italic">PANDUAN CETAK BIMA:</p>
                    <p className="text-[11px] leading-relaxed text-zinc-805 text-zinc-800">
                      Aktifkan <strong>"Background Graphics / Grafis Latar Belakang"</strong> dan matikan <strong>"Header and Footers"</strong> pada opsi pengaturan browser saat dicetak, agar dokumen tercetak rapi persis 1 lembar A4 bersih dari tombol browser!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* REAL A4 SHEET PREVIEW FRAME */}
          <div className="w-full overflow-x-auto p-4 flex justify-center print:p-0 print:overflow-visible">
            <DocumentPreview state={state} />
          </div>

          {/* Footer of app logo and credits */}
          <div className="mt-8 text-[11px] text-[#1A1A1A] mb-2 font-mono print:hidden text-center opacity-70">
            <div className="flex items-center justify-center gap-1.5 mb-1 text-[#1A1A1A] font-bold">
              <Library size={12} />
              <span>SI-BSPS KABUPATEN BIMA 2026</span>
            </div>
            <p>Sistem ini memangkas beban redudansi ketik ulang instrumen bantuan rumah swadaya NTB.</p>
          </div>

        </section>

      </main>

      {/* Ticker footer */}
      <footer className="h-8 bg-black text-white flex items-center px-4 overflow-hidden shrink-0 print:hidden mt-auto uppercase">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono tracking-[0.2em]">
          <span>MENGHASILKAN BERKAS BSPS KABUPATEN BIMA</span>
          <span>●</span>
          <span>FORMAT ADMINISTRASI READY</span>
          <span>●</span>
          <span>KUTIP ULANG SEMUA TEMPLATE</span>
          <span>●</span>
          <span>NTB TAHUN ANGGARAN 2026</span>
          <span>●</span>
          <span>AKURASI DATA PROYEK 100%</span>
          <span>●</span>
          <span>SISTEM SUDAH SIAP CETAK</span>
          <span>●</span>
        </div>
      </footer>

    </div>
  );
}
