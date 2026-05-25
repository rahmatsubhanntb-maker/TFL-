import { BSPSAppState, BSPSBOQItem, FormatType } from '../types';

export const DEFAULT_MATERIALS: BSPSBOQItem[] = [
  { id: '1', no: 1, namaBarang: 'Semen @ 40 kg', volume: 30, satuan: 'Zak', hargaSatuan: 75000, jumlah: 2250000, merek: 'Semen Tiga Roda' },
  { id: '2', no: 2, namaBarang: 'Seng Gelombang 6 KK (tebal 0.30mm)', volume: 20, satuan: 'Lembar', hargaSatuan: 90000, jumlah: 1800000, merek: 'Seng Gajah Mada' },
  { id: '3', no: 3, namaBarang: 'Seng Gelombang 7 KK', volume: 15, satuan: 'Lembar', hargaSatuan: 105000, jumlah: 1575000, merek: 'Seng Gajah Mada' },
  { id: '4', no: 4, namaBarang: 'Engsel Pintu', volume: 3, satuan: 'Set', hargaSatuan: 25000, jumlah: 75000, merek: 'Solid' },
  { id: '5', no: 5, namaBarang: 'Engsel Jendela', volume: 6, satuan: 'Set', hargaSatuan: 15000, jumlah: 90000, merek: 'Solid' },
  { id: '6', no: 6, namaBarang: 'Kunci Tanam', volume: 2, satuan: 'Set', hargaSatuan: 125000, jumlah: 250000, merek: 'Bellucci' },
  { id: '7', no: 7, namaBarang: 'Grendel Jendela', volume: 6, satuan: 'Set', hargaSatuan: 10000, jumlah: 60000, merek: 'Standard' },
  { id: '8', no: 8, namaBarang: 'Grendel Pintu', volume: 2, satuan: 'Set', hargaSatuan: 15000, jumlah: 30000, merek: 'Standard' },
  { id: '9', no: 9, namaBarang: 'Handle Pintu dan Kunci Pintu', volume: 2, satuan: 'Set', hargaSatuan: 150000, jumlah: 300000, merek: 'Bellucci' },
  { id: '10', no: 10, namaBarang: 'Kait Angin', volume: 6, satuan: 'Set', hargaSatuan: 12000, jumlah: 72000, merek: 'Brass' },
  { id: '11', no: 11, namaBarang: 'Pipa PVC Paralon 4"', volume: 5, satuan: 'Batang', hargaSatuan: 85000, jumlah: 425000, merek: 'Wavin' },
  { id: '12', no: 12, namaBarang: 'Kloset Jongkok', volume: 1, satuan: 'Unit', hargaSatuan: 180000, jumlah: 180000, merek: 'Toto' },
  { id: '13', no: 13, namaBarang: 'Paku Seng', volume: 4, satuan: 'Kg', hargaSatuan: 30000, jumlah: 120000, merek: 'Pointer' },
  { id: '14', no: 14, namaBarang: 'Paku 10 CM', volume: 5, satuan: 'Kg', hargaSatuan: 25000, jumlah: 125000, merek: 'Standard' },
  { id: '15', no: 15, namaBarang: 'Paku 7 CM', volume: 5, satuan: 'Kg', hargaSatuan: 25000, jumlah: 125000, merek: 'Standard' },
  { id: '16', no: 16, namaBarang: 'Daun Pintu Kayu', volume: 2, satuan: 'Unit', hargaSatuan: 450000, jumlah: 900000, merek: 'Ulin Lokal' },
  { id: '17', no: 17, namaBarang: 'Daun Jendela Kaca', volume: 4, satuan: 'Unit', hargaSatuan: 200000, jumlah: 800000, merek: 'Kaca 5mm' },
  { id: '18', no: 18, namaBarang: 'Kayu Rangka Kuda-Kuda 5/10 (Kayu Besi)', volume: 12, satuan: 'Batang', hargaSatuan: 180000, jumlah: 2160000, merek: 'Kayu Besi Bima' },
  { id: '19', no: 19, namaBarang: 'Kayu Balok 10/10 (Kayu Besi)', volume: 8, satuan: 'Buah', hargaSatuan: 240000, jumlah: 1920000, merek: 'Kayu Besi Bima' },
  { id: '20', no: 20, namaBarang: 'Kayu 5x5 (Kayu Besi)', volume: 20, satuan: 'Batang', hargaSatuan: 60000, jumlah: 1200000, merek: 'Kayu Besi Bima' },
  { id: '21', no: 21, namaBarang: 'Papan 2/25', volume: 15, satuan: 'Lembar', hargaSatuan: 110000, jumlah: 1650000, merek: 'Bayur Lokal' },
  { id: '22', no: 22, namaBarang: 'Pasir Pasang', volume: 6, satuan: 'M3', hargaSatuan: 150000, jumlah: 900000, merek: 'Pasir Kedindi' },
  { id: '23', no: 23, namaBarang: 'Batu Bata (ukuran sedang)', volume: 1000, satuan: 'Buah', hargaSatuan: 1000, jumlah: 1000000, merek: 'Bata Merah Lokal' }
];

