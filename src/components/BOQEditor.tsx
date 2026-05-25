import React, { useState } from 'react';
import { 
  CheckCircle, AlertCircle, Sparkles, Plus, Trash2, RotateCcw, Landmark, Layers 
} from 'lucide-react';
import { BSPSAppState, BSPSBOQItem } from '../types';
import { SAMPLE_BOQ } from '../data/defaultTemplates';

interface BOQEditorProps {
  state: BSPSAppState;
  onChange: (updater: (prev: BSPSAppState) => BSPSAppState) => void;
}

export const BOQEditor: React.FC<BOQEditorProps> = ({ state, onChange }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemVol, setNewItemVol] = useState(1);
  const [newItemSatuan, setNewItemSatuan] = useState('Zak');
  const [newItemHarga, setNewItemHarga] = useState(50000);
  const [newItemMerek, setNewItemMerek] = useState('Standar SNI');

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleUpdateItem = (id: string, field: keyof BSPSBOQItem, value: any) => {
    onChange((prev) => {
      const updated = prev.boqItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'volume' || field === 'hargaSatuan') {
            updatedItem.jumlah = (updatedItem.volume || 0) * (updatedItem.hargaSatuan || 0);
          }
          return updatedItem;
        }
        return item;
      });
      return { ...prev, boqItems: updated };
    });
  };

  const handleDeleteItem = (id: string) => {
    onChange((prev) => {
      const filtered = prev.boqItems.filter(item => item.id !== id);
      // Re-index number 'no' field
      const reindexed = filtered.map((item, idx) => ({ ...item, no: idx + 1 }));
      return { ...prev, boqItems: reindexed };
    });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onChange((prev) => {
      const newItem: BSPSBOQItem = {
        id: 'user-' + Date.now().toString(),
        no: prev.boqItems.length + 1,
        namaBarang: newItemName,
        volume: newItemVol,
        satuan: newItemSatuan,
        hargaSatuan: newItemHarga,
        jumlah: newItemVol * newItemHarga,
        merek: newItemMerek
      };
      return { ...prev, boqItems: [...prev.boqItems, newItem] };
    });

    setNewItemName('');
    setNewItemVol(1);
    setNewItemHarga(50000);
    setNewItemMerek('Standar SNI');
  };

  const handleResetBOQ = () => {
    onChange((prev) => ({
      ...prev,
      boqItems: JSON.parse(JSON.stringify(SAMPLE_BOQ))
    }));
  };

  const totalBahan = state.boqItems.reduce((acc, curr) => acc + curr.jumlah, 0);
  const maxBahan = state.recipient.limitBantuanBahan; // 17,500,000
  const overBudget = totalBahan > maxBahan;
  const sisaSalda = maxBahan - totalBahan;

  return (
    <div className="flex flex-col h-full bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_#000]">
      <div className="bg-black text-white p-3 border-b-2 border-black flex justify-between items-center shrink-0">
        <div className="flex items-center gap-1.5 font-mono">
          <Layers size={14} className="text-zinc-300" />
          <span className="text-xs font-bold uppercase tracking-wider">Editor Bahan (DRPB / BOQ)</span>
        </div>
        <button
          onClick={handleResetBOQ}
          className="text-[10px] bg-white text-black border border-black hover:bg-black hover:text-white px-2 py-1 font-mono font-bold flex items-center gap-1 transition-none"
          title="Kembalikan list ke template standar 23 bahan"
        >
          <RotateCcw size={10} />
          <span>Reset Template</span>
        </button>
      </div>

      <div className="p-3 bg-[#EAEAE5] border-b-2 border-black grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-white p-2 border-2 border-black font-semibold">
          <span className="text-[9px] text-[#1A1A1A] block uppercase font-bold font-mono">Batas Plafon</span>
          <span className="text-[11px] font-mono font-bold text-black">{formatRupiah(maxBahan)}</span>
        </div>
        <div className={`p-2 border-2 border-black font-semibold ${overBudget ? 'bg-rose-100 text-rose-900 font-bold' : 'bg-emerald-100 text-emerald-950 font-bold'}`}>
          <span className="text-[9px] text-[#1A1A1A] block uppercase font-bold font-mono">Total Terpakai</span>
          <span className="text-[11px] font-mono font-bold">{formatRupiah(totalBahan)}</span>
        </div>
        <div className={`p-2 border-2 border-black font-semibold ${sisaSalda < 0 ? 'bg-rose-100 text-rose-900' : 'bg-[#D9EAF0] text-blue-900'}`}>
          <span className="text-[9px] text-[#1A1A1A] block uppercase font-bold font-mono">{sisaSalda < 0 ? 'Kelebihan' : 'Sisa Dana'}</span>
          <span className="text-[11px] font-mono font-bold">
            {sisaSalda < 0 ? formatRupiah(Math.abs(sisaSalda)) : formatRupiah(sisaSalda)}
          </span>
        </div>
      </div>

      {overBudget && (
        <div className="mx-3 mt-2 bg-rose-100 text-[11px] text-rose-900 p-2 border-2 border-black flex items-start gap-1.5 font-mono">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <div>
            <strong>Kelebihan Anggaran!</strong> Pengadaan bahan BSPS melebihi batas plafon material yaitu <strong>Rp 17.500.000</strong>. Sesuaikan kuantitas agar disetujui kementerian.
          </div>
        </div>
      )}

      {totalBahan === maxBahan && (
        <div className="mx-3 mt-2 bg-emerald-100 text-[11px] text-[#1A1A1A] p-2 border-2 border-black flex items-start gap-1.5 font-mono">
          <CheckCircle size={14} className="shrink-0 mt-0.5 text-emerald-700" />
          <div>
            <strong>Anggaran Sempurna!</strong> Total belanja Rp 17.500.000 (100% tepat sasaran).
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto max-h-[280px] p-2 bg-white scrollbar-thin">
        <table className="w-full text-[11px] text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <th className="py-1.5 px-2 text-center w-8">No</th>
              <th className="py-1.5 px-2">Nama Bahan / Spesifikasi</th>
              <th className="py-1.5 px-1 text-center w-14">Vol</th>
              <th className="py-1.5 px-1 text-center w-14">Satuan</th>
              <th className="py-1.5 px-2 text-right w-24">Harga (Rp)</th>
              <th className="py-1.5 px-2 text-right w-24">Jumlah (Rp)</th>
              <th className="py-1.5 px-2">Merek/Kualitas</th>
              <th className="py-1.5 px-1 text-center w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {state.boqItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-1 px-2 text-center text-slate-400 font-mono text-[10px]">{item.no}</td>
                <td className="py-1 px-2">
                  <input
                    type="text"
                    value={item.namaBarang}
                    onChange={(e) => handleUpdateItem(item.id, 'namaBarang', e.target.value)}
                    className="w-full text-[11px] border border-transparent hover:border-slate-300 focus:border-emerald-500 rounded p-0.5 bg-transparent focus:bg-white"
                  />
                </td>
                <td className="py-1 px-1 text-center">
                  <input
                    type="number"
                    value={item.volume}
                    onChange={(e) => handleUpdateItem(item.id, 'volume', parseFloat(e.target.value) || 0)}
                    className="w-full text-center text-[11px] border border-slate-200 focus:border-emerald-500 rounded p-0.5 bg-slate-50/30"
                  />
                </td>
                <td className="py-1 px-1 text-center">
                  <input
                    type="text"
                    value={item.satuan}
                    onChange={(e) => handleUpdateItem(item.id, 'satuan', e.target.value)}
                    className="w-full text-center text-[10px] border border-transparent hover:border-slate-300 focus:border-emerald-500 rounded p-0.5 bg-transparent"
                  />
                </td>
                <td className="py-1 px-2 text-right">
                  <input
                    type="number"
                    value={item.hargaSatuan}
                    onChange={(e) => handleUpdateItem(item.id, 'hargaSatuan', parseInt(e.target.value) || 0)}
                    className="w-full text-right text-[11px] border border-slate-200 focus:border-emerald-500 rounded p-0.5 bg-slate-50/30 font-mono"
                  />
                </td>
                <td className="py-1 px-2 text-right text-slate-700 font-mono font-medium">
                  {item.jumlah.toLocaleString('id-ID')}
                </td>
                <td className="py-1 px-2">
                  <input
                    type="text"
                    value={item.merek}
                    onChange={(e) => handleUpdateItem(item.id, 'merek', e.target.value)}
                    className="w-full text-[10px] border border-transparent hover:border-slate-300 focus:border-emerald-500 rounded p-0.5 bg-transparent"
                  />
                </td>
                <td className="py-1 px-1 text-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                    title="Hapus bahan"
                  >
                    <Trash2 size={11} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAddItem} className="bg-slate-100 p-2 border-t border-slate-200 grid grid-cols-12 gap-1 px-3 items-center shrink-0">
        <span className="col-span-12 text-[10px] font-bold text-slate-600 block uppercase">Tambah Item Baru:</span>
        <input
          type="text"
          placeholder="Nama bahan / spesifikasi"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="col-span-4 text-[11px] p-1 border border-slate-300 bg-white rounded"
        />
        <input
          type="number"
          placeholder="Vol"
          value={newItemVol}
          onChange={(e) => setNewItemVol(parseFloat(e.target.value) || 1)}
          className="col-span-1.5 text-[11px] p-1 border border-slate-300 bg-white rounded text-center"
        />
        <input
          type="text"
          placeholder="Satuan"
          value={newItemSatuan}
          onChange={(e) => setNewItemSatuan(e.target.value)}
          className="col-span-1.5 text-[11px] p-1 border border-slate-300 bg-white rounded text-center"
        />
        <input
          type="number"
          placeholder="Harga Satuan (Rp)"
          value={newItemHarga}
          onChange={(e) => setNewItemHarga(parseInt(e.target.value) || 0)}
          className="col-span-2 text-[11px] p-1 border border-slate-300 bg-white rounded text-right"
        />
        <input
          type="text"
          placeholder="Merek"
          value={newItemMerek}
          onChange={(e) => setNewItemMerek(e.target.value)}
          className="col-span-2.5 text-[11px] p-1 border border-slate-300 bg-white rounded"
        />
        <button
          type="submit"
          className="col-span-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-1 rounded-sm text-center flex justify-center items-center gap-0.5"
        >
          <Plus size={11} /> Ok
        </button>
      </form>
    </div>
  );
};
