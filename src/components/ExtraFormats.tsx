import React from 'react';
import { BSPSAppState } from '../types';

interface ExtraFormatsProps {
  state: BSPSAppState;
}

export const ExtraFormats: React.FC<ExtraFormatsProps> = ({ state }) => {
  const { recipient, kpb, tfl, toko, desa, project, boqItems, customFields } = state;

  const fmtRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID') + ',-';
  };

  switch (state.selectedFormat) {
    case 'FORMAT_II_46':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-46</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LEMBAR PEMERIKSAAN KUALITAS KONSTRUKSI BANGUNAN
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs border-2 border-black p-2 bg-[#F9F9F6] font-mono">
            <div>
              <p>No BNBA : <span className="font-bold">BNBA-{recipient.id.replace(/\D/g, '') || '09'}</span></p>
              <p>Nama PB : <span className="font-bold">{recipient.nama}</span></p>
              <p>NIK PB : <span className="font-bold">{recipient.nik}</span></p>
              <p>Progres : <span className="font-bold text-emerald-700">100% (Selesai Fisik)</span></p>
            </div>
            <div>
              <p>Alamat : <span>{recipient.alamatSecaraLengkap}</span></p>
              <p>Desa/Kec : <span>{recipient.desa} / {recipient.kecamatan}</span></p>
              <p>Kabupaten : <span>Bima</span></p>
              <p>Jenis Konstruksi : <span className="font-bold text-blue-900">Bata Merah + Kusen Kayu Jati</span></p>
            </div>
          </div>

          <table className="w-full text-[10px] border-2 border-black font-sans">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold text-center">
                <th className="p-1.5 border-r border-black w-6">No</th>
                <th className="p-1.5 border-r border-black w-28">Komponen</th>
                <th className="p-1.5 border-r border-black">Bagian yang Diperiksa</th>
                <th className="p-1.5 border-r border-black w-24">Hasil (Pilihan)</th>
                <th className="p-1.5 border-r border-black w-14">Skor</th>
                <th className="p-1.5">Kesimpulan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-50/50 border-b border-black font-bold text-[9px]">
                <td colSpan={6} className="p-1 font-mono">A. STRUKTUR UTAMA</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 text-center border-r border-black font-mono">1</td>
                <td className="p-1.5 border-r border-black font-bold">Pondasi</td>
                <td className="p-1.5 border-r border-black">Kualitas adukan pondasi, kedalaman galian, lebar tapak, koneksi ke besi sloof</td>
                <td className="p-1.5 border-r border-black text-center font-bold text-emerald-800 bg-emerald-50/50">Aman</td>
                <td className="p-1.5 border-r border-black text-center font-mono">1.00</td>
                <td className="p-1.5 text-center text-emerald-800 font-semibold">Layak & Kokoh</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 text-center border-r border-black font-mono">2</td>
                <td className="p-1.5 border-r border-black font-bold">Sloof / Balok Bawah</td>
                <td className="p-1.5 border-r border-black">Ketebalan beton sloof, jumlah besi utama (minimal 4 Dia 10mm), jarak sengkang (begel)</td>
                <td className="p-1.5 border-r border-black text-center font-bold text-emerald-800 bg-emerald-50/50">Aman</td>
                <td className="p-1.5 border-r border-black text-center font-mono">1.00</td>
                <td className="p-1.5 text-center text-emerald-800 font-semibold">Memenuhi Teknis</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 text-center border-r border-black font-mono">3</td>
                <td className="p-1.5 border-r border-black font-bold">Kolom Beton</td>
                <td className="p-1.5 border-r border-black">Kelikatan cor, kelurusan kolom vertikal, koneksi angkur ke tembok bata merah</td>
                <td className="p-1.5 border-r border-black text-center font-bold text-emerald-800 bg-emerald-50/50">Aman</td>
                <td className="p-1.5 border-r border-black text-center font-mono">1.00</td>
                <td className="p-1.5 text-center text-emerald-800 font-semibold">Sangat Baik</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 text-center border-r border-black font-mono">4</td>
                <td className="p-1.5 border-r border-black font-bold">Ring Balok Atas</td>
                <td className="p-1.5 border-r border-black">Dimensi ring balok keliling, penulangan beton pemikul atap</td>
                <td className="p-1.5 border-r border-black text-center font-bold text-emerald-800 bg-emerald-50/50">Aman</td>
                <td className="p-1.5 border-r border-black text-center font-mono">1.00</td>
                <td className="p-1.5 text-center text-emerald-800 font-semibold">Layak Struktur</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 text-center border-r border-black font-mono">5</td>
                <td className="p-1.5 border-r border-black font-bold">Kuda-Kuda / Atap</td>
                <td className="p-1.5 border-r border-black">Kerapian sambungan baut kayu rangka, ketahanan gording kayu besi jati</td>
                <td className="p-1.5 border-r border-black text-center font-bold text-emerald-800 bg-emerald-50/50">Aman</td>
                <td className="p-1.5 border-r border-black text-center font-mono">1.00</td>
                <td className="p-1.5 text-center text-emerald-800 font-semibold">Rapi & Presisi</td>
              </tr>
              <tr className="bg-yellow-50/50 border-b border-black font-bold text-[9px]">
                <td colSpan={6} className="p-1 font-mono">B. KESEHATAN DAN KECUKUPAN LUAS</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 text-center border-r border-black font-mono">6</td>
                <td className="p-1.5 border-r border-black font-bold">Akses Air Minum</td>
                <td className="p-1.5 border-r border-black">Adanya kran air bersih terlindungi dari cemaran septic-tank minimal 10 M</td>
                <td className="p-1.5 border-r border-black text-center font-bold text-emerald-800 bg-emerald-50/50">Layak</td>
                <td className="p-1.5 border-r border-black text-center font-mono">1.00</td>
                <td className="p-1.5 text-center text-emerald-800 font-semibold">Akses Air Bersih Sesuai</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 text-center border-r border-black font-mono">7</td>
                <td className="p-1.5 border-r border-black font-bold">Akses Sanitasi MCK</td>
                <td className="p-1.5 border-r border-black">Toilet leher angsa (closet jongkok TOTO) terkoneksi septic tank kedap air</td>
                <td className="p-1.5 border-r border-black text-center font-bold text-emerald-800 bg-emerald-50/50">Layak</td>
                <td className="p-1.5 border-r border-black text-center font-mono">1.00</td>
                <td className="p-1.5 text-center text-emerald-800 font-semibold">Saniter & Sehat</td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="p-1.5 text-center border-r border-black font-mono">8</td>
                <td className="p-1.5 border-r border-black font-bold">Pencahayaan & Luas</td>
                <td className="p-1.5 border-r border-black">Ventilasi minimal 10% luas lantai, kecukupan luas minimal 9m2 per jiwa</td>
                <td className="p-1.5 border-r border-black text-center font-bold text-emerald-800 bg-emerald-50/50">Layak</td>
                <td className="p-1.5 border-r border-black text-center font-mono">1.00</td>
                <td className="p-1.5 text-center text-emerald-800 font-semibold">Nyaman Terang</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-3 text-center text-[10px] gap-4 pt-4 border-t border-black">
            <div>
              <p>Diperiksa Oleh TFL,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
              <p className="text-[8px] text-slate-500">Tenaga Fasilitator Lapangan</p>
            </div>
            <div>
              <p>Diverifikasi Oleh Korkab,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
              <p className="text-[8px] text-slate-500">Koordinator Kabupaten Bima</p>
            </div>
            <div>
              <p>Persetujuan Ahli,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">(Ir. Hermawan S., M.T.)</p>
              <p className="text-[8px] text-slate-500">BSPS Technical Advisor NTB</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_47':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-47</div>
          <div className="text-center font-bold text-sm uppercase underline">
            REKAPITULASI HASIL PERIKSA KUALITAS KONSTRUKSI TINGKAT DESA
          </div>
          <div className="text-xs space-y-1 font-mono pl-2 border-l-4 border-double border-black">
            <p>Desa / Kelurahan : <span className="font-bold">{desa.desa}</span></p>
            <p>Kecamatan : <span className="font-bold">{desa.kecamatan}</span></p>
            <p>Kabupaten/Kota : <span className="font-bold font-mono">Kabupaten Bima</span></p>
          </div>

          <table className="w-full text-[8.5px] border-2 border-black font-sans text-center">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black" rowSpan={2}>No</th>
                <th className="p-1 border-r border-black" rowSpan={2}>Nama PB</th>
                <th className="p-1 border-r border-black" rowSpan={2}>Tgl Periksa TFL</th>
                <th className="p-1 border-r border-black text-center font-bold" colSpan={3}>Pondasi</th>
                <th className="p-1 border-r border-black text-center font-bold" colSpan={3}>Sloof</th>
                <th className="p-1 border-r border-black text-center font-bold" colSpan={3}>Kolom</th>
                <th className="p-1 border-r border-black text-center font-bold" colSpan={3}>Ring Balok</th>
                <th className="p-1">Kesimpulan</th>
              </tr>
              <tr className="bg-[#F2F2EB] border-b-2 border-black text-[7px]">
                <th className="p-0.5 border-r border-black">Kw</th>
                <th className="p-0.5 border-r border-black">K</th>
                <th className="p-0.5 border-r border-black">C</th>
                <th className="p-0.5 border-r border-black">Kw</th>
                <th className="p-0.5 border-r border-black">K</th>
                <th className="p-0.5 border-r border-black">C</th>
                <th className="p-0.5 border-r border-black">Kw</th>
                <th className="p-0.5 border-r border-black">K</th>
                <th className="p-0.5 border-r border-black">C</th>
                <th className="p-0.5 border-r border-black">Kw</th>
                <th className="p-0.5 border-r border-black">K</th>
                <th className="p-0.5 border-r border-black">C</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {kpb.anggota.slice(0, 7).map((member, i) => (
                <tr key={i} className="border-b border-black">
                  <td className="p-1 border-r border-black font-mono">{i + 1}</td>
                  <td className="p-1 border-r border-black font-medium text-left">{member}</td>
                  <td className="p-1 border-r border-black font-mono">14-04-2026</td>
                  <td className="p-1 border-r border-black bg-emerald-50 text-emerald-800 font-bold">A</td>
                  <td className="p-1 border-r border-black font-semibold text-emerald-850">Aman</td>
                  <td className="p-1 border-r border-black text-slate-400 font-mono">-</td>
                  <td className="p-1 border-r border-black bg-emerald-50 text-emerald-800 font-bold">A</td>
                  <td className="p-1 border-r border-black font-semibold text-emerald-850">Aman</td>
                  <td className="p-1 border-r border-black text-slate-400 font-mono">-</td>
                  <td className="p-1 border-r border-black bg-emerald-50 text-emerald-800 font-bold">A</td>
                  <td className="p-1 border-r border-black font-semibold text-emerald-850">Aman</td>
                  <td className="p-1 border-r border-black text-slate-400 font-mono">-</td>
                  <td className="p-1 border-r border-black bg-emerald-50 text-emerald-800 font-bold">A</td>
                  <td className="p-1 border-r border-black font-semibold text-emerald-850">Aman</td>
                  <td className="p-1 border-r border-black text-slate-400 font-mono">-</td>
                  <td className="p-1 text-emerald-900 font-black bg-emerald-50/20">LAYAK FISIK</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-[#FAF9F5] border-2 border-black p-2 font-mono text-[8px] space-y-1">
            <p className="font-bold">Keterangan Singkatan:</p>
            <p>• <span className="font-bold">Kw:</span> Kategori Kualitas (A: Aman, B: Layak, C: Perlu Perbaikan)</p>
            <p>• <span className="font-bold">K:</span> Kesimpulan Pemeriksaan (Aman / Perbaikan)</p>
            <p>• <span className="font-bold">C:</span> Catatan/Koreksi di Lapangan</p>
          </div>

          <div className="grid grid-cols-3 text-center text-[10px] pt-4">
            <div>
              <p>Diverifikasi oleh,</p>
              <p className="font-bold">Tim Pendamping Provinsi</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.timPendampingProvinsi.split(' ')[0]})</p>
            </div>
            <div>
              <p>Diverifikasi oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_48':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-48</div>
          <div className="text-center font-bold text-sm uppercase underline">
            VERIFIKASI PEMERIKSAAN KUALITAS / QUALITY ASSESSMENT AND QUALITY CONTROL (QAQC)
          </div>
          <div className="grid grid-cols-2 text-xs border border-black p-2 font-mono bg-stone-50">
            <div>
              <p>Provinsi : <span className="font-bold">NUSA TENGGARA BARAT</span></p>
              <p>Kabupaten/Kota : <span className="font-bold">KABUPATEN BIMA</span></p>
            </div>
            <div>
              <p>Tanggal Pengisian : <span className="font-bold">25 Mei 2026</span></p>
              <p>Wilayah Dampingan : <span className="font-bold">Sanggar / Bolo</span></p>
            </div>
          </div>

          <p className="text-[10px] text-justify leading-relaxed">
            Form ini digunakan oleh Koordinator Kabupaten dan Konsultan Provinsi untuk mengaudit kebenaran foto kelengkapan kualitas konstruksi fisik yang diserahkan oleh TFL pendamping.
          </p>

          <table className="w-full text-[9px] border-2 border-black font-sans">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black w-8">No.</th>
                <th className="p-1 border-r border-black text-left pl-1">Aspek Pemeriksaan QAQC</th>
                <th className="p-1 border-r border-black w-16">Pencapaian</th>
                <th className="p-1 border-r border-black w-24">Validasi</th>
                <th className="p-1">Keterangan / Audit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="p-1 text-center border-r border-black font-mono">1</td>
                <td className="p-1 border-r border-black pl-1 font-semibold">Koordinat GPS & Lampiran Foto</td>
                <td className="p-1 border-r border-black text-center font-mono">Tersedia</td>
                <td className="p-1 border-r border-black text-center font-bold text-emerald-850">✔ Valid</td>
                <td className="p-1 font-mono text-[8px]">Titik lokasi rumah tervalidasi radar satelit</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 text-center border-r border-black font-mono">2</td>
                <td className="p-1 border-r border-black pl-1 font-semibold">Kualitas Pasangan Pondasi Batu</td>
                <td className="p-1 border-r border-black text-center font-mono">Presisi</td>
                <td className="p-1 border-r border-black text-center font-bold text-emerald-850">✔ Valid</td>
                <td className="p-1 font-mono text-[8px]">Adukan merata semen berstruktur kuat</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 text-center border-r border-black font-mono">3</td>
                <td className="p-1 border-r border-black pl-1 font-semibold">Sloof Cor & Sambungan Besi</td>
                <td className="p-1 border-r border-black text-center font-mono">Baik</td>
                <td className="p-1 border-r border-black text-center font-bold text-emerald-850">✔ Valid</td>
                <td className="p-1 font-mono text-[8px]">Menggunakan besi utama Dia 10mm SNI</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 text-center border-r border-black font-mono">4</td>
                <td className="p-1 border-r border-black pl-1 font-semibold">Kolom & Pembesian Vertikal</td>
                <td className="p-1 border-r border-black text-center font-mono">Baik</td>
                <td className="p-1 border-r border-black text-center font-bold text-emerald-850">✔ Valid</td>
                <td className="p-1 font-mono text-[8px]">Keluaran sengkang rapi, jarak 15cm</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 text-center border-r border-black font-mono">5</td>
                <td className="p-1 border-r border-black pl-1 font-semibold">Ring Balok Cor Atas</td>
                <td className="p-1 border-r border-black text-center font-mono">Cukup</td>
                <td className="p-1 border-r border-black text-center font-bold text-emerald-850">✔ Valid</td>
                <td className="p-1 font-mono text-[8px]">Beton kering sempurna sebelum pasang atap</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 text-center border-r border-black font-mono">6</td>
                <td className="p-1 border-r border-black pl-1 font-semibold">Sanitasi MCK (Kloset & Tangki)</td>
                <td className="p-1 border-r border-black text-center font-mono">Saniter</td>
                <td className="p-1 border-r border-black text-center font-bold text-emerald-850">✔ Valid</td>
                <td className="p-1 font-mono text-[8px]">Tangki septik berjarak aman dari sumur warga</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-6">
            <div>
              <p>Diverifikasi Oleh,</p>
              <p className="font-bold">Tim Pendamping Provinsi NTB</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.timPendampingProvinsi})</p>
            </div>
            <div>
              <p>Dibuat Oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_49':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-49</div>
          <div className="text-center font-bold text-sm uppercase underline">
            REKAPITULASI HASIL AUDIT QAQC PENGAWASAN KUALITAS SE-KECAMATAN
          </div>
          <div className="grid grid-cols-3 text-xs border-2 border-black p-2 bg-[#F3F2EB] font-serif font-semibold">
            <div>Kecamatan : <span className="font-mono text-black font-bold">{desa.kecamatan}</span></div>
            <div>Kabupaten : <span className="font-mono text-black font-bold">Bima</span></div>
            <div>Provinsi : <span className="font-mono text-black font-bold">Nusa Tenggara Barat</span></div>
          </div>

          <table className="w-full text-[8px] border-2 border-black text-center font-sans">
            <thead>
              <tr className="bg-[#EAEAE2] border-b border-black font-bold">
                <th className="p-1 border-r border-black">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Nama Penerima Bantuan</th>
                <th className="p-1 border-r border-black">Desa</th>
                <th className="p-1 border-r border-black">Pondasi (QC1)</th>
                <th className="p-1 border-r border-black">Sloof (QC2)</th>
                <th className="p-1 border-r border-black">Kolom (QC3)</th>
                <th className="p-1 border-r border-black">Atap (QC4)</th>
                <th className="p-1 border-r border-black">MCK (QC5)</th>
                <th className="p-1">Kesimpulan RLH</th>
              </tr>
            </thead>
            <tbody>
              {kpb.anggota.slice(0, 10).map((member, i) => (
                <tr key={i} className="border-b border-black text-left">
                  <td className="p-1 border-r border-black text-center font-mono">{i + 1}</td>
                  <td className="p-1 border-r border-black pl-1 font-bold">{member}</td>
                  <td className="p-1 border-r border-black text-center">{desa.desa}</td>
                  <td className="p-1 border-r border-black text-center font-semibold text-emerald-800 bg-emerald-50/50">1 (Aman)</td>
                  <td className="p-1 border-r border-black text-center font-semibold text-emerald-800 bg-emerald-50/50">1 (Aman)</td>
                  <td className="p-1 border-r border-black text-center font-semibold text-emerald-800 bg-emerald-50/50">1 (Aman)</td>
                  <td className="p-1 border-r border-black text-center font-semibold text-emerald-800 bg-emerald-50/50">1 (Aman)</td>
                  <td className="p-1 border-r border-black text-center font-semibold text-emerald-800 bg-emerald-50/50">1 (Aman)</td>
                  <td className="p-1 text-center font-bold text-emerald-900 bg-emerald-100/50">LAYAK RLH</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-6 gap-y-4">
            <div>
              <p>Diketahui oleh,</p>
              <p className="font-bold">Pejabat Pembuat Komitmen (PPK)</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({project.namaPPK})</p>
            </div>
            <div>
              <p>Dibuat oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_42':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-42</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LAPORAN PENGGUNAAN DANA TAHAP 2 (LPD-TAHAP II)
          </div>
          <table className="w-full text-xs font-serif pl-4 bg-stone-50 border p-2">
            <tbody>
              <tr><td className="w-40">Nomor BNBA</td><td>:</td><td className="font-bold font-mono">BNBA-{recipient.id.toUpperCase()}</td></tr>
              <tr><td>Nama Penerima Bantuan</td><td>:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td>NIK Penerima / KPB</td><td>:</td><td>{recipient.nik} / {kpb.namaKpb}</td></tr>
              <tr><td>Alamat Lengkap</td><td>:</td><td>Desa {recipient.desa}, Kecamatan {recipient.kecamatan}, Bima</td></tr>
              <tr><td>Nomor Rekening Bank</td><td>:</td><td className="font-mono">{recipient.noRekening} (BRI)</td></tr>
            </tbody>
          </table>

          <p className="text-xs text-justify leading-relaxed">
            Dengan ini melaporkan pertanggungjawaban penggunaan dana bantuan BSPS Tahap II sebesar <span className="font-bold">Rp 10.000.000,- (Sepuluh Juta Rupiah)</span> untuk menyelesaikan pekerjaan konstruksi fisik rumah layak huni (RLH) dari 30% mencapai tuntas 100%.
          </p>

          <div className="border border-black p-2 space-y-1 bg-[#FDFFF6]">
            <p className="text-[10px] font-bold uppercase underline">B. LAMPIRAN DOKUMEN FISIK LAPORAN TAHAP 2:</p>
            <ol className="list-decimal pl-5 text-[9px] space-y-1 text-slate-800">
              <li>Daftar Rencana Pemanfaatan Bantuan (DRPB) Tahap 2 yang disahkan TFL</li>
              <li>Hasil realisasi penerimaan bahan bangunan Tahap 2 resmi dari Toko: <span className="font-bold">{toko.namaToko}</span></li>
              <li>Tanda bukti slip transfer bank penerima bantuan ke rekening Toko</li>
              <li>Foto berwarna kondisi rumah kemajuan 0%, 30%, hingga 100% tuntas tampak depan-belakang</li>
              <li>Kuitansi Pembayaran Upah Kerja Tukang Tahap 2 (nilai {customFields.jumlahUpahDitarik || 'Rp 1.250.000'})</li>
              <li>Fotokopi halaman buku tabungan BRI yang mencatat debet transfer pembelanjaan</li>
            </ol>
          </div>

          <div className="grid grid-cols-3 text-center text-[10px] pt-8">
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Dibuat oleh,</p>
              <p className="font-bold">Penerima Bantuan</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[8px] font-mono border border-dashed rounded p-1 text-slate-400">Tanda Tangan</span>
              </div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_33':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-33</div>
          <div className="text-center font-bold text-sm uppercase underline">
            SURAT TANDA PENERIMAAN BAHAN BANGUNAN
          </div>
          <div className="grid grid-cols-2 text-xs border border-black p-2 font-mono bg-stone-50">
            <div>
              <p>KPB : <span className="font-bold">{kpb.namaKpb}</span></p>
              <p>Nama Penerima : <span className="font-bold">{recipient.nama}</span></p>
              <p>NIK Penerima : <span className="font-bold">{recipient.nik}</span></p>
            </div>
            <div>
              <p>Toko Suplier : <span className="font-bold">{toko.namaToko}</span></p>
              <p>Desa / Kecamatan : <span>{recipient.desa} / {recipient.kecamatan}</span></p>
              <p>No Rekening CPB : <span className="font-mono">{recipient.noRekening}</span></p>
            </div>
          </div>

          <table className="w-full text-[10px] border-2 border-black font-sans text-center">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black w-8">No.</th>
                <th className="p-1 border-r border-black text-left pl-1">Bahan Bangunan Yang Dikirim</th>
                <th className="p-1 border-r border-black w-16">Satuan</th>
                <th className="p-1 border-r border-black w-14">Jumlah</th>
                <th className="p-1 border-r border-black w-14">Tanggal Terima</th>
                <th className="p-1">Kondisi / Merek</th>
              </tr>
            </thead>
            <tbody>
              {boqItems.slice(0, 8).map((item, idx) => (
                <tr key={idx} className="border-b border-black">
                  <td className="p-1 border-r border-black font-mono">{idx + 1}</td>
                  <td className="p-1 border-r border-black text-left pl-1 font-medium">{item.namaBarang}</td>
                  <td className="p-1 border-r border-black">{item.satuan}</td>
                  <td className="p-1 border-r border-black font-bold">{item.volume}</td>
                  <td className="p-1 border-r border-black font-mono text-[9px]">16-04-2026</td>
                  <td className="p-1 text-emerald-800 bg-emerald-50/20 font-bold">{item.merek || 'SNI BAIK'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Diserahkan oleh,</p>
              <p className="font-bold">Perwakilan Toko {toko.namaToko}</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({toko.pemilikToko})</p>
            </div>
            <div>
              <p>Diterima dan disetujui oleh,</p>
              <p className="font-bold">Penerima Bantuan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_34':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-34</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LAPORAN REKAPITULASI PENGIRIMAN LOGISTIK BAHAN BANGUNAN
          </div>
          <div className="grid grid-cols-2 text-xs border border-black p-2 font-mono bg-stone-50">
            <div>
              <p>Nama Toko : <span className="font-bold">{toko.namaToko}</span></p>
              <p>Pemilik Usaha : <span className="font-bold">{toko.pemilikToko}</span></p>
              <p>No SIUP / SITU : <span>{toko.siupNomor}</span></p>
            </div>
            <div>
              <p>Untuk KPB : <span className="font-bold">{kpb.namaKpb}</span></p>
              <p>Kecamatan : <span>{desa.kecamatan}</span></p>
              <p>Kabupaten/Provinsi : <span>Bima / NTB</span></p>
            </div>
          </div>

          <p className="text-[10px] text-justify leading-relaxed pl-2 border-l-4 border-emerald-800">
            Laporan pengiriman bulanan yang diterbitkan oleh Toko Material Pemenang Survei untuk memvalidasi volume kiriman semen, kayu ruko, paku, dan kloset ke lokasi rehabilitasi warga.
          </p>

          <table className="w-full text-[9px] border border-black text-center text-slate-800">
            <thead>
              <tr className="bg-slate-100 border-b border-black font-bold">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Deskripsi Material</th>
                <th className="p-1 border-r border-black w-14">Satuan</th>
                <th className="p-1 border-r border-black w-16">Total Volume DRPB</th>
                <th className="p-1 border-r border-black w-16">Telah Dikirim</th>
                <th className="p-1 border-r border-black w-16">Sisa Belum Kirim</th>
                <th className="p-1">Status Pengiriman</th>
              </tr>
            </thead>
            <tbody>
              {boqItems.slice(0, 10).map((item, idx) => (
                <tr key={idx} className="border-b border-black text-left">
                  <td className="p-1 border-r border-black text-center font-mono">{idx + 1}</td>
                  <td className="p-1 border-r border-black pl-1 font-medium">{item.namaBarang}</td>
                  <td className="p-1 border-r border-black text-center">{item.satuan}</td>
                  <td className="p-1 border-r border-black text-center font-mono">{item.volume}</td>
                  <td className="p-1 border-r border-black text-center font-mono text-emerald-800">{item.volume}</td>
                  <td className="p-1 border-r border-black text-center font-mono text-slate-400">0</td>
                  <td className="p-1 text-center text-[8px] bg-emerald-50 text-emerald-900 font-bold">LENGKAP 100%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between text-xs pt-6">
            <div>
              <p>Mendampingi,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Bima, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">UD. TOKO KARYA AGUNG,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({toko.pemilikToko})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_37':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-37</div>
          <div className="text-center font-bold text-sm uppercase underline">
            PROGRES KONSTRUKSI TERPASANG (RAPID ASSESSMENT INDIVIDU)
          </div>
          <table className="w-full text-xs font-serif bg-stone-50 border p-2">
            <tbody>
              <tr><td className="w-40">Nomor BNBA</td><td>:</td><td className="font-bold font-mono">BNBA-{recipient.id.toUpperCase()}</td></tr>
              <tr><td>Nama Penerima Bantuan</td><td>:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td>Kabupaten / Provinsi</td><td>:</td><td>Bima / Nusa Tenggara Barat</td></tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-black p-2 bg-yellow-50/20">
              <p className="text-[10px] font-bold text-center border-b border-black pb-1 uppercase">1. KONDISI AWAL (EKSISTING 0%)</p>
              <table className="w-full text-[8.5px] mt-1">
                <tbody>
                  <tr><td>• Pondasi</td><td>: Batu Retak / Tidak Semen</td></tr>
                  <tr><td>• Sloof</td><td>: Tidak Ada cor bawah</td></tr>
                  <tr><td>• Kolom</td><td>: Tiang Kayu Lapuk</td></tr>
                  <tr><td>• Dinding</td><td>: Bedek / Bambu Lapuk</td></tr>
                  <tr><td>• Atap</td><td>: Daun Kelapa / Seng Karat</td></tr>
                  <tr><td>• Sanitasi</td><td>: Tidak ada / Kali sungai</td></tr>
                </tbody>
              </table>
            </div>

            <div className="border-2 border-emerald-800 p-2 bg-emerald-50/10">
              <p className="text-[10px] font-bold text-center border-b border-emerald-800 pb-1 uppercase text-emerald-900">2. PROGRES TERPASANG (TUNTAS 100%)</p>
              <table className="w-full text-[8.5px] mt-1">
                <tbody>
                  <tr><td>• Pondasi</td><td className="text-emerald-850 font-bold">: Batu Gunung Semen Kokoh</td></tr>
                  <tr><td>• Sloof</td><td className="text-emerald-850 font-bold">: Cor Beton Utama 4 Dia 10mm</td></tr>
                  <tr><td>• Kolom</td><td className="text-emerald-850 font-bold">: Cor Kolom Kokoh SNI</td></tr>
                  <tr><td>• Dinding</td><td className="text-emerald-850 font-bold">: Tembok Bata Plester Rapi</td></tr>
                  <tr><td>• Atap</td><td className="text-emerald-850 font-bold">: Rangka Kayu + Seng Gajah Mada</td></tr>
                  <tr><td>• Sanitasi</td><td className="text-emerald-850 font-bold">: WC Jongkok Saniter Terpelihara</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center text-[10px] pt-8">
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Ketua KPB,</p>
              <p className="font-bold">KPB Sinar Jaya II</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
            <div>
              <p>Dibuat oleh,</p>
              <p className="font-bold">Penerima Bantuan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_43':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-43</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LEMBAR VERIFIKASI KELENGKAPAN DOKUMEN LPD TAHAP 2
          </div>
          <div className="text-xs bg-[#FAF9F5] p-2 border-2 border-black font-semibold font-mono text-center">
            Penyusunan Pertanggungjawaban Akhir Kelompok (Dokumen Akhir BSPS 100%)
          </div>

          <table className="w-full text-[9px] border border-black text-center font-sans">
            <thead>
              <tr className="bg-slate-100 border-b border-black font-bold">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Nama Penerima Bantuan</th>
                <th className="p-1 border-r border-black w-14">DRPB 2</th>
                <th className="p-1 border-r border-black w-14">Nota Toko</th>
                <th className="p-1 border-r border-black w-14">BA Serah Terima</th>
                <th className="p-1 border-r border-black w-14">Upah Tukang</th>
                <th className="p-1 border-r border-black w-14">Foto 100%</th>
                <th className="p-1">Kesimpulan Korkab</th>
              </tr>
            </thead>
            <tbody>
              {kpb.anggota.slice(0, 10).map((name, i) => (
                <tr key={i} className="border-b border-black text-left">
                  <td className="p-1 border-r border-black text-center font-mono">{i + 1}</td>
                  <td className="p-1 border-r border-black pl-1 font-bold">{name}</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ Ada</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ Ada</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ Ada</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ Ada</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ Ada</td>
                  <td className="p-1 text-center font-bold text-emerald-900 bg-emerald-50">LENGKAP TAHAP 2</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Pejabat Pembuat Komitmen NTB</p>
              <div className="h-10"></div>
              <p className="font-bold">({project.namaPPK})</p>
            </div>
            <div>
              <p>Diverifikasi dan Disahkan oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_45':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-45</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LAPORAN PELAKSANAAN PENGAWASAN DAN PENGENDALIAN (WASDAL LAPANGAN)
          </div>
          <div className="grid grid-cols-2 text-xs border border-stone-300 p-2 font-mono bg-stone-50">
            <div>
              <p>PROV/KAB : <span className="font-bold">NTB / BIMA</span></p>
              <p>KECAMATAN : <span className="font-bold">{desa.kecamatan}</span></p>
            </div>
            <div>
              <p>NAMA DESA : <span className="font-bold">{desa.desa}</span></p>
              <p>TANGGAL MONITORING : <span className="font-bold">25 Mei 2026</span></p>
            </div>
          </div>

          <table className="w-full text-[9px] border-2 border-black font-sans">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black w-32">Bidang Wasdal</th>
                <th className="p-1 border-r border-black">Temuan Lapangan / Masalah</th>
                <th className="p-1 border-r border-black w-40">Rekomendasi Pemecahan Masalah</th>
                <th className="p-1 w-20">PJ Jawab</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="p-1.5 border-r border-black font-bold bg-[#FAF9F5]">I. Administratif</td>
                <td className="p-1.5 border-r border-black">Penerbitan surat tanah saksi agak lambat dari Kelurahan karena kades cuti dinas.</td>
                <td className="p-1.5 border-r border-black text-emerald-950 font-medium">Melakukan koordinasi dengan sekdes dan mengeluarkan surat sementara bersaksi.</td>
                <td className="p-1.5 text-center font-mono">TFL / Sekdes</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 border-r border-black font-bold bg-[#FAF9F5]">II. Fisik Konstruksi</td>
                <td className="p-1.5 border-r border-black">Keterlambatan pengiriman semen 30 sak di dusun karena akses jembatan terputus sementara.</td>
                <td className="p-1.5 border-r border-black text-emerald-950 font-medium">Toko material Karya Agung mengalihkan transit semen menggunakan rakit ditarik mobil pick-up cadangan.</td>
                <td className="p-1.5 text-center font-mono">Pihak Toko Pemenang</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1.5 border-r border-black font-bold bg-[#FAF9F5]">III. Pelaporan Kelompok</td>
                <td className="p-1.5 border-r border-black">Cairan tabungan BRI beberapa CPB terlambat dipindah-bukukan karena antrean panjang kliring bank.</td>
                <td className="p-1.5 border-r border-black text-emerald-950 font-medium">Fasilitator mendatangi Bank BRI kantor cabang pembantu Bima untuk proses kolektif kelompok.</td>
                <td className="p-1.5 text-center font-mono">BRI / Korkab</td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="p-1.5 border-r border-black font-bold bg-[#FAF9F5]">IV. Pendampingan TFL</td>
                <td className="p-1.5 border-r border-black">Kurangnya sosialisasi pembuatan adukan cor merata di bagian tukang pembantu.</td>
                <td className="p-1.5 border-r border-black text-emerald-950 font-medium">TFL melaksanakan coaching singkat dan panduan takaran adukan semen 1:2:3 di lapangan.</td>
                <td className="p-1.5 text-center font-mono">Subhan/TFL</td>
               </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-3 text-center text-[10px] pt-8">
            <div>
              <p>Disetujui oleh,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">(............................................)</p>
              <p className="text-[8px] text-slate-500">Kepala Satuan Kerja Swadaya</p>
            </div>
            <div>
              <p>Diverifikasi,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
              <p className="text-[8px] text-slate-500">Koordinator Bima</p>
            </div>
            <div>
              <p>Yang melakukan wasdal,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">(.......................................)</p>
              <p className="text-[8px] text-slate-500">Tim Evaluasi Wasdal NTB</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_7':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-7</div>
          <div className="text-center font-bold text-sm uppercase underline">
            KARTU KENDALI MANDIRI (KKM) PENERIMA MANFAAT BSPS
          </div>
          <table className="w-full text-xs font-serif bg-stone-50 border p-2">
            <tbody>
              <tr><td className="w-40">NAMA PENERIMA BH</td><td>:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td>NAMA KELOMPOK KPB</td><td>:</td><td className="font-bold">{kpb.namaKpb}</td></tr>
              <tr><td>KECAMATAN / KAB</td><td>:</td><td>{recipient.kecamatan} / Bima</td></tr>
            </tbody>
          </table>

          <table className="w-full text-[9px] border-2 border-black font-sans text-center">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Kegiatan Wajib Program BSPS</th>
                <th className="p-1 border-r border-black w-24">Tanggal Periksa</th>
                <th className="p-1">Paraf Verifikasi TFL</th>
              </tr>
            </thead>
            <tbody>
              {[
                'Telah menghadiri sosialisasi awal dan menandatangani Pakta Integritas',
                'Telah diverifikasi berkas administrasi hak tanah dan KTP oleh Fasilitator Lapangan',
                'Mengikuti rembug penyusunan Rencana Anggaran Biaya (RAB) dan DRPB',
                'Menerima kiriman material semen, besi, kayu dari Toko Penyalur Tahap 1',
                'Melakukan transfer dana termin pertama ke toko penyuplai bahan',
                'Menyelesaikan struktur fisik pondasi, sloof, beton kolom tuntas 30%',
                'Menandatangani Dokumen Laporan Penggunaan Dana (LPD) Tahap 1',
                'Menerima logistik material penutup atap seng dan bata merah Tahap 2',
                'Menyelesaikan dinding bata merah, kap rangka atap, sanitasi MCK mencapai 100%',
                'Mengajukan permohonan pelaporan pertanggungjawaban LPD Tahap 2'
              ].map((keg, idx) => (
                <tr key={idx} className="border-b border-black">
                  <td className="p-1 border-r border-black text-center font-mono">{idx + 1}</td>
                  <td className="p-1 border-r border-black text-left pl-1">{keg}</td>
                  <td className="p-1 border-r border-black font-mono text-[8px]">14-04-2026</td>
                  <td className="p-1 text-emerald-800 font-mono text-[8px] font-bold">✔ DIVERIFIKASI</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Ketua Kelompok KPB,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
            <div>
              <p>Dampingan TFL,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_40':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-40</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LAPORAN PENGGUNAAN DANA TAHAP 1 (LPD-TAHAP I)
          </div>
          <table className="w-full text-xs font-serif bg-stone-50 border p-2">
            <tbody>
              <tr><td className="w-40">Nomor BNBA</td><td>:</td><td className="font-mono font-bold">BNBA-{recipient.id.toUpperCase()}</td></tr>
              <tr><td>Nama Calon Penerima</td><td>:</td><td className="font-bold">{recipient.nama}</td></tr>
              <tr><td>KPB Kelompok Kerja</td><td>:</td><td>{kpb.namaKpb}</td></tr>
            </tbody>
          </table>

          <p className="text-xs text-justify leading-relaxed">
            Menyatakan dengan sebenarnya bahwa alokasi BSPS Tahap I senilai <span className="font-bold">Rp 10.000.000,-</span> telah diterima di rekening penerima dan ditransferkan sepenuhnya ke UD. Toko Karya Agung guna penyediaan logistik semen cor, sloof besi, dan batu kali hingga pondasi rampung 30% fisik.
          </p>

          <div className="border border-black p-2 bg-[#FDFFF6] font-mono text-[9px]">
            <p className="font-bold underline uppercase">C. PEMANFAATAN DANA BA LI-12 (TAHAP I):</p>
            <p>1. Belanja Bahan Material Pokok : Rp 8.750.000,-</p>
            <p>2. Tarik Tunai Upah Tukang Tahapa 1 : Rp 1.250.000,-</p>
            <p className="font-bold text-emerald-800">Total Penggunaan Tahap I : Rp 10.000.000,- (TUNTAS)</p>
          </div>

          <div className="grid grid-cols-3 text-center text-[10px] pt-8">
            <div>
              <p>Diperiksa oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
            <div>
              <p>Didampingi,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-12"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Penerima Bantuan,</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[8px] font-mono border border-dashed rounded px-1 text-slate-400">Materai 10K</span>
              </div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_38':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-38</div>
          <div className="text-center font-bold text-sm uppercase underline">
            REKAPITULASI PROGRES KONSTRUKSI TINGKAT DESA SE-KABUPATEN
          </div>
          <div className="grid grid-cols-2 text-xs border border-stone-300 p-2 font-mono bg-stone-55">
            <div>Desa / Kecamatan : <span>{desa.desa} / {desa.kecamatan}</span></div>
            <div>Kabupaten/Provinsi : <span>Bima / NTB</span></div>
          </div>

          <table className="w-full text-[8.5px] border-2 border-black text-center font-sans">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black w-8">No.</th>
                <th className="p-1 border-r border-black text-left pl-1">Nama Penerima Bantuan</th>
                <th className="p-1 border-r border-black">No BNBA</th>
                <th className="p-1 border-r border-black">Pondasi (%)</th>
                <th className="p-1 border-r border-black">Sloof (%)</th>
                <th className="p-1 border-r border-black">Kolom (%)</th>
                <th className="p-1 border-r border-black">Dinding (%)</th>
                <th className="p-1 border-r border-black">Atap (%)</th>
                <th className="p-1">Total Progres (%)</th>
              </tr>
            </thead>
            <tbody>
              {kpb.anggota.slice(0, 10).map((name, i) => (
                <tr key={i} className="border-b border-black text-left">
                  <td className="p-1 border-r border-black text-center font-mono">{i + 1}</td>
                  <td className="p-1 border-r border-black pl-1 font-bold">{name}</td>
                  <td className="p-1 border-r border-black font-mono text-[7px] text-center">BNBA-{i+301}</td>
                  <td className="p-1 border-r border-black text-center font-mono text-emerald-800">100%</td>
                  <td className="p-1 border-r border-black text-center font-mono text-emerald-800">100%</td>
                  <td className="p-1 border-r border-black text-center font-mono text-emerald-800">100%</td>
                  <td className="p-1 border-r border-black text-center font-mono text-emerald-800">100%</td>
                  <td className="p-1 border-r border-black text-center font-mono text-emerald-800">100%</td>
                  <td className="p-1 text-center font-mono font-semibold bg-emerald-100/40 text-emerald-950">100% (TUNTAS)</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end text-center text-xs pt-12">
            <div className="w-64">
              <p>Dibuat oleh,</p>
              <p className="font-bold">Tim Pendamping Provinsi (TKM)</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.timPendampingProvinsi.split(' ')[0]})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_41':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-41</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LEMBAR VERIFIKASI KELENGKAPAN REKAPITULASI DOSEN LPD TAHAP 1
          </div>
          <p className="text-xs text-justify leading-relaxed">
            Menyatakan bahwa berkas administrasi pencairan dana termin pertama untuk kelompok KPB {kpb.namaKpb} telah diperiksa dan disetujui untuk diproses:
          </p>

          <table className="w-full text-[9px] border border-black text-center font-sans">
            <thead>
              <tr className="bg-slate-100 border-b border-black font-bold">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Nama Penerima KPB</th>
                <th className="p-1 border-r border-black">DRPB 1</th>
                <th className="p-1 border-r border-black">Survei Toko</th>
                <th className="p-1 border-r border-black">BA Kesepakatan</th>
                <th className="p-1 border-r border-black">PKS Toko</th>
                <th className="p-1 border-r border-black">KTP/KK</th>
                <th className="p-1">Hasil Verif</th>
              </tr>
            </thead>
            <tbody>
              {kpb.anggota.slice(0, 10).map((name, i) => (
                <tr key={i} className="border-b border-black text-left">
                  <td className="p-1 border-r border-black text-center font-mono">{i + 1}</td>
                  <td className="p-1 border-r border-black pl-1 font-bold">{name}</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ OK</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ OK</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ OK</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ OK</td>
                  <td className="p-1 border-r border-black text-center text-emerald-800">✔ OK</td>
                  <td className="p-1 text-center font-bold text-emerald-900 bg-emerald-50">MEMENUHI syarat</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Diverifikasi oleh,</p>
              <p className="font-bold">Tim Pendamping Provinsi</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.timPendampingProvinsi.split(' ')[0]})</p>
            </div>
            <div>
              <p>Disahkan oleh,</p>
              <p className="font-bold">Pejabat Pembuat Komitmen</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({project.namaPPK})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_31':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-31</div>
          <div className="text-center font-bold text-sm uppercase underline">
            BERITA ACARA PERUBAHAN DOKUMEN PERENCANAAN / REVISI RAB BSPS
          </div>
          <p className="text-xs text-justify leading-relaxed">
            Pada hari ini, tanggal <span className="font-bold">{project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</span>, bertempat di {project.tempatRembuk}, Kelompok Penerima Bantuan {kpb.namaKpb} melakukan musyawarah dikarenakan terjadinya perubahan perencanaan material akibat ketersediaan material di gudang lokal.
          </p>

          <table className="w-full text-[9px] border-2 border-black font-mono">
            <thead>
              <tr className="bg-[#EAEAE2] font-bold border-b border-black">
                <th className="p-1 border-r border-black text-left">Item Rencana Awal (Volume)</th>
                <th className="p-1 border-r border-black text-left">Rencana Perubahan (Addendum)</th>
                <th className="p-1">Alasan Penyesuaian / Revisi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="p-2 border-r border-black">Semen @ 40 kg (30 Zak) @ Rp 75.000</td>
                <td className="p-2 border-r border-black font-bold text-emerald-900">Semen @ 50 kg (24 Zak) @ Rp 93.750</td>
                <td className="p-2">Merk semen 40kg habis digantikan semen Kupang tervalidasi SNI isi 50kg. Tidak merubah pagu bantuan bahan (Pagu tetap Rp17.500.000)</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-3 text-center text-[10px] pt-8">
            <div>
              <p>Mendampingi,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Ketua KPB,</p>
              <p className="font-bold">KPB Sinar Jaya II</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
            <div>
              <p>Disetujui,</p>
              <p className="font-bold">Penerima Bantuan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_13':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-13</div>
          <div className="text-center font-bold text-sm uppercase underline">
            RENCANA TEKNIS PENINGKATAN KUALITAS RUMAH SWADAYA (NTS SCALE)
          </div>
          <div className="grid grid-cols-3 gap-2 border-2 border-black p-2 text-[9px] font-mono bg-stone-50">
            <div>Nama CPB : <strong>{recipient.nama}</strong></div>
            <div>NIK : <strong>{recipient.nik}</strong></div>
            <div>Lokasi : <strong>Desa {recipient.desa}</strong></div>
          </div>

          <div className="border border-black p-4 flex flex-col items-center justify-center bg-[#FAF9F5] h-56 rounded">
            <svg viewBox="0 0 100 100" className="w-44 h-44 text-black">
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeDasharray="2,2" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeDasharray="2,2" />
              <rect x="25" y="25" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" />
              <text x="35" y="37" fontSize="4" textAnchor="middle" fontFamily="sans-serif">DAPUR</text>
              <rect x="55" y="25" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" />
              <text x="65" y="37" fontSize="4" textAnchor="middle" fontFamily="sans-serif">WC</text>
              <rect x="25" y="55" width="50" height="25" fill="none" stroke="currentColor" strokeWidth="1" />
              <text x="50" y="70" fontSize="5" textAnchor="middle" fontFamily="sans-serif">KMR UTAMA / R. KELUARGA</text>
            </svg>
            <p className="text-[9px] italic text-slate-500 font-sans mt-2">Denah Rencana Usulan Rumah Sederhana Layak Huni Ukuran 6M x 6M</p>
          </div>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Didampingi oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Calon Penerima Bantuan,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_14':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-14</div>
          <div className="text-center font-bold text-sm uppercase underline">
            RENCANA ANGGARAN BIAYA (RAB) CALON PENERIMA MANFAAT BSPS
          </div>
          <p className="text-[10px] text-justify leading-relaxed">
            Rencana Anggaran Biaya untuk satu unit rumah swadaya didistribusikan senilai <span className="font-bold">Rp 20.000.000,-</span> dengan rincian Rp 17.500.000,- belanja bahan material dan Rp 2.500.000,- upah tukang kerja.
          </p>

          <table className="w-full text-[9px] border-2 border-black font-sans text-center">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Bahan Material / Upah</th>
                <th className="p-1 border-r border-black w-14">Volume</th>
                <th className="p-1 border-r border-black w-14">Satuan</th>
                <th className="p-1 border-r border-black w-20 text-right pr-2">Harga Satuan</th>
                <th className="p-1 text-right pr-2">Jumlah Harga (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {boqItems.slice(0, 10).map((item, idx) => (
                <tr key={idx} className="border-b border-black text-left">
                  <td className="p-1 border-r border-black text-center font-mono">{idx + 1}</td>
                  <td className="p-1 border-r border-black pl-1 font-medium">{item.namaBarang}</td>
                  <td className="p-1 border-r border-black text-center font-mono">{item.volume}</td>
                  <td className="p-1 border-r border-black text-center">{item.satuan}</td>
                  <td className="p-1 border-r border-black text-right font-mono pr-2">{item.hargaSatuan.toLocaleString('id-ID')}</td>
                  <td className="p-1 text-right font-mono pr-2">{item.jumlah.toLocaleString('id-ID')}</td>
                </tr>
              ))}
              <tr className="border-b border-black font-bold bg-[#FAF9F5]">
                <td className="p-1 border-r border-black text-center font-mono">11</td>
                <td className="p-1 border-r border-black pl-1 uppercase font-bold" colSpan={3}>Upah Kerja Tukang Rumah Swadaya</td>
                <td className="p-1 border-r border-black text-right font-mono pr-2">2.500.000</td>
                <td className="p-1 text-right font-mono pr-2">2.500.000</td>
              </tr>
              <tr className="bg-emerald-50 text-emerald-950 border-t-2 border-black font-bold text-right text-[10px]">
                <td colSpan={5} className="p-1.5 border-r border-black uppercase">Grand Total Anggaran Hasil RAB</td>
                <td className="p-1.5 text-right font-mono pr-2">
                  {(boqItems.slice(0, 10).reduce((a,c) => a + c.jumlah, 0) + 2500000).toLocaleString('id-ID')}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Mendampingi,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Dibuat oleh,</p>
              <p className="font-bold">Penerima Bantuan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({recipient.nama})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_23':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-23</div>
          <div className="text-center font-bold text-sm uppercase underline">
            LEMBAR PEMERIKSAAN PROPOSAL CPB BSPS (ADMINISTRASI & TEKNIS)
          </div>
          <p className="text-[10px] text-justify leading-relaxed">
            Menerangkan kelengkapan berkas fisik proposal yang dikumpulkan oleh calon penerima bantuan untuk diusulkan verifikasi satker PPK:
          </p>

          <table className="w-full text-[9px] border border-black text-left font-sans">
            <thead>
              <tr className="bg-slate-100 border-b border-black font-bold text-center">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black pl-1">Nama Kelengkapan Berkas Proposal</th>
                <th className="p-1 border-r border-black w-24">Ada / Tidak</th>
                <th className="p-1">Kesesuaian Teknis</th>
              </tr>
            </thead>
            <tbody>
              {[
                { no: 'A1', nama: 'Surat Permohonan Bantuan', status: 'Ada', kesesuaian: 'Sesuai' },
                { no: 'A2', nama: 'Salinan Kartu Tanda Penduduk (KTP)', status: 'Ada', kesesuaian: 'KTP Bima Sesuai' },
                { no: 'A3', nama: 'Salinan Kartu Keluarga (KK)', status: 'Ada', kesesuaian: 'Sesuai Terverifikasi' },
                { no: 'A4', nama: 'Surat Pernyataan Penghasilan (diketahui Kades)', status: 'Ada', kesesuaian: 'Sesuai di bawah UMP' },
                { no: 'A5', nama: 'Surat Bukti Kepemilikan Tanah / Sertifikat', status: 'Ada', kesesuaian: 'Sertifikat Tanah Sesuai' },
                { no: 'A6', nama: 'Surat Pernyataan Mengikuti Program', status: 'Ada', kesesuaian: 'Bermaterai Sesuai' },
                { no: 'A7', nama: 'Rencana Anggaran Biaya (RAB) Kelompok', status: 'Ada', kesesuaian: 'Pagu Rp 20.000.000 Sesuai' }
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-black">
                  <td className="p-1.5 border-r border-black font-mono text-center">{item.no}</td>
                  <td className="p-1.5 border-r border-black pl-1 font-semibold">{item.nama}</td>
                  <td className="p-1.5 border-r border-black text-center text-emerald-850 font-bold">✔ {item.status}</td>
                  <td className="p-1.5 text-center text-emerald-800 font-medium bg-emerald-50/20">{item.kesesuaian}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Diverifikasi oleh,</p>
              <p className="font-bold">Tim Pendamping Provinsi NTB</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.timPendampingProvinsi.split(' ')[0]})</p>
            </div>
            <div>
              <p>Dibuat oleh,</p>
              <p className="font-bold">Koordinator Kabupaten Bima</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.koordinatorKabupaten})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_35':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-35</div>
          <div className="text-center font-bold text-sm uppercase underline">
            BERITA ACARA KESEPAKATAN MEMUTUSKAN PENUNJUKAN TUKANG PENERIMA BSPS
          </div>
          <p className="text-xs text-justify leading-relaxed">
            Pada hari ini, tanggal <span className="font-bold">{project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</span>, Kelompok {kpb.namaKpb} melakukan musyawarah mufakat menyetujui kriteria <span className="font-bold">"1 CPB : 1 Mitra Tukang Kerja"</span> guna menjamin kecepatan dan kerapian hasil rehabilitasi bangunan rumah swadaya layak huni:
          </p>

          <table className="w-full text-[9px] border-2 border-black font-sans text-center">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Nama Lengkap Penerima</th>
                <th className="p-1 border-r border-black">NIK Penerima</th>
                <th className="p-1 border-r border-black">Nama Tukang Terpilih</th>
                <th className="p-1 border-r border-black">NIK KTP Tukang</th>
                <th className="p-1">Keterangan Upah</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black text-left">
                <td className="p-1.5 border-r border-black text-center font-mono">1</td>
                <td className="p-1.5 border-r border-black pl-1 font-bold">{recipient.nama}</td>
                <td className="p-1.5 border-r border-black text-center font-mono">{recipient.nik}</td>
                <td className="p-1.5 border-r border-black font-bold text-emerald-950 pl-1">{customFields.namaTukang1 || 'Ahmad M. Thoyib'}</td>
                <td className="p-1.5 border-r border-black text-center font-mono">{customFields.nikTukang1 || '5206081203880005'}</td>
                <td className="p-1.5 text-center font-bold text-emerald-850">Rp 2.500.000 / Rumah</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Mendampingi,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Disepakati oleh,</p>
              <p className="font-bold">Ketua KPB {kpb.namaKpb}</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_11':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-11</div>
          <div className="text-center font-bold text-sm uppercase underline">
            HAHASIL TABULASI PERKIRAAN HARGA SURVEI TOKO KECAMATAN
          </div>
          <p className="text-xs text-justify">
            Tabel rekapitulasi usulan survei harga pasar lokal yang diteliti oleh kelompok penerima dampingan TFL untuk memperoleh perbandingan toko material terdekat demi efisiensi pengiriman:
          </p>

          <table className="w-full text-[8.5px] border-2 border-black font-sans text-center">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Bahan Bangunan Utama</th>
                <th className="p-1 border-r border-black">Satuan</th>
                <th className="p-1 border-r border-black font-bold">UD. TOKO KARYA AGUNG (Rp)</th>
                <th className="p-1 border-r border-black">UD. BERKAH JAYA SANGGAR (Rp)</th>
                <th className="p-1">TOKO SINAR TAMBORA (Rp)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black text-left">
                <td className="p-1.5 border-r border-black text-center font-mono">1</td>
                <td className="p-1.5 border-r border-black pl-1">Semen Kupang @ 40 kg</td>
                <td className="p-1.5 border-r border-black text-center">Zak</td>
                <td className="p-1.5 border-r border-black text-right font-mono pr-1 bg-emerald-50 text-emerald-950 font-bold">75.000 *</td>
                <td className="p-1.5 border-r border-black text-right font-mono pr-1">77.000</td>
                <td className="p-1.5 text-right font-mono pr-1">79.000</td>
              </tr>
              <tr className="border-b border-black text-left">
                <td className="p-1.5 border-r border-black text-center font-mono">2</td>
                <td className="p-1.5 border-r border-black pl-1">Seng Gelombang 6 Kaki (0.30mm)</td>
                <td className="p-1.5 border-r border-black text-center">Lembar</td>
                <td className="p-1.5 border-r border-black text-right font-mono pr-1 bg-emerald-50 text-emerald-950 font-bold">90.000 *</td>
                <td className="p-1.5 border-r border-black text-right font-mono pr-1">92.000</td>
                <td className="p-1.5 text-right font-mono pr-1">95.000</td>
              </tr>
              <tr className="border-b-2 border-black text-left">
                <td className="p-1.5 border-r border-black text-center font-mono">3</td>
                <td className="p-1.5 border-r border-black pl-1">Kayu Balok Konstruksi 5/10 (Jati Lokal)</td>
                <td className="p-1.5 border-r border-black text-center">Batang</td>
                <td className="p-1.5 border-r border-black text-right font-mono pr-1 bg-emerald-50 text-emerald-950 font-bold">180.000 *</td>
                <td className="p-1.5 border-r border-black text-right font-mono pr-1">185.000</td>
                <td className="p-1.5 text-right font-mono pr-1">190.000</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Diketahui oleh,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Dibuat oleh,</p>
              <p className="font-bold">Ketua KPB,</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_16':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-16</div>
          <div className="text-center font-bold text-sm uppercase underline">
            BERITA ACARA PEMILIHAN TOKO TERBUKA / SURVEI LANGSUNG (PTT)
          </div>
          <p className="text-xs text-justify">
            Berdasarkan lampiran hasil komparasi survei di desa {desa.desa}, kelompok telah mengadakan forum rembuk mufakat untuk secara bulat memutuskan Toko Pemenang yang ditunjuk sebagai penyedia resmi logistik kelompok KPB {kpb.namaKpb}:
          </p>

          <table className="w-full text-xs font-serif bg-emerald-55/10 border-2 border-black p-3 space-y-1">
            <tbody>
              <tr><td className="w-48 font-bold">NAMA TOKO TERPILIH</td><td>:</td><td className="font-bold font-mono text-emerald-950">{toko.namaToko}</td></tr>
              <tr><td className="font-bold">NAMA PEMILIK TOKO</td><td>:</td><td>{toko.pemilikToko}</td></tr>
              <tr><td className="font-bold">ALAMAT TOKO LENGKAP</td><td>:</td><td>{toko.alamat}</td></tr>
              <tr><td className="font-bold">NOMOR REKENING TOKO</td><td>:</td><td className="font-mono text-emerald-900">{toko.noRekeningToko} (Bank BRI)</td></tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Mendampingi,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Bima, {project.tanggalSurat} {project.bulanSurat} {project.tahunSurat}</p>
              <p className="font-bold">Ketua KPB {kpb.namaKpb}</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_15':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-15</div>
          <div className="text-center font-bold text-sm uppercase underline">
            REKAPITULASI RAB KEBUTUHAN KELOMPOK KERJA TINGKAT DESA
          </div>
          <div className="text-xs space-y-1 font-mono pl-2 border-l-4 border-black bg-stone-50 p-2">
            <p>Kelompok KPB : <span className="font-bold">{kpb.namaKpb}</span></p>
            <p>Desa / Kecamatan : <span>{desa.desa} / {desa.kecamatan}</span></p>
          </div>

          <table className="w-full text-[9px] border-2 border-black font-sans text-center">
            <thead>
              <tr className="bg-[#EAEAE2] border-b-2 border-black font-bold">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Bahan Material / Pagu Upah</th>
                <th className="p-1 border-r border-black w-20">Volume Kelompok</th>
                <th className="p-1 border-r border-black">Satuan</th>
                <th className="p-1 border-r border-black w-24 text-right pr-2">Harga Rata-Rata</th>
                <th className="p-1 text-right pr-2">Jumlah Total Kelompok (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {boqItems.slice(0, 7).map((item, idx) => (
                <tr key={idx} className="border-b border-black text-left">
                  <td className="p-1 border-r border-black text-center font-mono">{idx + 1}</td>
                  <td className="p-1 border-r border-black pl-1 font-medium">{item.namaBarang}</td>
                  <td className="p-1 border-r border-black text-center font-mono">{item.volume * 10}</td>
                  <td className="p-1 border-r border-black text-center">{item.satuan}</td>
                  <td className="p-1 border-r border-black text-right font-mono pr-2">{(item.hargaSatuan).toLocaleString()}</td>
                  <td className="p-1 text-right font-mono pr-2">{(item.jumlah * 10).toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-emerald-50 text-emerald-950 font-bold border-t-2 border-black text-right text-[10px]">
                <td colSpan={5} className="p-1.5 border-r border-black uppercase text-right">TOTAL MATERIAL KELOMPOK (10 CPB)</td>
                <td className="p-1.5 text-right font-mono pr-2">
                  {(boqItems.slice(0, 7).reduce((a,c) => a+c.jumlah, 0) * 10).toLocaleString('id-ID')}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Mendampingi,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Ketua KPB {kpb.namaKpb},</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_32':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-32</div>
          <div className="text-center font-bold text-sm uppercase underline">
            PERJANJIAN KERJA SAMA (PKS) PENYEDIAAN LOGISTIK BAHAN BANGUNAN
          </div>
          <p className="text-[10px] text-justify leading-relaxed">
            Perjanjian Kerja Sama ini disepakati bersama antara PIHAK PERTAMA (selaku <span className="font-bold">Ketua KPB {kpb.namaKpb}</span> mewakili seluruh anggota dampingan) dan PIHAK KEDUA (selaku <span className="font-bold">UD. Toko Karya Agung</span> diwakili oleh <span className="font-bold">{toko.pemilikToko}</span>) dengan ketentuan pasal sebagai berikut:
          </p>

          <div className="border border-black p-2.5 space-y-1 bg-stone-50 font-mono text-[8.5px] leading-relaxed">
            <p className="font-bold underline text-center">KETENTUAN POKOK PERJANJIAN PKS:</p>
            <p>• <span className="font-bold">Pasal 1:</span> PIHAK KEDUA bersedia mengirimkan material berkualitas SNI sesuai volume rincian DRPB ke masing-masing lokasi rumah tanpa denda ongkos kirim.</p>
            <p>• <span className="font-bold">Pasal 2:</span> Harga material bersifat tetap mengikat, tidak dapat dinaikkan sepihak meskipun terjadi kenaikan inflasi semen pasar nasional.</p>
            <p>• <span className="font-bold">Pasal 3:</span> Pembayaran non-tunai dilakukan via sistem transfer kliring Bank BRI setelah material diterima lengkap diverifikasi TFL pendamping.</p>
          </div>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>PIHAK KEDUA,</p>
              <p className="font-bold text-emerald-950">Pemilik Toko Terpilih</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[7px] border border-dashed rounded px-1 text-slate-400">Meterai 10K</span>
              </div>
              <p className="font-bold underline">({toko.pemilikToko})</p>
            </div>
            <div>
              <p>PIHAK PERTAMA,</p>
              <p className="font-bold text-emerald-950">Ketua KPB {kpb.namaKpb}</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[7px] border border-dashed rounded px-1 text-slate-400">Meterai 10K</span>
              </div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
          </div>
        </div>
      );

    case 'FORMAT_II_18':
      return (
        <div className="space-y-4">
          <div className="text-right font-bold text-xs tracking-wide">FORMAT II-18</div>
          <div className="text-center font-bold text-sm uppercase underline">
            RENCANA ANGGARAN BIAYA (RAB) EVALUASI HASIL PEMILIHAN TOKO TERBUKA (PTT)
          </div>
          <p className="text-xs text-justify">
            Penyusunan penetapan penawaran harga satuan material terendah yang diselesaikan dari perbandingan Survei Pasar Kecamatan Sanggar Bima NTB:
          </p>

          <table className="w-full text-[9px] border border-black text-center font-sans">
            <thead>
              <tr className="bg-[#EAEAE2] border-b border-black font-bold">
                <th className="p-1 border-r border-black w-8">No</th>
                <th className="p-1 border-r border-black text-left pl-1">Bahan Material Utama</th>
                <th className="p-1 border-r border-black w-14">Harga Pasar</th>
                <th className="p-1 border-r border-black w-14">Hasil PTT Toko</th>
                <th className="p-1 border-r border-black w-16">Selisih Harga</th>
                <th className="p-1">Kesimpulan Harga</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black text-left">
                <td className="p-1.5 border-r border-black text-center font-mono">1</td>
                <td className="p-1.5 border-r border-black pl-1">Semen Kupang @ 40 kg (Zak)</td>
                <td className="p-1.5 border-r border-black text-center font-mono">79.000</td>
                <td className="p-1.5 border-r border-black text-center font-mono text-emerald-850 font-bold">75.000</td>
                <td className="p-1.5 border-r border-black text-center font-mono text-emerald-800">Saves Rp 4.000</td>
                <td className="p-1.5 text-center text-[8px] bg-emerald-50 text-emerald-950 font-mono">Menghemat Anggaran</td>
              </tr>
              <tr className="border-b border-black text-left">
                <td className="p-1.5 border-r border-black text-center font-mono">2</td>
                <td className="p-1.5 border-r border-black pl-1">Seng Gelombang 6 KK (Lbr)</td>
                <td className="p-1.5 border-r border-black text-center font-mono">95.000</td>
                <td className="p-1.5 border-r border-black text-center font-mono text-emerald-850 font-bold">90.000</td>
                <td className="p-1.5 border-r border-black text-center font-mono text-emerald-800">Saves Rp 5.000</td>
                <td className="p-1.5 text-center text-[8px] bg-emerald-50 text-emerald-950 font-mono">Menghemat Anggaran</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 text-center text-[10px] pt-8">
            <div>
              <p>Mendampingi,</p>
              <p className="font-bold">Tenaga Fasilitator Lapangan</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({tfl.namaTfl})</p>
            </div>
            <div>
              <p>Ketua KPB {kpb.namaKpb},</p>
              <div className="h-10"></div>
              <p className="font-bold underline">({kpb.ketua})</p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