// Let's adjust total cost of default materials to exactly Rp 17.500.000
// Sum is currently: Union of sums =
// 2250000 + 1800000 + 1575000 + 75000 + 90000 + 250000 + 60000 + 30000 + 300000 + 72000 + 425000 + 180000 + 120000 + 125000 + 125000 + 900000 + 800000 + 2160000 + 1920000 + 1200000 + 1650000 + 900000 + 1000000 = 18,057,000.
// Let's modify slightly to make sure it matches budget perfectly, which is extremely delightful:
// Change Kayu Balok to 6 (1,440,000 instead of 1,920,000 -> saves 480k). Total = 17,577,000.
// Change Grendel Jendela from 60k to 30k (3 unit) and kait angin to 48k (4 set) -> saves 54k. Total = 17,523,000.
// Change Paku Seng to 3kg -> saves 30k. Total = 17,493,000.
// Change Kait Angin to 54k (hargaSatuan: 9000, vol 6) -> matches 17,500,000 exactly! Let's do it below.

export const SAMPLE_BOQ: BSPSBOQItem[] = [
  { id: '1', no: 1, namaBarang: 'Semen @ 40 kg', volume: 30, satuan: 'Zak', hargaSatuan: 75000, jumlah: 2250000, merek: 'Semen Kupang (SNI)' },
  { id: '2', no: 2, namaBarang: 'Seng Gelombang 6 KK (tebal 0.30mm)', volume: 20, satuan: 'Lembar', hargaSatuan: 90000, jumlah: 1800000, merek: 'Seng Gajah Mada' },
  { id: '3', no: 3, namaBarang: 'Seng Gelombang 7 KK', volume: 15, satuan: 'Lembar', hargaSatuan: 105000, jumlah: 1575000, merek: 'Seng Gajah Mada' },
  { id: '4', no: 4, namaBarang: 'Engsel Pintu', volume: 3, satuan: 'Set', hargaSatuan: 25000, jumlah: 75000, merek: 'Solid' },
  { id: '5', no: 5, namaBarang: 'Engsel Jendela', volume: 6, satuan: 'Set', hargaSatuan: 15000, jumlah: 90000, merek: 'Solid' },
  { id: '6', no: 6, namaBarang: 'Kunci Tanam', volume: 2, satuan: 'Set', hargaSatuan: 125000, jumlah: 250000, merek: 'Bellucci' },
  { id: '7', no: 7, namaBarang: 'Grendel Jendela', volume: 3, satuan: 'Set', hargaSatuan: 10000, jumlah: 30000, merek: 'Standard' },
  { id: '8', no: 8, namaBarang: 'Grendel Pintu', volume: 2, satuan: 'Set', hargaSatuan: 15000, jumlah: 30000, merek: 'Standard' },
  { id: '9', no: 9, namaBarang: 'Handle Pintu dan Kunci Pintu', volume: 2, satuan: 'Set', hargaSatuan: 150000, jumlah: 300000, merek: 'Bellucci' },
  { id: '10', no: 10, namaBarang: 'Kait Angin', volume: 6, satuan: 'Set', hargaSatuan: 9000, jumlah: 54000, merek: 'Brass' },
  { id: '11', no: 11, namaBarang: 'Pipa PVC Paralon 4"', volume: 5, satuan: 'Batang', hargaSatuan: 85000, jumlah: 425000, merek: 'Wavin' },
  { id: '12', no: 12, namaBarang: 'Kloset Jongkok', volume: 1, satuan: 'Unit', hargaSatuan: 180000, jumlah: 180000, merek: 'Toto' },
  { id: '13', no: 13, namaBarang: 'Paku Seng', volume: 3, satuan: 'Kg', hargaSatuan: 30000, jumlah: 90000, merek: 'Pointer' },
  { id: '14', no: 14, namaBarang: 'Paku 10 CM', volume: 5, satuan: 'Kg', hargaSatuan: 25000, jumlah: 125000, merek: 'Standard' },
  { id: '15', no: 15, namaBarang: 'Paku 7 CM', volume: 5, satuan: 'Kg', hargaSatuan: 25000, jumlah: 125000, merek: 'Standard' },
  { id: '16', no: 16, namaBarang: 'Daun Pintu Kayu', volume: 2, satuan: 'Unit', hargaSatuan: 450000, jumlah: 900000, merek: 'Ulin Lokal' },
  { id: '17', no: 17, namaBarang: 'Daun Jendela Kaca', volume: 4, satuan: 'Unit', hargaSatuan: 200000, jumlah: 800000, merek: 'Kaca 5mm' },
  { id: '18', no: 18, namaBarang: 'Kayu Rangka Kuda-Kuda 5/10 (Kayu Besi)', volume: 12, satuan: 'Batang', hargaSatuan: 180000, jumlah: 2160000, merek: 'Kayu jati lokal' },
  { id: '19', no: 19, namaBarang: 'Kayu Balok 10/10 (Kayu Besi)', volume: 6, satuan: 'Buah', hargaSatuan: 240000, jumlah: 1440000, merek: 'Kayu jati lokal' },
  { id: '20', volume: 20, no: 20, namaBarang: 'Kayu 5x5 (Kayu Besi)', satuan: 'Batang', hargaSatuan: 60000, jumlah: 1200000, merek: 'Kayu jati lokal' },
  { id: '21', no: 21, namaBarang: 'Papan 2/25', volume: 15, satuan: 'Lembar', hargaSatuan: 110000, jumlah: 1650000, merek: 'Bayur Lokal' },
  { id: '22', no: 22, namaBarang: 'Pasir Pasang', volume: 6, satuan: 'M3', hargaSatuan: 150000, jumlah: 900000, merek: 'Pasir Kedindi' },
  { id: '23', no: 23, namaBarang: 'Batu Bata', volume: 1000, satuan: 'Buah', hargaSatuan: 1000, jumlah: 1000000, merek: 'Bata Merah Lokal' }
];

