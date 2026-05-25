export interface RecipientProfile {
  id: string;
  nama: string;
  nik: string;
  umur: string;
  pekerjaan: string;
  alamatSecaraLengkap: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  noRekening: string;
  bankPenyalur: string;
  limitBantuanBahan: number; // e.g., 17500000
  limitBantuanUpah: number;   // e.g., 2500000
  jumlahSwadayaUang: string; // e.g. "Rp 5.000.000"
  bentukSwadayaBarang: string; // e.g. "Kayu lokal, Pasir sungai"
}

export interface KpbProfile {
  id: string;
  namaKpb: string; // e.g. "KPB Sinar Jaya I"
  desa: string;
  kecamatan: string;
  ketua: string;
  sekretaris: string;
  bendahara: string;
  anggota: string[]; // List of names
}

export interface TflProfile {
  id: string;
  namaTfl: string;
  lokasi: string;
  kabupaten: string;
  provinsi: string;
  koordinatorKabupaten: string;
  timPendampingProvinsi: string;
}

export interface TokoProfile {
  id: string;
  namaToko: string;
  pemilikToko: string;
  nikPemilik: string;
  npwpUsaha: string;
  alamat: string;
  siupNomor: string;
  siupTanggal: string;
  situNomor: string;
  situTanggal: string;
  noRekeningToko: string;
  bankToko: string;
}

export interface DesaProfile {
  id: string;
  namaKepalaDesa: string;
  alamatKantor: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  nipKepalaDesa: string;
}

export interface GeneralProjectState {
  tahunAnggaran: string;
  tanggalSurat: string; // e.g. "10 Februari"
  bulanSurat: string; // e.g. "Februari"
  tahunSurat: string; // e.g. "2026"
  tempatRembuk: string; // e.g. "Balai Desa Bolo"
  tanggalRembuk: string; // e.g. "Senin, 10 Februari 2026"
  pesertaRembuk: string; // e.g. "35"
  namaPPK: string; // e.g. "Iryanto Sirait, S.T., M.Si."
  satuanKerjaPPK: string; // e.g. "Penyediaan Perumahan Provinsi NTB"
}

export type FormatType =
  | 'FORMAT_II_19' // Permohonan Bantuan Stimulan Perumahan Swadaya
  | 'LAMPIRAN_KTP_KK' // Upload KTP & KK Frame
  | 'FORMAT_II_20' // Surat Pernyataan Penghasilan
  | 'SURAT_KETERANGAN_TANAH_DESA' // Surat Keterangan Tanah (Desa)
  | 'SURAT_PERNYATAAN_TANAH_PENERIMA' // Surat Pernyataan Tanah (Penerima)
  | 'FORMAT_II_22' // Surat Pernyataan Mengikuti Program
  | 'FORMAT_II_12' // Identifikasi Keswadayaan
  | 'PAKTA_INTEGRITAS' // Pakta Integritas Kades
  | 'FORMAT_II_6' // Berita Acara Kesepakatan KPB
  | 'FORMAT_II_10' // Berita Acara Rembuk Warga / Sosialisasi
  | 'DAFTAR_HADIR_REMBUK' // Daftar Hadir Rembuk Warga
  | 'FORMAT_II_17' // Berita Acara Kesepakatan Toko
  | 'FORMAT_II_30' // DRPB (Rencana Pemanfaatan Peningkatan Kualitas)
  | 'FORMAT_II_27' // Kuitansi PPK-Materi (Kuitansi Penerimaan)
  | 'FORMAT_II_39' // Kuitansi Upah Kerja (Kuitansi Penerima)
  | 'ABSENSI_PEKERJA' // Absensi Tukang
  | 'FORMAT_II_44' // SPTJM (Pernyataan Tanggung Jawab Mutlak)
  | 'FORMAT_II_50' // Laporan Bulanan TFL Checklist
  | 'FORMAT_OUTLINE_PROPOSAL' // Outline Proposal CPB (Individu)
  | 'FORMAT_II_51' // Laporan Mingguan TFL
  | 'FORMAT_II_52' // Laporan Permasalahan & Upaya TFL
  | 'FORMAT_II_53' // Progres Kegiatan Penyiapan Masyarakat
  | 'FORMAT_II_54' // Laporan Progres Penyaluran & Pemanfaatan BSPS
  | 'SOP_DESKRIPSI' // SOP Pemilihan Terbuka Toko (PTT)
  | 'PENAWARAN_HARGA_TOKO' // Surat Penawaran Harga Toko
  | 'PEMILIHAN_TERBUKA_TOKO' // BA Pemilihan Terbuka Toko
  | 'FORMAT_II_46' // Lembar Pemeriksaan Kualitas Konstruksi
  | 'FORMAT_II_47' // Rekapitulasi Hasil Periksa Kualitas
  | 'FORMAT_II_48' // Verifikasi Pemeriksaan Kualitas (QAQC)
  | 'FORMAT_II_49' // Rekapitulasi Hasil Periksa QAQC
  | 'FORMAT_II_42' // Laporan Penggunaan Dana Tahap 2
  | 'FORMAT_II_33' // Penerimaan Bahan Bangunan
  | 'FORMAT_II_34' // Laporan Pengiriman Bahan Bangunan
  | 'FORMAT_II_37' // Progres Konstruksi Terpasang
  | 'FORMAT_II_43' // Lembar Verifikasi Kelengkapan Dokumen LPD Tahap 2
  | 'FORMAT_II_45' // Laporan Pengawasan dan Pengendalian
  | 'FORMAT_II_7'  // Kartu Kendali Mandiri (KKM)
  | 'FORMAT_II_40' // Laporan Penggunaan Dana Tahap 1
  | 'FORMAT_II_38' // Progres Konstruksi Terpasang Rekap
  | 'FORMAT_II_41' // Lembar Verifikasi LPD Tahap 1
  | 'FORMAT_II_31' // BA Perubahan Dokumen Perencanaan
  | 'FORMAT_II_13' // Rencana Teknis
  | 'FORMAT_II_14' // Rencana Anggaran Biaya (RAB)
  | 'FORMAT_II_23' // Lembar Pemeriksaan Proposal
  | 'FORMAT_II_35' // BA Penunjukan Tukang
  | 'FORMAT_II_11' // Perkiraan Harga Survei Bahan
  | 'FORMAT_II_16' // Pemilihan Toko Terbuka
  | 'FORMAT_II_15' // Rekapitulasi Kebutuhan dan RAB Desa
  | 'FORMAT_II_32' // Perjanjian Kerja Sama Toko
  | 'FORMAT_II_18'; // RAB Hasil PTT // BA Pemilihan Terbuka Toko

export interface BSPSBOQItem {
  id: string;
  no: number;
  namaBarang: string;
  volume: number;
  satuan: string;
  hargaSatuan: number;
  jumlah: number;
  merek: string;
}

export interface BSPSAppState {
  recipient: RecipientProfile;
  kpb: KpbProfile;
  tfl: TflProfile;
  toko: TokoProfile;
  desa: DesaProfile;
  project: GeneralProjectState;
  selectedFormat: FormatType;
  boqItems: BSPSBOQItem[];
  tokoBandingan: {
    toko1Nama: string;
    toko1HargaSatuan: { [key: string]: number };
    toko2Nama: string;
    toko2HargaSatuan: { [key: string]: number };
    toko3Nama: string;
    toko3HargaSatuan: { [key: string]: number };
  };
  customFields: { [key: string]: string };
}
