export interface CPBData {
  id: string;
  nama: string;
  nik: string;
  umur: string;
  pekerjaan: string;
  alamatSecaraLengkap: string;
  noRekening: string;
  jumlahSwadayaUang: string;
  bentukSwadayaBarang: string;
  namaTukang: string;
  nikTukang: string;
}

export interface DesaData {
  nama: string;
  kepalaDesa: string;
  nipKepalaDesa: string;
  alamatKantor: string;
  toko: {
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
  };
  cpbs: CPBData[];
}

export interface KecamatanData {
  nama: string;
  tfl: {
    namaTfl: string;
    lokasi: string;
    koordinatorKabupaten: string;
    timPendampingProvinsi: string;
  };
  desas: { [key: string]: DesaData };
}

// Generate unique, authentic Bima names for 14 CPBs * 6 Desas = 84 CPBs and their corresponding Tukangs.
const firstNames = ["Ahmad", "Abdul", "Muhammad", "Syarif", "Junaidin", "Burhan", "Rahmat", "Kamaluddin", "Herman", "Firdaus", "M. Thoyib", "Iskandar", "Suhardi", "Zainuddin", "Samsul", "Ilham", "Khairul", "Anwar", "Bambang", "Edi"];
const lastNames = ["Yasin", "Arifin", "Subhan", "Said", "Abbas", "HM", "Daud", "Hasan", "M. Ali", "Husain", "Bakar", "Kamal", "Rasyid", "Anas", "Suaeb", "Rahman", "Malik", "Fajri", "Halim", "Saleh"];

const tukangFirstNames = ["Zainal", "Kaimuddin", "Sofyan", "Ramli", "Nasruddin", "Dahlan", "Ibrahim", "Arsyad", "Ruslan", "Hasanuddin", "Sudirman", "Amiruddin", "Syarifuddin", "Taufik"];
const tukangLastNames = ["Abidin", "Tholib", "Lajuma", "Baco", "Rani", "Mone", "Sila", "Kae", "Umar", "Sagir", "Mojo", "Gani"];

function generateNIK(seed: number): string {
  // Bima NIK prefix 5206...
  return `520608${20 + (seed % 10)}${10 + (seed % 12)}${70 + (seed % 20)}000${1 + (seed % 9)}`;
}

function generateNoRek(seed: number): string {
  return `0032-01-0${30000 + seed}-50-${seed % 9}`;
}

const jobs = ["Petani / Pekebun", "Nelayan Tradisional", "Wiraswasta Kecil", "Buruh Harian Lepas", "Pedagang Kelontong", "Pertukangan Lokal"];

