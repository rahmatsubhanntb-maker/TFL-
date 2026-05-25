import React from 'react';
import { BSPSAppState, FormatType } from '../types';
import { 
  Check, ClipboardList, BookOpen, Printer, Calendar, MapPin, 
  DollarSign, Activity, Award, User, AlertTriangle, FileText, ChevronRight 
} from 'lucide-react';
import { ExtraFormats } from './ExtraFormats';

interface DocumentPreviewProps {
  state: BSPSAppState;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ state }) => {
  const { recipient, kpb, tfl, toko, desa, project, boqItems, customFields } = state;

  const [reportMonth, setReportMonth] = React.useState<number>(1);
  const [selectedChapter, setSelectedChapter] = React.useState<string>('all');

  const [coverImage, setCoverImage] = React.useState<string | null>(null);
  const [ktpDepanImage, setKtpDepanImage] = React.useState<string | null>(null);
  const [ktpBelakangImage, setKtpBelakangImage] = React.useState<string | null>(null);
  const [kkImage, setKkImage] = React.useState<string | null>(null);
  const [swadaya1Image, setSwadaya1Image] = React.useState<string | null>(null);
  const [swadaya2Image, setSwadaya2Image] = React.useState<string | null>(null);

  const formatTitleCase = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatNameWithGelar = (fullName: string) => {
    if (!fullName) return '';
    const parts = fullName.split(',');
    const namePart = parts[0];
    const formattedName = namePart.trim().split(' ')
      .map(word => {
        const u = word.toUpperCase();
        if (u === 'M.' || u === 'H.' || u === 'S.' || u === 'S.E.' || u === 'S.T.') {
          return u;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
    
    if (parts.length > 1) {
      const titles = parts.slice(1).map(t => t.trim().toUpperCase()).join(', ');
      return `${formattedName}, ${titles}`;
    }
    return formattedName;
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (val: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Prefilled mock/data variables based on selected month (1 - 5) following the TFL outline guideline
  const getMonthReportData = (monthNum: number) => {
    const KPB_NAMA = kpb.namaKpb || "KPB Sinar Jaya I";
    const KKB_NAMA = tfl.koordinatorKabupaten || "M. Khairul Amri, S.T.";
    const TFL_NAMA = tfl.namaTfl || "Rahmat Subhan";
    const DESA_KADES = desa.namaKepalaDesa || "Sudirman Syah, S.IP";
    
    const data: Record<number, {
      title: string;
      periode: string;
      targetKerja: string;
      realisasiTarget: string;
      realisasiBahan: number;
      realisasiUpah: number;
      fisikProgressDefault: number;
      fisikMin: number;
      fisikMax: number;
      sirusProgres: string;
      sirusPersen: number;
      kendala: string;
      tindakLanjut: string;
      rencanaBulanDepan: string;
      bestPracticeStory: string;
      statusPersiapan: string;
      statusPelaksanaan: string;
      kesimpulan: string;
      saran: string;
    }> = {
      1: {
        title: "BULAN I: SURVEY, VERIFIKASI & SOSIALISASI DATA",
        periode: "Mei 2026",
        targetKerja: "Survey, verifikasi dan identifikasi berkas 10 unit CPB, sosialisasi program BSPS secara menyeluruh di tingkat desa, dan pembentukan Pengurus KPB.",
        realisasiTarget: "Terlaksana 100%. Kelompok Penerima Bantuan (KPB) telah resmi terbentuk, berkas administrasi 10 CPB lengkap masuk seleksi.",
        realisasiBahan: 0,
        realisasiUpah: 0,
        fisikProgressDefault: 0,
        fisikMin: 0,
        fisikMax: 0,
        sirusProgres: "Pemasukan data profil & unggah berkas KTP/KK ke SIRUS-Pusat",
        sirusPersen: 35,
        kendala: "Beberapa Calon Penerima Bantuan (CPB) mengalami kesulitan menyerahkan salinan surat kepemilikan tanah ahli waris yang belum dipecahkan.",
        tindakLanjut: "TFL melakukan koordinasi terpadu dengan Kepala Desa untuk menerbitkan Surat Keterangan Tanah (SKT) resmi dari desa secara kolektif.",
        rencanaBulanDepan: "Melaksanakan Pemilihan Terbuka Toko (PTT) bahan bangunan dan merampungkan penyusunan Proposal DRPB per CPB.",
        bestPracticeStory: "Rembuk perdana sosialisasi BSPS 2026 di aula Kantor Desa dihadiri secara antusias oleh puluhan warga. Pertemuan ini berhasil membakar kembali semangat gotong-royong swadaya yang hampir pudar, dengan merencanakan siskamling gotong-royong material lokal secara terkelompok.",
        statusPersiapan: "Selesai 100% (Sosialisasi dan Pembentukan Pokmas)",
        statusPelaksanaan: "Belum Dimulai (Menunggu Review Teknis RAB)",
        kesimpulan: "Pendampingan Bulan I berjalan lancar dengan terbentuknya KPB dan tuntasnya validasi berkas fisik, mengukuhkan kesiapan teknis CPB.",
        saran: "Disarankan agar pihak desa terus memantau ketersediaan surat hibah keluarga CPB agar tidak menghambat penerbitan keputusan PPK."
      },
      2: {
        title: "BULAN II: PERENCANAAN PROPOSAL & REKOMENDASI TOKO",
        periode: "Juni 2026",
        targetKerja: "Penyusunan dokumen Rencana Anggaran Biaya (RAB) teknis, pelaksanaan sidang terbuka pemilihan toko penyedia bahan bangunan, dan rekapitulasi proposal.",
        realisasiTarget: "Terlaksana 100%. Dokumen Proposal DRPB 10 CPB selesai disusun, Toko Pendukung sah terpilih melalui musyawarah terbuka demokratis.",
        realisasiBahan: 0,
        realisasiUpah: 0,
        fisikProgressDefault: 0,
        fisikMin: 0,
        fisikMax: 0,
        sirusProgres: "Verifikasi administrasi digital dan sinkronisasi data proposal DRPB",
        sirusPersen: 90,
        kendala: "Ketersediaan jenis kayu lokal bersertifikat SNI berkualitas tinggi tipis di pasaran kecamatan terdekat.",
        tindakLanjut: "KPB sepakat mendatangkan kayu dari distributor kabupaten ber-faktur legal yang direkomendasikan toko terpilih dengan jaminan return logistik gratis.",
        rencanaBulanDepan: "Pengusunan berkas permintaan pencairan Tahap I, penyiapan pembekalan praktis tukang, dan droping batu fondasi serta pasir.",
        bestPracticeStory: "Pemilihan Terbuka Toko (PTT) yang dipelopori KPB mendulang pujian besar. Hadirnya 3 toko pembanding memaparkan daftar harga material di papan tulis balai pertemuan secara live membuat seluruh CPB merasa berkuasa penuh atas pemanfaatan dana mereka sendiri tanpa takut adanya pemotongan.",
        statusPersiapan: "Selesai 100% (Penyusunan Dokumen Perencanaan & Surat Perjanjian Toko)",
        statusPelaksanaan: "Belum Dimulai (Menunggu Verifikasi Saldo Rekening Bank)",
        kesimpulan: "Perencanaan teknis dan komitmen logistik toko material telah tuntas disepakati dengan integritas penuh, menutup tahap persiapan administratif.",
        saran: "Perlu koordinasi intensif ke bank penyalur agar buku rekening dan kartu ATM penerima manfaat dapat segera disalurkan tepat waktu."
      },
      3: {
        title: "BULAN III: PELAKSANAAN FISIK TAHAP 1 (0-30% FISIK)",
        periode: "Juli 2026",
        targetKerja: "Pencairan Tahap I (50% Bahan), droping semen, pasir, dan batu kali, pembekalan tukang bangunan, pematokan lahan, dan pembangunan struktur fondasi hingga kolom s/d % progress 30%.",
        realisasiTarget: "Terlaksana 100%. Dana Tahap I sebesar Rp 8.750.000,- per unit berhasil tersalur, konstruksi fondasi dan pasangan dinding bata berdiri stabil di 10 lokasi.",
        realisasiBahan: 8750000,
        realisasiUpah: 0,
        fisikProgressDefault: 30,
        fisikMin: 30,
        fisikMax: 35,
        sirusProgres: "Input progress fisik Tahap I (Galian, Fondasi & Kolom) beserta foto geotagging",
        sirusPersen: 100,
        kendala: "Masing-masing CPB mengalami kendala musim hujan lebat tak terduga datang di minggu kedua sehingga menghambat proses pengerjaan galian fondasi dan pengendapan adukan cor beton.",
        tindakLanjut: "TFL memobilisasi KPB untuk memasang tenda terpal darurat di lokasi galian serta membagi kelompok kerja gotong-royong di jam-jam cerah.",
        rencanaBulanDepan: "Penyusunan LPD Tahap I, pengajuan pencairan tahap II, penuntusan kusen kayu, dan pengerjaan konstruksi dinding hingga 100% atap.",
        bestPracticeStory: "Penerapan sistem 'Sambatan' (Kerja Bakti Bergilir). Anggota kelompok tidak mengupah tukang luar secara penuh, melainkan mendisiplinkan 3-4 orang anggota KPB membantu 1 sasaran rumah secara bergantian setiap hari. Cara tradisional ini menghemat biaya upah hingga Rp 800.000,- per unit.",
        statusPersiapan: "Selesai 100% (Administrasi dan Pembekalan Tukang KPB)",
        statusPelaksanaan: "Selesai 30% Secara Fisik (Konstruksi Struktur Bawah)",
        kesimpulan: "Konstruksi dasar rumah layak huni (safety-structural) telah terpasang kokoh sesuai spesifikasi BSPS 2026, ditopang kegigihan gotong royong.",
        saran: "Agar TFL mempercepat audit fisik 30% menjelang deadline penutupan pengajuan upah kerja tukang kloter pertama."
      },
      4: {
        title: "BULAN IV: PELAKSANAAN/KONSTRUKSI FISIK (30-100%)",
        periode: "Agustus 2026",
        targetKerja: "Pencairan Dana Tahap II (Bahan & Upah Tahap I), pemasangan kusen, konstruksi rangka atap, pemasangan penutup atap seng, penutupan plesteran dinding, dan absensi harian pekerja.",
        realisasiTarget: "Terlaksana 90%. Logistik bahan bangunan Tahap II terdistribusi lunas, upah tukang Tahap I cair, progres bangunan melaju cepat mencapai rata-rata 85%-95% fisik.",
        realisasiBahan: 17500000,
        realisasiUpah: 1250000,
        fisikProgressDefault: 85,
        fisikMin: 85,
        fisikMax: 95,
        sirusProgres: "Upload data LPD Tahap I, verifikasi berkas absensi tukang, & progres fisik 90%",
        sirusPersen: 100,
        kendala: "Pekerja utama (tukang kepala) di beberapa rumah penerima mendadak sakit demam berdarah sehingga pengerjaan atap sempat terkendala selama 5 hari.",
        tindakLanjut: "TFL menginstruksikan asisten tukang dan anggota KPB lain untuk mengisi kekosongan peran di bawah supervisor pengawas lapangan swadaya desa.",
        rencanaBulanDepan: "Dokumen LPD Tahap II lengkap, finishing pengecatan, pekerjaan pintu jendela kayu, instalasi MCK sanitasi, dan verifikasi akhir QA/QC.",
        bestPracticeStory: "Semangat kemanusiaan luar biasa terlihat tatkala KPB bersepakat mengalokasikan hari khusus untuk bersama-sama menyelesaikan kerangka atap salah satu penerima manfaat yang sedang mengidap keterbatasan fisik tanpa dipungut kontribusi uang upah sepeser pun.",
        statusPersiapan: "Selesai 100% (Administrasi Pembelanjaan Logistik Toko)",
        statusPelaksanaan: "Selesai 90% Secara Fisik (Konstruksi Struktur Atas & Atap)",
        kesimpulan: "Seluruh rumah dampingan kini telah terlindungi dari terpaan cuaca ekstrim berkat terselesaikannya struktur atap dan dinding bata yang kokoh.",
        saran: "Perlu ditekankan pentingnya ketebalan plesteran dinding bata yang konsisten demi menjamin kekuatan gempa (earthquake resilience)."
      },
      5: {
        title: "BULAN V: DOKUMEN AKHIR & SERTIFIKASI KEPATUHAN",
        periode: "September 2026",
        targetKerja: "Penyelesaian fisik 100% (finishing, MCK sehat, ventilasi), pencarian Upah Tukang Tahap II, audit verifikasi kualitas QA/QC Wasdal, penandatanganan Dokumen BAST & LPD Akhir.",
        realisasiTarget: "Terlaksana 100%. Seluruh dari 10 rumah penerima terbangun kokoh sesuai standard teknis perumahan nasional, dana upah diserap tuntas tanpa sisa potongan.",
        realisasiBahan: 17500000,
        realisasiUpah: 2500000,
        fisikProgressDefault: 100,
        fisikMin: 100,
        fisikMax: 100,
        sirusProgres: "Verifikasi Kelengkapan LPD Tahap II, Berita Acara Serah Terima, & foto 100% tuntas",
        sirusPersen: 100,
        kendala: "Pemasangan instalasi pipa air bersih sempat terkendala jarak sumber air bersih dusun bagian atas yang agak curam.",
        tindakLanjut: "KPB menaruh patungan pipa PVC tambahan secara swadaya murni untuk menyambungkan paralon dari bak penampung induk desa.",
        rencanaBulanDepan: "Pelaksanaan program pendampingan berakhir, penyusunan laporan akhir kontrak kolektif TFL, dan pelepasan resmi.",
        bestPracticeStory: "Suasana haru biru pecah saat penempelan stiker penanda rumah layak huni BSPS 2026 di pintu depan rumah salah satu penerima manfaat. Air matanya berlinang mengucap doa syukur mendalam kepada TFL dan pemerintah, mengingat kini anak-anaknya tidak lagi tidur di bawah genteng bocor dan alas tanah lembap.",
        statusPersiapan: "Selesai 100% (Sertifikasi Kelayakan Layak Huni)",
        statusPelaksanaan: "Selesai 100% (Konstruksi Selesai Sempurna)",
        kesimpulan: "Program BSPS Tahun 2026 di Desa dampingan berhasil dicatat sukses total 100% tanpa catatan kecelakaan kerja, menghidupkan kualitas sanitasi dan hunian MBR.",
        saran: "Disarankan bagi penerima manfaat untuk terus merawat saluran air hujan (talang) dan kebersihan septic tank agar kesehatan keluarga terus terjaga."
      }
    };
    return data[monthNum] || data[1];
  };

  const getFormatNo = (fmt: FormatType): string => {
    if (fmt === 'FORMAT_OUTLINE_PROPOSAL') {
      return 'OUTLINE PROPOSAL CPB (INDIVIDU)';
    }
    if (fmt.startsWith('FORMAT_II_')) {
      return fmt.replace('FORMAT_II_', 'FORMAT II-');
    }
    return fmt.replace(/_/g, ' ');
  };

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID') + ',-';
  };

  const formatTerbilang = (angka: number): string => {
    const s = [
      '', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'
    ];
    const ambil = (n: number): string => {
      if (n < 12) return s[n];
      if (n < 20) return ambil(n - 10) + ' Belas';
      if (n < 100) return ambil(Math.floor(n / 10)) + ' Puluh ' + ambil(n % 10);
      if (n < 200) return 'Seratus ' + ambil(n - 100);
      if (n < 1000) return ambil(Math.floor(n / 100)) + ' Ratus ' + ambil(n % 100);
      if (n < 2000) return 'Seribu ' + ambil(n - 1000);
      if (n < 1000000) return ambil(Math.floor(n / 1000)) + ' Ribu ' + ambil(n % 1000);
      if (n < 100000000) return ambil(Math.floor(n / 1000000)) + ' Juta ' + ambil(n % 1000000);
      return '';
    };
    return ambil(angka).trim() + ' Rupiah';
  };

  const calculateTotalBahan = () => {
    return boqItems.reduce((acc, curr) => acc + curr.jumlah, 0);
  };

  const totalBahan = calculateTotalBahan();

  const paperSize = customFields?.layoutPaperSize || 'a4';
  const fontFamily = customFields?.layoutFontFamily || 'serif';
  const fontSize = customFields?.layoutFontSize || 'md';
  const lineSpacing = customFields?.layoutLineSpacing || 'normal';
  const pageMargin = customFields?.layoutPageMargin || '40px';

  const fontStyle = fontFamily === 'serif' 
    ? '"Times New Roman", Times, Georgia, serif' 
    : fontFamily === 'mono' 
      ? '"JetBrains Mono", ui-monospace, monospace' 
      : 'ui-sans-serif, system-ui, -apple-system, sans-serif';

  const fontSizeClass = fontSize === 'sm' 
    ? 'text-[10px]' 
    : fontSize === 'lg' 
      ? 'text-sm' 
      : 'text-xs';

  const lineSpacingClass = lineSpacing === 'compact' 
    ? 'leading-tight' 
    : lineSpacing === 'spacious' 
      ? 'leading-relaxed' 
      : 'leading-snug';

  let docWidth = '800px';
  let minHeight = '1130px';
  if (paperSize === 'f4') {
    docWidth = '810px';
    minHeight = '1240px';
  } else if (paperSize === 'letter') {
    docWidth = '820px';
    minHeight = '1060px';
  }

  return (
    <div 
      className={`bg-white text-black neo-card-lg mx-auto relative select-all scrollbar-thin printable-layout-canvas ${fontSizeClass} ${lineSpacingClass}`}
      style={{ 
        width: docWidth, 
        minHeight: minHeight, 
        padding: pageMargin,
        fontFamily: fontStyle
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .printable-layout-canvas, .printable-layout-canvas * {
          font-family: ${fontStyle} !important;
          ${lineSpacing === 'compact' ? 'line-height: 1.15 !important;' : lineSpacing === 'spacious' ? 'line-height: 1.625 !important;' : 'line-height: 1.375 !important;'}
        }
        @media print {
          @page {
            size: ${paperSize === 'f4' ? '215mm 330mm' : paperSize === 'letter' ? '8.5in 11in' : 'A4'} !important;
            margin: ${pageMargin} !important;
          }
          .printable-layout-canvas {
            width: 100% !important;
            min-height: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}} />
      
      {/* Top watermark / Print Notice */}
      <div className="absolute top-2 right-2 text-[8px] font-mono font-bold text-black select-none print:hidden uppercase border-2 border-black bg-white px-1.5 py-0.5 shadow-[1px_1px_0px_#000] flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Pratinjau Kertas {paperSize.toUpperCase()} Resmi</span>
      </div>

      {/* 1. FORMAT II-19 */}
      {state.selectedFormat === 'FORMAT_II_19' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-sm tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm underline uppercase tracking-wide">
            PERMOHONAN BANTUAN STIMULAN PERUMAHAN SWADAYA (BSPS)
          </div>
          <div className="flex justify-between items-start text-xs pt-2">
            <div>
              <table>
                <tbody>
                  <tr><td className="w-16">Yth.:</td><td>Pejabat Pembuat Komitmen (PPK) Rumah Swadaya</td></tr>
                  <tr><td></td><td>dan Pengembangan Kawasan Permukiman</td></tr>
                  <tr><td></td><td>Satuan Kerja Perumahan dan Kawasan Permukiman NTB</td></tr>
                </tbody>
              </table>
            </div>
            <div className="text-right">
              {recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}
            </div>
          </div>
          <div className="text-xs pt-1">
            <strong>Perihal :</strong> Permohonan Kegiatan Bantuan Stimulan Perumahan Swadaya (BSPS) Tahun {project.tahunAnggaran}
          </div>

          <p className="text-justify text-xs leading-relaxed">
            Saya yang bertanda tangan di bawah ini :
          </p>

          <table className="w-full text-xs font-serif pl-4">
            <tbody>
              <tr><td className="w-32 py-1">Nama</td><td className="w-4">:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td className="py-1">Umur</td><td>:</td><td>{recipient.umur} Tahun</td></tr>
              <tr><td className="py-1">Pekerjaan</td><td>:</td><td>{recipient.pekerjaan}</td></tr>
              <tr><td className="py-1">Alamat</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
              <tr><td className="py-1"></td><td></td><td>Desa {recipient.desa}, Kecamatan {recipient.kecamatan}</td></tr>
              <tr><td className="py-1"></td><td></td><td>Kabupaten {recipient.kabupaten}, Provinsi {recipient.provinsi}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed">
            Dengan ini menyatakan bahwa saya:
          </p>
          <ol className="list-decimal pl-6 space-y-1 text-xs">
            <li>Warga Negara Indonesia yang sudah berkeluarga;</li>
            <li>Memiliki atau menguasai tanah dengan bukti kepemilikan dan penguasaan yang jelas dan sah;</li>
            <li>Batas penghasilan keluarga paling banyak sebesar Upah Minimum Provinsi/Kabupaten *);</li>
            <li>Memiliki dan menempati satu-satunya rumah dengan kondisi tidak layak huni selama minimal 3 (tiga) tahun;</li>
            <li>Belum pernah memperoleh program bantuan pembangunan rumah swadaya dan program kemudahan dan bantuan pembiayaan perumahan bagi MBR dalam 10 tahun terakhir; dan</li>
            <li>Bersedia mengikuti ketentuan program serta tidak akan memindahtangankannya kepada pihak lain.</li>
          </ol>

          <p className="text-justify text-xs leading-relaxed">
            Sehubungan dengan hal tersebut di atas, saya mengajukan permohonan untuk dapat diberikan bantuan BSPS tahun {project.tahunAnggaran}.
          </p>

          <p className="text-justify text-xs leading-relaxed">
            Sebagai kelengkapan permohonan ini, bersama ini saya lampirkan:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs">
            <li>Salinan Kartu Tanda Penduduk (KTP) dan Kartu Keluarga (KK) yang masih berlaku;</li>
            <li>Slip penghasilan dan/atau surat pernyataan penghasilan diketahui Kepala Desa / Instansi tempat bekerja *);</li>
            <li>Salinan sertifikat hak atas tanah/surat bukti kepemilikan tanah/surat keterangan menguasai tanah dari Kepala Desa/Camat *);</li>
            <li>Surat pernyataan mengikuti program (Format tersendiri);</li>
            <li>Hasil identifikasi keswadayaan calon penerima bantuan; dan</li>
            <li>Rencana teknis perbaikan rumah dan Rencana Anggaran Biaya (RAB).</li>
          </ul>

          <p className="text-justify text-xs leading-relaxed">
            Demikian surat permohonan ini beserta lampirannya saya buat dengan sebenarnya dan saya bertanggung jawab terhadap kebenaran isinya, untuk kiranya dapat dikabulkan.
          </p>

          <div className="grid grid-cols-2 text-center text-xs pt-10">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Kepala Desa {desa.desa}</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({desa.namaKepalaDesa})</p>
              <p className="text-[10px] font-sans text-slate-500">NIP. {desa.nipKepalaDesa}</p>
            </div>
            <div>
              <p>&nbsp;</p>
              <p className="font-bold">Calon Pemohon,</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({recipient.nama})</p>
              <p className="text-[10px] font-sans text-slate-500">NIK. {recipient.nik}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. LAMPIRAN KTP KK */}
      {state.selectedFormat === 'LAMPIRAN_KTP_KK' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-sm tracking-wide">LAMPIRAN FOTO IDENTITAS</div>
          <div className="text-center font-bold text-sm uppercase mb-4">
            LAMPIRAN SCAN FOTO KTP & KARTU KELUARGA (KK) PENERIMA
          </div>

          <div className="space-y-6 pt-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-350 p-6 flex flex-col items-center justify-center h-48 bg-slate-50 text-center rounded-lg">
                <div className="text-3xl font-mono text-slate-300 font-bold mb-2">FOTO KTP DEPAN</div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Nama: <strong>{recipient.nama}</strong><br/>
                  NIK: <strong>{recipient.nik}</strong>
                </p>
                <div className="mt-3 text-[10px] bg-slate-200 text-slate-600 px-2.5 py-1 rounded">
                  Pas Foto Terlampir / Unggah KTP
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-355 p-6 flex flex-col items-center justify-center h-48 bg-slate-50 text-center rounded-lg">
                <div className="text-3xl font-mono text-slate-300 font-bold mb-2">FOTO KTP BELAKANG</div>
                <p className="text-[11px] text-slate-500 font-sans">
                  Sisi tanda tangan & masa berlaku seumur hidup
                </p>
                <div className="mt-3 text-[10px] bg-slate-200 text-slate-600 px-2.5 py-1 rounded">
                  Pas Foto Terlampir / Unggah KTP
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-350 p-10 flex flex-col items-center justify-center h-72 bg-slate-55 text-center rounded-lg">
              <div className="text-3xl font-mono text-slate-300 font-bold mb-2">FOTO KARTU KELUARGA</div>
              <p className="text-[11px] text-slate-500 font-sans mb-1">
                Kabupaten: <strong>{recipient.kabupaten}</strong> | Desa: <strong>{recipient.desa}</strong>
              </p>
              <p className="text-[10px] text-slate-400 font-sans max-w-sm">
                Pastikan baris nama kepala keluarga dan stempel Dinas Kependudukan dan Catatan Sipil Bima terlihat jelas dan terbaca.
              </p>
              <div className="mt-4 text-[10px] bg-emerald-600 text-white px-4 py-1.5 rounded font-sans font-semibold">
                Kartu Keluarga Terverifikasi
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FORMAT II-20 */}
      {state.selectedFormat === 'FORMAT_II_20' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-sm tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm underline uppercase tracking-wide">
            SURAT PERNYATAAN PENGHASILAN
          </div>
          <p className="text-justify text-xs leading-relaxed pt-3">
            Saya yang bertanda tangan di bawah ini :
          </p>
          <table className="w-full text-xs font-serif pl-4 space-y-2">
            <tbody>
              <tr><td className="w-32 py-1">Nama</td><td className="w-4">:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td className="py-1">NIK</td><td>:</td><td className="font-mono">{recipient.nik}</td></tr>
              <tr><td className="py-1">Umur</td><td>:</td><td>{recipient.umur} Tahun</td></tr>
              <tr><td className="py-1">Pekerjaan</td><td>:</td><td>{recipient.pekerjaan}</td></tr>
              <tr><td className="py-1">Alamat</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed pt-2">
            Dengan ini menyatakan dan menerangkan bahwa penghasilan keluarga saya rata-rata sebesar <strong>Rp. 1.500.000,-</strong> (Satu Juta Lima Ratus Ribu Rupiah) per bulan, sementara besaran Upah Minimum Kabupaten (UMK) Bima sebesar <strong>Rp. 2.767.580,-</strong> dan besaran Upah Minimum Provinsi (UMP) Nusa Tenggara Barat sebesar <strong>Rp. 2.673.861,-</strong>.
          </p>

          <p className="text-justify text-xs leading-relaxed">
            Surat pernyataan ini saya buat untuk melengkapi administrasi dalam pengusulan Bantuan Stimulan Perumahan Swadaya (BSPS) Tahun Anggaran {project.tahunAnggaran}.
          </p>

          <p className="text-justify text-xs leading-relaxed">
            Demikian surat pernyataan ini saya buat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya.
          </p>

          <div className="grid grid-cols-2 text-center text-xs pt-16">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Kepala Desa {desa.desa}</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({desa.namaKepalaDesa})</p>
              <p className="text-[10px] font-sans text-slate-500">NIP. {desa.nipKepalaDesa}</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Yang membuat pernyataan,</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({recipient.nama})</p>
              <p className="text-[10px] font-sans text-slate-500">KCPB No. {recipient.nik}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. SURAT KETERANGAN TANAH DESA */}
      {state.selectedFormat === 'SURAT_KETERANGAN_TANAH_DESA' && (
        <div className="space-y-4">
          <div className="text-center font-bold tracking-wider font-sans border-b-4 border-double border-black pb-3">
            <div className="text-base uppercase">PEMERINTAH KABUPATEN BIMA</div>
            <div className="text-sm uppercase">KECAMATAN {desa.kecamatan.toUpperCase()}</div>
            <div className="text-lg uppercase font-black">KANTOR KEPALA DESA {desa.desa.toUpperCase()}</div>
            <div className="text-[10px] font-sans font-light italic text-slate-600">Alamat: {desa.alamatKantor}</div>
          </div>

          <div className="text-center font-bold text-xs uppercase pt-2">
            <div className="underline text-sm font-black">SURAT KETERANGAN KEPEMILIKAN / PENGUASAAN HAK ATAS TANAH</div>
            <div className="font-mono text-[11px] normal-case text-slate-600">Nomor: {customFields.noSuratKeteranganTanah || '.../.../Desa/2026'}</div>
          </div>

          <p className="text-justify text-xs leading-relaxed pt-2">
            Yang bertanda tangan di bawah ini :
          </p>
          <table className="w-full text-xs font-serif pl-4 space-y-1">
            <tbody>
              <tr><td className="w-32 py-1">Nama</td><td className="w-4">:</td><td className="font-bold">{desa.namaKepalaDesa}</td></tr>
              <tr><td className="py-1">Jabatan</td><td>:</td><td>Kepala Desa {desa.desa}</td></tr>
              <tr><td className="py-1">Alamat Kantor</td><td>:</td><td>{desa.alamatKantor}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed">
            Berdasarkan surat tanah Desa <em>(dapat dilampirkan Petuk D/Girik, leter C/pipil/Sertipikat Tanah *)</em>, Kecamatan {desa.kecamatan}, Kabupaten {desa.kabupaten}, Provinsi {desa.provinsi}, dengan ini menerangkan bahwa:
          </p>

          <ol className="list-decimal pl-6 space-y-2.5 text-xs">
            <li>
              Sebidang tanah milik / dikuasai <strong>{recipient.nama}</strong>, berupa tanah kering seluas <strong>250 m²</strong> dengan batas-batas:
              <table className="w-full text-xs font-mono my-1 text-slate-700 bg-slate-50 p-1 border rounded">
                <tbody>
                  <tr><td className="w-20">Utara</td><td>: Tanah Milik {customFields.namaWargaSaksi1 || 'Hasanuddin'}</td></tr>
                  <tr><td>Timur</td><td>: Gang/Jalan Lingkungan Dusun</td></tr>
                  <tr><td>Selatan</td><td>: Tanah Milik {customFields.namaWargaSaksi2 || 'Burhanuddin'}</td></tr>
                  <tr><td>Barat</td><td>: Saluran Air Desa</td></tr>
                </tbody>
              </table>
              Sungguh-sungguh adalah hak milik dari / dikuasai oleh: <strong className="underline font-sans">{recipient.nama}</strong>, alamat {recipient.alamatSecaraLengkap}, Desa {desa.desa}, Kecamatan {desa.kecamatan}, Kabupaten {desa.kabupaten}, Provinsi {desa.provinsi}.
            </li>
            <li>Pemilik / penguasa tanah tersebut adalah Warga Negara Indonesia, pekerjaan {recipient.pekerjaan}.</li>
            <li>Tanah tersebut adalah benar atas nama <strong className="font-serif">{recipient.nama}</strong> dan tidak menjadi perselisihan dengan pihak lain, baik mengenai haknya maupun batas-batasnya.</li>
            <li>Tanah tersebut digunakan khusus untuk pembangunan perumahan bagi keluarga penerima BSPS.</li>
          </ol>

          <p className="text-justify text-xs leading-relaxed">
            Demikian surat keterangan ini saya buat dengan sebenar-benarnya untuk dipergunakan sebagai kelengkapan administrasi BSPS.
          </p>

          <div className="flex justify-end text-center text-xs pt-12">
            <div className="w-64">
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Kepala Desa {desa.desa}</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({desa.namaKepalaDesa})</p>
              <p className="text-[10px] font-sans text-slate-500">NIP. {desa.nipKepalaDesa}</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. SURAT PERNYATAAN TANAH PENERIMA */}
      {state.selectedFormat === 'SURAT_PERNYATAAN_TANAH_PENERIMA' && (
        <div className="space-y-4">
          <div className="text-center font-bold text-sm uppercase border-b border-slate-300 pb-2">
            SURAT PERNYATAAN PENGUASAAN HAK ATAS TANAH<br/>
            CALON PENERIMA BANTUAN PROGRAM BSPS
          </div>

          <p className="text-justify text-xs leading-relaxed pt-2">
            Yang bertanda tangan di bawah ini :
          </p>
          <table className="w-full text-xs font-serif pl-4">
            <tbody>
              <tr><td className="w-32 py-1">Nama</td><td className="w-4">:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td className="py-1">NIK</td><td>:</td><td className="font-mono">{recipient.nik}</td></tr>
              <tr><td className="py-1">Tempat/Tgl Lahir</td><td>:</td><td>Bima, 25 Mei 1991</td></tr>
              <tr><td className="py-1">Alamat</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed pt-2">
            Dengan ini menyatakan bahwa saya menempati sebidang tanah yang dimiliki/dikuasai sebagai berikut:
          </p>
          <table className="w-full text-xs font-serif pl-4 space-y-1">
            <tbody>
              <tr><td className="w-32">Luas Tanah</td><td>:</td><td><strong>250 m²</strong></td></tr>
              <tr><td>Batas Utara</td><td>:</td><td>Tanah Milik {customFields.namaWargaSaksi1 || 'Hasanuddin'}</td></tr>
              <tr><td>Batas Timur</td><td>:</td><td>Gang/Jalan Desa</td></tr>
              <tr><td>Batas Selatan</td><td>:</td><td>Tanah Milik {customFields.namaWargaSaksi2 || 'Burhanuddin'}</td></tr>
              <tr><td>Batas Barat</td><td>:</td><td>Saluran Air Desa</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed">
            Tanah tersebut hingga dengan saat ini tidak menjadi sengketa dengan pihak lain baik mengenai kepemilikannya maupun batas-batasnya dan berhak menempati tanah tersebut selama sekurang-kurangnya hingga <strong>10 (sepuluh) tahun</strong> setelah selesai pekerjaan fisik BSPS {project.tahunAnggaran}.
          </p>

          <p className="text-justify text-xs leading-relaxed">
            Pernyataan ini dibuat dengan kesadaran penuh tanpa tekanan pihak manapun dan disaksikan oleh keluarga dekat beserta saksi-saksi dari tetangga sebelah.
          </p>

          <div className="grid grid-cols-2 text-center text-xs pt-12 gap-y-6">
            <div>
              <p className="font-bold mb-4">Saksi-saksi Tetangga</p>
              <div className="flex justify-around">
                <div>
                  <p>Saksi 1</p>
                  <div className="h-10"></div>
                  <p className="font-bold text-slate-705">({customFields.namaWargaSaksi1 || 'Hasanuddin S.Sos'})</p>
                </div>
                <div>
                  <p>Saksi 2</p>
                  <div className="h-10"></div>
                  <p className="font-bold">({customFields.namaWargaSaksi2 || 'Burhanuddin HM'})</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold mb-4">Diketahui Keluarga</p>
              <div className="flex justify-around">
                <div>
                  <p>Keluarga 1</p>
                  <div className="h-10"></div>
                  <p className="font-bold">({customFields.hubunganKeluarga1 || 'Paman (Hamid)'})</p>
                </div>
                <div>
                  <p>Keluarga 2</p>
                  <div className="h-10"></div>
                  <p className="font-bold">({customFields.hubunganKeluarga2 || 'Saudara (Syarifah)'})</p>
                </div>
              </div>
            </div>

            <div className="col-span-2 text-center pt-5">
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Calon Penerima Bantuan (Pembuat Pernyataan),</p>
              <div className="h-14"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. FORMAT II-22 */}
      {state.selectedFormat === 'FORMAT_II_22' && (
        <div className="space-y-3.5">
          <div className="text-right font-bold text-sm tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm underline uppercase tracking-wide">
            SURAT PERNYATAAN MENGIKUTI PROGRAM BSPS
          </div>

          <table className="w-full text-xs font-serif pl-4">
            <tbody>
              <tr><td className="w-32 py-0.5">Nama</td><td className="w-4">:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td className="py-0.5">Umur</td><td>:</td><td>{recipient.umur} Tahun</td></tr>
              <tr><td className="py-0.5">Pekerjaan</td><td>:</td><td>{recipient.pekerjaan}</td></tr>
              <tr><td className="py-0.5">Alamat</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
              <tr><td className="py-0.5"></td><td></td><td>Desa {recipient.desa}, Kecamatan {recipient.kecamatan}, Kabupaten {recipient.kabupaten}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-tight">
            Dengan ini menyatakan bahwa saya menyetujui dan bersedia mematuhi seluruh ketentuan program BSPS sebagai berikut:
          </p>

          <ol className="list-decimal pl-6 space-y-1 text-[10px] text-justify leading-tight">
            <li>Memiliki keterbatasan daya beli karena berpenghasilan rendah;</li>
            <li>Memiliki tanah / menguasai tanah *) dengan bukti legal dan tidak dalam status sengketa;</li>
            <li>Memiliki dan menempati rumah satu-satunya dengan kondisi tidak layak huni minimal 3 (tiga) tahun terakhir;</li>
            <li>Belum pernah memperoleh program bantuan pembangunan rumah swadaya dan program kemudahan bantuan pembiayaan perumahan bagi MBR dalam 10 tahun terakhir;</li>
            <li>Bersedia mengikuti ketentuan program dan tidak mengundurkan diri secara sepihak;</li>
            <li>Bersedia menerima dan akan menggunakan dana bantuan sesuai ketentuan serta sanggup menyelesaikan peningkatan kualitas rumah sesuai dengan rencana teknis dan Rencana Anggaran Biaya (RAB) sehingga menjadi layak huni dalam tahun anggaran berjalan;</li>
            <li>Akan menghuni sendiri rumah yang telah dibangun/ditingkatkan kualitasnya melalui BSPS dan tidak akan memindahtangankannya kepada pihak lain tanpa alasan yang dapat dipertanggungjawabkan secara hukum;</li>
            <li>Bersedia diaudit oleh pihak yang berwenang terkait akuntabilitas pemanfaatan dana bantuan;</li>
            <li>Memberi kuasa kepada PPK swadaya atau pihak yang ditunjuk untuk melihat dan melakukan mutasi isi rekening bantuan;</li>
            <li>Bersedia menerima sanksi berupa pengembalian dana bantuan yang tidak saya manfaatkan sesuai ketentuan pelaksanaan kegiatan.</li>
          </ol>

          <p className="text-justify text-[10px] leading-tight pt-1">
            Demikian surat pernyataan ini saya buat dengan sebenarnya, saya bersedia dituntut di hadapan hukum sesuai peraturan perundangan-undangan yang berlaku jika melanggar ketentuan di atas.
          </p>

          <div className="grid grid-cols-2 text-center text-xs pt-8">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Kepala Desa {desa.desa}</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({desa.namaKepalaDesa})</p>
              <p className="text-[10px] font-sans text-slate-500">NIP. {desa.nipKepalaDesa}</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Yang menyatakan,</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({recipient.nama})</p>
              <p className="text-[10px] font-sans text-slate-500">NIK. {recipient.nik}</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. FORMAT II-12 IDENTIFIKASI KESWADAYAAN */}
      {state.selectedFormat === 'FORMAT_II_12' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-sm tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline tracking-wider">
            LAPORAN IDENTIFIKASI KESWADAYAAN CALON PENERIMA BANTUAN
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1 text-xs">
            <div>
              <table className="w-full font-serif border-collapse">
                <tbody>
                  <tr><td className="w-24">Nomor BNBA</td><td className="w-2">:</td><td className="font-mono">BNBA-100231-{recipient.nik.slice(-4)}</td></tr>
                  <tr><td>Nama CPB</td><td>:</td><td className="font-bold">{recipient.nama}</td></tr>
                  <tr><td>NIK</td><td>:</td><td className="font-mono">{recipient.nik}</td></tr>
                  <tr><td>Alamat CPB</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="w-full font-serif border-collapse">
                <tbody>
                  <tr><td className="w-24">Desa</td><td className="w-2">:</td><td>{recipient.desa}</td></tr>
                  <tr><td>Kecamatan</td><td>:</td><td>{recipient.kecamatan}</td></tr>
                  <tr><td>Kabupaten</td><td>:</td><td>{recipient.kabupaten}</td></tr>
                  <tr><td>Provinsi</td><td>:</td><td>{recipient.provinsi}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-black p-3 space-y-3 bg-slate-50/50 rounded">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide block border-b border-slate-350 pb-1">Analisis Potensi Swadaya Finansial & Kerja</span>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-300 p-2 bg-white rounded">
                <span className="font-bold text-emerald-800 text-[10px] block mb-1">1. Swadaya Keuangan Mandiri</span>
                <p className="text-[11px] leading-relaxed">
                  Bentuk: <strong>Uang Tabungan Pribadi</strong><br/>
                  Besaran Nilai: <strong className="text-slate-800">{recipient.jumlahSwadayaUang}</strong>
                </p>
              </div>
              <div className="border border-slate-300 p-2 bg-white rounded">
                <span className="font-bold text-emerald-800 text-[10px] block mb-1">2. Swadaya Material Lokalan</span>
                <p className="text-[11px] leading-relaxed">
                  Bentuk: <strong>{recipient.bentukSwadayaBarang}</strong><br/>
                  Ketersediaan: <strong>Sudah di Lokasi Pekerjaan</strong>
                </p>
              </div>
            </div>
            
            <div className="border border-slate-300 p-2.5 bg-white rounded">
              <span className="font-bold text-emerald-800 text-[10px] block mb-1.5">3. Bentuk Keswadayaan Gotong Royong / Bantuan Keluarga</span>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-sans">
                <div className="bg-slate-100 p-1.5 rounded">
                  <p className="font-semibold block text-slate-600 border-b border-slate-200 pb-0.5">Dukungan Keluarga</p>
                  <p className="text-emerald-700 font-bold mt-1">Sedia Membantu</p>
                </div>
                <div className="bg-slate-100 p-1.5 rounded">
                  <p className="font-semibold block text-slate-600 border-b border-slate-200 pb-0.5">Gotong Royong KCPB</p>
                  <p className="text-emerald-700 font-bold mt-1">4-5 Orang / Hari</p>
                </div>
                <div className="bg-slate-100 p-1.5 rounded">
                  <p className="font-semibold block text-slate-600 border-b border-slate-200 pb-0.5">Gotong Royong Warga</p>
                  <p className="text-emerald-700 font-bold mt-1">Sesuai Rembuk</p>
                </div>
                <div className="bg-slate-100 p-1.5 rounded">
                  <p className="font-semibold block text-slate-600 border-b border-slate-200 pb-0.5">Dukungan Lainnya</p>
                  <p className="text-slate-500 mt-1">Konsumsi Gotroy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 h-40">
            <div className="border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-3 text-center bg-slate-50">
              <span className="text-[11px] font-bold text-slate-500 font-sans">LAMPIRAN FOTO SWADAYA (1)</span>
              <span className="text-[9px] text-slate-400 font-sans mt-1">Tumpukan Kayu Lokal / Tabungan Buku Rekening</span>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-3 text-center bg-slate-50">
              <span className="text-[11px] font-bold text-slate-500 font-sans">LAMPIRAN FOTO SWADAYA (2)</span>
              <span className="text-[9px] text-slate-400 font-sans mt-1">Tumpukan Batu Kali / Pasir Swadaya</span>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center text-[11px] pt-4">
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Facilitator Lapangan</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Mengetahui dan menyetujui,</p>
              <p className="font-bold">Kepala Desa {desa.desa}</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({desa.namaKepalaDesa})</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Dibuat oleh, CPB</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      )}

      {/* 8. PAKTA INTEGRITAS KEPALA DESA */}
      {state.selectedFormat === 'PAKTA_INTEGRITAS' && (
        <div className="space-y-4">
          <div className="text-center font-bold font-sans border-b-2 border-black pb-2">
            <div className="text-sm uppercase tracking-wide">PAKTA INTEGRITAS KEPALA DESA / LURAH</div>
            <div className="text-xs uppercase tracking-normal">PROGRAM BANTUAN STIMULAN PERUMAHAN SWADAYA (BSPS) TAHUN {project.tahunAnggaran}</div>
          </div>

          <p className="text-justify text-xs leading-relaxed pt-2">
            Yang bertanda tangan di bawah ini :
          </p>
          <table className="w-full text-xs font-serif pl-4 space-y-1">
            <tbody>
              <tr><td className="w-32 py-1">Nama</td><td className="w-4">:</td><td className="font-bold">{desa.namaKepalaDesa}</td></tr>
              <tr><td className="py-1">Jabatan</td><td>:</td><td>Kepala Desa {desa.desa}, Kecamatan {desa.kecamatan}</td></tr>
              <tr><td className="py-1">Alamat Kantor</td><td>:</td><td>{desa.alamatKantor}, Kabupaten {desa.kabupaten}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed font-sans font-medium text-slate-800 bg-slate-50 p-2 rounded">
            Dalam rangka mendukung pelaksanaan Program Bantuan Stimulan Perumahan Swadaya (BSPS) di wilayah Kabupaten Bima, dengan ini menyatakan komitmen penuh sebagai berikut:
          </p>

          <ol className="list-decimal pl-6 space-y-2 text-xs text-justify">
            <li>Tidak akan melakukan, bersedia menghindari, serta menolak segala bentuk praktek Korupsi, Kolusi, dan Nepotisme (KKN) dalam seluruh alokasi BSPS;</li>
            <li>Berperan secara pro-aktif dalam upaya pencegahan dan pemberantasan korupsi, kolusi, dan nepotisme;</li>
            <li>Tidak memungut biaya dalam bentuk apapun kepada masyarakat penerima manfaat BSPS di luar dari ketentuan tertulis resmi yang berlaku dalam kementerian;</li>
            <li>Bersikap transparan, obyektif, jujur, adil, dan akuntabel dalam melaksanakan tugas verifikasi serta penetapan rekomendasi;</li>
            <li>Bertanggung jawab penuh atas keabsahan, kebenaran informasi, dan kelayakan usulan calon penerima bantuan yang direkomendasikan;</li>
            <li>Membantu menciptakan kondisi sosial kemasyarakatan yang kondusif selama masa pelaksanaan konstruksi fisik rumah swadaya; dan</li>
            <li>Apabila melanggar hal-hal yang dinyatakan dalam pakta integritas ini, bersedia dituntut di hadapan hukum secara tuntas dan menerima sanksi administrasi maupun hukum sesuai peraturan undang-undang yang berlaku.</li>
          </ol>

          <div className="grid grid-cols-2 text-center text-xs pt-16">
            <div>
              <p>&nbsp;</p>
              <p>Mengetahui,</p>
              <p className="font-bold">Camat {desa.kecamatan}</p>
              <div className="h-16"></div>
              <p className="font-bold underline">(.......................................)</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Kepala Desa {desa.desa} (Yang Membuat),</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({desa.namaKepalaDesa})</p>
              <p className="text-[10px] text-slate-500 font-sans">NIP. {desa.nipKepalaDesa}</p>
            </div>
          </div>
        </div>
      )}

      {/* 9. FORMAT II-6 BERITA ACARA PEMBENTUKAN KPB */}
      {state.selectedFormat === 'FORMAT_II_6' && (
        <div className="space-y-3">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline">
            BERITA ACARA KESEPAKATAN PEMBENTUKAN KELOMPOK PENERIMA BANTUAN (KPB)<br/>
            PEKERJAAN FISIK REHABILITASI RUMAH BSPS TAHUN {project.tahunAnggaran}
          </div>

          <table className="w-full text-xs font-serif italic bg-slate-55 p-2 border rounded border-slate-200">
            <tbody>
              <tr><td className="w-24">DESA</td><td>: {kpb.desa.toUpperCase()}</td><td className="w-24">KABUPATEN</td><td>: {recipient.kabupaten.toUpperCase()}</td></tr>
              <tr><td>KECAMATAN</td><td>: {kpb.kecamatan.toUpperCase()}</td><td>PROVINSI</td><td>: {recipient.provinsi.toUpperCase()}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed">
            Pada hari ini <strong>{project.tanggalRembuk.split(',')[0]}</strong> tanggal <strong>{project.tanggalRembuk.split(',')[1] || '10 Februari 2026'}</strong> bertempat di <strong>{project.tempatRembuk}</strong> telah dilaksanakan Rembuk Warga yang dihadiri oleh warga calon penerima bantuan sebanyak <strong>{project.pesertaRembuk}</strong> orang <em>(daftar hadir terlampir)</em>, dengan hasil mufakat sebagai berikut:
          </p>

          <ol className="list-decimal pl-6 space-y-2 text-xs">
            <li>
              Membentuk Kelompok Penerima Bantuan Stimulan Perumahan Swadaya yang selanjutnya disebut <strong>{kpb.namaKpb}</strong>, dengan susunan kepengurusan luhur sebagai berikut:
              <table className="w-full text-xs border border-black my-2 text-center text-slate-800">
                <thead>
                  <tr className="bg-slate-100 font-bold border-b border-black">
                    <th className="py-1 border-r border-black w-10">No</th>
                    <th className="py-1 border-r border-black">Nama Lengkap</th>
                    <th className="py-1 border-r border-black">Alamat</th>
                    <th className="py-1">Struktur Kelompok</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black">
                    <td className="py-1 border-r border-black">1</td>
                    <td className="py-1 border-r border-black font-semibold text-left pl-2">{kpb.ketua}</td>
                    <td className="py-1 border-r border-black text-left pl-2">{recipient.alamatSecaraLengkap}</td>
                    <td className="py-1 text-center font-bold">Ketua merangkap Anggota</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="py-1 border-r border-black">2</td>
                    <td className="py-1 border-r border-black font-semibold text-left pl-2">{kpb.sekretaris}</td>
                    <td className="py-1 border-r border-black text-left pl-2">RT. 02 RW. 02 Dusun Sinar Baru</td>
                    <td className="py-1 text-center">Sekretaris merangkap Anggota</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="py-1 border-r border-black">3</td>
                    <td className="py-1 border-r border-black font-semibold text-left pl-2">{kpb.bendahara}</td>
                    <td className="py-1 border-r border-black text-left pl-2">RT. 05 RW. 02 Dusun Sinar Baru</td>
                    <td className="py-1 text-center">Bendahara merangkap Anggota</td>
                  </tr>
                  {kpb.anggota.slice(3, 7).map((ang, i) => (
                    <tr key={i} className="border-b border-black">
                      <td className="py-0.5 border-r border-black">{i + 4}</td>
                      <td className="py-0.5 border-r border-black text-left pl-2">{ang}</td>
                      <td className="py-0.5 border-r border-black text-left pl-2">Dusun Sinar Baru</td>
                      <td className="py-0.5">Anggota KPB</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
            <li>Nama-nama anggota kelompok KPB sebagaimana tercantum diperoleh dari hasil verifikasi lapangan dan kesepakatan seluruh warga calon penerima bantuan.</li>
            <li>Seluruh anggota KPB sepakat mempercayakan Tenaga Fasilitator Lapangan (TFL) dan Tokoh Masyarakat untuk mendampingi penyusunan proposal teknis.</li>
          </ol>

          <div className="grid grid-cols-2 text-center text-xs pt-8">
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Ketua Kelompok Calon Penerima Bantuan,</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
          </div>
        </div>
      )}

      {/* 10. FORMAT II-10 BA SOSIALISASI / REMBUK WARGA */}
      {state.selectedFormat === 'FORMAT_II_10' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline">
            BERITA ACARA PERTEMUAN SOSIALISASI DAN PENYULUHAN / REMBUK WARGA<br/>
            DALAM RANGKA PROGRAM BANTUAN STIMULAN PERUMAHAN SWADAYA (BSPS) TAHUN {project.tahunAnggaran}
          </div>

          <table className="w-full text-xs font-serif border rounded p-2 bg-slate-50">
            <tbody>
              <tr><td className="w-32 py-0.5">DESA / KELURAHAN</td><td>: {kpb.desa.toUpperCase()}</td></tr>
              <tr><td className="py-0.5">KECAMATAN</td><td>: {kpb.kecamatan.toUpperCase()}</td></tr>
              <tr><td className="py-0.5">KABUPATEN</td><td>: {recipient.kabupaten.toUpperCase()}</td></tr>
              <tr><td className="py-0.5">PROVINSI</td><td>: {recipient.provinsi.toUpperCase()}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed">
            Pada hari ini <strong>{project.tanggalRembuk.split(',')[0]}</strong>, tanggal <strong>{project.tanggalRembuk.split(',')[1] || '10 Februari 2026'}</strong> bertempat di <strong>{project.tempatRembuk}</strong>, telah dilaksanakan Pertemuan Sosialisasi dan Penyuluhan Swadaya serta Rembuk Warga yang dihadiri oleh peserta sebanyak <strong>{project.pesertaRembuk}</strong> orang <em>(daftar hadir terlampir)</em>.
          </p>

          <div className="border border-black p-3 space-y-2 bg-white rounded">
            <span className="font-bold text-xs uppercase block border-b pb-1">Hasil Pertemuan Sosialisasi & Rembuk:</span>
            <ul className="list-disc pl-5 text-xs space-y-1">
              <li>Penyebaran informasi juknis BSPS {project.tahunAnggaran} mencakup hak, kewajiban, ketentuan non-tunai, dan dilarang pungli.</li>
              <li>Penyepakatan daftar Calon Penerima Bantuan (CPB) tingkat dusun di Desa {desa.desa} sejumlah <strong>10 Unit Penerima</strong>.</li>
              <li>Membentuk kepengurusan Kelompok Penerima Bantuan (KPB) bernama <strong>{kpb.namaKpb}</strong> dipimpin oleh Bapak <strong>{kpb.ketua}</strong>.</li>
              <li>Menyepakati penunjukan Toko Bahan Bangunan melalui mekanisme Pemilihan Terbuka Toko (PTT) untuk menjamin akurasi dan harga material terendah.</li>
            </ul>
          </div>

          <p className="text-justify text-xs leading-relaxed">
            Berita acara ini dibuat dalam 3 (tiga) rangkap untuk dipergunakan sebagaimana mestinya dan dijadikan pedoman penyusunan administrasi BSPS tingkat desa.
          </p>

          <div className="grid grid-cols-2 text-center text-xs pt-16">
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalRembuk.split(',')[1] || '10 Februari 2026'}</p>
              <p className="font-bold">Kepala Desa {desa.desa},</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({desa.namaKepalaDesa})</p>
              <p className="text-[10px] text-slate-500 font-sans">NIP. {desa.nipKepalaDesa}</p>
            </div>
          </div>
        </div>
      )}

      {/* 11. DAFTAR HADIR REMBUK WARGA */}
      {state.selectedFormat === 'DAFTAR_HADIR_REMBUK' && (
        <div className="space-y-4">
          <div className="text-center font-bold text-sm uppercase border-b-2 border-black pb-2">
            DAFTAR HADIR PERTEMUAN SOSIALISASI DAN REMBUK WARGA BSPS TAHUN {project.tahunAnggaran}
          </div>

          <div className="grid grid-cols-2 text-xs bg-slate-50 p-2 border rounded gap-y-2">
            <div>Desa / Kelurahan: <strong>{desa.desa}</strong></div>
            <div>Hari / Tanggal: <strong>{project.tanggalRembuk || 'Senin, 10 Februari 2026'}</strong></div>
            <div>Kecamatan: <strong>{desa.kecamatan}</strong></div>
            <div>Tempat Rapat: <strong>{project.tempatRembuk}</strong></div>
            <div>Kabupaten: <strong>{desa.kabupaten}</strong></div>
            <div>Acara: <strong>Sosialisasi & Rembuk KPB</strong></div>
          </div>

          <table className="w-full text-xs border border-slate-400 text-center text-slate-800">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-400">
                <th className="py-1.5 border-r border-slate-400 w-10">No</th>
                <th className="py-1.5 border-r border-slate-400">Nama Lengkap</th>
                <th className="py-1.5 border-r border-slate-400">Jabatan / Unsur</th>
                <th className="py-1.5 border-r border-slate-400">Alamat Lengkap</th>
                <th className="py-1.5 w-32">Tanda Tangan</th>
              </tr>
            </thead>
            <tbody>
              {kpb.anggota.map((ang, i) => (
                <tr key={i} className="border-b border-slate-200">
                  <td className="py-1 border-r border-slate-200 font-mono text-[10px]">{i + 1}</td>
                  <td className="py-1 border-r border-slate-200 text-left pl-2 font-medium">{ang}</td>
                  <td className="py-1 border-r border-slate-200 text-left pl-2">{i === 0 ? 'Ketua (CPB)' : i === 1 ? 'Sekretaris (CPB)' : i === 2 ? 'Bendahara (CPB)' : 'Anggota KPB / CPB'}</td>
                  <td className="py-1 border-r border-slate-200 text-left pl-2">RT. 04 Rw. 02 Bolo</td>
                  <td className="py-1 text-left text-[9px] font-mono pl-3">
                    <span className="inline-block w-20 border-b border-dotted border-slate-400">{i + 1}. ....................</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 12. FORMAT II-17 BA HASIL KESEPAKATAN PEMILIHAN TOKO */}
      {state.selectedFormat === 'FORMAT_II_17' && (
        <div className="space-y-3.5">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline leading-tight">
            BERITA ACARA HASIL KESEPAKATAN PEMILIHAN TOKO / PENYEDIA BAHAN BANGUNAN<br/>
            DAN KOMPONEN BANGUNAN BSPS KABUPATEN BIMA
          </div>

          <p className="text-justify text-xs leading-relaxed">
            Pada hari ini <strong>{project.tanggalRembuk.split(',')[0]}</strong> tanggal <strong>{project.tanggalRembuk.split(',')[1] || '10 Februari 2026'}</strong> bertempat di <strong>{project.tempatRembuk}</strong>, berdasarkan hasil survei toko/penyedia bahan bangunan yang telah mendapat persetujuan PPK, dilaksanakan rembuk warga untuk menyepakati toko terpilih bagi kelompok <strong>{kpb.namaKpb}</strong>.
          </p>

          <p className="text-justify text-xs leading-relaxed">
            Berdasarkan hasil rembuk warga secara mufakat, Kelompok Penerima Bantuan bersepakat menunjuk :
          </p>

          <table className="w-full text-xs font-serif pl-4 space-y-1 bg-slate-50 p-2.5 border rounded">
            <tbody>
              <tr><td className="w-48 py-1">Nama Toko Bahan Terpilih</td><td className="w-4">:</td><td className="font-bold">{toko.namaToko}</td></tr>
              <tr><td className="py-1">Nama Pemilik Toko</td><td>:</td><td>{toko.pemilikToko}</td></tr>
              <tr><td className="py-1">NIK Pemilik / NPWP</td><td>:</td><td className="font-mono">{toko.nikPemilik} / {toko.npwpUsaha}</td></tr>
              <tr><td className="py-1">Alamat Kantor Toko</td><td>:</td><td>{toko.alamat}</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed">
            Untuk menyediakan bahan bangunan bagi seluruh anggota KPB sesuai kualitas standar SNI, harga terendah, dan kuantitas rencana dengan kelengkapan dokumen sah:
          </p>
          <ol className="list-decimal pl-6 space-y-1 text-xs">
            <li>SIUP Nomor: <strong>{toko.siupNomor}</strong> Tanggal: <strong>{toko.siupTanggal}</strong> serta SITU Nomor: <strong>{toko.situNomor}</strong>;</li>
            <li>Rekening Khusus kegiatan BSPS pada Bank Rakyat Indonesia dengan nomor rekening: <strong className="font-mono">{toko.noRekeningToko}</strong> atas nama {toko.namaToko}.</li>
          </ol>

          <p className="text-justify text-xs leading-relaxed">
            Demikian Berita Acara ini dibuat dengan sebenarnya dan ditandatangani untuk dipergunakan sebagaimana mestinya.
          </p>

          <div className="grid grid-cols-2 text-center text-xs pt-12 gap-y-6">
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-14"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Ketua KPB {kpb.namaKpb},</p>
              <div className="h-14"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>

            <div className="col-span-2 text-center pt-2">
              <p className="text-xs">Diketahui oleh,</p>
              <p className="font-bold">Ketua Tim Verifikasi & Pengawasan Kabupaten Bima</p>
              <div className="h-14"></div>
              <p className="font-bold underline">(............................................................)</p>
              <p className="text-[10px] text-slate-500">NIP. 19801102 200803 1004</p>
            </div>
          </div>
        </div>
      )}

      {/* 13. FORMAT II-30 DRPB (DAFTAR RENCANA PEMANFAATAN BANTUAN) */}
      {state.selectedFormat === 'FORMAT_II_30' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline">
            DAFTAR RENCANA PEMANFAATAN BANTUAN (DRPB) JALUR MATERIAL BSPS
          </div>

          <div className="grid grid-cols-2 text-[10px] bg-slate-50 p-2.5 border rounded gap-x-4 gap-y-1 font-serif">
            <div>Nomor BNBA: <strong className="font-mono">BNBA-520608-{recipient.nik.slice(-4)}</strong></div>
            <div>Desa/Kelurahan: <strong>{recipient.desa}</strong></div>
            <div>Nama Penerima: <strong>{recipient.nama}</strong></div>
            <div>Kecamatan: <strong>{recipient.kecamatan}</strong></div>
            <div>NIK Penerima: <strong className="font-mono">{recipient.nik}</strong></div>
            <div>Kabupaten/Kota: <strong>{recipient.kabupaten}</strong></div>
            <div>No. Rekening: <strong className="font-mono">{recipient.noRekening}</strong></div>
            <div>Provinsi: <strong>{recipient.provinsi}</strong></div>
          </div>

          <span className="text-[10px] font-bold text-slate-800 uppercase block mt-2">A. Pembelian Bahan Bangunan melalui Toko Penyedia ({customFields.tahapPencairan || 'Tahap I'}):</span>

          <table className="w-full text-[10px] border border-black text-center text-slate-800">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <th className="py-1 border-r border-black w-8">No</th>
                <th className="py-1 border-r border-black text-left pl-1">Jenis Bahan Bangunan</th>
                <th className="py-1 border-r border-black w-16">Vol</th>
                <th className="py-1 border-r border-black w-14">Satuan</th>
                <th className="py-1 border-r border-black w-24 text-right pr-1">Harga Satuan</th>
                <th className="py-1 text-right pr-1">Jumlah Harga</th>
              </tr>
            </thead>
            <tbody>
              {boqItems.slice(0, 8).map((item, i) => (
                <tr key={i} className="border-b border-black">
                  <td className="py-0.5 border-r border-black font-mono">{i + 1}</td>
                  <td className="py-0.5 border-r border-black text-left pl-1">{item.namaBarang}</td>
                  <td className="py-0.5 border-r border-black">{item.volume}</td>
                  <td className="py-0.5 border-r border-black">{item.satuan}</td>
                  <td className="py-0.5 border-r border-black text-right pr-1">{item.hargaSatuan.toLocaleString('id-ID')}</td>
                  <td className="py-0.5 text-right pr-1 font-mono">{item.jumlah.toLocaleString('id-ID')}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold border-t border-black">
                <td colSpan={5} className="py-1 border-r border-black text-right pr-2">TOTAL HARGA MATERIAL</td>
                <td className="py-1 text-right pr-1 font-mono text-emerald-800">{totalBahan.toLocaleString('id-ID')}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-[10px] leading-tight text-slate-600 font-sans mt-1">
            Terbilang: <em>"{formatTerbilang(totalBahan)}"</em>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3 text-[10px]">
            <div className="border p-2 rounded bg-slate-50/50">
              <span className="font-bold text-slate-700 block uppercase mb-0.5">B. Upah Kerja Tukang (Transfer Bank):</span>
              <p>Jumlah dana penarikan upah kerja PKRS: <strong>{formatRupiah(recipient.limitBantuanUpah)}</strong></p>
              <p className="italic text-slate-500">Terbilang: "Dua Juta Lima Ratus Ribu Rupiah"</p>
            </div>
            <div className="border p-2 rounded bg-slate-50/50">
              <span className="font-bold text-slate-700 block uppercase mb-0.5">C. Total Nilai Bantuan (A + B):</span>
              <p>Total Dana Ditarik: <strong className="text-emerald-700 text-xs">Rp 20.000.000,-</strong></p>
              <p className="italic text-slate-500">Terbilang: "Dua Puluh Juta Rupiah Sempurna"</p>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center text-[10px] pt-4 gap-y-6">
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Diverifikasi oleh,</p>
              <p className="font-bold">Tim Pendamping Provinsi NTB</p>
              <div className="h-10"></div>
              <p className="font-bold underline">(.............................................)</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Diajukan oleh, Penerima Bantuan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      )}

      {/* 14. FORMAT II-27 KUITANSI PENERIMAAN BANTUAN */}
      {state.selectedFormat === 'FORMAT_II_27' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-sm tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-base underline uppercase tracking-wide">
            KUITANSI PENERIMAAN BANTUAN STIMULAN REHABILITASI RUMAH
          </div>

          <table className="w-full text-xs font-serif pl-4 bg-slate-50 p-4 border rounded space-y-4">
            <tbody>
              <tr className="border-b border-slate-200 pb-2">
                <td className="w-48 py-2 font-bold text-slate-600">Sudah Terima dari</td>
                <td className="w-4">:</td>
                <td className="font-medium">Pejabat Pembuat Komitmen (PPK) Rumah Swadaya Satuan Kerja Perumahan & Kawasan Permukiman Provinsi NTB</td>
              </tr>
              <tr className="border-b border-slate-200 pb-2">
                <td className="py-2 font-bold text-slate-600">Jumlah Uang</td>
                <td>:</td>
                <td>
                  <span className="font-bold text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">Rp 20.000.000,-</span>
                  <div className="text-[10px] italic text-slate-500 mt-1">Terbilang: "Dua Puluh Juta Rupiah Seluruhnya"</div>
                </td>
              </tr>
              <tr className="border-b border-slate-200 pb-2">
                <td className="py-2 font-bold text-slate-600">Untuk Pembayaran</td>
                <td>:</td>
                <td className="leading-relaxed">
                  Bantuan Stimulan Perumahan Swadaya (BSPS) berupa Uang Non-Tunai guna Pembelian Bahan Bangunan senilai <strong>{formatRupiah(recipient.limitBantuanBahan)}</strong> dan Upah Kerja senilai <strong>{formatRupiah(recipient.limitBantuanUpah)}</strong> untuk perbaikan rumah tidak layak huni atas:
                  <div className="mt-1 font-sans text-[11px] text-slate-700 bg-white p-1.5 rounded border border-slate-200 font-medium">
                    Nama Penerima: <strong>{recipient.nama}</strong><br/>
                    NIK: <strong>{recipient.nik}</strong> | No. Rekening: <strong>{recipient.noRekening}</strong><br/>
                    Alamat: Desa <strong>{recipient.desa}</strong>, Kecamatan  <strong>{recipient.kecamatan}</strong>, Kabupaten Bima
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-xs pt-16">
            <div className="border border-slate-300 p-2 text-left rounded bg-slate-50 w-48">
              <span className="text-[9px] uppercase font-mono block text-slate-400">Nilai Sah</span>
              <span className="font-bold text-lg font-mono text-emerald-850">Rp 20.000.000</span>
            </div>
            <div>
              <p>Bima, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Penerima Manfaat / Penerima Bantuan (KPB),</p>
              <div className="h-16 flex items-center justify-center">
                <span className="border border-slate-400 p-1 text-[8px] uppercase tracking-wider font-mono text-slate-400">MATERAI TEMPELDILUC</span>
              </div>
              <p className="font-bold underline">({recipient.nama})</p>
              <p className="text-[10px]">No Rek. {recipient.noRekening}</p>
            </div>
          </div>
        </div>
      )}

      {/* 15. FORMAT II-39 KUITANSI UPAH KERJA */}
      {state.selectedFormat === 'FORMAT_II_39' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-sm tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-base underline uppercase tracking-wide">
            KUITANSI PEMBAYARAN UPAH KERJA TUKANG (TERMIN {customFields.tahapPencairan || 'TAHAP I'})
          </div>

          <table className="w-full text-xs font-serif pl-4 bg-slate-50 p-4 border rounded space-y-4">
            <tbody>
              <tr className="border-b border-slate-200 pb-2">
                <td className="w-48 py-2 font-bold text-slate-600">Sudah Terima dari</td>
                <td className="w-4">:</td>
                <td className="font-bold">{recipient.nama} <span className="text-[10px] font-normal italic text-slate-505">(Selaku Penerima Bantuan BSPS)</span></td>
              </tr>
              <tr className="border-b border-slate-200 pb-2">
                <td className="py-2 font-bold text-slate-600">Jumlah Uang</td>
                <td>:</td>
                <td>
                  <span className="font-bold text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                    {customFields.jumlahUpahDitarik || 'Rp 1.250.000'}
                  </span>
                  <div className="text-[10px] italic text-slate-500 mt-1">Terbilang: "Satu Juta Dua Ratus Lima Puluh Ribu Rupiah"</div>
                </td>
              </tr>
              <tr className="border-b border-slate-200 pb-2">
                <td className="py-2 font-bold text-slate-600">Untuk Pembayaran</td>
                <td>:</td>
                <td className="leading-relaxed">
                  Upah kerja tukang selama kurang lebih <strong>{customFields.jumlahHariUpah || '12'} hari</strong> untuk pengerjaan peningkatan kualitas rumah layak huni program BSPS {project.tahunAnggaran} di Desa <strong>{recipient.desa}</strong>, Kecamatan  <strong>{recipient.kecamatan}</strong>, Kabupaten Bima.
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-xs pt-16">
            <div>
              <p>Setuju Membayar,</p>
              <p className="font-bold">Penerima Bantuan (Pihak Kesatu),</p>
              <div className="h-16"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
            <div>
              <p>{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Yang Menerima Upah (Tukang / Pihak Kedua),</p>
              <div className="h-16 flex items-center justify-center">
                <span className="text-[8px] font-mono border text-slate-400 p-0.5 border-dashed">MATERAI 10000</span>
              </div>
              <p className="font-bold underline">({customFields.namaTukang1 || 'Ahmad M. Thoyib'})</p>
              <p className="text-[9px] font-mono text-slate-500">NIK Tukang. {customFields.nikTukang1 || '520608...'}</p>
            </div>
          </div>
        </div>
      )}

      {/* 16. ABSENSI PEKERJA */}
      {state.selectedFormat === 'ABSENSI_PEKERJA' && (
        <div className="space-y-4">
          <div className="text-center font-bold text-sm uppercase border-b-2 border-black pb-2">
            LAMPIRAN ABSENSI HARIAN PEKERJA / TUKANG REHAB RUMAH BSPS
          </div>

          <table className="w-full text-xs font-serif pl-4 space-y-1">
            <tbody>
              <tr><td className="w-48">Nama Penerima Bantuan</td><td>:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td>NIK Penerima / Alamat</td><td>:</td><td>{recipient.nik} | {recipient.alamatSecaraLengkap}</td></tr>
              <tr><td>Nama Tukang Utama (1)</td><td>:</td><td><strong>{customFields.namaTukang1 || 'Ahmad M. Thoyib'}</strong> (NIK {customFields.nikTukang1 || '520608...'})</td></tr>
              <tr><td>Nama Asisten Tukang (2)</td><td>:</td><td><strong>{customFields.namaTukang2 || 'Zainal Abidin'}</strong> (NIK {customFields.nikTukang2 || '520608...'})</td></tr>
            </tbody>
          </table>

          <table className="w-full text-[10px] border border-slate-400 text-center text-slate-800">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-400">
                <th className="py-1 border-r border-slate-400 w-12 col-span-1">Hari Ke</th>
                <th className="py-1 border-r border-slate-400 text-left pl-2">Hari / Tanggal</th>
                <th className="py-1 border-r border-slate-400 font-semibold w-24">Tukang 1 *)</th>
                <th className="py-1 font-semibold w-24">Tukang 2 *)</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 12, 25].map((hari, i) => (
                <tr key={hari} className="border-b border-slate-200">
                  <td className="py-0.5 border-r border-slate-200 font-mono text-[9px]">{hari}</td>
                  <td className="py-0.5 border-r border-slate-200 text-left pl-2">{hari === 25 ? 'Hari Terakhir Gunting Pita' : `Hari Kerja Ke-${hari}`}</td>
                  <td className="py-0.5 border-r border-slate-200 text-center font-mono">✔ Hadir</td>
                  <td className="py-0.5 text-center font-mono">{hari % 3 === 0 ? 'Absen' : '✔ Hadir'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan (TFL)</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Diawasi oleh,</p>
              <p className="font-bold">Penerima Bantuan (Pemilik Rumah)</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      )}

      {/* 17. FORMAT II-44 SPTJM (PERNYATAAN TANGGUNG JAWAB MUTLAK) */}
      {state.selectedFormat === 'FORMAT_II_44' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline">
            SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK (SPTJM) PEMBANTUAN FISIK
          </div>

          <div className="text-center font-semibold text-xs text-slate-705">
            PROVINSI: {recipient.provinsi.toUpperCase()} | KABUPATEN: {recipient.kabupaten.toUpperCase()} | TAHUN ANGGARAN: {project.tahunAnggaran}
          </div>

          <p className="text-justify text-xs leading-relaxed">
            Pada hari ini, tanggal <strong>{project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</strong>, saya yang bertanda tangan di bawah ini selaku penerima bantuan stimulan BSPS NTB menyatakan tanggung jawab mutlak:
          </p>

          <table className="w-full text-xs font-serif pl-4 bg-slate-50 p-2.5 border rounded">
            <tbody>
              <tr><td className="w-48 py-1">Nomor Surat SPTJM</td><td className="w-4">:</td><td className="font-mono font-bold">{customFields.noSuratSPTJM || 'BSPS-BIMA/SPTJM/098/2026'}</td></tr>
              <tr><td className="py-1">Nama Penerima Bantuan</td><td>:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td className="py-1">NIK / No Rekening</td><td>:</td><td className="font-mono">{recipient.nik} / {recipient.noRekening}</td></tr>
              <tr><td className="py-1">Alamat Konstruksi</td><td>:</td><td>Desa {recipient.desa}, Kecamatan {recipient.kecamatan}, Kabupaten Bima</td></tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-relaxed font-semibold text-slate-800">
            DENGAN INI MENYATAKAN:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-xs text-justify">
            <li>Sanggup bertanggung jawab penuh secara mutlak dan menyelesaikan pekerjaan rehabilitasi / pembangunan baru rumah swadaya hingga layak huni 100% sesuai target waktu kontrak;</li>
            <li>Seluruh pengadaan bahan material bangunan mengacu kepada ketentuan rencana teknis, standar SNI, dilarang menukar dengan material berkualitas rendah;</li>
            <li>Bersedia dituntut secara hukum pidana maupun perdata serta mengembalikan dana bantuan sejumlah 100% ke kas negara apabila terbukti menyalahgunakan dana bantuan BSPS untuk kebutuhan konsumtif pribadi.</li>
          </ol>

          <p className="text-justify text-xs leading-relaxed">
            Demikian surat pernyataan tanggung jawab mutlak ini diikrarkan untuk dipergunakan sebagaimana mestinya.
          </p>

          <div className="grid grid-cols-2 text-center text-xs pt-10 gap-y-6">
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Diketahui oleh,</p>
              <p className="font-bold">Pejabat Pembuat Komitmen (PPK)</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({project.namaPPK})</p>
            </div>
            <div>
              <p>Yang Membuat Pernyataan,</p>
              <p className="font-bold">Penerima Bantuan</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[8px] font-mono border border-dashed rounded px-1.5 py-0.5 text-slate-400">MATERAI Rp 10.000</span>
              </div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      )}

      {/* 18. FORMAT II-50 LAPORAN BULANAN TFL CHECKLIST & OUTLINE UTAMA */}
      {state.selectedFormat === 'FORMAT_II_50' && (() => {
        const rData = getMonthReportData(reportMonth);
        const membersList = (kpb.anggota && kpb.anggota.length > 0) ? kpb.anggota : [
          "Rahmat Subhan", "Budi Hartono", "Siti Rahmah", "Zulkifli", "Ahmad Dani", 
          "Suryani", "Eko Prasetyo", "Nurhadi", "Dewi Lestari", "Imron Rosyadi"
        ];

        const isChActive = (ch: string) => {
          return selectedChapter === 'all' || selectedChapter === ch;
        };

        return (
          <div className="space-y-6">
            {/* INTERACTIVE NAVIGATION CONTROL PANEL (HIDDEN ON PRINT) */}
            <div className="print:hidden border-4 border-black bg-stone-100 p-4 space-y-4 shadow-[4px_4px_0px_#000] text-[#1A1A1A]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2 text-[10px] font-mono font-black text-white bg-black uppercase">BSPS 2026</span>
                  <p className="text-xs font-mono font-bold">MODE PREVIEW LAPORAN BULANAN TFL</p>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <span className="text-xs font-mono font-black">OUTLINE RESMI KONTRAK</span>
                </div>
              </div>

              {/* MONTH SELECTION */}
              <div>
                <span className="text-[10px] font-mono font-black block mb-2 uppercase tracking-wider">📅 PILIH BULAN LAPORAN BERJALAN:</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const active = reportMonth === num;
                    return (
                      <button
                        key={num}
                        onClick={() => setReportMonth(num)}
                        className={`py-2 text-[10px] font-mono font-black uppercase border-2 border-black transition-all ${
                          active 
                            ? 'bg-yellow-400 text-black shadow-[2px_2px_0px_#000]' 
                            : 'bg-white hover:bg-stone-50'
                        }`}
                      >
                        Bulan {num === 1 ? 'I' : num === 2 ? 'II' : num === 3 ? 'III' : num === 4 ? 'IV' : 'V'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CHAPTER NAVIGATOR */}
              <div>
                <span className="text-[10px] font-mono font-black block mb-1.5 uppercase tracking-wider">📖 PILIH NAVIGASI BAB (EVALUASI OUTLINE):</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: 'all', label: '🖨️ LIHAT SEMUA BAB (COCOK PRINT)' },
                    { id: 'cover', label: 'Cover' },
                    { id: 'foreword', label: 'Kata Pengantar' },
                    { id: 'bab1', label: 'Bab I' },
                    { id: 'bab2', label: 'Bab II (Jarak)' },
                    { id: 'bab3', label: 'Bab III (Rencana)' },
                    { id: 'bab4', label: 'Bab IV (Realisasi & Fisik)' },
                    { id: 'bab5', label: 'Bab V (Penutup)' },
                    { id: 'lampiran', label: 'Lampiran' }
                  ].map((ch) => {
                    const active = selectedChapter === ch.id;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => setSelectedChapter(ch.id)}
                        className={`px-2 py-1.5 text-[9px] font-mono font-bold border border-black transition-all ${
                          active 
                            ? 'bg-black text-stone-100' 
                            : 'bg-stone-200/50 hover:bg-white text-stone-800'
                        }`}
                      >
                        {ch.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="text-[9.5px] font-mono text-stone-600 leading-snug">
                * Pilih <strong>LIHAT SEMUA BAB</strong> di atas sebelum menekan tombol Cetak/Print (Ctrl+P) untuk mencetak dokumen utuh laporan bulanan.
              </p>
            </div>

            {/* PRINT-READY REPORT CONTAINER */}
            <div className="font-serif text-[#1C1C1C] leading-relaxed select-text space-y-12">
              
              {/* PAGE 1: COVER (Jika Terpilih) */}
              {isChActive('cover') && (
                <div className="border border-slate-300 p-8 pt-16 min-h-[750px] flex flex-col justify-between items-center text-center bg-white shadow-sm relative overflow-hidden break-after-page">
                  <div className="space-y-3">
                    <div className="text-[10px] tracking-widest font-mono font-black border-2 border-black inline-block px-3 py-1 bg-amber-50 rounded">
                      LAPORAN BULANAN TFL - TA. {project.tahunAnggaran}
                    </div>
                    <h1 className="text-xl md:text-2xl font-black font-sans uppercase tracking-tight text-slate-900 leading-snug pt-4">
                      LAPORAN BULANAN TENAGA FASILITATOR LAPANGAN (TFL)
                    </h1>
                    <h2 className="text-sm md:text-md italic font-sans font-bold text-slate-600 mt-2">
                      PROGRAM BANTUAN STIMULAN PERUMAHAN SWADAYA (BSPS)
                    </h2>
                    <div className="w-1/3 h-1 border-t-2 border-b-2 border-black mx-auto my-4 mt-6"></div>
                    <p className="font-sans text-xs uppercase font-extrabold tracking-widest bg-slate-150 text-slate-800 px-3 py-1 inline-block">
                      LAPORAN BULANAN: PROGRES {rData.title}
                    </p>
                    <p className="font-mono text-xs font-bold block mt-2">PERIODE LAPORAN: {rData.periode.toUpperCase()}</p>
                  </div>

                  {/* Logo or Graphic Placeholder matching style */}
                  <div className="my-8 w-32 h-32 border-4 border-dashed border-black rounded-lg flex flex-col items-center justify-center p-4 bg-slate-50 relative">
                    <BookOpen size={48} className="text-black/80" />
                    <span className="text-[9px] font-mono font-black mt-2 text-center text-slate-500">DOKUMEN UTAMA</span>
                    <span className="absolute bottom-1 right-2 font-mono text-[7px]">BSPS 2026</span>
                  </div>

                  <div className="space-y-4 font-sans text-xs">
                    <div className="space-y-1">
                      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">Penyusun Laporan:</p>
                      <p className="font-bold text-sm underline text-slate-950 uppercase">{tfl.namaTfl}</p>
                      <p className="font-mono text-[9.5px]">Tenaga Fasilitator Lapangan (TFL) Fisik</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-lg border-2 border-black p-3 bg-stone-50 font-mono text-[9px] text-left mx-auto rounded">
                      <div>
                        <span className="font-bold block opacity-60">LOKASI DAMPINGAN:</span>
                        <span>Desa {desa.desa || recipient.desa}</span>
                      </div>
                      <div>
                        <span className="font-bold block opacity-60 font-mono">KELOMPOK KPB:</span>
                        <span>KPB {kpb.namaKpb}</span>
                      </div>
                      <div>
                        <span className="font-bold block opacity-60">KECAMATAN:</span>
                        <span>{desa.kecamatan || recipient.kecamatan}</span>
                      </div>
                      <div>
                        <span className="font-bold block opacity-60">KABUPATEN:</span>
                        <span>{desa.kabupaten || recipient.kabupaten} (NTB)</span>
                      </div>
                    </div>

                    <div className="pt-6 font-mono text-[9px] text-zinc-500 uppercase">
                      KEMENTERIAN PEKERJAAN UMUM DAN PERUMAHAN RAKYAT
                      <br />
                      BALAI PENYEDIAAN PERUMAHAN NUSA TENGGARA BARAT
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 2: KATA PENGANTAR & DAFTAR ISI */}
              {isChActive('foreword') && (
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-8">
                  {/* Kata Pengantar */}
                  <div className="space-y-4">
                    <h3 className="text-center font-sans font-black text-md uppercase tracking-wide border-b-2 border-black pb-2">KATA PENGANTAR</h3>
                    <p className="text-xs indent-8 leading-relaxed text-justify">
                      Puji syukur penulis panjatkan ke hadirat Allah SWT, karena atas limpahan rahmat dan karunia-Nya, penyusunan 
                      <strong> Laporan Bulanan Tenaga Fasilitator Lapangan (TFL) untuk {rData.periode}</strong> dalam program Bantuan Stimulan Perumahan Swadaya (BSPS) Tahun Anggaran {project.tahunAnggaran} ini dapat diselesaikan dengan baik sesuai target yang ditetapkan.
                    </p>
                    <p className="text-xs indent-8 leading-relaxed text-justify">
                      Laporan bulanan ini disusun sebagai bentuk akuntabilitas tertulis dan pertanggungjawaban kinerja fasilitasi lapangan dalam mendampingi Kelompok Penerima Bantuan (KPB) <strong>{kpb.namaKpb}</strong> yang berlokasi di Desa {desa.desa}, Kecamatan {desa.kecamatan}. Laporan ini memuat rekapitulasi capaian persiapan teknis, detail realisasi fisik pembangunan rumah layak huni (RLH), pemanfaatan alokasi dana stimulan, kendala-kendala konstruksi lapangan, serta solusi penyelesaian (troubleshooting) yang telah diupayakan.
                    </p>
                    <p className="text-xs indent-8 leading-relaxed text-justify">
                      Penulis menyampaikan penghargaan dan ucapan terima kasih sebesar-besarnya kepada Bapak Pejabat Pembuat Komitmen (PPK) Penyediaan Perumahan Provinsi NTB, Dinas Perumahan Rakyat Kabupaten Bima, Koordinator Kabupaten, Kepala Desa dampingan, serta segenap pengurus KPB dan masyarakat yang senantiasa bahu-membahu menyukseskan pelaksanaan di lapangan.
                    </p>
                    <div className="flex justify-end text-xs pt-4 font-sans">
                      <div className="text-center w-64">
                        <p className="font-mono text-[10px]">Bima, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
                        <p className="font-bold mt-1">Penyusun,</p>
                        <div className="h-12"></div>
                        <p className="font-bold underline uppercase">{tfl.namaTfl}</p>
                        <p className="text-[9px] font-mono text-zinc-500">TFL Pendamping Fisik</p>
                      </div>
                    </div>
                  </div>

                  {/* Daftar Isi */}
                  <div className="space-y-4 pt-4 border-t border-dashed border-slate-300 font-sans">
                    <h3 className="text-center font-black text-xs uppercase tracking-wider text-slate-800">DAFTAR ISI LAPORAN BULANAN</h3>
                    <div className="text-xs space-y-2 mt-2 font-mono text-zinc-800">
                      <div className="flex justify-between border-b border-dotted border-zinc-300 pb-0.5">
                        <span>KATA PENGANTAR & DAFTAR ISI</span>
                        <span className="font-bold">ii</span>
                      </div>
                      <div className="flex justify-between border-b border-dotted border-zinc-300 pb-0.5 font-bold text-slate-900">
                        <span>BAB I: PENDAHULUAN</span>
                        <span>01</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>A. Latar Belakang Masalah Perumahan Swadaya</span>
                        <span>01</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>B. Maksud dan Tujuan Pendampingan TFL</span>
                        <span>01</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>C. Sasaran Program & Target Keluaran Fisik</span>
                        <span>01</span>
                      </div>

                      <div className="flex justify-between border-b border-dotted border-zinc-300 pb-0.5 font-bold text-slate-900 mt-2">
                        <span>BAB II: PROFIL KELURAHAN/DESA LOKASI DAMPINGAN</span>
                        <span>02</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>• Profil Desa & Demografi Penerima Manfaat</span>
                        <span>02</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>• Matriks Jarak Kantor Desa ke Dusun Sasaran CPB</span>
                        <span>02</span>
                      </div>

                      <div className="flex justify-between border-b border-dotted border-zinc-300 pb-0.5 font-bold text-slate-900 mt-2">
                        <span>BAB III: RENCANA KERJA KONTRAK & TARGET BULAN INI</span>
                        <span>03</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>• Tabel 1: Rencana Kerja Selama Kontrak (1+4 Bulan)</span>
                        <span>03</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>• Tabel 2: Target & Realisasi Kerja Bulan Berjalan</span>
                        <span>03</span>
                      </div>

                      <div className="flex justify-between border-b border-dotted border-zinc-300 pb-0.5 font-bold text-slate-900 mt-2">
                        <span>BAB IV: REALISASI PELAKSANAAN KEGIATAN LAPANGAN</span>
                        <span>04</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>• Realisasi Kegiatan Tahap Persiapan & Konstruksi Fisik</span>
                        <span>04</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>• Laporan Realisasi Keuangan (Material & Upah)</span>
                        <span>04</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650 font-bold dark:text-emerald-950">
                        <span>• Tabel Progres Pelaksanaan Fisik Per Penerima Bantuan</span>
                        <span>05</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>• Sirus & Rapid Assessment (RA), Kendala, & Best Practice</span>
                        <span>06</span>
                      </div>

                      <div className="flex justify-between border-b border-dotted border-zinc-300 pb-0.5 font-bold text-slate-900 mt-2">
                        <span>BAB V: PENUTUP</span>
                        <span>07</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>A. Kesimpulan Akhir Pendampingan Bulanan</span>
                        <span>07</span>
                      </div>
                      <div className="pl-4 flex justify-between text-zinc-650">
                        <span>B. Saran Rekomendasi Kerja</span>
                        <span>07</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 3: BAB I: PENDAHULUAN */}
              {isChActive('bab1') && (
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="text-center">
                    <h3 className="font-sans font-black text-md uppercase">BAB I</h3>
                    <h4 className="font-sans font-black text-sm uppercase tracking-wider border-b-2 border-black pb-2">PENDAHULUAN</h4>
                  </div>

                  <div className="space-y-4 text-xs text-justify">
                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase mb-1">A. Latar Belakang</h5>
                      <p className="leading-relaxed indent-8">
                        Kebutuhan akan rumah tinggal layak huni (RLH) merupakan salah satu pilar kesejahteraan dasar manusia yang paling esensial. Namun pada realitanya, kesenjangan ekonomi membuat banyak Masyarakat Berpenghasilan Rendah (MBR) terpaksa tinggal di dalam Rumah Tidak Layak Huni (RTLH) yang membahayakan keselamatan konstruksi, ber-ventilasi buruk, serta ketiadaan sanitasi higienis.
                      </p>
                      <p className="leading-relaxed indent-8 mt-1.5">
                        Menanggapi permasalahan tersebut, Kementerian Pekerjaan Umum dan Perumahan Rakyat mendesain program 
                        <strong> Bantuan Stimulan Perumahan Swadaya (BSPS) T.A. {project.tahunAnggaran}</strong>. Program ini tidak mengedepankan bantuan sosial murni melainkan stimulan untuk menggerakkan prakarsa keswadayaan, swadaya keuangan, dan mobilisasi gotong royong warga desa. Sebagai pelaksana pendampingan teknis, Tenaga Fasilitator Lapangan (TFL) berkewajiban mendampingi proses dari tahap verifikasi berkas awal CPB, rekrutmen pokmas (KPB), penyusunan RAB teknis, negosiasi pemilihan toko penyuplai, hingga pengawasan konstruksi selesai 100%.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase mb-1">B. Maksud dan Tujuan</h5>
                      <p className="leading-relaxed indent-8">
                        <strong>Maksud</strong> dari program pendampingan TFL ini adalah memberikan bimbingan teknis dan manajerial yang akuntabel kepada Kelompok Penerima Bantuan (KPB) agar dana bantuan stimulan dimanfaatkan secara murni untuk material bersertifikat SNI berkualitas tinggi dan pembayaran upah tanpa adanya penyelewengan.
                      </p>
                      <p className="leading-relaxed indent-8 mt-1.5">
                        Adapun <strong>Tujuan</strong> operasional dilapangan antara lain:
                      </p>
                      <ul className="list-disc pl-8 mt-1 space-y-1">
                        <li>Membantu CPB menyusun dokumen kelayakan teknis perbaikan rumah tinggal sesuai pedoman mitigasi bencana (safety construction).</li>
                        <li>Memediasi pembentukan KPB <strong>{kpb.namaKpb}</strong> serta pemilihan toko terpercaya dengan harga bersaing.</li>
                        <li>Memonitoring mutu bahan bangunan yang dikirim ke tiap-tiap titik penerima swadaya.</li>
                        <li>Mencapai target fisik layak huni yang sehat (kecukupan ruang minimal 7.2 m² per jiwa, ketersediaan sirkulasi udara alami, dan jamban/septic tank mandiri).</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase mb-1">C. Sasaran dan Keluaran</h5>
                      <p className="leading-relaxed indent-8">
                        <strong>Sasaran program</strong> di lokasi dampingan ini tertuju khusus pada <strong>10 (sepuluh) Kepala Keluarga</strong> penerima bantuan di Desa <strong>{desa.desa}</strong> yang terorganisir dalam KPB <strong>{kpb.namaKpb}</strong> di bawah bimbingan langsung TFL Fisik.
                      </p>
                      <p className="leading-relaxed indent-8 mt-1.5">
                        <strong>Keluaran (Output)</strong> yang wajib dicapai di akhir pendampingan adalah terbangunnya {membersList.length} unit hunian layak huni yang lulus pemeriksaan kualitas ketat (QA/QC) dan dibuktikan dengan dokumen serah terima kunci serta administrasi Laporan Penggunaan Dana (LPD) Akhir yang bersih dan akuntabel.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 4: BAB II: PROFIL KELURAHAN/DESA LOKASI DAMPINGAN */}
              {isChActive('bab2') && (
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="text-center">
                    <h3 className="font-sans font-black text-md uppercase">BAB II</h3>
                    <h4 className="font-sans font-black text-sm uppercase tracking-wider border-b-2 border-black pb-2">PROFIL LOKASI DAMPINGAN</h4>
                  </div>

                  <div className="space-y-4 text-xs text-justify">
                    <p className="leading-relaxed">
                      Lokasi dampingan Fasilitasi BSPS {project.tahunAnggaran} oleh TFL berada di Desa <strong>{desa.desa}</strong>, Kecamatan <strong>{desa.kecamatan}</strong>, Kabupaten <strong>{desa.kabupaten}</strong>, Provinsi <strong>{desa.provinsi}</strong>. Secara demografis, mayoritas penerima bantuan bekerja sebagai petani tadah hujan, buruh tani lepas, dan peternak tradisional dengan penghasilan bulanan di bawah Upah Minimum Kabupaten (UMK), sehingga sangat memenuhi kriteria bersyarat MBR program BSPS.
                    </p>

                    <p className="leading-relaxed mt-1">
                      Kondisi perumahan awal CPB di Desa {desa.desa} rata-rata berupa rumah panggung kayu tua bermutu rendah atau gubuk semi-permanen dengan atap genteng tanah bocor, tiang penopang keropos tanpa balok struktur pengikat gempa, lantai tanah lembap, serta ketiadaan jamban keluarga layak.
                    </p>

                    <div className="space-y-2 mt-4">
                      <h5 className="font-sans font-bold text-xs uppercase tracking-tight text-slate-800">
                        • Jarak Geografis Lokasi Dampingan ke Ibukota Kabupaten:
                      </h5>
                      <div className="flex gap-2 items-center bg-stone-50 border border-black/30 p-2.5 rounded font-mono text-[10px]">
                        <MapPin size={16} className="text-rose-600 shrink-0" />
                        <div>
                          KANTOR DESA <strong>{desa.desa.toUpperCase()}</strong> TERLETAK SEJAUH DAN BERJARAK SEKARANG MEMILIKI AKSES HUBUNGAN SEKITAR 
                          <span className="font-black text-sm text-black mx-1">18 KM</span> 
                          KE PUSAT IBUKOTA KABUPATEN BIMA, NUSA TENGGARA BARAT.
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <h5 className="font-sans font-bold text-xs uppercase tracking-tight text-slate-800">
                        • Matriks Jarak Kantor Desa dengan Dusun Lokasi Penerima Bantuan:
                      </h5>
                      <p className="text-[10px] text-zinc-650 italic leading-snug">
                        Tabel di bawah memetakan persebaran jarak tempuh pelayanan administratif dari Kantor Desa ke beberapa dusun/dusun tempat tinggal bermukimnya 10 unit penerima bantuan stimulan:
                      </p>

                      <table className="w-full text-[10px] border border-black text-center text-slate-900 mt-2 font-mono">
                        <thead>
                          <tr className="bg-stone-100 font-bold border-b border-black text-[9px]">
                            <th className="py-1 px-2 border-r border-black w-10">NO</th>
                            <th className="py-1 px-4 border-r border-black text-left">NAMA DUSUN PENERIMA BSPS</th>
                            <th className="py-1 px-2 border-r border-black">JARAK KE KANTOR DESA</th>
                            <th className="py-1 px-2 border-r border-black">ESTIMASI TEMPUH</th>
                            <th className="py-1 px-2">KONDISI JALUR LOGISTIK</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { no: 1, dusun: "Dusun Sinar Jaya (Lokasi 3 CPB)", jarak: "0,5 Km", waktu: "5 Menit", kondisi: "Aspal, Sangat Lancar" },
                            { no: 2, dusun: "Dusun Bunga Indah (Lokasi 2 CPB)", jarak: "1,2 Km", waktu: "10 Menit", kondisi: "Aspal, Lancar" },
                            { no: 3, dusun: "Dusun Bima Baru (Lokasi 1 CPB)", jarak: "2,5 Km", waktu: "15 Menit", kondisi: "Pengerasan Makadam, Cukup Terjal" },
                            { no: 4, dusun: "Dusun Suka Maju (Lokasi 2 CPB)", jarak: "3,1 Km", waktu: "20 Menit", kondisi: "Tanah Padat, Rusak Sedang" },
                            { no: 5, dusun: "Dusun Damai Sejahtera (Lokasi 2 CPB)", jarak: "1,8 Km", waktu: "12 Menit", kondisi: "Aspal Rusak Ringan, Lancar" },
                          ].map((row) => (
                            <tr key={row.no} className="border-b border-black hover:bg-zinc-50">
                              <td className="py-1 border-r border-black text-center">{row.no}</td>
                              <td className="py-1 px-3 border-r border-black text-left font-sans font-semibold text-[9.5px] uppercase">{row.dusun}</td>
                              <td className="py-1 border-r border-black text-center font-bold">{row.jarak}</td>
                              <td className="py-1 border-r border-black text-center text-slate-705">{row.waktu}</td>
                              <td className="py-1 text-center font-sans text-[8.5px]">{row.kondisi}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 5: BAB III: RENCANA KERJA SELAMA KONTRAK DAN TARGET KERJA BULAN INI */}
              {isChActive('bab3') && (
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="text-center">
                    <h3 className="font-sans font-black text-md">BAB III</h3>
                    <h4 className="font-sans font-black text-sm uppercase tracking-wider border-b-2 border-black pb-2">RENCANA & TARGET KERJA TFL</h4>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-2">
                      <h5 className="font-sans font-bold text-xs uppercase text-slate-800">
                        Tabel 1 : Rencana Kerja Selama Kontrak (1 + 4 Bulan) Sesuai Kontrak Kerja
                      </h5>
                      <p className="text-[10px] text-zinc-650 italic">
                        Matriks jadwal rincian rencana (R) dan realisasi (A) pekerjaan pengawasan TFL sejak persiapan hingga pelaporan akhir selesai:
                      </p>

                      <table className="w-full text-[8.5px] border border-black text-center text-slate-950 font-mono">
                        <thead>
                          <tr className="bg-stone-100 font-bold border-b border-black">
                            <th className="py-1 px-1 border-r border-black w-6" rowSpan={2}>NO</th>
                            <th className="py-1 px-2 border-r border-black text-left" rowSpan={2}>URAIAN KEGIATAN PENDAMPINGAN</th>
                            <th className="py-1 px-1 border-r border-black w-12" rowSpan={2}>STATUS</th>
                            <th className="py-1 px-1 border-b border-black" colSpan={5}>BULAN BERJALAN PROGRAM</th>
                            <th className="py-1 px-1 border-l border-black" colSpan={2}>TANGGAL REAL</th>
                          </tr>
                          <tr className="bg-stone-50 font-bold border-b border-black">
                            <th className="py-0.5 border-r border-black w-7">B-I</th>
                            <th className="py-0.5 border-r border-black w-7">B-II</th>
                            <th className="py-0.5 border-r border-black w-7">B-III</th>
                            <th className="py-0.5 border-r border-black w-7">B-IV</th>
                            <th className="py-0.5 border-r border-black w-7">B-V</th>
                            <th className="py-0.5 border-r border-black text-[7.5px]">MULAI</th>
                            <th className="py-0.5 text-[7.5px]">SELESAI</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { id: 1, act: "Sosialisasi Kabupaten, Rembuk Pokmas & Verifikasi", m: [1, 1, 0, 0, 0], d1: "15 Mei", d2: "31 Mei" },
                            { id: 2, act: "Penyusunan RAB Teknis & Proposal DRPB Kelompok", m: [1, 1, 0, 0, 0], d1: "01 Juni", d2: "15 Juni" },
                            { id: 3, act: "Pemilihan Terbuka Toko (PTT) & Penandatanganan PKS", m: [0, 1, 0, 0, 0], d1: "16 Juni", d2: "30 Juni" },
                            { id: 4, act: "Verifikasi Kelayakan Proposal PPK & Droping Tahap I", m: [0, 0, 1, 0, 0], d1: "01 Juli", d2: "15 Juli" },
                            { id: 5, act: "Konstruksi Galian Fondasi & Dinding Bata 30%", m: [0, 0, 1, 1, 0], d1: "16 Juli", d2: "31 Juli" },
                            { id: 6, act: "LPD Tahap I, Droping Tahap II & Kusen Atap 90%", m: [0, 0, 0, 1, 0], d1: "01 Agst", d2: "20 Agst" },
                            { id: 7, act: "Finishing Plesteran, MCK dan Cat 100% Selesai", m: [0, 0, 0, 1, 1], d1: "21 Agst", d2: "15 Sept" },
                            { id: 8, act: "QA/QC Wasdal Fisik, LPD II & Serah Terima Kunci", m: [0, 0, 0, 0, 1], d1: "16 Sept", d2: "30 Sept" },
                          ].map((item) => {
                            const isPlanRun = item.m[reportMonth - 1] === 1;
                            return (
                              <React.Fragment key={item.id}>
                                {/* Row RENCANA */}
                                <tr className="border-b border-black text-[8px]">
                                  <td className="py-1 border-r border-black text-center" rowSpan={2}>{item.id}</td>
                                  <td className="py-1 px-2 border-r border-black text-left font-sans font-semibold text-slate-900" rowSpan={2}>{item.act}</td>
                                  <td className="py-0.5 border-r border-black text-stone-500 font-bold bg-stone-50">RENCANA</td>
                                  {item.m.map((val, idx) => (
                                    <td key={idx} className={`py-0.5 border-r border-black text-center ${val === 1 ? 'bg-zinc-200' : ''}`}>
                                      {val === 1 ? '■' : '-'}
                                    </td>
                                  ))}
                                  <td className="py-0.5 border-r border-black text-center text-zinc-600 bg-zinc-50 font-sans" rowSpan={2}>{item.d1}</td>
                                  <td className="py-0.5 text-center text-zinc-600 bg-zinc-50 font-sans" rowSpan={2}>{item.d2}</td>
                                </tr>
                                {/* Row REALISASI */}
                                <tr className="border-b border-black text-[8px]">
                                  <td className="py-0.5 border-r border-black text-emerald-800 font-bold bg-emerald-50">REALISASI</td>
                                  {item.m.map((val, idx) => {
                                    const executed = val === 1 && idx + 1 <= reportMonth;
                                    return (
                                      <td key={idx} className={`py-0.5 border-r border-black text-center ${executed ? 'bg-emerald-500 text-white font-black' : ''}`}>
                                        {executed ? '✔' : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-2 mt-4">
                      <h5 className="font-sans font-bold text-xs uppercase text-slate-800">
                        Tabel 2 : Target Kerja Bulan Ini (Bulan Berjalan: Bulan {reportMonth === 1 ? 'I' : reportMonth === 2 ? 'II' : reportMonth === 3 ? 'III' : reportMonth === 4 ? 'IV' : 'V'})
                      </h5>
                      <p className="text-[10px] text-zinc-650 italic leading-snug">
                        Spesifikasi pencapaian target kerja TFL khusus untuk bulan berjalan yang dikompilasikan dengan realisasi nyata di lapangan:
                      </p>

                      <table className="w-full text-[9px] border border-black text-center text-slate-950 font-mono mt-1.5">
                        <thead>
                          <tr className="bg-stone-50 font-bold border-b border-black">
                            <th className="py-1 px-2 border-r border-black w-8">NO</th>
                            <th className="py-1 px-4 border-r border-black text-left">TARGET OPERASIONAL BULAN INI</th>
                            <th className="py-1 px-4 border-r border-black text-left">REALISASI PENYELESAIAN DI LAPANGAN</th>
                            <th className="py-1 px-2">PERSENTASE</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-black">
                            <td className="py-2 border-r border-black text-center font-bold">1</td>
                            <td className="py-2 px-3 border-r border-black text-left bg-stone-50/50 leading-relaxed font-sans text-xs">
                              {rData.targetKerja}
                            </td>
                            <td className="py-2 px-3 border-r border-black text-left leading-relaxed text-emerald-950 bg-emerald-50/20 font-sans text-xs font-semibold">
                              {rData.realisasiTarget}
                            </td>
                            <td className="py-2 text-center font-bold text-emerald-900 bg-emerald-50/10">100%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 6: BAB IV: PELAKSANAAN KEGIATAN */}
              {isChActive('bab4') && (
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="text-center">
                    <h3 className="font-sans font-black text-md uppercase">BAB IV</h3>
                    <h4 className="font-sans font-black text-sm uppercase tracking-wider border-b-2 border-black pb-2">PELAKSANAAN KEGIATAN LAPANGAN</h4>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase text-slate-800 mb-1">A. REALISASI KEGIATAN</h5>
                      
                      <div className="pl-4 space-y-2">
                        <div>
                          <p className="font-bold underline text-[11px] text-slate-900">1. Tahap Persiapan:</p>
                          <p className="text-justify leading-relaxed pl-3 font-sans text-[11px] text-zinc-700">
                            <strong>a. Survey, Verifikasi, Sosialisasi, Rembuk Pokmas & PTT:</strong> 
                            <span className="ml-1 text-slate-800">
                              {reportMonth === 1 
                                ? "Verifikasi BNBA 10 CPB tuntas. Sosialisasi awal di aula desa dihadiri aparat dan tim teknis kab. Berkas CPB 100% divalidasi sah."
                                : reportMonth === 2
                                ? "Musyawarah pembentukan KPB selesai memilih jajaran ketua, bendahara. Pemilihan Terbuka Toko (PTT) terlaksana tertib secara mandiri."
                                : "Fase persiapan administratif selesai sepenuhnya pada bulan-bulan sebelumnya."}
                            </span>
                          </p>
                          <p className="text-justify leading-relaxed pl-3 font-sans text-[11px] text-zinc-700 mt-1">
                            <strong>b. Penyusunan Dokumen Proposal & DRPB CPB:</strong>
                            <span className="ml-1 text-slate-800">
                              {reportMonth === 1
                                ? "Sedang dalam penyusunan berkas data keswadayaan awal (R4)."
                                : reportMonth === 2
                                ? "Dokumen proposal DRPB 10 CPB selesai dijilid lengkap dengan gambar rencana teknis arsitektur (RTL) & RAB material disetujui TFL."
                                : "Telah diverifikasi instansi PPK dan cair sesuai peruntukan logistik."}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p className="font-bold underline text-[11px] text-slate-900">2. Tahap Pelaksanaan Fisik Konstruksi:</p>
                          <p className="text-justify leading-relaxed pl-3 font-sans text-[11px] text-zinc-700">
                            <strong>a. Pendampingan Teknis & Monitoring Lapangan (Wasdal):</strong>
                            <span className="ml-1 text-slate-800">
                              {reportMonth <= 2
                                ? "Belum dimulai secara fisik (sedang persiapan dokumen material)."
                                : reportMonth === 3
                                ? "Melakukan pembekalan tukang tentang konstruksi struktur tahan gempa. Mengawasi kerapatan sambungan sloof cor beton bertulang."
                                : reportMonth === 4
                                ? "Monitoring rutin kelulusan pengecoran kolom, perakitan kuda-kuda atap berventilasi udara silang (cross-vent), dan galian sanitasi."
                                : "Inspeksi final 140 baris checklist kepatuhan teknis QA/QC Wasdal tuntas 100%. Mutu aspal drainase dan cat rapi teruji."}
                            </span>
                          </p>
                          <p className="text-justify leading-relaxed pl-3 font-sans text-[11px] text-zinc-700 mt-1">
                            <strong>b. Penyusunan Laporan Pertanggungjawaban Keuangan (LPD):</strong>
                            <span className="ml-1 text-slate-800">
                              {reportMonth <= 2
                                ? "Belum dimulai."
                                : reportMonth === 3
                                ? "Sedang menyusun berkas LPD Tahap I (bukti droping material dari toko & tanda terima bahan)."
                                : reportMonth === 4
                                ? "LPD Tahap I lunas disahkan PPK. Mulai merakit berkas upah tukang tahap I dan droping kuitansi material tahap II."
                                : "Seluruh LPD Tahap I dan II untuk 10 PB rampung 100%, diserahkan resmi ke Satuan Kerja PPK."}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-sans font-bold text-xs uppercase text-slate-800 mb-1">B. REALISASI KEUANGAN (Dana Stimulan BSPS)</h5>
                      <p className="leading-relaxed mb-2 text-[10px] text-zinc-650">
                        Pencatatan akumulasi penyerapan dana dari Bank Penyalur langsung ke Toko Terbuka "{toko.namaToko}" untuk bahan material (Maks Rp 17.500.000,-/unit) dan rekening masing-masing PB untuk upah tukang (Maks Rp 2.500.000,-/unit):
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-black p-3 bg-stone-50 font-mono text-[9px]">
                          <span className="font-black text-stone-605 block border-b border-black pb-1 mb-1 flex items-center gap-1">
                            <DollarSign size={12} className="text-emerald-700" />
                            1. REALISASI DANA BAHAN BANGUNAN (logistik toko)
                          </span>
                          <div className="flex justify-between mt-1">
                            <span>Akumulasi Nilai Terserap:</span>
                            <span className="font-bold text-slate-900 bg-amber-150 px-1 text-[10px]">
                              {formatRupiah(rData.realisasiBahan * membersList.length)}
                            </span>
                          </div>
                          <div className="font-sans text-[8px] text-stone-500 mt-2">
                            {reportMonth <= 2 ? "* Menunggu verifikasi SK PPK dlm proposal Kelompok." : `* Terserap rata-rata Rp ${rData.realisasiBahan.toLocaleString('id-ID')} per unit CPB.`}
                          </div>
                        </div>

                        <div className="border-2 border-black p-3 bg-stone-50 font-mono text-[9px]">
                          <span className="font-black text-stone-605 block border-b border-black pb-1 mb-1 flex items-center gap-1">
                            <Activity size={12} className="text-indigo-700" />
                            2. REALISASI DANA UPAH KERJA TUKANG (rekening PB)
                          </span>
                          <div className="flex justify-between mt-1">
                            <span>Akumulasi Nilai Terserap:</span>
                            <span className="font-bold text-slate-900 bg-amber-150 px-1 text-[10px]">
                              {formatRupiah(rData.realisasiUpah * membersList.length)}
                            </span>
                          </div>
                          <div className="font-sans text-[8px] text-stone-500 mt-2">
                            {reportMonth <= 3 ? "* Pembayaran upah ditarik pasca-LPD fisik terbangun." : `* Telah ditarik dan disalurkan Rp ${rData.realisasiUpah.toLocaleString('id-ID')} per unit CPB.`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 7: PROGRES FISIK INDIVIDUAL (TABEL UTAMA KPB) */}
              {isChActive('bab4') && (
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-4">
                  <h4 className="font-sans font-bold text-xs uppercase text-slate-800">
                    C. PROGRES DAN REALISASI FISIK UTAMA (Seluruh Anggota KPB)
                  </h4>
                  <p className="text-[10px] text-zinc-650 italic leading-snug">
                    Tabel rekapitulasi progres pemanfaatan fisik perbaikan rumah masing-masing penerima manfaat (CPB) dalam KPB <strong>{kpb.namaKpb}</strong> per bulan berjalan:
                  </p>

                  <table className="w-full text-[8.5px] border border-black text-center text-slate-900 font-mono">
                    <thead>
                      <tr className="bg-stone-100 font-black border-b border-black">
                        <th className="py-1 px-1 border-r border-black w-6">NO</th>
                        <th className="py-1 px-3 border-r border-black text-left">NAMA PENERIMA MANFAAT</th>
                        <th className="py-1 px-2 border-r border-black w-32">NIK / KTP NOMOR</th>
                        <th className="py-1 px-2 border-r border-black text-left">ASAL DUSUN</th>
                        <th className="py-1 px-1 border-r border-black w-24">TARGET FISIK</th>
                        <th className="py-1 px-1 border-r border-black w-24">REALISASI FISIK</th>
                        <th className="py-1 px-1">KUALITAS / STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membersList.map((name, idx) => {
                        let indTarget = "0%";
                        let indReal = "0%";
                        let statusText = "Persiapan";
                        let statusColor = "text-indigo-805";

                        if (reportMonth === 1) {
                          indTarget = "0%";
                          indReal = "0%";
                          statusText = "Veris berkas";
                          statusColor = "text-amber-800 font-semibold";
                        } else if (reportMonth === 2) {
                          indTarget = "0%";
                          indReal = "0%";
                          statusText = "Proposal OK";
                          statusColor = "text-blue-700 font-bold bg-blue-50/10";
                        } else if (reportMonth === 3) {
                          const val = 30 + (idx % 3) * 2;
                          indTarget = "30%";
                          indReal = `${val}%`;
                          statusText = "Sloof / Dinding";
                          statusColor = "text-amber-700 font-black";
                        } else if (reportMonth === 4) {
                          const val = 85 + (idx % 3) * 3;
                          indTarget = "85%";
                          indReal = `${val}%`;
                          statusText = "Atap & Plester";
                          statusColor = "text-emerald-700 font-black";
                        } else if (reportMonth === 5) {
                          indTarget = "100%";
                          indReal = "100%";
                          statusText = "TUNTAS RLH ✔";
                          statusColor = "text-emerald-900 bg-emerald-100 px-1 py-0.5 font-bold leading-none";
                        }

                        // Special recipient row formatting matching primary name
                        const isPrimary = idx === 0;
                        const finalName = isPrimary ? recipient.nama : name;
                        const finalNik = isPrimary ? recipient.nik : `5206121${idx}0525000${idx+1}`;
                        const finalDusun = isPrimary ? `Dusun Sinar Jaya` : `Dusun ${idx % 2 === 0 ? 'Bunga Indah' : 'Suka Maju'}`;

                        return (
                          <tr key={idx} className="border-b border-black hover:bg-zinc-50">
                            <td className="py-1 px-1 border-r border-black text-center">{idx + 1}</td>
                            <td className="py-1 px-2 border-r border-black text-left font-sans font-bold text-[9.5px] uppercase">{finalName}</td>
                            <td className="py-1 px-1 border-r border-black font-mono text-[9px] text-zinc-650">{finalNik}</td>
                            <td className="py-1 px-2 border-r border-black text-left font-sans text-zinc-700">{finalDusun}</td>
                            <td className="py-1 px-1 border-r border-black font-bold text-center bg-stone-50">{indTarget}</td>
                            <td className="py-1 px-1 border-r border-black font-black text-center text-emerald-800">{indReal}</td>
                            <td className={`py-1 text-center font-sans ${statusColor}`}>{statusText}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="space-y-1.5 mt-3 font-mono text-[9px] text-stone-600 pl-2 leading-relaxed">
                    <p className="font-bold underline text-slate-900">CATATAN MONITORING & UPAYA SWADAYA:</p>
                    <p>
                      * <strong>Penerima Bantuan Belum Berjalan:</strong> <span className="font-sans text-black italic">NIHIL</span>. Seluruh CPB {membersList.length} orang telah terdorong aktif memanfaatkan bantuan stimulan fisik secara kolektif terbimbing tanpa penundaan.
                    </p>
                    <p>
                      * <strong>Aspek Keswadayaan Penerima:</strong> Seluruh penerima berkomitmen swadaya berupa penyiapan konsumsi tukang harian, sediaan bambu perancah lokal, serta material batu split hasil sungai swadaya KPB.
                    </p>
                  </div>
                </div>
              )}

              {/* PAGE 8: SIRUS, KENDALA, RENCANA BULAN DEPAN & BEST PRACTICE */}
              {isChActive('bab4') && (
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6 text-xs text-justify font-sans">
                  
                  {/* SIRUS & RA */}
                  <div className="space-y-1.5 font-sans">
                    <h5 className="font-bold text-xs uppercase text-slate-900 flex items-center gap-1">
                      <Award size={14} className="text-amber-600 shrink-0" />
                      D. STATUS PENGINPUTAN SIRUS DAN RAPID ASSESSMENT (RA)
                    </h5>
                    <p className="pl-4 text-justify leading-relaxed text-zinc-700">
                      Sistem Informasi Rumah Swadaya (SIRUS) pusat dan platform verifikasi Rapid Assessment (RA) geotagging 
                      telah terintegrasi sebagai syarat digital pencairan dana. Capaian input TFL per periode ini mencapai:
                      <strong className="text-black bg-yellow-200 px-1 font-mono text-[11px] ml-1.5">MUTU TERINPUT: {rData.sirusPersen}% DONE ({rData.sirusProgres})</strong>.
                    </p>
                  </div>

                  {/* PERMASALAHAN & TINDAK LANJUT */}
                  <div className="space-y-1.5 mt-3">
                    <h5 className="font-bold text-xs uppercase text-slate-900 flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-rose-600 shrink-0" />
                      E. PERMASALAHAN DAN TINDAK LANJUT PENYELESAIAN DI LAPANGAN
                    </h5>
                    <div className="ml-4 border-l-4 border-rose-500 pl-3 space-y-1">
                      <p><strong className="text-zinc-650">• Kendala Utama:</strong> <span className="text-rose-950 font-medium">{rData.kendala}</span></p>
                      <p><strong className="text-zinc-650">• Solusi TFL & Pokmas:</strong> <span className="text-slate-800">{rData.tindakLanjut}</span></p>
                    </div>
                  </div>

                  {/* RENCANA KERJA BULAN DEPAN */}
                  <div className="space-y-1.5 mt-3">
                    <h5 className="font-bold text-xs uppercase text-slate-900 flex items-center gap-1.5">
                      <Calendar size={14} className="text-blue-600 shrink-0" />
                      F. RENCANA KERJA TFL BULAN DEPAN
                    </h5>
                    <p className="pl-4 leading-relaxed font-mono text-[10px] text-zinc-700">
                      → {rData.rencanaBulanDepan}
                    </p>
                  </div>

                  {/* BEST PRACTICE STORY */}
                  <div className="space-y-2 mt-4 pt-4 border-t border-dashed border-zinc-300">
                    <h5 className="font-bold text-xs uppercase text-slate-900 font-sans tracking-wide">
                      G. BEST PRACTICE / KISAH SUKSES PEMBINAAN LAPANGAN
                    </h5>
                    <div className="p-3 bg-stone-50 border-2 border-black rounded leading-relaxed text-zinc-800 text-xs italic indent-6 text-justify">
                      "{rData.bestPracticeStory}"
                    </div>

                    {/* PHOTO PLOT FRAME (Retro Design) */}
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="border border-black p-2 text-center bg-slate-50 relative h-28 flex flex-col items-center justify-center">
                        <span className="text-[8px] font-mono tracking-widest text-slate-400 absolute top-1 left-2">FOTO KEGIATAN TFL #1</span>
                        <ClipboardList size={28} className="text-slate-300 mb-1" />
                        <span className="text-[10px] font-sans font-bold text-slate-700 leading-snug">Rembuk Teknis Ke-KPB</span>
                        <span className="text-[8px] font-mono text-slate-500 mt-0.5">Lokasi Desa {desa.desa}</span>
                      </div>
                      <div className="border border-black p-2 text-center bg-slate-50 relative h-28 flex flex-col items-center justify-center">
                        <span className="text-[8px] font-mono tracking-widest text-slate-400 absolute top-1 left-2">FOTO KEGIATAN TFL #2</span>
                        <Check size={28} className="text-slate-300 mb-1" />
                        <span className="text-[10px] font-sans font-bold text-slate-700 leading-snug">Audit Presisi QA/QC Wasdal</span>
                        <span className="text-[8px] font-mono text-slate-500 mt-0.5">Akumulasi Progres {rData.title.split(":")[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 9: BAB V: PENUTUP */}
              {isChActive('bab5') && (
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="text-center">
                    <h3 className="font-sans font-black text-md">BAB V</h3>
                    <h4 className="font-sans font-black text-sm uppercase tracking-wider border-b-2 border-black pb-2">PENUTUP</h4>
                  </div>

                  <div className="space-y-4 text-xs text-justify">
                    <div>
                      <h5 className="font-bold text-xs uppercase text-slate-800 mb-1">A. Kesimpulan</h5>
                      <p className="leading-relaxed indent-8">
                        {rData.kesimpulan} Pemanfaatan asimilasi swadaya masyarakat dalam kelompok terbukti meningkatkan value-for-money program, sehingga kualitas struktur keselamatan, sanitasi jamban sehat, dan sirkulasi udara (aspek kesehatan ruang) dapat diwujudkan seutuhnya melebihi target stimulan dasar Rp 20 juta PUPR.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold text-xs uppercase text-slate-800 mb-1">B. Saran Rekomendasi</h5>
                      <p className="leading-relaxed indent-8">
                        {rData.saran} Untuk keberlanjutan pasca-program, diharapkan tim pembina desa terus menggalakkan pemeliharaan gotton royong pembersih lingkungan drainase sekitar hunian agar ekosistem pedesaan yang sehat, tertib, dan bersih terus lestari.
                      </p>
                    </div>

                    {/* CORE SIGNATURE BLOCKS */}
                    <div className="grid grid-cols-2 text-center text-xs pt-16 font-sans">
                      <div>
                        <p>Diperiksa & Disetujui oleh,</p>
                        <p className="font-bold text-slate-900 border-b-2 border-slate-300 pb-1 inline-block">KOORDINATOR KABUPATEN BIMA</p>
                        <div className="h-16"></div>
                        <p className="font-bold underline">({tfl.koordinatorKabupaten || "M. Khairul Amri, S.T."})</p>
                        <p className="text-[9px] font-mono text-slate-500 mt-0.5 uppercase">NIP/KORKAB BSPS 2026</p>
                      </div>
                      <div>
                        <p>Bima, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
                        <p className="font-bold text-slate-900 border-b-2 border-slate-300 pb-1 inline-block">TENAGA FASILITATOR LAPANGAN</p>
                        <div className="h-16"></div>
                        <p className="font-bold underline">({tfl.namaTfl || "Rahmat Subhan"})</p>
                        <p className="text-[9px] font-mono text-slate-500 mt-0.5 uppercase">TFL PENDAMPING FISIK DESA {desa.desa.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 10: LAMPIRAN (Jika Terpilih) */}
              {isChActive('lampiran') && (
                <>
                  <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="text-center">
                    <h3 className="font-sans font-black text-xs uppercase tracking-wider text-slate-500">LAMPIRAN LAPORAN TFL</h3>
                    <h4 className="font-sans font-black text-md uppercase border-b-4 border-double border-black pb-2">BERKAS PENDUKUNG ADMINISTRASI & FOTO</h4>
                  </div>

                  <div className="space-y-4 text-xs">
                    <p className="leading-relaxed">
                      Lampiran ini merinci dokumen otentik wajib yang wajib diarsipkan secara fisik maupun digital sebagai pelengkap data laporan bulanan Tenaga Fasilitator Lapangan (TFL):
                    </p>

                    <div className="space-y-3 font-mono text-[10px]">
                      <div className="border-2 border-black p-3 bg-stone-50 rounded">
                        <span className="font-black text-black block mb-2 border-b border-black/30 pb-1">
                          📋 1. DOKUMEN CHECKLIST FORMAT PENDAMPINGAN TFL (FORMAT II-50 S/D II-54):
                        </span>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 font-sans">
                          <div className="flex items-center gap-1.5">
                            <Check size={11} className="text-emerald-700 font-bold" />
                            <span>FORMAT II-50: Checklist Laporan Bulanan TFL</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check size={11} className="text-emerald-700" />
                            <span>FORMAT II-51: Lembaran Mingguan Aktivitas Lapangan</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check size={11} className="text-emerald-700" />
                            <span>FORMAT II-52: Form Evaluasi Kendala & Troubleshooting</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check size={11} className="text-emerald-700" />
                            <span>FORMAT II-53: Tabel Progres Penyiapan CPB (100% OK)</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check size={11} className="text-emerald-700" />
                            <span>FORMAT II-54: Status Rekapitulasi Realokasi Dana Bank</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-zinc-500">
                            <Check size={11} className="text-zinc-400" />
                            <span>DOKUMEN ABSENSI TUKANG HARIAN KPB</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-2 border-black p-3 bg-stone-50 rounded">
                        <span className="font-black text-black block mb-2 border-b border-black/30 pb-1">
                          📸 2. DOKUMEN FOTO FISIK KONSTRUKSI RUMAH LAYAK HUNI (GRID GEOTAGGING):
                        </span>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="border border-dashed border-zinc-400 p-2 bg-white flex flex-col justify-center items-center h-20">
                            <span className="font-black text-[12px] text-zinc-800">0%</span>
                            <span className="font-sans text-[7.5px] text-zinc-500 mt-1 uppercase leading-tight">Galian & Pematokan</span>
                            <span className="font-sans text-[7px] text-zinc-400 font-bold mt-0.5">TERLAMPIR OK ✔</span>
                          </div>
                          <div className="border border-dashed border-zinc-400 p-2 bg-white flex flex-col justify-center items-center h-20">
                            <span className="font-black text-[12px] text-zinc-800">30%</span>
                            <span className="font-sans text-[7.5px] text-zinc-500 mt-1 uppercase leading-tight">Fondasi & Cor Sloof</span>
                            <span className="font-sans text-[7px] text-zinc-400 font-bold mt-0.5">TERLAMPIR OK ✔</span>
                          </div>
                          <div className="border border-dashed border-zinc-400 p-2 bg-white flex flex-col justify-center items-center h-20">
                            <span className="font-black text-[12px] text-zinc-800 font-mono">100%</span>
                            <span className="font-sans text-[7.5px] text-zinc-500 mt-1 uppercase leading-tight">Atap,plester,MCK & Cat</span>
                            <span className="font-sans text-[7px] text-amber-800 font-extrabold mt-0.5">
                              {reportMonth === 5 ? "TUNTAS FINISHED" : "PROSES KONSTRUKSI"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-2 border-black p-3 bg-stone-50 rounded">
                        <span className="font-black text-black block mb-1 border-b border-black/30 pb-1">
                          📂 3. LAMPIRAN LEGALITAS TEKNIS POKMAS:
                        </span>
                        <p className="font-sans text-[9px] text-zinc-650 leading-relaxed">
                          * Salinan Keputusan Surat Keputusan Kepala Desa pembentukan KPB <strong>{kpb.namaKpb}</strong>
                          <br />
                          * Fotokopi halaman depan Buku Rekening Penerima Manfaat untuk verifikasi bank penyalur.
                          <br />
                          * Rencana Anggaran Biaya (RAB) teknis and kupon logistik toko material bertanda tangan Ketua KPB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* APPENDIX PAGE: FORMAT II-50 DETAILED CHECKLIST */}
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="flex justify-between items-start border-b border-black pb-2 text-[9px] font-mono">
                    <span>Lampiran Laporan Bulanan TFL</span>
                    <span>Format II-50</span>
                  </div>
                  <div className="text-center">
                    <h2 className="font-sans font-black text-xs uppercase tracking-wider">CHECKLIST PENILAIAN & KELENGKAPAN LAPORAN TFL</h2>
                    <h3 className="font-sans font-extrabold text-sm uppercase">FORMAT II-50</h3>
                  </div>
                  <table className="w-full text-xs font-mono font-bold leading-normal bg-stone-50 border p-3 rounded">
                    <tbody>
                      <tr><td className="w-32 opacity-75">Nama Pendamping (TFL)</td><td className="w-4">:</td><td>{tfl.namaTfl}</td></tr>
                      <tr><td className="opacity-75">Bulan Pelaporan</td><td>:</td><td>Bulan {reportMonth === 1 ? 'I' : reportMonth === 2 ? 'II' : reportMonth === 3 ? 'III' : reportMonth === 4 ? 'IV' : 'V'} ({rData.title})</td></tr>
                      <tr><td className="opacity-75">Lokasi Dampingan</td><td>:</td><td>Desa {desa.desa || recipient.desa}, Kecamatan {desa.kecamatan || recipient.kecamatan}</td></tr>
                    </tbody>
                  </table>
                  <table className="w-full text-[10px] border border-black text-[#1C1C1C]">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-black text-center text-[9px]">
                        <th className="p-1.5 border-r border-black w-8">No</th>
                        <th className="p-1.5 border-r border-black text-left">Komponen / Bagian Laporan</th>
                        <th className="p-1.5 border-r border-black w-32">Status Kelengkapan</th>
                        <th className="p-1.5 w-24">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-black">
                        <td className="p-1.5 border-r border-black text-center font-mono">1</td>
                        <td className="p-1.5 border-r border-black font-sans">Lembar Cover Laporan (Nama TFL, Kelompok KPB, Periode)</td>
                        <td className="p-1.5 border-r border-black text-center text-emerald-800 font-bold">✔ LENGKAP</td>
                        <td className="p-1.5 text-center font-sans text-[9px]">Sesuai Format</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="p-1.5 border-r border-black text-center font-mono">2</td>
                        <td className="p-1.5 border-r border-black font-sans">Kata Pengantar & Daftar Isi Resmi</td>
                        <td className="p-1.5 border-r border-black text-center text-emerald-800 font-bold">✔ LENGKAP</td>
                        <td className="p-1.5 text-center font-sans text-[9px]">Sesuai Format</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="p-1.5 border-r border-black text-center font-mono">3</td>
                        <td className="p-1.5 border-r border-black font-sans">Bab I Pendahuluan (Latar Belakang & Maksud Tujuan)</td>
                        <td className="p-1.5 border-r border-black text-center text-emerald-800 font-bold">✔ LENGKAP</td>
                        <td className="p-1.5 text-center font-sans text-[9px]">Sesuai Target</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="p-1.5 border-r border-black text-center font-mono">4</td>
                        <td className="p-1.5 border-r border-black font-sans">Bab II Profil Lokasi & Jumlah Dampingan Kelompok</td>
                        <td className="p-1.5 border-r border-black text-center text-emerald-800 font-bold">✔ LENGKAP</td>
                        <td className="p-1.5 text-center font-sans text-[9px]">Sesuai Target</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="p-1.5 border-r border-black text-center font-mono">5</td>
                        <td className="p-1.5 border-r border-black font-sans">Bab III Rencana Kerja Mingguan TFL Fisik & Pemberdayaan</td>
                        <td className="p-1.5 border-r border-black text-center text-emerald-800 font-bold">✔ LENGKAP</td>
                        <td className="p-1.5 text-center font-sans text-[9px]">Selesai Rencana</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="p-1.5 border-r border-black text-center font-mono">6</td>
                        <td className="p-1.5 border-r border-black font-sans">Bab IV Capaian Realisasi, Hambatan & Solusi Troubleshooting</td>
                        <td className="p-1.5 border-r border-black text-center text-emerald-800 font-bold">✔ LENGKAP</td>
                        <td className="p-1.5 text-center font-sans text-[9px]">Terverifikasi</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="p-1.5 border-r border-black text-center font-mono">7</td>
                        <td className="p-1.5 border-r border-black font-sans">Bab V Penutup (Saran & Rekomendasi Tindak Lanjut)</td>
                        <td className="p-1.5 border-r border-black text-center text-emerald-800 font-bold">✔ LENGKAP</td>
                        <td className="p-1.5 text-center font-sans text-[9px]">Saran Konkrit</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="p-1.5 border-r border-black text-center font-mono">8</td>
                        <td className="p-1.5 border-r border-black font-sans">Lampiran Foto Lapangan & Dokumentasi Rinci (0%, 30%, 100%)</td>
                        <td className="p-1.5 border-r border-black text-center text-emerald-800 font-bold">✔ LENGKAP</td>
                        <td className="p-1.5 text-center font-sans text-[9px]">Ada Geotagging</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="grid grid-cols-2 text-center text-xs pt-8">
                    <div>
                      <p>Diperiksa oleh,</p>
                      <p className="font-bold">Koordinator Kabupaten Bima</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.koordinatorKabupaten})</p>
                    </div>
                    <div>
                      <p>Disusun oleh,</p>
                      <p className="font-bold">Tenaga Fasilitator Lapangan</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.namaTfl})</p>
                    </div>
                  </div>
                </div>

                {/* APPENDIX PAGE: FORMAT II-51 DETAILED WEEKLY JOURNAL */}
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="flex justify-between items-start border-b border-black pb-2 text-[9px] font-mono">
                    <span>Lampiran Laporan Bulanan TFL</span>
                    <span>Format II-51</span>
                  </div>
                  <div className="text-center">
                    <h2 className="font-sans font-black text-xs uppercase tracking-wider">LEMBARAN MINGGUAN AKTIVITAS LAPANGAN TFL</h2>
                    <h3 className="font-sans font-extrabold text-sm uppercase">FORMAT II-51</h3>
                  </div>
                  <div className="grid grid-cols-2 text-[10px] bg-slate-50 p-2.5 border rounded gap-x-4 font-mono">
                    <div>Kabupaten: <strong>{desa.kabupaten}</strong></div>
                    <div>Nama TFL: <strong>{tfl.namaTfl}</strong></div>
                    <div>Provinsi: <strong>{desa.provinsi}</strong></div>
                    <div>Bulan: <strong>Bulan {reportMonth === 1 ? 'I' : reportMonth === 2 ? 'II' : reportMonth === 3 ? 'III' : reportMonth === 4 ? 'IV' : 'V'} ({rData.title})</strong></div>
                  </div>
                  <table className="w-full text-[9px] border border-black text-slate-800 text-center">
                    <thead>
                      <tr className="bg-slate-150 font-bold border-b border-black">
                        <th className="py-1 w-8 border-r border-black">No</th>
                        <th className="py-1 w-24 border-r border-black">Waktu / Hari</th>
                        <th className="py-1 border-r border-black text-left pl-1">Agenda Utama Kegiatan Pendampingan Fisik</th>
                        <th className="py-1 border-r border-black text-left pl-1">Hasil Capaian Lapangan</th>
                        <th className="py-1 w-20">Lokasi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-black text-left">
                        <td className="py-1 border-r border-black text-center font-mono">1</td>
                        <td className="py-1 border-r border-black text-center">Minggu Ke-1</td>
                        <td className="py-1 border-r border-black pl-1">Penyusunan berkas kelengkapan administrasi proposal CPB dan verifikasi ulang status RTLH warga</td>
                        <td className="py-1 border-r border-black pl-1">Berkas 100% tervalidasi siap ajukan Bank</td>
                        <td className="py-1 text-center">Kantor Desa</td>
                      </tr>
                      <tr className="border-b border-black text-left">
                        <td className="py-1 border-r border-black text-center font-mono">2</td>
                        <td className="py-1 border-r border-black text-center">Minggu Ke-2</td>
                        <td className="py-1 border-r border-black pl-1">Verifikasi ketersediaan stok material utama di toko mitra ditunjuk KPB</td>
                        <td className="py-1 border-r border-black pl-1">Stok material aman & harga terkunci</td>
                        <td className="py-1 text-center">Toko UD. Sanolo</td>
                      </tr>
                      <tr className="border-b border-black text-left">
                        <td className="py-1 border-r border-black text-center font-mono">3</td>
                        <td className="py-1 border-r border-black text-center">Minggu Ke-3</td>
                        <td className="py-1 border-r border-black pl-1">Pendampingan pengukuran and galian fondasi rumah baru penerima stimulan</td>
                        <td className="py-1 border-r border-black pl-1">Galian rampung & siap cor sloof</td>
                        <td className="py-1 text-center">Lahan CPB</td>
                      </tr>
                      <tr className="border-b border-black text-left">
                        <td className="py-1 border-r border-black text-center font-mono">4</td>
                        <td className="py-1 border-r border-black text-center">Minggu Ke-4</td>
                        <td className="py-1 border-r border-black pl-1">Monitoring pengiriman material tahap awal & absensi tukang kerja harian</td>
                        <td className="py-1 border-r border-black pl-1">Material terkirim lengkap tanpa deviasi</td>
                        <td className="py-1 text-center">Lokasi Kerja</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="grid grid-cols-2 text-center text-xs pt-8">
                    <div>
                      <p>Diperiksa oleh,</p>
                      <p className="font-bold">Koordinator Kabupaten Bima</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.koordinatorKabupaten})</p>
                    </div>
                    <div>
                      <p>Disusun oleh,</p>
                      <p className="font-bold">Tenaga Fasilitator Lapangan</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.namaTfl})</p>
                    </div>
                  </div>
                </div>

                {/* APPENDIX PAGE: FORMAT II-52 KENDALA & TROUBLESHOOTING */}
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="flex justify-between items-start border-b border-black pb-2 text-[9px] font-mono">
                    <span>Lampiran Laporan Bulanan TFL</span>
                    <span>Format II-52</span>
                  </div>
                  <div className="text-center">
                    <h2 className="font-sans font-black text-xs uppercase tracking-wider">FORM EVALUASI KENDALA & TROUBLESHOOTING KONSTRUKSI</h2>
                    <h3 className="font-sans font-extrabold text-sm uppercase">FORMAT II-52</h3>
                  </div>
                  <div className="grid grid-cols-2 text-[10px] bg-slate-50 p-2 border rounded gap-x-4 font-mono">
                    <div>Kabupaten: <strong>{desa.kabupaten}</strong></div>
                    <div>Nama TFL: <strong>{tfl.namaTfl}</strong></div>
                    <div>Kelompok Pokmas: <strong>KPB {kpb.namaKpb}</strong></div>
                    <div>Periode: <strong>Bulan {reportMonth === 1 ? 'I' : reportMonth === 2 ? 'II' : reportMonth === 3 ? 'III' : reportMonth === 4 ? 'IV' : 'V'}</strong></div>
                  </div>
                  <table className="w-full text-[9px] border border-black text-slate-800 text-center">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-black">
                        <th className="py-1 border-r border-black w-8">No</th>
                        <th className="py-1 border-r border-black text-left pl-1">Uraian Defiasi / Masalah Lapangan</th>
                        <th className="py-1 border-r border-black text-left pl-1">Rekomendasi / Solusi Penyelesaian Nyata</th>
                        <th className="py-1 border-r border-black w-14">Status</th>
                        <th className="py-1 w-20">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-black text-left">
                        <td className="py-1 text-center border-r border-black font-mono">1</td>
                        <td className="py-1 border-r border-black pl-1 font-sans text-rose-950">Deviasi pengiriman batu pasir akibat cuaca hujan berkepanjangan</td>
                        <td className="py-1 border-r border-black pl-1 font-sans text-slate-800">Menjadwalkan ulang pengiriman menggunakan mobil pickup berpenutup terpal tebal</td>
                        <td className="py-1 border-r border-black text-center text-emerald-800 font-bold">TERATASI</td>
                        <td className="py-1 text-center">Fisik Aman</td>
                      </tr>
                      <tr className="border-b border-black text-left">
                        <td className="py-1 text-center border-r border-black font-mono">2</td>
                        <td className="py-1 border-r border-black pl-1 font-sans text-rose-950">Tukang kayu mengalami kendala alat potong di lokasi galian</td>
                        <td className="py-1 border-r border-black pl-1 font-sans text-slate-800">Memfasilitasi peminjaman gergaji listrik dari bengkel kayu desa terdekat</td>
                        <td className="py-1 border-r border-black text-center text-emerald-800 font-bold">TERATASI</td>
                        <td className="py-1 text-center">Lancar</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="grid grid-cols-2 text-center text-xs pt-8">
                    <div>
                      <p>Diperiksa oleh,</p>
                      <p className="font-bold">Koordinator Kabupaten Bima</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.koordinatorKabupaten})</p>
                    </div>
                    <div>
                      <p>Disusun oleh,</p>
                      <p className="font-bold">Tenaga Fasilitator Lapangan</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.namaTfl})</p>
                    </div>
                  </div>
                </div>

                {/* APPENDIX PAGE: FORMAT II-53 PROGRES PENYIAPAN */}
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="flex justify-between items-start border-b border-black pb-2 text-[9px] font-mono">
                    <span>Lampiran Laporan Bulanan TFL</span>
                    <span>Format II-53</span>
                  </div>
                  <div className="text-center">
                    <h2 className="font-sans font-black text-xs uppercase tracking-wider">TABEL PROGRES CAPAIAN PENYIAPAN MASYARAKAT BSPS 2026</h2>
                    <h3 className="font-sans font-extrabold text-sm uppercase">FORMAT II-53</h3>
                  </div>
                  <div className="grid grid-cols-2 text-[10px] bg-slate-50 p-2 border rounded font-mono">
                    <div>Desa Dampingan: <strong>Desa {desa.desa || recipient.desa}</strong></div>
                    <div>Kecamatan: <strong>{desa.kecamatan || recipient.kecamatan}</strong></div>
                    <div>Kabupaten: <strong>{desa.kabupaten || recipient.kabupaten}</strong></div>
                    <div>Bulan Capaian: <strong>Bulan {reportMonth === 1 ? 'I' : reportMonth === 2 ? 'II' : reportMonth === 3 ? 'III' : reportMonth === 4 ? 'IV' : 'V'}</strong></div>
                  </div>
                  <table className="w-full text-[9px] border border-black text-center text-slate-800">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-black">
                        <th className="py-1 font-sans w-8 border-r border-black">No</th>
                        <th className="py-1 font-sans text-left pl-1 border-r border-black w-24">Nama CPB</th>
                        <th className="py-1 font-sans border-r border-black">Identifikasi</th>
                        <th className="py-1 font-sans border-r border-black">Rembuk KPB</th>
                        <th className="py-1 font-sans border-r border-black">Pilih Toko</th>
                        <th className="py-1 font-sans border-r border-black">RAB Valid</th>
                        <th className="py-1 font-sans border-r border-black">SK CPB</th>
                        <th className="py-1 font-sans">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membersList.slice(0, 10).map((name, i) => (
                        <tr key={i} className="border-b border-black text-[9px] text-center">
                          <td className="py-1 border-r border-black font-mono">{i + 1}</td>
                          <td className="py-1 border-r border-black text-left pl-1 font-sans font-bold">{name}</td>
                          <td className="py-1 border-r border-black text-emerald-800 font-black">✔ 100%</td>
                          <td className="py-1 border-r border-black text-emerald-800 font-black">✔ 100%</td>
                          <td className="py-1 border-r border-black text-emerald-800 font-black">✔ 100%</td>
                          <td className="py-1 border-r border-black text-emerald-800 font-black">✔ 100%</td>
                          <td className="py-1 border-r border-black text-emerald-800 font-black">✔ 100%</td>
                          <td className="py-1 bg-emerald-50 text-emerald-950 font-black font-sans text-[8px] uppercase">TERPENUHI</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="grid grid-cols-3 text-center text-[10px] pt-8">
                    <div>
                      <p>Mengetahui,</p>
                      <p className="font-bold">Tim Pendamping Provinsi</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">(.....................................)</p>
                    </div>
                    <div>
                      <p>Diperiksa oleh,</p>
                      <p className="font-bold">Koordinator Kabupaten Bima</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.koordinatorKabupaten})</p>
                    </div>
                    <div>
                      <p>Disusun oleh,</p>
                      <p className="font-bold">Tenaga Fasilitator Lapangan</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.namaTfl})</p>
                    </div>
                  </div>
                </div>

                {/* APPENDIX PAGE: FORMAT II-54 DISBURSEMENT RECAPITULATION */}
                <div className="border border-slate-300 p-8 min-h-[750px] bg-white shadow-sm break-after-page space-y-6">
                  <div className="flex justify-between items-start border-b border-black pb-2 text-[9px] font-mono">
                    <span>Lampiran Laporan Bulanan TFL</span>
                    <span>Format II-54</span>
                  </div>
                  <div className="text-center">
                    <h2 className="font-sans font-black text-xs uppercase tracking-wider">STATUS REKAPITULASI REALOKASI & PENYALURAN DANA BANK CPB</h2>
                    <h3 className="font-sans font-extrabold text-sm uppercase">FORMAT II-54</h3>
                  </div>
                  <div className="grid grid-cols-2 text-[10px] bg-slate-50 p-2.5 border rounded gap-x-4 font-mono">
                    <div>Bank Penyalur: <strong>Bank NTB Syariah / BNI</strong></div>
                    <div>Nama Pokmas: <strong>KPB {kpb.namaKpb}</strong></div>
                    <div>Jumlah Penerima: <strong>{kpb.anggota.length} CPB Dampingan</strong></div>
                    <div>Total Anggaran: <strong>{formatRupiah(kpb.anggota.length * 20000000)}</strong></div>
                  </div>
                  <table className="w-full text-[8.5px] border border-black text-center text-slate-800">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-black">
                        <th className="py-1 border-r border-black w-8">No</th>
                        <th className="py-1 border-r border-black text-left pl-1">Nama Anggota CPB</th>
                        <th className="py-1 border-r border-black">Kategori Bantuan</th>
                        <th className="py-1 border-r border-black">Tahap I (RAB Fisik)</th>
                        <th className="py-1 border-r border-black">Tahap II (Upah Kerja)</th>
                        <th className="py-1">Total Saldo Terserap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membersList.slice(0, 10).map((name, i) => (
                        <tr key={i} className="border-b border-black">
                          <td className="py-1 border-r border-black font-mono text-center">{i + 1}</td>
                          <td className="py-1 border-r border-black text-left pl-1 font-bold">{name}</td>
                          <td className="py-1 border-r border-black text-center font-mono">Bantuan Fisik BSPS</td>
                          <td className="py-1 border-r border-black text-center text-emerald-800 font-semibold">17.500.000 (100% OK)</td>
                          <td className="py-1 border-r border-black text-center text-emerald-800 font-semibold">2.500.000 (100% OK)</td>
                          <td className="py-1 text-right font-mono font-bold text-emerald-950 pr-1">20.000.000</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="grid grid-cols-3 text-center text-[10px] pt-8">
                    <div>
                      <p>Mengetahui,</p>
                      <p className="font-bold">Tim Pendamping Provinsi</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">(.....................................)</p>
                    </div>
                    <div>
                      <p>Diperiksa oleh,</p>
                      <p className="font-bold">Koordinator Kabupaten Bima</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.koordinatorKabupaten})</p>
                    </div>
                    <div>
                      <p>Disusun oleh,</p>
                      <p className="font-bold">Tenaga Fasilitator Lapangan</p>
                      <div className="h-10"></div>
                      <p className="underline font-bold">({tfl.namaTfl})</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            </div>
          </div>
        )
      })()}

      {/* OUTLINE PROPOSAL CPB (CALON PENERIMA BANTUAN) INDIVIDU */}
      {state.selectedFormat === 'FORMAT_OUTLINE_PROPOSAL' && (() => {
        const isPropChActive = (ch: string) => {
          return selectedChapter === 'all' || selectedChapter === ch;
        };

        const listRecipientNames = (kpb.anggota && kpb.anggota.length > 0) ? kpb.anggota : [
          "M. Sidik", "Nursyah", "Abubakar", "Hermansyah", "Aminah"
        ];

        // Format II-3 Items
        const structVerif = [
          { comp: 'Pondasi', a: false, b: true, c: false, text: 'ada, sebagian rapuh, tidak kokoh' },
          { comp: 'Sloof', a: false, b: true, c: false, text: 'ada, sebagian rapuh, tidak kokoh' },
          { comp: 'Kolom', a: false, b: false, c: true, text: 'tidak ada, seluruhnya rapuh' },
          { comp: 'Ring Balok', a: false, b: false, c: true, text: 'tidak ada, seluruhnya rapuh' },
          { comp: 'Rangka Atap', a: false, b: true, c: false, text: 'ada, sebagian rapuh, tidak kokoh' },
        ];
        const nonStructVerif = [
          { comp: 'Dinding', textA: 'Tembok diplester/kayu berkualitas', textB: 'Sebagian besar retak/kurang kokoh', textC: 'Bambu/triplek rapuh', sel: 'C' },
          { comp: 'Lantai', textA: 'Plester/ubin kondisi baik', textB: 'Rabat kasar/plester pecah', textC: 'Tanah/patah rapuh', sel: 'B' },
          { comp: 'Penutup Atap', textA: 'Genteng/seng kondisi baik', textB: 'Rusak sebagian/bocor sedikit', textC: 'Asbes rusak/rumbia rapuh', sel: 'C' },
        ];
        const healthVerif = [
          { comp: 'Akses Air Minum', textA: 'Ada', textC: 'Tidak Ada', sel: 'A' },
          { comp: 'Akses Sanitasi', textA: 'Ada', textC: 'Tidak Ada', sel: 'A' },
          { comp: 'Pencahayaan', textA: 'Terang siang hari', textB: 'Kurang terang', textC: 'Gelap/pengap', sel: 'B' },
          { comp: 'Penghawaan', textA: 'Cukup ventilasi baik', textB: 'Agak pengap/kurang', textC: 'Tidak ada ventilasi', sel: 'B' },
          { comp: 'Kecukupan Luas', textA: 'Lantai/jiwa >= 7,2m²', textB: 'Lantai/jiwa < 7,2m²', sel: 'B' },
        ];

        return (
          <div className="space-y-6">
            {/* INTERACTIVE NAVIGATION CONTROL PANEL (HIDDEN ON PRINT) */}
            <div className="print:hidden border-4 border-black bg-stone-100 p-4 space-y-4 shadow-[4px_4px_0px_#000] text-[#1A1A1A]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2 text-[10px] font-mono font-black text-white bg-black uppercase font-bold">PROPOSAL BSPS</span>
                  <p className="text-xs font-mono font-black">MODE PREVIEW OUTLINE PROPOSAL CPB (INDIVIDU)</p>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span className="text-xs font-mono font-black">OUTLINE PROPOSAL UTAMA</span>
                </div>
              </div>

              {/* CHAPTER NAVIGATOR */}
              <div>
                <span className="text-[10px] font-mono font-black block mb-1.5 uppercase tracking-wider">📖 PILIH NAVIGASI HALAMAN / FORMAT PROPOSAL CPB:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                  {[
                    { id: 'all', label: '🖨️ LIHAT SEMUA (PRINT READY)' },
                    { id: 'p_cover', label: '1. Cover Depan' },
                    { id: 'p_ii19', label: '2. Format II-19 (Permohonan)' },
                    { id: 'p_identity', label: '3. Lampiran KTP Depan/Belakang' },
                    { id: 'p_kk', label: '4. Lampiran Kartu Keluarga' },
                    { id: 'p_ii20', label: '5. Format II-20 (Penghasilan)' },
                    { id: 'p_lahan_kades', label: '6. Surat Keterangan Lahan Kades' },
                    { id: 'p_lahan_cpb', label: '7. Surat Pernyataan Lahan CPB' },
                    { id: 'p_ii22', label: '8. Format II-22 (Pernyataan)' },
                    { id: 'p_ii12', label: '9. Format II-12 (Keswadayaan)' },
                    { id: 'p_ii3', label: '10. Format II-3 (Kelayakan RTLH)' },
                    { id: 'p_ii13', label: '11. Format II-13 (Rencana Teknis)' },
                    { id: 'p_ii14', label: '12. Format II-14 (RAB Detail)' }
                  ].map((ch) => {
                    const active = selectedChapter === ch.id;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => setSelectedChapter(ch.id)}
                        className={`px-2 py-1 text-[9px] font-mono font-bold border border-black transition-all ${
                          active 
                            ? 'bg-black text-stone-100 font-black shadow-inner' 
                            : 'bg-stone-200/50 hover:bg-white text-stone-800'
                        }`}
                      >
                        {ch.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="text-[9.5px] font-mono text-stone-600 leading-snug">
                * Pilih <strong>LIHAT SEMUA (PRINT READY)</strong> di atas sebelum menekan tombol Cetak/Print (Ctrl+P) untuk mengunduh berkas fisik proposal utuh milik Penerima Manfaat.
              </p>
            </div>

            {/* PRINT-READY PROPOSAL CONTAINER */}
            <div className="font-serif text-[#1C1C1C] leading-relaxed select-text space-y-12">
              
              {/* COVER */}
              {isPropChActive('p_cover') && (
                <div className="border border-slate-300 p-8 pt-16 min-h-[820px] flex flex-col justify-between items-center text-center bg-white shadow-sm relative overflow-hidden break-after-page">
                  <div className="space-y-3">
                    <h1 className="text-xl md:text-2xl font-black font-sans uppercase tracking-tight text-slate-900 leading-snug pt-6 pb-2">
                      PROPOSAL
                      <br />
                      CALON PENERIMA BANTUAN (CPB)
                    </h1>
                    <h2 className="text-xs md:text-sm italic font-sans font-bold text-slate-600">
                      PROGRAM BANTUAN STIMULAN PERUMAHAN SWADAYA (BSPS)
                    </h2>
                    <div className="w-1/4 h-1 border-t-2 border-b-2 border-black mx-auto my-4 mt-6"></div>
                    <p className="font-sans text-xs uppercase font-extrabold tracking-widest bg-slate-100 text-slate-800 px-3 py-1 inline-block">
                      KPB: {kpb.namaKpb.toUpperCase()}
                    </p>
                  </div>

                  {/* Icon Block -> Replaced by Upload Input Gambar */}
                  <div className="my-8 w-60 h-60 border-2 border-dashed border-slate-400 rounded-lg flex flex-col items-center justify-center bg-stone-50 relative overflow-hidden group">
                    {coverImage ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-black/5">
                        <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setCoverImage(null)}
                          className="print:hidden absolute top-2 right-2 bg-red-600 text-white text-[10px] p-1 px-2.5 rounded hover:bg-red-700 shadow-md transition-colors"
                        >
                          Hapus Gambar
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center cursor-pointer relative w-full h-full">
                        <Printer size={36} className="text-slate-450 mb-2" />
                        <span className="text-[10px] font-sans font-black text-slate-700 uppercase">UPLOAD GAMBAR COVER</span>
                        <p className="text-[8px] text-slate-450 max-w-[170px] mb-2 leading-tight">Klik atau seret file gambar untuk mengunggah foto cover proposal</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, setCoverImage)}
                          className="absolute inset-0 opacity-0 cursor-pointer print:hidden"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 font-sans text-xs w-full max-w-md">
                    <div className="space-y-1">
                      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">Nama Calon Penerima Bantuan (CPB):</p>
                      <p className="font-black text-base underline text-slate-950 uppercase tracking-tight">{formatNameWithGelar(recipient.nama)}</p>
                      <p className="font-mono text-[10px] font-bold text-slate-600">Alamat CPB: Desa {formatTitleCase(desa.desa || recipient.desa)}, Kecamatan {formatTitleCase(desa.kecamatan || recipient.kecamatan)}</p>
                    </div>

                    <div className="border-2 border-black p-3 bg-stone-50 font-mono text-[9.5px] text-left mx-auto rounded font-bold space-y-1 shadow-[2px_2px_0px_#000]">
                      <div className="flex justify-between border-b pb-0.5"><span className="opacity-60">DESA:</span> <span className="uppercase">{desa.desa || recipient.desa}</span></div>
                      <div className="flex justify-between border-b pb-0.5"><span className="opacity-60">KECAMATAN:</span> <span className="uppercase">{desa.kecamatan || recipient.kecamatan}</span></div>
                      <div className="flex justify-between border-b pb-0.5"><span className="opacity-60">KABUPATEN:</span> <span className="uppercase">{desa.kabupaten || recipient.kabupaten} (NTB)</span></div>
                      <div className="flex justify-between"><span className="opacity-60">PROVINSI:</span> <span className="uppercase text-slate-900 font-black">Nusa Tenggara Barat</span></div>
                    </div>

                    <div className="pt-4 font-mono text-[8.5px] text-zinc-500 uppercase pb-4">
                      KEMENTERIAN PEKERJAAN UMUM DAN PERUMAHAN RAKYAT
                      <br />
                      DIREKTORAT JENDERAL PERUMAHAN
                      <br />
                      BALAI PENYEDIAAN PERUMAHAN NUSA TENGGARA BARAT
                    </div>
                  </div>
                </div>
              )}

              {/* FORMAT II-19 PERMOHONAN */}
              {isPropChActive('p_ii19') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-xs font-serif leading-relaxed text-justify relative">
                  <div className="text-right font-mono font-bold text-[10px] uppercase border-b border-black pb-1.5 mb-2">FORMAT II-19</div>
                  
                  <div className="text-center font-sans">
                    <h3 className="font-black text-sm uppercase tracking-wide">PERMOHONAN BANTUAN STIMULAN PERUMAHAN SWADAYA</h3>
                    <p className="font-mono text-[10px] font-bold text-stone-500">KABUPATEN BIMA - TAHUN ANGGARAN {project.tahunAnggaran}</p>
                  </div>

                  <div className="flex justify-between items-start text-xs pt-2">
                    <div className="space-y-0.5">
                      <p>Yth.:</p>
                      <p className="font-bold">Pejabat Pembuat Komitmen (PPK) Rumah Swadaya dan</p>
                      <p className="font-bold">Pengembangan Kawasan Permukiman</p>
                      <p className="font-bold">Satuan Kerja Perumahan dan Kawasan Permukiman NTB</p>
                    </div>
                    <div className="text-right font-mono text-[10px] font-bold">
                      {project.tahunSurat || '2026'}
                    </div>
                  </div>

                  <p className="pt-2"><strong>Perihal :</strong> Permohonan Kegiatan Bantuan Stimulan Perumahan Swadaya Tahun {project.tahunAnggaran}</p>

                  <p>Saya yang bertanda tangan di bawah ini :</p>
                  <table className="w-full text-xs font-serif pl-4 space-y-1">
                    <tbody>
                      <tr><td className="w-24 py-0.5">Nama</td><td className="w-4">:</td><td className="font-bold text-slate-900">{formatNameWithGelar(recipient.nama)}</td></tr>
                      <tr><td className="py-0.5">Umur</td><td>:</td><td>{recipient.umur} Tahun</td></tr>
                      <tr><td className="py-0.5">Pekerjaan</td><td>:</td><td>{recipient.pekerjaan}</td></tr>
                      <tr><td className="py-0.5">Alamat</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
                      <tr><td className="py-0.5"></td><td></td><td>Desa {formatTitleCase(desa.desa || recipient.desa)}, Kecamatan {formatTitleCase(desa.kecamatan || recipient.kecamatan)}, Kabupaten Bima, Provinsi NTB</td></tr>
                    </tbody>
                  </table>

                  <p>Dengan ini menyatakan bahwa saya:</p>
                  <ol className="list-decimal pl-5 space-y-1 text-xs">
                    <li>Warga Negara Indonesia yang sudah berkeluarga;</li>
                    <li>Memiliki atau menguasai tanah dengan bukti kepemilikan dan penguasaan yang jelas and sah;</li>
                    <li>Batas penghasilan keluarga paling banyak sebesar Upah Minimum Provinsi/Kabupaten;</li>
                    <li>Memiliki dan menempati satu-satunya rumah dengan kondisi tidak layak huni selama minimal 3 tahun;</li>
                    <li>Belum pernah memperoleh program bantuan pembangunan rumah swadaya dan program kemudahan dan bantuan pembiayaan perumahan bagi MBR dalam 10 tahun terakhir; dan</li>
                    <li>Bersedia mengikuti ketentuan program.</li>
                  </ol>

                  <p>Sehubungan dengan hal tersebut di atas, saya mengajukan permohonan untuk dapat diberikan BSPS tahun {project.tahunAnggaran}.</p>
                  <p>Sebagai kelengkapan permohonan ini, bersama ini saya lampirkan:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Salinan KTP & KK yang masih berlaku;</li>
                    <li>Surat pernyataan penghasilan diketahui kepala Desa / instansi tempat bekerja;</li>
                    <li>Salinan sertifikat hak atas tanah/surat kepemilikan tanah/keterangan menguasai tanah dari Kepala Desa/Camat;</li>
                    <li>Surat pernyataan mengikuti program;</li>
                    <li>Hasil identifikasi keswadayaan calon penerima bantuan; dan</li>
                    <li>Rencana teknis dan RAB pembangunan.</li>
                  </ul>

                  <p>Demikian surat permohonan ini beserta lampirannya saya buat dengan sebenar-benarnya dan saya bertanggung jawab terhadap kebenaran isinya, untuk kiranya dapat dikabulkan.</p>

                  <div className="grid grid-cols-2 text-center text-xs pt-12 font-sans font-bold">
                    <div className="space-y-1">
                      <p>Mengetahui,</p>
                      <p>Kepala Desa {formatTitleCase(desa.desa || recipient.desa)}</p>
                      <div className="h-20"></div>
                      <p className="underline text-slate-950 font-black">{formatNameWithGelar(desa.namaKepalaDesa)}</p>
                      <p className="text-[10px] font-mono opacity-60">NIAP. {desa.nipKepalaDesa || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <p>&nbsp;</p>
                      <p>Pemohon (CPB),</p>
                      <div className="h-20"></div>
                      <p className="underline text-slate-950 font-black">{formatNameWithGelar(recipient.nama)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAMPIRAN KTP */}
              {isPropChActive('p_identity') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-right font-mono font-bold text-[10px] border-b border-black pb-1 uppercase">PERSYARATAN ADMINISTRASI CPB</div>
                    <div className="text-center">
                      <h4 className="font-sans font-black text-sm uppercase">LAMPIRAN FOTO COPY KTP</h4>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">IDENTITAS DIRI PENERIMA MANFAAT YANG SAH</p>
                    </div>

                    <div className="space-y-4 max-w-lg mx-auto pt-6">
                      {/* UPLOAD FILE KTP DEPAN */}
                      <div className="border-2 border-dashed border-slate-400 p-4 rounded-lg bg-stone-50 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] group transition-all hover:bg-stone-100">
                        {ktpDepanImage ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img src={ktpDepanImage} alt="KTP Depan" className="w-full max-h-[170px] object-contain rounded shadow-sm" />
                            <button
                              type="button"
                              onClick={() => setKtpDepanImage(null)}
                              className="print:hidden absolute top-2 right-2 bg-red-600 text-white text-[9px] p-1 px-2.5 rounded hover:bg-red-700 shadow transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-center cursor-pointer relative w-full h-full">
                            <User size={32} className="text-slate-400 mb-1" />
                            <span className="font-sans text-[10px] font-black text-slate-700 uppercase">KTP DEPAN</span>
                            <p className="text-[8px] text-slate-450 max-w-[200px] mb-2 leading-tight">Klik atau seret file untuk mengunggah foto KTP Depan</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setKtpDepanImage)}
                              className="absolute inset-0 opacity-0 cursor-pointer print:hidden"
                            />
                          </div>
                        )}
                      </div>

                      {/* UPLOAD FILE KTP BELAKANG */}
                      <div className="border-2 border-dashed border-slate-400 p-4 rounded-lg bg-stone-50 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] group transition-all hover:bg-stone-100">
                        {ktpBelakangImage ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img src={ktpBelakangImage} alt="KTP Belakang" className="w-full max-h-[170px] object-contain rounded shadow-sm" />
                            <button
                              type="button"
                              onClick={() => setKtpBelakangImage(null)}
                              className="print:hidden absolute top-2 right-2 bg-red-600 text-white text-[9px] p-1 px-2.5 rounded hover:bg-red-700 shadow transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-center cursor-pointer relative w-full h-full">
                            <User size={32} className="text-slate-400 mb-1" />
                            <span className="font-sans text-[10px] font-black text-slate-705 uppercase">KTP BELAKANG</span>
                            <p className="text-[8px] text-slate-450 max-w-[200px] mb-2 leading-tight">Klik atau seret file untuk mengunggah foto KTP Belakang</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setKtpBelakangImage)}
                              className="absolute inset-0 opacity-0 cursor-pointer print:hidden"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="font-sans text-[10px] text-justify text-zinc-500 border-t pt-4 leading-snug">
                    * Berkas salinan Kartu Tanda Penduduk (KTP) ini digunakan sebagai syarat mutlak pencocokan Nomor Induk Kependudukan (NIK) pada aplikasi kementerian dan pembuatan rekening buku tabungan bank penyalur bantuan BSPS.
                  </div>
                </div>
              )}

              {/* LAMPIRAN KARTU KELUARGA (KK) */}
              {isPropChActive('p_kk') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-right font-mono font-bold text-[10px] border-b border-black pb-1 uppercase">PERSYARATAN ADMINISTRASI CPB</div>
                    <div className="text-center">
                      <h4 className="font-sans font-black text-sm uppercase">LAMPIRAN SALINAN KARTU KELUARGA (KK)</h4>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">DOKUMEN SUSUNAN ANGGOTA KELUARGA YANG KONSISTEN</p>
                    </div>

                    {/* UPLOAD FILE KK */}
                    <div className="border-2 border-dashed border-slate-400 p-6 rounded-lg bg-stone-50 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px] group transition-all hover:bg-stone-100">
                      {kkImage ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img src={kkImage} alt="Kartu Keluarga" className="w-full max-h-[340px] object-contain rounded shadow-sm" />
                          <button
                            type="button"
                            onClick={() => setKkImage(null)}
                            className="print:hidden absolute top-2 right-2 bg-red-600 text-white text-[10px] p-1 px-2.5 rounded hover:bg-red-700 shadow transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center cursor-pointer relative w-full h-full">
                          <ClipboardList size={48} className="text-slate-450 mb-3" />
                          <span className="font-sans text-xs font-black text-slate-700 uppercase">UPLOAD KARTU KELUARGA (KK)</span>
                          <p className="text-[10px] text-slate-450 max-w-sm mb-4 leading-relaxed mt-1">
                            Klik atau seret file gambar hasil scan / foto Kartu Keluarga (KK) asli untuk diunggah di sini secara aman.
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setKkImage)}
                            className="absolute inset-0 opacity-0 cursor-pointer print:hidden"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="font-sans text-[10px] text-justify text-zinc-500 border-t pt-4 leading-snug">
                    * Kartu Keluarga (KK) dilampirkan guna memberi jaminan kepastian hukum bahwa penerima stimulus perumahan swadaya benar-benar telah memiliki status rumahtangga mandiri (berkeluarga) dan tercatat resmi di Dinas Kependudukan Sipil Kab. Bima.
                  </div>
                </div>
              )}

              {/* FORMAT II-20 PERNYATAAN PENGHASILAN */}
              {isPropChActive('p_ii20') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-xs font-serif leading-relaxed text-justify">
                  <div className="text-right font-mono font-bold text-[10px] uppercase border-b border-black pb-1 mb-2">FORMAT II-20</div>
                  
                  <div className="text-center font-sans">
                    <h3 className="font-black text-sm uppercase tracking-wide">SURAT PERNYATAAN PENGHASILAN</h3>
                    <p className="font-mono text-[10px] font-bold text-stone-500">PROGRAM BANTUAN STIMULAN PERUMAHAN SWADAYA (BSPS) TAHUN 2026</p>
                  </div>

                  <p className="pt-2">Saya yang bertanda tangan di bawah ini :</p>
                  <table className="w-full text-xs font-serif pl-4 space-y-1">
                    <tbody>
                      <tr><td className="w-24 py-0.5">Nama</td><td className="w-4">:</td><td className="font-bold uppercase">{recipient.nama}</td></tr>
                      <tr><td className="py-0.5">NIK</td><td>:</td><td className="font-mono">{recipient.nik}</td></tr>
                      <tr><td className="py-0.5">Umur</td><td>:</td><td>{recipient.umur} Tahun</td></tr>
                      <tr><td className="py-0.5">Alamat</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
                      <tr><td className="py-0.5">Pekerjaan</td><td>:</td><td className="uppercase">{recipient.pekerjaan}</td></tr>
                    </tbody>
                  </table>

                  <p className="indent-8 pt-2">
                    Dengan ini menyatakan dan menerangkan bahwa penghasilan keluarga saya rata-rata sebesar <strong>{recipient.jumlahSwadayaUang}</strong> per bulan, sementara besaran Upah Minimum Kabupaten (UMK) Bima sebesar <strong>Rp. 2.767.580,-</strong> dan besaran Upah Minimum Provinsi (UMP) Nusa Tenggara Barat sebesar <strong>Rp. 2.673.861,-</strong>.
                  </p>
                  
                  <p>Surat pernyataan ini saya buat untuk melengkapi persyaratan administratif dalam pengusulan Bantuan Stimulan Perumahan Swadaya (BSPS) Tahun Anggaran {project.tahunAnggaran} sebagai klasifikasi Masyarakat Berpenghasilan Rendah (MBR).</p>
                  
                  <p>Demikian surat pernyataan ini saya buat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya.</p>

                  <div className="grid grid-cols-2 text-center text-xs pt-16 font-sans font-bold">
                    <div className="space-y-1">
                      <p>Mengetahui,</p>
                      <p>Kepala Desa {formatTitleCase(desa.desa || recipient.desa)}</p>
                      <div className="h-20"></div>
                      <p className="underline text-slate-1000 font-black">{formatNameWithGelar(desa.namaKepalaDesa)}</p>
                      <p className="text-[10px] font-mono opacity-60">NIAP. {desa.nipKepalaDesa || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-[10px] font-bold">{project.tahunSurat || '2026'}</p>
                      <p>Yang membuat pernyataan,</p>
                      <div className="h-20"></div>
                      <p className="underline text-slate-1100 font-black">{formatNameWithGelar(recipient.nama)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SURAT KETERANGAN KEPEMILIKAN LAHAN KADES */}
              {isPropChActive('p_lahan_kades') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-xs font-serif leading-relaxed text-justify">
                  <div className="border-b-4 border-black pb-3 text-center space-y-1">
                    <p className="font-sans font-black text-sm tracking-wide">KABUPATEN BIMA</p>
                    <p className="font-sans font-black text-xs tracking-wide">Kecamatan {formatTitleCase(desa.kecamatan || recipient.kecamatan)}</p>
                    <h3 className="font-sans font-black text-sm tracking-wider text-slate-900 border-2 border-black inline-block px-3 py-1 bg-stone-50">Kantor Desa {formatTitleCase(desa.desa || recipient.desa)}</h3>
                    <p className="font-mono text-[9px] text-zinc-500 uppercase font-bold">Alamat: Jalan Lintas {formatTitleCase(desa.desa || recipient.desa)}, Kecamatan {formatTitleCase(desa.kecamatan || recipient.kecamatan)}, Bima, NTB</p>
                  </div>

                  <div className="text-center py-2 space-y-1">
                    <h4 className="font-sans font-black text-xs uppercase underline tracking-wider">SURAT KETERANGAN KEPEMILIKAN/PENGUASAAN HAK ATAS TANAH</h4>
                    <p className="font-mono text-[9.5px]">Nomor: 590 / 024 / PEM-DESA / V / 2026</p>
                  </div>

                  <p>Yang bertanda tangan ini:</p>
                  <table className="w-full text-xs font-serif pl-4 space-y-0.5">
                    <tbody>
                      <tr><td className="w-24">Nama</td><td className="w-4">:</td><td className="font-bold text-slate-900">{formatNameWithGelar(desa.namaKepalaDesa)}</td></tr>
                      <tr><td>Jabatan</td><td>:</td><td className="font-bold">Kepala Desa {formatTitleCase(desa.desa || recipient.desa)}</td></tr>
                      <tr><td>Alamat</td><td>:</td><td>Kantor Kepala Desa {formatTitleCase(desa.desa || recipient.desa)}, Kecamatan {formatTitleCase(desa.kecamatan || recipient.kecamatan)}, Kab. Bima</td></tr>
                    </tbody>
                  </table>

                  <p className="pt-2">Berdasarkan surat tanah Desa, Kepala Desa {formatTitleCase(desa.desa || recipient.desa)}, Kecamatan {formatTitleCase(desa.kecamatan || recipient.kecamatan)}, Kabupaten Bima, Provinsi Nusa Tenggara Barat dengan ini menerangkan bahwa:</p>
                  
                  <div className="bg-stone-50 p-3 border-2 border-black rounded font-sans text-[11px] font-bold space-y-2 max-w-lg mx-auto shadow-[2px_2px_0px_#000]">
                    <div className="text-center font-black border-b border-black/20 pb-1 text-[11.5px] uppercase">POLA BATAS-BATAS KEPEMILIKAN LAHAN CPB:</div>
                    <p className="font-serif font-normal text-xs leading-snug">
                      Sebidang tanah kering seluas <strong>{recipient.luasTanah || '120'} m²</strong> milik/dikuasai secara sah oleh <strong>{formatNameWithGelar(recipient.nama)}</strong> yang berlokasi di Desa {formatTitleCase(desa.desa || recipient.desa)} dengan batas batas terdekat:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pl-4 leading-normal">
                      <div>🔼 UTARA: <span className="font-black text-slate-800">{customFields?.batasUtara || 'Tanah Kebun Awet'}</span></div>
                      <div>▶ TIMUR: <span className="font-black text-slate-800">{customFields?.batasTimur || 'Jalan Desa Utama'}</span></div>
                      <div>🔽 SELATAN: <span className="font-black text-slate-800">{customFields?.batasSelatan || 'Rumah Sdr. Mahfud'}</span></div>
                      <div>◀ BARAT: <span className="font-black text-slate-800">{customFields?.batasBarat || 'Sawah Sdr. Kurniadi'}</span></div>
                    </div>
                  </div>

                  <ol className="list-decimal pl-5 space-y-1 text-xs pt-1">
                    <li>Pemilik/penguasa tanah tersebut adalah warga Negara Indonesia, pekerjaan {recipient.pekerjaan}.</li>
                    <li>Tanah tersebut adalah benar atas nama {formatNameWithGelar(recipient.nama)} dan tidak menjadi perselisihan dengan pihak lain, baik mengenai haknya maupun batas-batasnya.</li>
                    <li>Tanah tersebut digunakan untuk pembangunan perumahan berkelanjutan bagi MBR.</li>
                  </ol>

                  <div className="flex justify-end pt-8 font-sans">
                    <div className="text-center w-64">
                      <p className="font-mono text-[9.5px] font-bold">{project.tahunSurat || '2026'}</p>
                      <p className="font-bold mt-1">Kepala Desa {formatTitleCase(desa.desa || recipient.desa)},</p>
                      <div className="h-16"></div>
                      <p className="font-black underline text-slate-950 font-bold">{formatNameWithGelar(desa.namaKepalaDesa)}</p>
                      <p className="text-[9.5px] font-mono opacity-60">NIAP. {desa.nipKepalaDesa || '-'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SURAT PERNYATAAN PENGUASAAN LAHAN DARI CPB */}
              {isPropChActive('p_lahan_cpb') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-xs font-serif leading-relaxed text-justify">
                  <div className="text-right font-mono font-bold text-[10px] uppercase border-b border-black pb-1 mb-2 font-bold text-stone-500">BERKAS MANDIRI PENERIMA</div>
                  
                  <div className="text-center font-sans">
                    <h3 className="font-black text-sm uppercase tracking-wide">SURAT PERNYATAAN PENGUASAAN HAK ATAS TANAH</h3>
                    <p className="font-mono text-[10px] font-bold text-stone-500">OLEH CALON PENERIMA BANTUAN (CPB) BSPS</p>
                  </div>

                  <p className="pt-2">Yang bertanda tangan di bawah ini:</p>
                  <table className="w-full text-xs font-serif pl-4 space-y-1">
                    <tbody>
                      <tr><td className="w-32 py-0.5">Nama</td><td className="w-4">:</td><td className="font-bold uppercase">{recipient.nama}</td></tr>
                      <tr><td className="py-0.5">Tempat/Tgl. Lahir</td><td>:</td><td>BIMA, 05-02-1981</td></tr>
                      <tr><td className="py-0.5">NIK</td><td>:</td><td className="font-mono">{recipient.nik}</td></tr>
                      <tr><td className="py-0.5">Alamat</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
                    </tbody>
                  </table>

                  <p className="indent-8">
                    Dengan ini menyatakan bahwa saya menguasai sebidang tanah dengan luas <strong>{recipient.luasTanah || '120'} m²</strong> dengan batas-batas pengaman: Utara <strong>{customFields?.batasUtara || 'Tanah Kebun Awet'}</strong>, Timur <strong>{customFields?.batasTimur || 'Jalan Desa Utama'}</strong>, Selatan <strong>{customFields?.batasSelatan || 'Rumah Sdr. Mahfud'}</strong>, dan Barat <strong>{customFields?.batasBarat || 'Sawah Sdr. Kurniadi'}</strong>.
                  </p>
                  <p>Tanah tersebut hingga saat ini tidak menjadi sengketa dengan pihak lain baik mengenai kepemilikannya maupun batas-batasnya dan berhak menempati tanah tersebut selama sekurang-kurangnya hingga 10 tahun setelah selesai pekerjaan fisik BSPS.</p>

                  {/* SIGNATURE GRID */}
                  <div className="border-2 border-black p-4 rounded bg-stone-50 font-sans text-[10px] space-y-4 mt-8">
                    <div className="grid grid-cols-2 text-center font-bold">
                      <div>
                        <p>Saksi-Saksi:</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div className="space-y-1">
                            <span>Saksi 1</span>
                            <div className="h-10"></div>
                            <span className="underline uppercase block font-medium">({customFields?.saksi1 || 'NURSYAH'})</span>
                          </div>
                          <div className="space-y-1">
                            <span>Saksi 2</span>
                            <div className="h-10"></div>
                            <span className="underline uppercase block font-medium">({customFields?.saksi2 || 'ABUBAKAR'})</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="block">Calon Penerima Bantuan,</span>
                        <div className="h-14"></div>
                        <span className="underline uppercase block text-slate-900 font-extrabold">{recipient.nama}</span>
                      </div>
                    </div>
                    <div className="border-t border-black/20 pt-3">
                      <p className="text-center font-bold mb-2">Diketahui Oleh Anggota Keluarga:</p>
                      <div className="grid grid-cols-2 text-center font-medium">
                        <div className="space-y-1">
                          <span>Keluarga 1 (Anak)</span>
                          <div className="h-10"></div>
                          <span className="underline uppercase block">({customFields?.keluarga1 || 'REZA ADITYA'})</span>
                        </div>
                        <div className="space-y-1">
                          <span>Keluarga 2 (Istri)</span>
                          <div className="h-10"></div>
                          <span className="underline uppercase block">({customFields?.keluarga2 || 'SALMAH SYAM'})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FORMAT II-22 PERNYATAAN CPB */}
              {isPropChActive('p_ii22') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-xs font-serif leading-relaxed text-justify">
                  <div className="text-right font-mono font-bold text-[10px] uppercase border-b border-black pb-1 mb-2">FORMAT II-22</div>
                  
                  <div className="text-center font-sans">
                    <h3 className="font-black text-sm uppercase tracking-wide">SURAT PERNYATAAN MENGIKUTI PROGRAM BSPS</h3>
                    <p className="font-mono text-[10px] font-bold text-stone-500">PERNYATAAN KESELARASAN DAN TANGGUNG JAWAB MUTLAK CPB</p>
                  </div>

                  <p className="pt-2">Saya yang bertanda tangan di bawah ini :</p>
                  <table className="w-full text-xs font-serif pl-4 space-y-0.5">
                    <tbody>
                      <tr><td className="w-24">Nama</td><td className="w-4">:</td><td className="font-bold uppercase">{recipient.nama}</td></tr>
                      <tr><td>Umur</td><td>:</td><td>{recipient.umur} Tahun</td></tr>
                      <tr><td>Pekerjaan</td><td>:</td><td>{recipient.pekerjaan}</td></tr>
                      <tr><td>Alamat</td><td>:</td><td>{recipient.alamatSecaraLengkap}</td></tr>
                    </tbody>
                  </table>

                  <p>Dengan ini menyatakan:</p>
                  <ol className="list-decimal pl-5 space-y-1 text-xs">
                    <li>Memiliki keterbatasan daya beli karena berpenghasilan rendah;</li>
                    <li>Memiliki tanah/menguasai tanah*) dengan bukti legal dan tidak dalam status sengketa;</li>
                    <li>Memiliki dan menempati satu-satunya rumah dengan kondisi tidak layak huni minimal 3 tahun terakhir;</li>
                    <li>Belum pernah memperoleh program bantuan pembangunan rumah swadaya dalam 10 tahun terakhir;</li>
                    <li>Bersedia mengikuti ketentuan program dan tidak mengundurkan diri;</li>
                    <li>Bersedia menerima dan menggunakan dana bantuan untuk pembelian bahan bangunan senilai {formatRupiah(recipient.limitBantuanBahan)} serta upah tukang senilai {formatRupiah(recipient.limitBantuanUpah)};</li>
                    <li>Akan menghuni rumah yang telah dibangun/ditingkatkan kualitasnya melalui BSPS;</li>
                    <li>Bersedia diaudit oleh pihak yang berwenang;</li>
                    <li>Memberi kuasa kepada PPK untuk melihat mutasi isi rekening bantuan; dan</li>
                    <li>Bersedia menerima sanksi apabila menyalahgunakan pemanfaatan alokasi dana bantuan.</li>
                  </ol>

                  <div className="grid grid-cols-2 text-center text-xs pt-16 font-sans font-bold">
                    <div className="space-y-1">
                      <p>Mengetahui,</p>
                      <p className="uppercase">Kepala Desa {desa.desa}</p>
                      <div className="h-16"></div>
                      <p className="underline uppercase">{desa.namaKepalaDesa}</p>
                      <p className="text-[10px] font-mono opacity-60">NIP. {desa.nipKepalaDesa || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-[9.5px] font-bold">{recipient.desa}, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
                      <p>Yang menyatakan,</p>
                      <div className="h-16"></div>
                      <p className="underline uppercase">{recipient.nama}</p>
                      <p className="text-[10px] font-mono opacity-60">NIK. {recipient.nik}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* FORMAT II-12 IDENTIFIKASI KESWADAYAAN */}
              {isPropChActive('p_ii12') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-xs font-serif leading-relaxed text-justify">
                  <div className="text-right font-mono font-bold text-[10px] uppercase border-b border-black pb-1 mb-2">FORMAT II-12</div>
                  
                  <div className="text-center font-sans">
                    <h3 className="font-black text-sm uppercase tracking-wide">IDENTIFIKASI KESWADAYAAN CPB</h3>
                    <p className="font-mono text-[10px] font-bold text-stone-500">ANALISA POTENSI SWADAYA DANA DAN BAHAN LOKAL</p>
                  </div>

                  <table className="w-full text-xs font-mono font-bold leading-normal bg-stone-50 border p-3 rounded mb-2">
                    <tbody>
                      <tr><td className="w-32 opacity-75">NAMA CPB</td><td className="w-4">:</td><td className="uppercase text-slate-900">{formatNameWithGelar(recipient.nama)}</td></tr>
                      <tr><td className="opacity-75">NIK</td><td>:</td><td>{recipient.nik}</td></tr>
                      <tr><td className="opacity-75">ALAMAT CPB</td><td>:</td><td className="uppercase text-slate-800">{recipient.alamatSecaraLengkap}</td></tr>
                    </tbody>
                  </table>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* BENTUK SWADAYA 1 */}
                    <div className="border border-black p-2.5 rounded space-y-1.5 bg-[#FAF9F6]">
                      <div className="font-sans font-extrabold text-[10px] border-b border-black pb-0.5 uppercase flex justify-between">
                        <span>1. TABUNGAN TUNAI</span>
                        <span className="text-emerald-950 font-black">{recipient.jumlahSwadayaUang}</span>
                      </div>
                      
                      <div className="h-28 border border-dashed border-slate-450 bg-white rounded relative overflow-hidden flex flex-col items-center justify-center p-1 text-center font-sans hover:bg-stone-50 transition-colors">
                        {swadaya1Image ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img src={swadaya1Image} alt="Swadaya 1" className="w-full h-full object-cover rounded" />
                            <button
                              type="button"
                              onClick={() => setSwadaya1Image(null)}
                              className="print:hidden absolute top-1 right-1 bg-red-650 text-white text-[8px] p-0.5 px-1.5 rounded hover:bg-red-700 shadow"
                            >
                              Hapus
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center cursor-pointer p-2 w-full h-full relative">
                            <span className="text-[8.5px] font-sans font-black text-slate-700 uppercase">UPLOAD FOTO</span>
                            <span className="text-[7.5px] text-zinc-500 mt-0.5 font-bold">[ BUKU TABUNGAN CPB ]</span>
                            <p className="text-[6.5px] text-zinc-400 mt-1 max-w-[130px] leading-tight">Klik untuk menyeret screenshot rekening tabungan</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setSwadaya1Image)}
                              className="absolute inset-0 opacity-0 cursor-pointer print:hidden"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-[8.5px] font-sans text-stone-500 leading-tight">Bukti kepemilikan dana swadaya tunai awal guna mendukung pembiayaan di luar bantuan.</p>
                    </div>

                    {/* BENTUK SWADAYA 2 */}
                    <div className="border border-black p-2.5 rounded space-y-1.5 bg-[#FAF9F6]">
                      <div className="font-sans font-extrabold text-[10px] border-b border-black pb-0.5 uppercase flex justify-between">
                        <span>2. MATERIAL PERSENDAAN</span>
                        <span className="text-amber-955 font-mono text-[9px]">Sisa Pakai Kayu & Batu</span>
                      </div>

                      <div className="h-28 border border-dashed border-slate-450 bg-white rounded relative overflow-hidden flex flex-col items-center justify-center p-1 text-center font-sans hover:bg-stone-50 transition-colors">
                        {swadaya2Image ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img src={swadaya2Image} alt="Swadaya 2" className="w-full h-full object-cover rounded" />
                            <button
                              type="button"
                              onClick={() => setSwadaya2Image(null)}
                              className="print:hidden absolute top-1 right-1 bg-red-655 text-white text-[8px] p-0.5 px-1.5 rounded hover:bg-red-700 shadow"
                            >
                              Hapus
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center cursor-pointer p-2 w-full h-full relative">
                            <span className="text-[8.5px] font-sans font-black text-slate-705 uppercase">UPLOAD FOTO</span>
                            <span className="text-[7.5px] text-zinc-505 mt-0.5 font-bold">[ MATERIAL PENUNJANG ]</span>
                            <p className="text-[6.5px] text-zinc-400 mt-1 max-w-[130px] leading-tight">Klik untuk menyeret foto material/persediaan lapangan</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setSwadaya2Image)}
                              className="absolute inset-0 opacity-0 cursor-pointer print:hidden"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-[8.5px] font-sans text-stone-500 leading-tight">Material batu pondasi sisa pagar dan beberapa kayu tiang simpanan layak pakai kembali.</p>
                    </div>
                  </div>

                  <div className="border border-black bg-stone-50 p-3 rounded mt-4">
                    <p className="font-sans font-extrabold text-[9.5px] uppercase border-b pb-1 mb-1.5">7. BENTUK KESWADAYAAN TENAGA DAN DUKUNGAN SOSIAL LAINNYA:</p>
                    <div className="grid grid-cols-4 gap-2 text-center text-[8.5px] font-sans font-bold leading-tight">
                      <div className="border p-1 bg-white">
                        <span className="opacity-65 block">DUKUNGAN KELUARGA</span>
                        <span className="text-emerald-800">SANGAT AKTIF</span>
                      </div>
                      <div className="border p-1 bg-white">
                        <span className="opacity-65 block">ROYONG KCPB</span>
                        <span className="text-emerald-800">4 HARI/MINGGU</span>
                      </div>
                      <div className="border p-1 bg-white">
                        <span className="opacity-65 block">GOTONG WARGA</span>
                        <span className="text-emerald-800">TETANGGA SIAP</span>
                      </div>
                      <div className="border p-1 bg-white">
                        <span className="opacity-65 block">LAIN-LAIN</span>
                        <span className="text-slate-500">KAYU KEBUN</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 text-center text-[10px] pt-12 font-sans font-bold">
                    <div className="space-y-1">
                      <p>Didampingi Oleh,</p>
                      <p className="underline text-slate-950 font-black">{formatNameWithGelar(tfl.namaTfl)}</p>
                      <p className="text-[8px] font-mono opacity-60">Tenaga Fasilitator Lapangan</p>
                    </div>
                    <div className="space-y-1">
                      <p>Mengetahui Kades,</p>
                      <p className="underline text-slate-950 font-black">{formatNameWithGelar(desa.namaKepalaDesa)}</p>
                      <p className="text-[8px] font-mono opacity-60">Kepala Desa {formatTitleCase(desa.desa || recipient.desa)}</p>
                    </div>
                    <div className="space-y-1">
                      <p>Dibuat Oleh CPB,</p>
                      <p className="underline text-slate-950 font-black">{formatNameWithGelar(recipient.nama)}</p>
                      <p className="text-[8px] font-mono opacity-60">Calon Penerima Bantuan</p>
                    </div>
                  </div>
                </div>
              )}

              {/* FORMAT II-3 LEMBAR VERIFIKASI KELAYAKAN RTLH */}
              {isPropChActive('p_ii3') && (
                <div className="border border-slate-300 p-6 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-[10px] font-serif leading-relaxed">
                  <div className="text-right font-mono font-black text-[9px] uppercase border-b border-black pb-1 mb-1">FORMAT II-3</div>
                  
                  <div className="text-center font-sans space-y-0.5">
                    <h3 className="font-extrabold text-[12px] uppercase">LEMBAR VERIFIKASI CALON PENERIMA BANTUAN</h3>
                    <p className="font-mono text-[8.5px] font-bold text-stone-500 uppercase">IDENTIFIKASI KOMPONEN KELAYAKAN KONSTRUKSI RUMAH</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[8px] font-sans font-bold leading-normal bg-stone-50 p-2 border rounded">
                    <div className="space-y-0.5">
                      <div>Nama Calon Penerima : <span className="uppercase text-[#222] font-black">{recipient.nama}</span></div>
                      <div>NIK : <span>{recipient.nik}</span></div>
                      <div>Nomor Kartu Keluarga : <span>5206082502800002</span></div>
                      <div>Jenis Kelamin / Umur : <span>Laki-Laki / {recipient.umur} Thn</span></div>
                      <div>Alamat Sesuai KK : <span className="uppercase text-[7.5px] font-mono">{recipient.alamatSecaraLengkap}</span></div>
                    </div>
                    <div className="space-y-0.5 text-right font-mono text-[8px]">
                      <div>Penghasilan KK Per Bulan : <span>{recipient.jumlahSwadayaUang}</span></div>
                      <div>UMK Bima / NTB : <span>Rp 2.767.580,-</span></div>
                      <div>Pernah Dapat Bantuan : <span>TIDAK PERNAH</span></div>
                      <div>Waktu Menghuni Rumah : <span>6 Tahun</span></div>
                      <div>Titik Koordinat Target : <span className="text-blue-900 font-extrabold">-8.3541 LU, 118.9102 BT</span></div>
                    </div>
                  </div>

                  {/* MASTER VERIFICATION GRID */}
                  <table className="w-full text-[8.5px] border border-black font-sans leading-tight">
                    <thead>
                      <tr className="bg-slate-100 border-b border-black text-center font-black uppercase text-[8px]">
                        <th className="p-1 border-r border-black w-24">KOMPONEN FISIK</th>
                        <th className="p-1 border-r border-black w-32">KONDISI A (BAIK)</th>
                        <th className="p-1 border-r border-black w-32">KONDISI B (RUSAK SEBAGIAN)</th>
                        <th className="p-1 border-r border-black w-32">KONDISI C (RUSAK TOTAL)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Structure Aspect */}
                      <tr className="bg-slate-50 font-black"><td colSpan={4} className="p-1 text-[8px] uppercase border-b border-black tracking-wider">1. DETAIL STRUKTUR UTAMA</td></tr>
                      {structVerif.map((v, i) => (
                        <tr key={i} className="border-b border-black">
                          <td className="p-1 border-r border-black font-mono font-bold">{v.comp}</td>
                          <td className="p-1 border-r border-black text-center">{v.a ? '✅ (BAIK)' : '-'}</td>
                          <td className="p-1 border-r border-black text-center font-bold text-amber-900">{v.b ? '✔ (RUSAK SEBAGIAN)' : '-'}</td>
                          <td className="p-1 border-r border-black text-center font-bold text-red-900 bg-red-50/10">{v.c ? '✔ (RUSAK TOTAL)' : '-'}</td>
                        </tr>
                      ))}
                      
                      {/* Non-Structure Aspect */}
                      <tr className="bg-slate-50 font-black"><td colSpan={4} className="p-1 text-[8px] uppercase border-b border-black tracking-wider">2. DETAIL NON-STRUKTUR (KULIT)</td></tr>
                      {nonStructVerif.map((v, i) => (
                        <tr key={i} className="border-b border-black">
                          <td className="p-1 border-r border-black font-mono font-bold">{v.comp}</td>
                          <td className="p-1 border-r border-black">{v.textA}</td>
                          <td className={`p-1 border-r border-black text-center ${v.sel === 'B' ? 'font-black text-amber-900 font-bold bg-amber-50/10' : 'opacity-40'}`}>{v.textB}</td>
                          <td className={`p-1 border-r border-black text-center ${v.sel === 'C' ? 'font-black text-red-900 font-bold bg-red-50/10' : 'opacity-40'}`}>{v.textC}</td>
                        </tr>
                      ))}

                      {/* Health Aspect */}
                      <tr className="bg-slate-50 font-black"><td colSpan={4} className="p-1 text-[8px] uppercase border-b border-black tracking-wider">3. PARAMETER KESEHATAN RUMAH</td></tr>
                      {healthVerif.map((v, i) => (
                        <tr key={i} className="border-b border-black">
                          <td className="p-1 border-r border-black font-mono font-bold">{v.comp}</td>
                          <td className={`p-1 border-r border-black pl-1 ${v.sel === 'A' ? 'font-black text-emerald-900 font-bold bg-emerald-50/10' : 'opacity-40'}`}>{v.textA}</td>
                          <td className={`p-1 border-r border-black pl-1 text-center ${v.sel === 'B' ? 'font-black text-amber-900 font-bold bg-amber-50/10' : 'opacity-45'}`}>{v.textB}</td>
                          <td className={`p-1 border-r border-black pl-1 text-center ${v.sel === 'C' ? 'font-black text-red-900 font-bold bg-red-50/10' : 'opacity-45'}`}>{v.textC || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* CONCLUSION PAGE 12 IN PDF */}
                  <div className="border border-black p-2.5 rounded bg-yellow-50/30 text-[8px] leading-tight space-y-1 font-sans font-bold">
                    <p className="uppercase text-[9px] font-black border-b border-black/15 pb-0.5">KESIMPULAN DAN REKOMENDASI PENGUJI LAPANGAN:</p>
                    <p className="font-normal font-serif text-[8.5px]">
                      Sesuai hasil peninjauan dan perhitungan fisik di lapangan, komponen struktur mengalami kerusakan total (kolom, ring balok) dan kulit pengisi rusak berat (dinding dari anyaman rapuh). Rumah diklasifikasikan sebagai <strong>RUMAH TIDAK LAYAK HUNI (RTLH) - RUSAK BERAT (A)</strong> dan SANGAT DIREKOMENDASIKAN untuk menerima stimulus bantuan BSPS senilai <strong>Rp 20.000.000,-</strong>.
                    </p>
                    <div className="grid grid-cols-3 text-center text-[7.5px] pt-4 font-bold uppercase gap-2">
                      <div>Diperiksa Korkab:<br /><br />(<span className="underline">{tfl.koordinatorKabupaten}</span>)</div>
                      <div>Calon Penerima:<br /><br />(<span className="underline">{recipient.nama}</span>)</div>
                      <div>Didampingi TFL:<br /><br />(<span className="underline">{tfl.namaTfl}</span>)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* FORMAT II-13 RENCANA TEKNIS */}
              {isPropChActive('p_ii13') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-xs font-serif leading-relaxed">
                  <div className="text-right font-mono font-bold text-[10px] uppercase border-b border-black pb-1 mb-2">FORMAT II-13</div>
                  
                  <div className="text-center font-sans space-y-0.5 mb-2">
                    <h3 className="font-black text-sm uppercase">RENCANA TEKNIS PEMBANGUNAN RUMAH INDIVIDU</h3>
                    <p className="font-mono text-[10px] font-bold text-stone-500 uppercase">TIPIKAL DESAIN RUMAH TIPOLOGI LAYAK HUNI BSPS 6.0 X 6.0 M</p>
                  </div>

                  <table className="w-full text-[9px] font-mono font-bold uppercase bg-stone-50/50 p-2.5 border rounded">
                    <tbody>
                      <tr><td className="w-32 opacity-70">NAMA CALON PENERIMA</td><td>:</td><td className="text-slate-900 font-black">{recipient.nama}</td></tr>
                      <tr><td className="opacity-70">NIK PENERIMA</td><td>:</td><td>{recipient.nik}</td></tr>
                      <tr><td className="opacity-70">KABUPATEN / DESA</td><td>:</td><td>BIMA / DESA {desa.desa}</td></tr>
                    </tbody>
                  </table>

                  {/* SVG DRAWING LAYOUT DESIGN */}
                  <div className="border-4 border-black p-4 rounded bg-[#FAF9F6] space-y-3">
                    <div className="text-center font-sans font-black text-[10.5px] uppercase tracking-wide border-b pb-1">
                      DESAIN USULAN DENAH RUMAH KOKOH SEHAT (NTS)
                    </div>
                    
                    <div className="mx-auto w-full max-w-sm aspect-video border-2 border-slate-700 bg-white relative p-4 font-mono text-[7px] font-bold flex flex-col justify-between shadow-inner">
                      {/* Grid representation */}
                      <div className="absolute inset-0 bg-stone-50/50 grid grid-cols-12 grid-rows-6 opacity-30 pointer-events-none">
                        {Array.from({ length: 72 }).map((_, i) => (
                          <div key={i} className="border border-stone-200/50"></div>
                        ))}
                      </div>
                      
                      <div className="text-center text-[7.5px] font-extrabold uppercase border-b pb-1 text-slate-800 tracking-wider">
                        LAYOUT DENAH AKHIR: LEBAR 6.00 M X PANJANG 6.00 M
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 h-full py-1.5 px-4">
                        <div className="border-2 border-dashed border-slate-400 p-2 text-center rounded bg-slate-50 flex items-center justify-center font-black">
                          KAMAR TIDUR I<br />(3.00 x 3.00 M)
                        </div>
                        <div className="border-2 border-dashed border-slate-400 p-2 text-center rounded bg-slate-50 flex items-center justify-center font-black">
                          KAMAR TIDUR II<br />(3.00 x 3.00 M)
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-center px-4 font-bold">
                        <div className="p-1 uppercase tracking-wider text-slate-400 font-extrabold">RUANG KELUARGA UTAMA</div>
                        <div className="border-2 border-dashed border-red-400 text-red-900 bg-red-50/30 p-1 rounded font-black text-[6.5px] uppercase">
                          MANDI / WC SEHAT<br />(1.50 x 1.50 M)
                        </div>
                      </div>

                      <div className="flex justify-between items-end border-t border-dashed pt-1 opacity-75 text-[6.5px]">
                        <span>TFL: {tfl.namaTfl}</span>
                        <span className="text-blue-900 uppercase">USULAN STRUKTUR AMAN GEMPA</span>
                      </div>
                    </div>
                  </div>

                  {/* STRUCTURAL SPEC PARAMETERS */}
                  <div className="grid grid-cols-2 gap-3 font-sans text-[9px] font-bold">
                    <div className="border p-2 bg-stone-50 rounded">
                      <p className="border-b pb-0.5 mb-1 text-red-900 uppercase font-black">1. STRUKTUR UTAMA SEHAT (USULAN):</p>
                      <ul className="space-y-0.5 list-disc pl-3">
                        <li>Pondasi: Rolag batu kali dalam 55cm, semen adukan 1 SP: 4 PP</li>
                        <li>Sloof Beton: Dimensi 15/20cm, besi utama 4D10, sengkang D6-150</li>
                        <li>Pilar/Kolom: Beton praktis 15/15cm, cor readymix manual</li>
                        <li>Atap: Rangka balok kayu klas II awet, atap seng gelombang BJLS</li>
                      </ul>
                    </div>
                    <div className="border p-2 bg-stone-50 rounded">
                      <p className="border-b pb-0.5 mb-1 text-emerald-900 uppercase font-black">2. PARAMETER KESEHATAN RUMAH:</p>
                      <ul className="space-y-0.5 list-disc pl-3">
                        <li>Sirkulasi udara: Luas lubang ventilasi 11.5% dari luas lantai</li>
                        <li>Penerangan: Luas jendela terbuka 15% dari luas lantai</li>
                        <li>Sanitasi: Water closet leher angsa, tangki septik limbah 2 m</li>
                        <li>Air Minum: Akses galian sumur dangkal berjarak 11m dari septic tank</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 text-center text-[10px] pt-8 font-sans font-bold">
                    <div className="space-y-1">
                      <p>Fasilitator Pendamping,</p>
                      <div className="h-14"></div>
                      <p className="underline uppercase">{tfl.namaTfl}</p>
                      <p className="text-[8px] font-mono opacity-60">Tenaga Fasilitator Lapangan</p>
                    </div>
                    <div className="space-y-1">
                      <p>Pemohon Calon Penerima,</p>
                      <div className="h-14"></div>
                      <p className="underline uppercase">{recipient.nama}</p>
                      <p className="text-[8px] font-mono opacity-60">NIK. {recipient.nik}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* FORMAT II-14 RENCANA ANGGARAN BIAYA (RAB DI DETAIL) */}
              {isPropChActive('p_ii14') && (
                <div className="border border-slate-300 p-8 min-h-[820px] bg-white shadow-sm break-after-page space-y-4 text-xs font-serif leading-relaxed">
                  <div className="text-right font-mono font-bold text-[10px] uppercase border-b border-black pb-1 mb-2">FORMAT II-14</div>
                  
                  <div className="text-center font-sans space-y-0.5">
                    <h3 className="font-black text-sm uppercase">RENCANA ANGGARAN BIAYA (RAB) PKRS</h3>
                    <p className="font-mono text-[10px] font-bold text-stone-500 uppercase">RINCIAN BAHAN BANGUNAN STIMULAN DAN SWADAYA MANDIRI</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[8px] font-sans font-bold leading-normal">
                    <div>
                      <div>NAMA CPB : <span className="uppercase text-[#111] font-black">{recipient.nama}</span></div>
                      <div>NIK : <span>{recipient.nik}</span></div>
                      <div>LOKASI RUMAH : <span className="uppercase">{recipient.alamatSecaraLengkap}</span></div>
                    </div>
                    <div className="text-right font-mono text-[8.5px]">
                      <div>LIMIT DANA BAHAN : <span className="text-emerald-950 font-black">{formatRupiah(recipient.limitBantuanBahan)}</span></div>
                      <div>LIMIT GUNA UPAH : <span className="text-emerald-950 font-black">{formatRupiah(recipient.limitBantuanUpah)}</span></div>
                      <div>ALOKASI TOTAL : <span className="text-emerald-950 font-black">Rp 20.000.000,-</span></div>
                    </div>
                  </div>

                  <table className="w-full text-[8.5px] border border-black font-sans leading-tight text-left">
                    <thead>
                      <tr className="bg-slate-100 border-b border-black text-center font-black uppercase text-[8px]">
                        <th className="p-1 border-r border-black w-8">No</th>
                        <th className="p-1 border-r border-black pl-1">Uraian Nama Barang Material</th>
                        <th className="p-1 border-r border-black w-14">Volume</th>
                        <th className="p-1 border-r border-black w-12">Satuan</th>
                        <th className="p-1 border-r border-black w-20">Harga Satuan</th>
                        <th className="p-1 w-24">Jumlah Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boqItems.length > 0 ? (
                        boqItems.slice(0, 7).map((item, index) => (
                          <tr key={item.id} className="border-b border-black">
                            <td className="p-1 border-r border-black font-mono text-center">{index + 1}</td>
                            <td className="p-1 border-r border-black font-black uppercase text-slate-900">{item.namaBarang}</td>
                            <td className="p-1 border-r border-black text-center font-mono">{item.volume}</td>
                            <td className="p-1 border-r border-black text-center uppercase font-black">{item.satuan}</td>
                            <td className="p-1 border-r border-black font-mono text-right">{formatRupiah(item.hargaSatuan)}</td>
                            <td className="p-1 font-mono text-right font-black">{formatRupiah(item.jumlah)}</td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr className="border-b border-black text-[8px]">
                            <td className="p-1 border-r border-black font-mono text-center">1</td>
                            <td className="p-1 border-r border-black font-bold">PORTLAND SEMEN (GRESIK) @40KG/50KG</td>
                            <td className="p-1 border-r border-black text-center font-mono">105</td>
                            <td className="p-1 border-r border-black text-center uppercase font-bold">Zak</td>
                            <td className="p-1 border-r border-black font-mono text-right">Rp 75.000</td>
                            <td className="p-1 font-mono text-right font-bold">Rp 7.875.000</td>
                          </tr>
                          <tr className="border-b border-black text-[8px]">
                            <td className="p-1 border-r border-black font-mono text-center">2</td>
                            <td className="p-1 border-r border-black font-bold">BESI BETON STRUKTUR ULIR Φ10 MM SNI</td>
                            <td className="p-1 border-r border-black text-center font-mono">45</td>
                            <td className="p-1 border-r border-black text-center uppercase font-bold">Btg</td>
                            <td className="p-1 border-r border-black font-mono text-right">Rp 110.000</td>
                            <td className="p-1 font-mono text-right font-bold">Rp 4.950.000</td>
                          </tr>
                          <tr className="border-b border-black text-[8px]">
                            <td className="p-1 border-r border-black font-mono text-center">3</td>
                            <td className="p-1 border-r border-black font-bold">KAYU KUSEN DAN RANGKA BALOK AWET 10/10</td>
                            <td className="p-1 border-r border-black text-center font-mono">15</td>
                            <td className="p-1 border-r border-black text-center uppercase font-bold">Btg</td>
                            <td className="p-1 border-r border-black font-mono text-right">Rp 250.000</td>
                            <td className="p-1 font-mono text-right font-bold">Rp 3.750.000</td>
                          </tr>
                        </>
                      )}
                      
                      {/* SUB TOTALS */}
                      <tr className="bg-stone-50 font-bold border-t-2 border-black border-collapse">
                        <td colSpan={5} className="p-1.5 border-r border-black text-right uppercase font-mono tracking-tight text-slate-900 font-extrabold text-[8.5px]">Total Anggaran Belanja Bahan (DRPB):</td>
                        <td className="p-1.5 font-mono text-right text-emerald-950 font-black bg-emerald-50/10 border-b border-black">
                          {formatRupiah(boqItems.length > 0 ? boqItems.reduce((acc, curr) => acc + curr.jumlah, 0) : 16575000)}
                        </td>
                      </tr>
                      <tr className="bg-stone-50 font-bold border-collapse">
                        <td colSpan={5} className="p-1.5 border-r border-black text-right uppercase font-mono tracking-tight text-slate-900 font-extrabold text-[8.5px]">Alokasi Biaya Upah Tukang Dampingan:</td>
                        <td className="p-1.5 font-mono text-right text-emerald-950 font-black bg-emerald-50/10 border-b border-black">
                          {formatRupiah(recipient.limitBantuanUpah)}
                        </td>
                      </tr>
                      <tr className="bg-stone-100 font-bold border-collapse font-black text-stone-900 text-[9px]">
                        <td colSpan={5} className="p-1.5 border-r border-black text-right uppercase font-mono tracking-tight font-black text-[8.5px]">GRAND TOTAL KONTRAK PROGRAM STIMULAN CPB:</td>
                        <td className="p-1.5 font-mono text-right text-emerald-900 font-black bg-emerald-100/25 border-b-2 border-dashed border-black">
                          {formatRupiah((boqItems.length > 0 ? boqItems.reduce((acc, curr) => acc + curr.jumlah, 0) : 16575000) + recipient.limitBantuanUpah)}
                        </td>
                      </tr>
                    </tbody>
                  </table>



                  <div className="grid grid-cols-2 text-center text-[10px] pt-8 font-sans font-bold">
                    <div className="space-y-1">
                      <p>Mengetahui Kades,</p>
                      <div className="h-14"></div>
                      <p className="underline uppercase">{desa.namaKepalaDesa}</p>
                      <p className="text-[8px] font-mono opacity-60">Kepala Desa {desa.desa}</p>
                    </div>
                    <div className="space-y-1">
                      <p>Diverifikasi Oleh TFL,</p>
                      <div className="h-14"></div>
                      <p className="underline uppercase">{tfl.namaTfl}</p>
                      <p className="text-[8px] font-mono opacity-60">Tenaga Fasilitator Lapangan</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )
      })()}

      {/* 19. FORMAT II-51 LAPORAN MINGGUAN TFL */}
      {state.selectedFormat === 'FORMAT_II_51' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LAPORAN MINGGUAN TENAGA FASILITATOR LAPANGAN (TFL)
          </div>

          <div className="grid grid-cols-2 text-xs bg-slate-50 p-2.5 border rounded gap-x-4 font-serif">
            <div>Kabupaten: <strong>{desa.kabupaten}</strong></div>
            <div>Nama TFL: <strong>{tfl.namaTfl}</strong></div>
            <div>Provinsi: <strong>{desa.provinsi}</strong></div>
            <div>Minggu Ke: <strong>03 (Tiga)</strong></div>
            <div>Bulan: <strong>{project.bulanSurat} {project.tahunSurat}</strong></div>
            <div>Lokasi Dampingan: <strong>Desa {desa.desa}</strong></div>
          </div>

          <table className="w-full text-[10px] border border-black text-center text-slate-800">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <th className="py-1 border-r border-black w-8">No</th>
                <th className="py-1 border-r border-black w-32">Waktu (Hari, Tanggal)</th>
                <th className="py-1 border-r border-black text-left pl-1">Kegiatan Lapangan</th>
                <th className="py-1 border-r border-black text-left pl-1">Hasil Target Kegiatan</th>
                <th className="py-1 w-20">Tempat</th>
              </tr>
            </thead>
            <tbody>
              {[
                { hari: 'Senin, 10 Feb 2026', act: 'Rembuk sosialisasi awal CPB', res: 'Terbentuk pengurus KPB', loc: 'Aula Desa' },
                { hari: 'Selasa, 11 Feb 2026', act: 'Memverifikasi status tanah basah', res: 'Batas tanah sah terpetakan', loc: 'Lahan CPB' },
                { hari: 'Rabu, 12 Feb 2026', act: 'Survei kesiapan toko lokal', res: 'Tiga toko sedia memasok', loc: 'UD. Karya Agung' },
                { hari: 'Kamis, 13 Feb 2026', act: 'Rembuk warga pemilihan toko', res: 'KPB sepakat menunjuk Toko 1', loc: 'Rumah Ketua KPB' },
                { hari: 'Jumat, 14 Feb 2026', act: 'Penyusunan RAB perbaikan rumah', res: 'Penyelesaian daftar DRPB', loc: 'Sekretariat KPB' },
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-black text-left">
                  <td className="py-1 border-r border-black text-center font-mono">{idx + 1}</td>
                  <td className="py-1 border-r border-black text-center font-sans text-[9px]">{item.hari}</td>
                  <td className="py-1 border-r border-black pl-1">{item.act}</td>
                  <td className="py-1 border-r border-black pl-1">{item.res}</td>
                  <td className="py-1 text-center text-[9px]">{item.loc}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-xs pt-12">
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
            <div>
              <p>Disusun oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
          </div>
        </div>
      )}

      {/* 20. FORMAT II-52 LAPORAN KENDALA / TROUBLESHOOTING */}
      {state.selectedFormat === 'FORMAT_II_52' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LAPORAN PERMASALAHAN DAN UPAYA PENYELESAIAN MASALAH (TROUBLESHOOTING)
          </div>

          <div className="grid grid-cols-2 text-xs bg-slate-50 p-2 border rounded gap-x-4 font-serif">
            <div>Kabupaten: <strong>{desa.kabupaten}</strong></div>
            <div>Nama TFL: <strong>{tfl.namaTfl}</strong></div>
            <div>Provinsi: <strong>{desa.provinsi}</strong></div>
            <div>Minggu Ke: <strong>04 (Empat) - Februari 2026</strong></div>
          </div>

          <span className="text-[10px] font-bold text-slate-800 uppercase block mt-2">Daftar Kendala Konstruksi & Pengadaan:</span>

          <table className="w-full text-[10px] border border-black text-center text-slate-800">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <th className="py-1 border-r border-black w-8">No</th>
                <th className="py-1 border-r border-black w-32 text-left pl-1">Uraian Masalah Lapangan</th>
                <th className="py-1 border-r border-black text-left pl-1">Upaya Penyelesaian (Troubleshooting)</th>
                <th className="py-1 border-r border-black w-14">Status</th>
                <th className="py-1 w-20">Kategori</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black text-left">
                <td className="py-2 border-r border-black text-center font-mono">1</td>
                <td className="py-2 border-r border-black pl-1 leading-normal font-medium text-rose-900 bg-rose-50/20">
                  {customFields.masalahDilaporkan || 'Keterlambatan semen akibat cuaca buruk.'}
                </td>
                <td className="py-2 border-r border-black pl-1 leading-normal text-slate-700 bg-emerald-50/10">
                  {customFields.upayapenyelesaian || customFields.upayaPenyelesaian || 'TFL menjadwalkan ulang dengan pengamanan tambahan terpal.'}
                </td>
                <td className="py-2 border-r border-black text-center text-emerald-800 font-bold bg-slate-50">
                  {customFields.statusMasalah || 'Selesai'}
                </td>
                <td className="py-2 text-center text-slate-600 bg-slate-50 font-sans text-[9px]">
                  {customFields.kategoriMasalah || 'Non Pengaduan'}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-xs pt-12">
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
            <div>
              <p>Disusun oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
          </div>
        </div>
      )}

      {/* 21. FORMAT II-53 PROGRES KEGIATAN PENYIAPAN MASYARAKAT */}
      {state.selectedFormat === 'FORMAT_II_53' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline">
            PROGRES KEGIATAN PENYIAPAN MASYARAKAT BSPS TAHUN {project.tahunAnggaran}
          </div>

          <div className="grid grid-cols-3 text-[10px] bg-slate-50 p-2 border rounded gap-x-4">
            <div>Nama TFL: <strong>{tfl.namaTfl}</strong></div>
            <div>Periode: <strong>Februari 2026</strong></div>
            <div>Kabupaten/Kota: <strong>{desa.kabupaten}</strong></div>
          </div>

          <table className="w-full text-[9px] border border-slate-400 text-center text-slate-800 whitespace-nowrap overflow-x-auto block scrollbar-thin">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-400">
                <th className="py-1 px-1 border-r border-slate-400">No</th>
                <th className="py-1 px-2 border-r border-slate-400 text-left">Nama CPB</th>
                <th className="py-1 px-1 border-r border-slate-400">NIK</th>
                <th className="py-1 px-1 border-r border-slate-400">Desa</th>
                <th className="py-1 px-1 border-r border-slate-400">Verifikasi</th>
                <th className="py-1 px-1 border-r border-slate-400">Rembuk KPB</th>
                <th className="py-1 px-1 border-r border-slate-400">Pilih Toko</th>
                <th className="py-1 px-1 border-r border-slate-400">RAB KPB</th>
                <th className="py-1 px-1 border-r border-slate-400">Sertifikat SK</th>
                <th className="py-1 px-1">Nilai (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {kpb.anggota.slice(0, 5).map((ang, i) => (
                <tr key={i} className="border-b border-slate-200">
                  <td className="py-1 px-1 border-r border-slate-200 text-center font-mono">{i + 1}</td>
                  <td className="py-1 px-2 border-r border-slate-200 text-left font-medium">{ang}</td>
                  <td className="py-1 px-1 border-r border-slate-200 font-mono text-[8px]">{recipient.nik.slice(0, 6)}...</td>
                  <td className="py-1 px-1 border-r border-slate-200 text-center">{desa.desa}</td>
                  <td className="py-1 px-1 border-r border-slate-200 text-emerald-800 font-mono text-center">✔ 1</td>
                  <td className="py-1 px-1 border-r border-slate-200 text-emerald-800 font-mono text-center">✔ 1</td>
                  <td className="py-1 px-1 border-r border-slate-200 text-emerald-800 font-mono text-center">✔ 1</td>
                  <td className="py-1 px-1 border-r border-slate-200 text-emerald-800 font-mono text-center">✔ 1</td>
                  <td className="py-1 px-1 border-r border-slate-200 text-emerald-800 font-mono text-center">✔ 1</td>
                  <td className="py-1 px-1 font-mono text-right text-emerald-900 pr-1">17.500.000</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-3 text-center text-[10px] pt-8">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Tim Pendamping Provinsi</p>
              <div className="h-10"></div>
              <p className="font-bold underline">(.......................................)</p>
            </div>
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
            <div>
              <p>Disusun oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
          </div>
        </div>
      )}

      {/* 22. FORMAT II-54 TABEL PROGRESS PENYALURAN DANA BSPS */}
      {state.selectedFormat === 'FORMAT_II_54' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">{getFormatNo(state.selectedFormat)}</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LAPORAN PROGRES PENYALURAN DANA DAN PEMANFAATAN BSPS
          </div>

          <div className="grid grid-cols-2 text-xs bg-slate-50 p-2 border rounded font-serif">
            <div>Kabupaten/Kota: <strong>{desa.kabupaten}</strong></div>
            <div>Nama TFL: <strong>{tfl.namaTfl}</strong></div>
            <div>Desa Dampingan: <strong>{desa.desa}</strong></div>
            <div>Periode: <strong>Maret - Juni 2026</strong></div>
          </div>

          <table className="w-full text-[8px] border border-black text-center text-slate-800 whitespace-nowrap overflow-x-auto block scrollbar-thin">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <th className="py-1 px-1 border-r border-black" rowSpan={2}>No</th>
                <th className="py-1 px-2 border-r border-black text-left" rowSpan={2}>Nama CPB</th>
                <th className="py-1 px-1 border-r border-black" rowSpan={2}>Nomor BNBA</th>
                <th className="py-1 px-1 border-r border-black" rowSpan={2}>Bantuan (Rp)</th>
                <th className="py-1 px-1 border-r border-black" colSpan={3}>Penyaluran Toko Tahap 1</th>
                <th className="py-1 px-1 border-r border-black" colSpan={3}>Penyaluran Toko Tahap 2</th>
                <th className="py-1 px-1 border-r border-black" colSpan={3}>Progres Konstruksi</th>
                <th className="py-1 px-1" rowSpan={2}>Nilai Fisik (Rp)</th>
              </tr>
              <tr className="bg-slate-50 font-bold border-b border-black">
                <th className="py-0.5 px-1 border-r border-black">DRPB 1</th>
                <th className="py-0.5 px-1 border-r border-black">Belanja 1</th>
                <th className="py-0.5 px-2 border-r border-black">LPD 1</th>
                <th className="py-0.5 px-1 border-r border-black">DRPB 2</th>
                <th className="py-0.5 px-1 border-r border-black">Belanja 2</th>
                <th className="py-0.5 px-2 border-r border-black">LPD 2</th>
                <th className="py-0.5 px-1 border-r border-black">0%</th>
                <th className="py-0.5 px-1 border-r border-black">30%</th>
                <th className="py-0.5 px-1 border-r border-black">100%</th>
              </tr>
            </thead>
            <tbody>
              {kpb.anggota.slice(0, 4).map((ang, i) => (
                <tr key={i} className="border-b border-black">
                  <td className="py-1 px-1 border-r border-black font-mono">{i + 1}</td>
                  <td className="py-1 px-2 border-r border-black text-left font-medium">{ang}</td>
                  <td className="py-1 px-1 border-r border-black font-mono text-[7px]">BNBA-{i+420}</td>
                  <td className="py-1 px-1 border-r border-black font-mono">17.500.000</td>
                  <td className="py-1 px-1 border-r border-black text-emerald-800 text-[8px]">✔ Lulus</td>
                  <td className="py-1 px-1 border-r border-black text-emerald-850 text-[8px]">✔ Rp 8.750K</td>
                  <td className="py-1 px-1 border-r border-black text-emerald-800 font-mono text-[8px]">1</td>
                  <td className="py-1 px-1 border-r border-black text-slate-400 font-mono">-</td>
                  <td className="py-1 px-1 border-r border-black text-slate-400 font-mono">-</td>
                  <td className="py-1 px-1 border-r border-black text-slate-400 font-mono">-</td>
                  <td className="py-1 px-1 border-r border-black text-emerald-800">✔ 100%</td>
                  <td className="py-1 px-1 border-r border-black text-emerald-800">✔ 100%</td>
                  <td className="py-1 px-1 border-r border-black text-slate-400">-</td>
                  <td className="py-1 px-1 font-mono text-right text-emerald-900 font-bold">11.450.000</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-3 text-center text-[10px] pt-8">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Tim Pendamping Provinsi</p>
              <div className="h-10"></div>
              <p className="font-bold underline">(.......................................)</p>
            </div>
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
            <div>
              <p>Disusun oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
          </div>
        </div>
      )}

      {/* 23. DOKUMEN TOKO: SURAT PENAWARAN HARGA */}
      {state.selectedFormat === 'PENAWARAN_HARGA_TOKO' && (
        <div className="space-y-4">
          <div className="text-center font-bold tracking-wider font-sans border-b-4 border-double border-black pb-3">
            <div className="text-base uppercase underline font-black">{toko.namaToko}</div>
            <div className="text-xs uppercase tracking-normal">SPESIALIS PENYEDIA BAHAN BANGUNAN SNI & GUDANG KAYU BALOK</div>
            <div className="text-[10px] font-sans font-normal text-slate-600">Alamat Usaha: {toko.alamat} | HP: 0812-3789-XXX</div>
          </div>

          <div className="flex justify-between items-start text-xs pt-2">
            <div>
              <table>
                <tbody>
                  <tr><td className="w-16">Nomor</td><td>: 041/SPH-BSPS/{toko.namaToko.split(' ').slice(-1)}/2026</td></tr>
                  <tr><td>Lampiran</td><td>: 1 (satu) Berkas Lengkap</td></tr>
                  <tr><td>Perihal</td><td>: <strong>Surat Penawaran Harga Bahan Bangunan BSPS</strong></td></tr>
                </tbody>
              </table>
            </div>
            <div className="text-right">
              Bima, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}
            </div>
          </div>

          <p className="text-xs text-justify">
            Kepada Yth.:<br/>
            <strong>Panitia Pemilihan Toko Terbuka (PTT) Kelompok KPB  {kpb.namaKpb}</strong><br/>
            Desa {desa.desa}, Kecamatan  {desa.kecamatan}, Kabupaten Bima
          </p>

          <p className="text-justify text-xs leading-normal">
            Berdasarkan undangan pemilihan terbuka toko bahan bangunan nomor: 012/U-PTT/{kpb.namaKpb.replace(/\s+/g,'')}/2026 tanggal 12 Februari 2026, kami bermaksud mengajukan penawaran harga satuan bahan bangunan sebagai berikut:
          </p>

          <table className="w-full text-[9px] border border-black text-center text-slate-800">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <th className="py-1 border-r border-black w-8">No</th>
                <th className="py-1 border-r border-black text-left pl-1">Nama Barang / Spesifikasi Teknis</th>
                <th className="py-1 border-r border-black w-14">Volume</th>
                <th className="py-1 border-r border-black w-12">Satuan</th>
                <th className="py-1 border-r border-black w-20 text-right pr-1">Harga Satuan</th>
                <th className="py-1 text-right pr-1">Jumlah Harga (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {boqItems.slice(0, 10).map((item, i) => (
                <tr key={i} className="border-b border-black text-left">
                  <td className="py-0.5 border-r border-black text-center font-mono">{i + 1}</td>
                  <td className="py-0.5 border-r border-black pl-1 font-medium">{item.namaBarang}</td>
                  <td className="py-0.5 border-r border-black text-center">{item.volume}</td>
                  <td className="py-0.5 border-r border-black text-center">{item.satuan}</td>
                  <td className="py-0.5 border-r border-black text-right pr-1 font-mono">{item.hargaSatuan.toLocaleString('id-ID')}</td>
                  <td className="py-0.5 text-right pr-1 font-mono">{item.jumlah.toLocaleString('id-ID')}</td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold border-t border-black">
                <td colSpan={5} className="py-1 border-r border-black text-right pr-2 uppercase text-[9px]">TOTAL NILAI PENAWARAN (10 Item)</td>
                <td className="py-1 text-right pr-1 font-mono text-emerald-850">
                  {boqItems.slice(0, 10).reduce((acc,curr) => acc + curr.jumlah, 0).toLocaleString('id-ID')}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-justify text-xs leading-normal">
            Kami menjamin seluruh suplai semen, besi, seng, kayu, paku, dan kloset memiliki kualitas terbaik standar SNI. Harga penawaran di atas sudah mencakup Pajak (PPN), ongkos bongkar muat di lokasi perbaikan rumah warga. Penawaran ini berlaku selama 60 hari kalender.
          </p>

          <div className="flex justify-end text-center text-xs pt-12">
            <div className="w-64">
              <p>UD. TOKO KARYA AGUNG,</p>
              <p className="font-bold mt-1">Pemilik / Penanggung Jawab,</p>
              <div className="h-14 flex items-center justify-center">
                <span className="text-[8px] font-mono border border-slate-350 p-1 rounded">STEMPEL TOKO</span>
              </div>
              <p className="font-bold underline">({toko.pemilikToko})</p>
              <p className="text-[10px] text-slate-500">NPWP. {toko.npwpUsaha}</p>
            </div>
          </div>
        </div>
      )}

      {/* 24. PEMILIHAN TERBUKA TOKO COMPARISON */}
      {state.selectedFormat === 'PEMILIHAN_TERBUKA_TOKO' && (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">BERITA ACARA PTT</div>
          <div className="text-center font-bold text-sm uppercase underline">
            BERITA ACARA PEMILIHAN TERBUKA TOKO (COMPARING HARGA MATERIAL JUAL)
          </div>

          <p className="text-justify text-xs leading-relaxed">
            Dalam rangka transparansi harga, Kelompok <strong>{kpb.namaKpb}</strong> melakukan tabulasi evaluasi komparasi harga material bangunan dari 3 toko alternatif di Kecamatan Sanggar:
          </p>

          <table className="w-full text-[9px] border border-black text-center text-slate-800">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <th className="py-1 border-r border-black w-8" rowSpan={2}>No</th>
                <th className="py-1 border-r border-black text-left pl-1" rowSpan={2}>Bahan Bangunan Utama</th>
                <th className="py-1 border-r border-black w-12" rowSpan={2}>Satuan</th>
                <th className="py-1 border-r border-black" colSpan={2}>UD. TOKO KARYA AGUNG (Pilihan)</th>
                <th className="py-1 border-r border-black" colSpan={2}>UD. BERKAH JAYA SANGGAR</th>
                <th className="py-1" colSpan={2}>TOKO SINAR TAMBORA</th>
              </tr>
              <tr className="bg-slate-50 font-bold border-b border-black text-[8px]">
                <th className="py-0.5 px-0.5 border-r border-black text-right">Harga</th>
                <th className="py-0.5 px-0.5 border-r border-black">Kualitas</th>
                <th className="py-0.5 px-0.5 border-r border-black text-right">Harga</th>
                <th className="py-0.5 px-0.5 border-r border-black">Kualitas</th>
                <th className="py-0.5 px-0.5 border-r border-black text-right">Harga</th>
                <th className="py-0.5 px-0.5">Kualitas</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Semen @ 40 kg', unit: 'Zak', p1: 75000, q1: 'SNI Baik', p2: 77000, q2: 'Biasa', p3: 79000, q3: 'Biasa' },
                { name: 'Seng Gelombang 6 KK', unit: 'Lembar', p1: 90000, q1: 'Anti Karat', p2: 92000, q2: 'Biasa', p3: 95000, q3: 'Biasa' },
                { name: 'Seng Gelombang 7 KK', unit: 'Lembar', p1: 105000, q1: 'Anti Karat', p2: 108000, q2: 'Biasa', p3: 110000, q3: 'Biasa' },
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-black text-left">
                  <td className="py-1 border-r border-black text-center font-mono">{idx + 1}</td>
                  <td className="py-1 border-r border-black pl-1 font-medium">{item.name}</td>
                  <td className="py-1 border-r border-black text-center">{item.unit}</td>
                  <td className="py-1 border-r border-black text-right font-mono text-emerald-850 px-1">{item.p1.toLocaleString()}</td>
                  <td className="py-1 border-r border-black text-center text-[8px] bg-emerald-50/30">{item.q1}</td>
                  <td className="py-1 border-r border-black text-right font-mono px-1">{item.p2.toLocaleString()}</td>
                  <td className="py-1 border-r border-black text-center text-[8px]">{item.q2}</td>
                  <td className="py-1 border-r border-black text-right font-mono px-1">{item.p3.toLocaleString()}</td>
                  <td className="py-1 text-center text-[8px]">{item.q3}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-justify text-xs leading-normal font-sans text-slate-800 bg-emerald-50/50 p-2 border border-emerald-150 rounded">
            <strong>Kesimpulan Pemilihan:</strong> Hasil rapat PTT memutuskan membeli material di <strong>{toko.namaToko}</strong> karena menawarkan harga satuan paling ekonomis, jaminan antar gratis tanpa minimum order, serta bersedia mematuhi termin pembayaran non-tunai program BSPS.
          </p>

          <div className="grid grid-cols-2 text-center text-xs pt-12">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Ketua KPB {kpb.namaKpb}</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
            <div>
              <p>Disetujui oleh,</p>
              <p className="font-bold">Ketua Panitia Pemilihan Toko (PTT)</p>
              <div className="h-12"></div>
              <p className="font-bold underline">(........................................................)</p>
            </div>
          </div>
        </div>
      )}

      {/* RENDER NEW DYNAMIC EXTRA FORMATS MODULARLY */}
      <ExtraFormats state={state} />

      {/* Standard Bottom Page Numbering for PDF Visual Fidelity */}
      <div className="border-t border-slate-200 mt-12 pt-1 font-sans text-[8px] text-slate-400 flex justify-between select-none print:hidden">
        <span>Arsip Kelompok KPB - Desa {desa.desa} Bima NTB</span>
        <span>Halaman 1 / Resmi</span>
      </div>

    </div>
  );
};