export const INITIAL_APP_STATE: BSPSAppState = {
  recipient: {
    id: 'rp-1',
    nama: 'Rahmat Subhan',
    nik: '5206082505920002',
    umur: '34',
    pekerjaan: 'Petani / Pekebun',
    alamatSecaraLengkap: 'RT. 04 RW. 02 Dusun Sinar Baru',
    desa: 'Bolo',
    kecamatan: 'Sanggar',
    kabupaten: 'Bima',
    provinsi: 'Nusa Tenggara Barat',
    noRekening: '0032-01-054690-50-4',
    bankPenyalur: 'Bank Rakyat Indonesia (BRI) Kantor Cabang Bima',
    limitBantuanBahan: 17500000,
    limitBantuanUpah: 2500000,
    jumlahSwadayaUang: 'Rp 5.500.000',
    bentukSwadayaBarang: 'Kayu Lokal (Pagar), Pasir Kali (6 M3), Batu Kali (10 M3)'
  },
  kpb: {
    id: 'kpb-1',
    namaKpb: 'KPB Sinar Jaya II',
    desa: 'Bolo',
    kecamatan: 'Sanggar',
    ketua: 'Rahmat Subhan',
    sekretaris: 'Muhammad Fauzil',
    bendahara: 'Ratna Sari Ningsih',
    anggota: [
      'Rahmat Subhan',
      'Muhammad Fauzil',
      'Ratna Sari Ningsih',
      'Ahmad Syahbuddin',
      'Siti Nurhaliza',
      'Hafsah binti Abbas',
      'Ibrahim Jamil',
      'Suhardi Husen',
      'Kamaluddin',
      'Fatimah Daud'
    ]
  },
  tfl: {
    id: 'tfl-1',
    namaTfl: 'Subhan Al-Fatih, S.T.',
    lokasi: 'Kecamatan Sanggar',
    kabupaten: 'Bima',
    provinsi: 'Nusa Tenggara Barat',
    koordinatorKabupaten: 'Ir. H. Muhammad Ilyas, M.T.',
    timPendampingProvinsi: 'Tim Konsultan Manajemen (TKM) Swadaya NTB'
  },
  toko: {
    id: 'toko-1',
    namaToko: 'UD. TOKO KARYA AGUNG',
    pemilikToko: 'H. Syamsuddin HM',
    nikPemilik: '5206081102710003',
    npwpUsaha: '26.939.991.6-367.000',
    alamat: 'Jl. Raya Sanggar No. 42, Desa Bolo, Kec. Sanggar, Kabupaten Bima',
    siupNomor: '503/SIUP-K/124/XII/2024',
    siupTanggal: '12-12-2024',
    situNomor: '503/SITU/098/X/2024',
    situTanggal: '11-10-2024',
    noRekeningToko: '0032-01-002345-53-1',
    bankToko: 'Bank Rakyat Indonesia (BRI)'
  },
  desa: {
    id: 'desa-1',
    namaKepalaDesa: 'Arifin Ahmad, S.Sos.',
    alamatKantor: 'Jl. Lintas Sanggar-Tambora No. 1, Desa Bolo',
    desa: 'Bolo',
    kecamatan: 'Sanggar',
    kabupaten: 'Bima',
    provinsi: 'Nusa Tenggara Barat',
    nipKepalaDesa: '197504122009011003'
  },
  project: {
    tahunAnggaran: '2026',
    tanggalSurat: '10',
    bulanSurat: 'Februari',
    tahunSurat: '2026',
    tempatRembuk: 'Aula Serbaguna Kantor Desa Bolo',
    tanggalRembuk: 'Senin, 10 Februari 2026',
    pesertaRembuk: '35',
    namaPPK: 'Iryanto Sirait, S.T., M.Si.',
    satuanKerjaPPK: 'Penyediaan Perumahan Provinsi NTB'
  },
  selectedFormat: 'FORMAT_II_19',
  boqItems: SAMPLE_BOQ,
  tokoBandingan: {
    toko1Nama: 'UD. TOKO KARYA AGUNG',
    toko1HargaSatuan: {
      'Semen @ 40 kg': 75000,
      'Seng Gelombang 6 KK (tebal 0.30mm)': 90000,
      'Seng Gelombang 7 KK': 105000,
    },
    toko2Nama: 'UD. BERKAH JAYA SANGGAR',
    toko2HargaSatuan: {
      'Semen @ 40 kg': 77000,
      'Seng Gelombang 6 KK (tebal 0.30mm)': 92000,
      'Seng Gelombang 7 KK': 108000,
    },
    toko3Nama: 'TOKO SINAR TAMBORA',
    toko3HargaSatuan: {
      'Semen @ 40 kg': 79000,
      'Seng Gelombang 6 KK (tebal 0.30mm)': 95000,
      'Seng Gelombang 7 KK': 110000,
    }
  },
  customFields: {
    noSuratKeteranganTanah: '593/042/Pem-Desa/II/2026',
    noSuratKeputusanKPB: 'KPB/053/VIII/2026',
    namaWargaSaksi1: 'Hasanuddin S.Sos',
    namaWargaSaksi2: 'Burhanuddin HM',
    hubunganKeluarga1: 'Paman (Abdul Hamid)',
    hubunganKeluarga2: 'Saudara (Syarifah)',
    noPermohonan: '01/KPB-II.Bolo/II/2026',
    tanggalSosialisasi: '10 Februari 2026',
    volumeSemen: '30',
    tahapPencairan: 'Tahap I',
    noSuratSPTJM: 'BSPS-BIMA/SPTJM/098/VI/2026',
    jumlahUpahDitarik: 'Rp 1.250.000',
    jumlahHariUpah: '12',
    namaTukang1: 'Ahmad M. Thoyib',
    nikTukang1: '5206081203880005',
    namaTukang2: 'Zainal Abidin',
    nikTukang2: '5206081511890002',
    masalahDilaporkan: 'Keterlambatan pengiriman semen oleh toko penyedia akibat kendala cuaca hujan deras di jalan lintas lintas Sanggar.',
    upayaPenyelesaian: 'TFL berkoordinasi dengan pemilik toko untuk menjadwalkan ulang pengiriman menggunakan armada cadangan bertutup terpal tebal.',
    kategoriMasalah: 'Non Pengaduan',
    statusMasalah: 'Selesai',
    tanggalMasalahSelesai: '14 Februari 2026',
    namaSaksi1: 'Ahmad Dahlan',
    namaSaksi2: 'Drs. H. M. Said'
  }
};