function generateCPBsForDesa(desaName: string, kecamatanName: string, offset: number): CPBData[] {
  const list: CPBData[] = [];
  for (let i = 1; i <= 14; i++) {
    const seed = offset + i;
    const cpbName = `${firstNames[seed % firstNames.length]} ${lastNames[(seed + 5) % lastNames.length]}`;
    const tukangName = `${tukangFirstNames[seed % tukangFirstNames.length]} ${tukangLastNames[(seed + 3) % tukangLastNames.length]}`;
    
    // Distribute swadaya levels realistically for Bima BSPS
    const swadayaCash = (seed % 3 === 0) ? "Rp 4.000.000" : (seed % 3 === 1) ? "Rp 5.500.000" : "Rp 3.000.000";
    const swadayaGoods = (seed % 2 === 0) 
      ? "Kayu Kelapa (Reng/Kasau), Batu Gunung (5 M3)" 
      : "Pasir Kali (6 M3), Batu Bata Ringan (3 Unit)";

    list.push({
      id: `cpb-${desaName.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      nama: cpbName,
      nik: generateNIK(seed * 11),
      umur: String(30 + (seed % 35)),
      pekerjaan: jobs[seed % jobs.length],
      alamatSecaraLengkap: `RT. 0${1 + (i % 5)} RW. 02 Dusun Bahari Utama`,
      noRekening: generateNoRek(seed * 17),
      jumlahSwadayaUang: swadayaCash,
      bentukSwadayaBarang: swadayaGoods,
      namaTukang: tukangName,
      nikTukang: generateNIK(seed * 23 + 999)
    });
  }
  return list;
}

export const BSPS_HIERARCHY_DATA: { [key: string]: KecamatanData } = {
  "Bolo": {
    nama: "Bolo",
    tfl: {
      namaTfl: "Ahmad Faisal, S.T.",
      lokasi: "Kecamatan Bolo",
      koordinatorKabupaten: "Ir. H. Muhammad Ilyas, M.T.",
      timPendampingProvinsi: "Tim Konsultan Manajemen (TKM) Swadaya NTB"
    },
    desas: {
      "Desa Bolo": {
        nama: "Desa Bolo",
        kepalaDesa: "Arifin Ahmad, S.Sos.",
        nipKepalaDesa: "197504122009011003",
        alamatKantor: "Jl. Lintas Bolo No. 1, Kantor Kades Bolo",
        toko: {
          namaToko: "UD. TOKO KARYA AGUNG",
          pemilikToko: "H. Syamsuddin HM",
          nikPemilik: "5206081102710003",
          npwpUsaha: "26.939.991.6-367.000",
          alamat: "Jl. Raya Lintas Sape-Bolo No. 42, Desa Bolo, Kabupaten Bima",
          siupNomor: "503/SIUP-K/124/XII/2024",
          siupTanggal: "12-12-2024",
          situNomor: "503/SITU/098/X/2024",
          situTanggal: "11-10-2024",
          noRekeningToko: "0032-01-002345-53-1",
          bankToko: "Bank Rakyat Indonesia (BRI)"
        },
        cpbs: generateCPBsForDesa("Bolo", "Bolo", 100)
      },
      "Desa Rasabou": {
        nama: "Desa Rasabou",
        kepalaDesa: "Drs. H. M. Said Rasabou",
        nipKepalaDesa: "196803211994021002",
        alamatKantor: "Jl. Lapangan Garuda No. 34, Desa Rasabou",
        toko: {
          namaToko: "CV. BERKAH RASABOU MAS",
          pemilikToko: "Hj. Fatimah Yahya",
          nikPemilik: "5206085511740002",
          npwpUsaha: "28.121.345.6-367.000",
          alamat: "Jl. Poros Rasabou-Bolo Km. 2, Desa Rasabou, Kab. Bima",
          siupNomor: "503/SIUP-M/058/V/2025",
          siupTanggal: "15-05-2025",
          situNomor: "503/SITU/124/V/2025",
          situTanggal: "14-05-2025",
          noRekeningToko: "0032-01-011244-53-3",
          bankToko: "Bank Rakyat Indonesia (BRI) Unit Bolo"
        },
        cpbs: generateCPBsForDesa("Rasabou", "Bolo", 200)
      },
      "Desa Sanolo": {
        nama: "Desa Sanolo",
        kepalaDesa: "Junaidin M. Ali, S.E.",
        nipKepalaDesa: "198211052011011005",
        alamatKantor: "Jl. Lintas Bima-Sumbawa No. 74, Sanolo",
        toko: {
          namaToko: "UD. SANOLO SEMESTA JAYA",
          pemilikToko: "H. Muhammad Sanolo",
          nikPemilik: "5206080909780001",
          npwpUsaha: "31.455.908.2-367.000",
          alamat: "Jl. Pelabuhan Sanolo No. 9, RT 02/01, Desa Sanolo",
          siupNomor: "503/SIUP-K/302/XI/2024",
          siupTanggal: "22-11-2024",
          situNomor: "503/SITU/299/XI/2024",
          situTanggal: "20-11-2024",
          noRekeningToko: "0032-01-098877-50-2",
          bankToko: "Bank NTB Syariah Cabang Bima"
        },
        cpbs: generateCPBsForDesa("Sanolo", "Bolo", 300)
      }
    }
  },
  "Sanggar": {
    nama: "Sanggar",
    tfl: {
      namaTfl: "Subhan Al-Fatih, S.T.",
      lokasi: "Kecamatan Sanggar",
      koordinatorKabupaten: "Ir. H. Muhammad Ilyas, M.T.",
      timPendampingProvinsi: "Tim Konsultan Manajemen (TKM) Swadaya NTB"
    },
    desas: {
      "Desa Sangiang": {
        nama: "Desa Sangiang",
        kepalaDesa: "Ibrahim Dahlan, S.Sos.",
        nipKepalaDesa: "197808262007011002",
        alamatKantor: "Jl. Lintas Sanggar-Tambora No. 22, Desa Sangiang",
        toko: {
          namaToko: "UD. SANGIANG UTAMA JAYA",
          pemilikToko: "H. Ahmad Sangiang",
          nikPemilik: "5206081404650005",
          npwpUsaha: "24.551.988.3-367.000",
          alamat: "Jl. Raya Sangiang Indah No. 104, Desa Sangiang, Kab. Bima",
          siupNomor: "503/SIUP-K/091/II/2025",
          siupTanggal: "18-02-2025",
          situNomor: "503/SITU/083/II/2025",
          situTanggal: "17-02-2025",
          noRekeningToko: "0032-01-044550-53-9",
          bankToko: "Bank Rakyat Indonesia (BRI) Cabang Bima"
        },
        cpbs: generateCPBsForDesa("Sangiang", "Sanggar", 400)
      },
      "Desa Boro": {
        nama: "Desa Boro",
        kepalaDesa: "Burhanuddin HM, S.Pd.",
        nipKepalaDesa: "197204151999031004",
        alamatKantor: "Jl. Lintas Tambora KM 12, Desa Boro",
        toko: {
          namaToko: "UD. BORO PRIMA MATERIAL",
          pemilikToko: "H. Ibrahim Boro",
          nikPemilik: "5206082210690001",
          npwpUsaha: "29.988.112.4-367.000",
          alamat: "Jl. Pasar Baru Boro No. 8, Desa Boro, Kec. Sanggar",
          siupNomor: "503/SIUP-K/422/IV/2024",
          siupTanggal: "29-04-2024",
          situNomor: "503/SITU/411/IV/2024",
          situTanggal: "28-04-2024",
          noRekeningToko: "0032-01-073822-53-5",
          bankToko: "Bank Rakyat Indonesia (BRI)"
        },
        cpbs: generateCPBsForDesa("Boro", "Sanggar", 500)
      },
      "Desa Sandue": {
        nama: "Desa Sandue",
        kepalaDesa: "Muhajir Syarif, S.H.",
        nipKepalaDesa: "198009122010011003",
        alamatKantor: "Jl. Desa Sandue Tengah No. 5, Sandue",
        toko: {
          namaToko: "UD. SANDUE LESTARI JAYA",
          pemilikToko: "H. Yusuf Sandue",
          nikPemilik: "5206080312750005",
          npwpUsaha: "33.112.551.9-367.000",
          alamat: "Jl. Pantai Sandue Indah KM 1, Desa Sandue",
          siupNomor: "503/SIUP-M/109/VIII/2025",
          siupTanggal: "09-08-2025",
          situNomor: "503/SITU/105/VIII/2025",
          situTanggal: "08-08-2025",
          noRekeningToko: "0032-01-081122-53-0",
          bankToko: "Bank Rakyat Indonesia (BRI) Unit Sanggar"
        },
        cpbs: generateCPBsForDesa("Sandue", "Sanggar", 600)
      }
    }
  }
};