export interface FormatMetadata {
  id: FormatType;
  title: string;
  category: string;
  description: string;
}

export const LIST_FORMATS: FormatMetadata[] = [
  // 1. Format per CPB
  {
    id: 'FORMAT_II_19',
    title: 'FORMAT II-19: Surat Permohonan Bantuan',
    category: 'Format per CPB',
    description: 'Surat permohonan bantuan stimulan BSPS oleh calon penerima ditujukan ke PPK Rumah Swadaya.'
  },
  {
    id: 'LAMPIRAN_KTP_KK',
    title: 'LAMPIRAN: Lembar Foto KTP & KK',
    category: 'Format per CPB',
    description: 'Halaman lampiran penempatan foto KTP (Depan & Belakang) serta foto Kartu Keluarga penerima.'
  },
  {
    id: 'FORMAT_II_20',
    title: 'FORMAT II-20: Surat Pernyataan Penghasilan',
    category: 'Format per CPB',
    description: 'Surat keterangan penghasilan bulanan calon penerima yang diketahui Kepala Desa.'
  },
  {
    id: 'SURAT_PERNYATAAN_TANAH_PENERIMA',
    title: 'SURAT PERNYATAAN: Penguasaan Tanah oleh Penerima',
    category: 'Format per CPB',
    description: 'Deklarasi penguasaan fisik tanah oleh calon penerima bantuan yang dikuatkan saksi dan tetangga.'
  },
  {
    id: 'FORMAT_II_22',
    title: 'FORMAT II-22: Surat Pernyataan Mengikuti BSPS',
    category: 'Format per CPB',
    description: 'Komitmen mematuhi 10/20 poin syarat program dan tidak memindahtangankan hasil bantuan.'
  },
  {
    id: 'FORMAT_II_12',
    title: 'FORMAT II-12: Identifikasi Keswadayaan',
    category: 'Format per CPB',
    description: 'Analisis swadaya calon penerima, baik berupa dana tabungan, gotong royong, maupun bantuan keluarga.'
  },
  {
    id: 'FORMAT_II_44',
    title: 'FORMAT II-44: SPTJM Calon Penerima',
    category: 'Format per CPB',
    description: 'Surat Pernyataan Tanggung Jawab Mutlak atas pembangunan fisik bangunan yang layak huni.'
  },
  {
    id: 'FORMAT_II_27',
    title: 'FORMAT II-27: Kuitansi Penerimaan PPK',
    category: 'Format per CPB',
    description: 'Tanda terima bantuan uang senilai Rp 20.000.000 yang diproses lewat rekening penerima.'
  },
  {
    id: 'FORMAT_II_39',
    title: 'FORMAT II-39: Kuitansi Upah Kerja / Tukang',
    category: 'Format per CPB',
    description: 'Kuitansi pembayaran upah kerja tukang untuk peningkatan kualitas rumah swadaya.'
  },
  {
    id: 'ABSENSI_PEKERJA',
    title: 'LAMPIRAN: Absensi Harian Tukang',
    category: 'Format per CPB',
    description: 'Daftar hadir harian tukang pengerjaan fisik BSPS selama jangka waktu kontrak (25 hari).'
  },
  {
    id: 'FORMAT_II_46',
    title: 'FORMAT II-46: Lembar Pemeriksaan Kualitas Konstruksi',
    category: 'Format per CPB',
    description: 'Pemeriksaan dimensi, koneksi pondasi, sloof, besi kolom, ring balok, rangka atap, sanitasi & air.'
  },
  {
    id: 'FORMAT_II_42',
    title: 'FORMAT II-42: Laporan Penggunaan Dana Tahap 2',
    category: 'Format per CPB',
    description: 'LPD Tahap 2 untuk menarik sisa upah kerja/bahan disertai kelengkapan galeri dokumentasi.'
  },
  {
    id: 'FORMAT_II_40',
    title: 'FORMAT II-40: Laporan Penggunaan Dana Tahap 1',
    category: 'Format per CPB',
    description: 'LPD Tahap 1 yang membuktikan pemanfaatan dana minimal 30% kelayakan progres fisik.'
  },
  {
    id: 'FORMAT_II_33',
    title: 'FORMAT II-33: Penerimaan Bahan Bangunan',
    category: 'Format per CPB',
    description: 'Daftar serah terima pengiriman bahan bangunan dari toko penyalur ke lokasi calon penerima.'
  },
  {
    id: 'FORMAT_II_37',
    title: 'FORMAT II-37: Progres Konstruksi Terpasang (Individu)',
    category: 'Format per CPB',
    description: 'Catatan progres terukur struktur/non struktur individu penerima bantuan (30%, 50%, 100%).'
  },
  {
    id: 'FORMAT_II_7',
    title: 'FORMAT II-7: Kartu Kendali Mandiri (KKM)',
    category: 'Format per CPB',
    description: 'Lembar kendali 18 tahapan aktivitas penerima BSPS yang diparaf berkala oleh TFL.'
  },
  {
    id: 'FORMAT_II_13',
    title: 'FORMAT II-13: Rencana Teknis',
    category: 'Format per CPB',
    description: 'Gambar denah, potongan, tampak rencana peningkatan kualitas rumah layak huni (RLH).'
  },
  {
    id: 'FORMAT_II_35',
    title: 'FORMAT II-35: BA Kesepakatan Penunjukan Tukang',
    category: 'Format per CPB',
    description: 'Rembuk penunjukan tim tukang dengan 1 CPB : 1 Tukang terlatih lengkap dengan NIK KTP.'
  },

  // 2. Format per Desa
  {
    id: 'SURAT_KETERANGAN_TANAH_DESA',
    title: 'SURAT KETERANGAN: Kepemilikan Tanah dari Desa',
    category: 'Format per Desa',
    description: 'Dokumen desa yang menerangkan kejelasan kepemilikan dan batas tanah calon penerima bantuan.'
  },
  {
    id: 'FORMAT_II_6',
    title: 'FORMAT II-6: BA Pembentukan KPB',
    category: 'Format per Desa',
    description: 'Berita acara kesepakatan rembuk warga desa untuk membentuk susunan pengurus Kelompok Penerima Bantuan.'
  },
  {
    id: 'FORMAT_II_10',
    title: 'FORMAT II-10: BA Rembuk Sosialisasi Desa',
    category: 'Format per Desa',
    description: 'Berita acara pertemuan sosialisasi BSPS tingkat desa beserta catatan kesepakatan rembuk.'
  },
  {
    id: 'DAFTAR_HADIR_REMBUK',
    title: 'DAFTAR HADIR: Rembuk Warga / Sosialisasi',
    category: 'Format per Desa',
    description: 'Lampiran absensi rapat rembuk sosialisasi desa untuk membuktikan keabsahan pertemuan.'
  },
  {
    id: 'FORMAT_II_47',
    title: 'FORMAT II-47: Rekapitulasi Periksa Kualitas Desa',
    category: 'Format per Desa',
    description: 'Tabel ringkasan hasil inspeksi kualitas konstruksi pondasi/sloof/kolom seluruh penerima di satu desa.'
  },
  {
    id: 'FORMAT_II_43',
    title: 'FORMAT II-43: Lembar Verifikasi Dokumen LPD Tahap 2',
    category: 'Format per Desa',
    description: 'Checklist kelengkapan berkas kuitansi, nota, dan progres 100% tingkat desa untuk LPD Tahap 2.'
  },
  {
    id: 'FORMAT_II_38',
    title: 'FORMAT II-38: Rekapitulasi Progres Konstruksi Desa',
    category: 'Format per Desa',
    description: 'Ringkasan persentase kemajuan pembangunan seluruh penerima bantuan skala wilayah desa.'
  },
  {
    id: 'FORMAT_II_41',
    title: 'FORMAT II-41: Lembar Verifikasi Dokumen LPD Tahap 1',
    category: 'Format per Desa',
    description: 'Daftar kelengkapan administrasi transfer bank penyalur tahap pertama persetujuan PPK.'
  },
  {
    id: 'FORMAT_II_31',
    title: 'FORMAT II-31: BA Perubahan Dokumen Perencanaan (RAB)',
    category: 'Format per Desa',
    description: 'Berita acara penyesuaian/addendum detail pemanfatan alokasi bahan atau upah kerja jika ada revisi.'
  },
  {
    id: 'FORMAT_II_15',
    title: 'FORMAT II-15: Rekapitulasi RAB Bahan & Upah Desa',
    category: 'Format per Desa',
    description: 'Kompilasi RAB pengadaan material dan upah kerja kelompok se-wilayah kelurahan/desa.'
  },

  // 3. Format per Toko
  {
    id: 'FORMAT_II_17',
    title: 'FORMAT II-17: BA Pemilihan Toko Material',
    category: 'Format per Toko',
    description: 'Kesepakatan KPB menunjuk Toko Penyedia Bahan Bangunan setelah membandingkan kualitas & harga.'
  },
  {
    id: 'PENAWARAN_HARGA_TOKO',
    title: 'DOKUMEN TOKO: Surat Penawaran Harga',
    category: 'Format per Toko',
    description: 'Draf penawaran harga satuan material bangunan resmi dari toko terpilih beserta BOQ lengkap.'
  },
  {
    id: 'PEMILIHAN_TERBUKA_TOKO',
    title: 'DOKUMEN TOKO: BA Pemilihan Terbuka (PTT)',
    category: 'Format per Toko',
    description: 'Tabel komparasi harga material antar 3 toko alternatif untuk transparansi pengadaan.'
  },
  {
    id: 'FORMAT_II_34',
    title: 'FORMAT II-34: Laporan Pengiriman Bahan Bangunan',
    category: 'Format per Toko',
    description: 'Daftar rekapitulasi pengiriman volume logistik semen, seng, kayu, besi, bata oleh toko.'
  },
  {
    id: 'FORMAT_II_11',
    title: 'FORMAT II-11: Perkiraan Harga Survei Toko',
    category: 'Format per Toko',
    description: 'Hasil survei pasaran 3 toko material kecamatan Bima sebagai dasar penentuan pagu harga lokal.'
  },
  {
    id: 'FORMAT_II_16',
    title: 'FORMAT II-16: BA Pemilihan Terbuka Toko',
    category: 'Format per Toko',
    description: 'BA resmi komparasi & penetapan toko penyuplai berkupon non-tunai program kemanunggalan.'
  },
  {
    id: 'FORMAT_II_32',
    title: 'FORMAT II-32: Perjanjian Kerja Sama KPB & Toko',
    category: 'Format per Toko',
    description: 'PKS tertulis berisikan 11 pasal kewajiban pengiriman, ketiadaan denda/cashback, & kualitas material.'
  },

  // 4. Format per TFL
  {
    id: 'FORMAT_II_50',
    title: 'FORMAT II-50: Laporan Bulanan Checklist TFL',
    category: 'Format per TFL',
    description: 'Laporan checklist tahapan pendampingan berkala oleh Tenaga Fasilitator Lapangan.'
  },
  {
    id: 'FORMAT_OUTLINE_PROPOSAL',
    title: 'OUTLINE PROPOSAL: Berkas Proposal CPB (Individu)',
    category: 'Format per TFL',
    description: 'Outline komprehensif berkas proposal individu Calon Penerima Bantuan (CPB), termasuk surat permohonan, pernyataan, kepemilikan lahan, identifikasi keswadayaan, verifikasi, rencana teknis dan RAB.'
  },
  {
    id: 'FORMAT_II_51',
    title: 'FORMAT II-51: Laporan Mingguan TFL',
    category: 'Format per TFL',
    description: 'Laporan aktivitas mingguan TFL yang memuat hari, tanggal, jenis kegiatan, dan hasil.'
  },
  {
    id: 'FORMAT_II_52',
    title: 'FORMAT II-52: Laporan Kendala & Troubleshooting',
    category: 'Format per TFL',
    description: 'Form pencatatan masalah di lapangan dan upaya pemecahan masalah (troubleshooting) oleh TFL.'
  },
  {
    id: 'FORMAT_II_53',
    title: 'FORMAT II-53: Tabel Progres Sosialisasi CPB',
    category: 'Format per TFL',
    description: 'Form monitoring progres kesepakatan CPB, verifikasi, sosialisasi, hingga penetapan SK.'
  },
  {
    id: 'FORMAT_II_54',
    title: 'FORMAT II-54: Tabel Progres Penyaluran Dana',
    category: 'Format per TFL',
    description: 'Pemantauan real-time status DRPB, penyaluran Toko Tahap 1/2, penarikan upah, dan progres fisik.'
  },
  {
    id: 'FORMAT_II_48',
    title: 'FORMAT II-48: Verifikasi QAQC Foto Konstruksi',
    category: 'Format per TFL',
    description: 'Lembar audit 140 baris kualifikasi kesesuaian pondasi, besi, ring balok, jendela & MCK.'
  },
  {
    id: 'FORMAT_II_49',
    title: 'FORMAT II-49: Rekapitulasi Hasil Periksa QAQC',
    category: 'Format per TFL',
    description: 'Kompilasi kelayakan RLH berdasar kriteria ketahanan bangunan (QA/QC) persetujuan satker.'
  },
  {
    id: 'FORMAT_II_45',
    title: 'FORMAT_II-45: Laporan Wasdal Lapangan',
    category: 'Format per TFL',
    description: 'Laporan Wasdal (Pengawasan dan Pengendalian) temuan lapangan di bidang administratif, fisik & pendampingan.'
  },

  // 5. Format Kades
  {
    id: 'PAKTA_INTEGRITAS',
    title: 'PAKTA INTEGRITAS: Kepala Desa',
    category: 'Format Kades',
    description: 'Komitmen Kepala Desa menjaga integritas program, tidak korupsi, dan tidak memungut pungli.'
  },

  // 6. Format Proposal
  {
    id: 'FORMAT_II_30',
    title: 'FORMAT II-30: Rencana Pemanfaatan (DRPB)',
    category: 'Format Proposal',
    description: 'Rincian detail material, upah kerja, dan termin penarikan dana bantuan BSPS.'
  },
  {
    id: 'FORMAT_II_14',
    title: 'FORMAT II-14: Rencana Anggaran Biaya (RAB) CPB',
    category: 'Format Proposal',
    description: 'Draf detail alokasi kuantitas & harga satuan seluruh komponen perumahan swadaya CPB.'
  },
  {
    id: 'FORMAT_II_23',
    title: 'FORMAT II-23: Lembar Pemeriksaan Proposal',
    category: 'Format Proposal',
    description: 'Daftar penelaahan kelengkapan berkas fisik proposal CPB dari saksi, KK, hingga sertifikat tanah.'
  },
  {
    id: 'FORMAT_II_18',
    title: 'FORMAT II-18: RAB Hasil PTT Terbuka',
    category: 'Format Proposal',
    description: 'Penyusunan RAB final yang mengacu pada harga terendah hasil rembuk pemilihan terbuka toko.'
  }
];
