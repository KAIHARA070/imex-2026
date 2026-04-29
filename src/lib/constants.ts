import { ScoreField } from './types';

export const PANELS: Record<string, string> = {
  '1': '1. UST NOR HESHAM BIN MAT JUSOH-PA-(Juri)',
  '2': '2. PN NOOR AZILA BINTI SARI-PA(Juri)',
  '3': '3. Ust Muhammad Aiman Bin Che Hussain-PA(Juri)',
};

export const PANEL_SHORT: Record<string, string> = {
  '1': 'Ust Nor Hesham',
  '2': 'Pn Noor Azila',
  '3': 'Ust Muhd Aiman',
};

export const MAX_SCORES = {
  persembahan: 95,  // 19 items × max 5
  semangat: 65,     // 13 items × max 5
  idea: 60,         // 12 items × max 5
  keseluruhan: 220,
};

export const PROJECT_LIST: string[] = [
  "SMART FREEZER AND DEFROST SYSTEM",
  "RECOOL SYSTEM",
  "DOMESTIC WATER COOLED AIR-CONDITIONING SYSTEM",
  "PETI SEJUK HYBRID",
  "TRANSPARENT SPLIT UNIT TEACHING MODULE",
  "SMART VEHICLE ANTI THEFT SYSTEM",
  "SMART SOLAR COOP",
  "Portable Sandblasting",
  "MINI KART",
  "SMART ENGINE HOIST STAND",
  "F.O.C.U.S DRIVE",
  "RECTRACTABLE ARCHERY STAND",
  "SMART COMPRESSION CAR SPRING",
  "RUMBLESCOOTER",
  "Welding Defect Checker",
  "Smart Grass Chopper",
  "Mesin Pengasing Padi",
  "Metal Deck Cutter",
  "Automatic Pipe Rotating Machine",
  "Sago Grating Machine",
  "Mini NDT Inspection Lab",
  "Mobile Poison Sprayer",
  "TVET MARA BESUT ROOM BOOKING SYSTEM",
  "CLOUD-BASED BARCODE SCANNER",
  "CLOUD PUZZLE QUEST",
  "Stripe line machine",
  "E-trolley go",
];

export const IMEX_SCHEMA: {
  persembahan: ScoreField[];
  semangat: ScoreField[];
  idea: ScoreField[];
} = {
  persembahan: [
    { id: 'p1',  kriteria: 'Kejelasan Penyampaian',    desc: 'Bahasa mudah' },
    { id: 'p2',  kriteria: '',                          desc: 'Struktur logik' },
    { id: 'p3',  kriteria: '',                          desc: 'Objektif jelas' },
    { id: 'p4',  kriteria: 'Penguasaan Kandungan',      desc: 'Faham topik' },
    { id: 'p5',  kriteria: '',                          desc: 'Jawapan tepat semasa soal jawab' },
    { id: 'p6',  kriteria: 'Keyakinan & Bahasa Tubuh',  desc: 'Eye contact' },
    { id: 'p7',  kriteria: '',                          desc: 'Postur' },
    { id: 'p8',  kriteria: '',                          desc: 'Nada suara' },
    { id: 'p9',  kriteria: 'Gaya Penyampaian',          desc: 'Kreatif' },
    { id: 'p10', kriteria: '',                          desc: 'Menarik perhatian' },
    { id: 'p11', kriteria: '',                          desc: 'Tidak monoton' },
    { id: 'p12', kriteria: 'Penggunaan Visual/Media',   desc: 'Slide kemas' },
    { id: 'p13', kriteria: '',                          desc: 'Video relevan' },
    { id: 'p14', kriteria: '',                          desc: 'Model fizikal' },
    { id: 'p15', kriteria: 'Interaksi dengan Penonton', desc: 'Responsif' },
    { id: 'p16', kriteria: '',                          desc: 'Soal jawab' },
    { id: 'p17', kriteria: '',                          desc: 'Engagement' },
    { id: 'p18', kriteria: 'Pengurusan Masa',           desc: 'Ikut masa' },
    { id: 'p19', kriteria: '',                          desc: 'Tidak tergesa-gesa atau terlalu panjang' },
  ],
  semangat: [
    { id: 's1',  kriteria: 'Penglibatan Semua Ahli',        desc: 'Semua ahli bercakap' },
    { id: 's2',  kriteria: '',                               desc: 'Peranan seimbang' },
    { id: 's3',  kriteria: 'Kerjasama & Koordinasi',         desc: 'Susunan tugas' },
    { id: 's4',  kriteria: '',                               desc: 'Tiada kekeliruan' },
    { id: 's5',  kriteria: 'Penampilan Seragam/Konsisten',   desc: 'Uniform' },
    { id: 's6',  kriteria: '',                               desc: 'Branding kumpulan' },
    { id: 's7',  kriteria: 'Komunikasi Dalaman',             desc: 'Interaksi semasa pembentangan' },
    { id: 's8',  kriteria: 'Sokongan Moral & Semangat',      desc: 'Galakan' },
    { id: 's9',  kriteria: '',                               desc: 'Saling bantu' },
    { id: 's10', kriteria: 'Kepimpinan Kumpulan',            desc: 'Ketua kumpulan jelas' },
    { id: 's11', kriteria: '',                               desc: 'Arah yang teratur' },
    { id: 's12', kriteria: 'Perancangan Awal',               desc: 'Latihan' },
    { id: 's13', kriteria: '',                               desc: 'Persediaan teknikal' },
  ],
  idea: [
    { id: 'i1',  kriteria: 'Keaslian & Inovasi',            desc: 'Idea unik' },
    { id: 'i2',  kriteria: '',                               desc: 'Penambahbaikan kreatif' },
    { id: 'i3',  kriteria: 'Potensi Pasaran',                desc: 'Sasaran pengguna' },
    { id: 'i4',  kriteria: '',                               desc: 'Permintaan pasaran' },
    { id: 'i5',  kriteria: 'Praktikaliti Pelaksanaan',       desc: 'Boleh dilaksana' },
    { id: 'i6',  kriteria: '',                               desc: 'Tidak rumit' },
    { id: 'i7',  kriteria: 'Kos & Keberkesanan',             desc: 'Kos rendah' },
    { id: 'i8',  kriteria: '',                               desc: 'Impak tinggi' },
    { id: 'i9',  kriteria: 'Nilai Tambah kepada Industri',   desc: 'Relevan dengan keperluan semasa' },
    { id: 'i10', kriteria: 'Kebolehskalaan',                 desc: 'Boleh dikembangkan ke pasaran lebih luas' },
    { id: 'i11', kriteria: 'Sokongan Data & Kajian',         desc: 'Statistik' },
    { id: 'i12', kriteria: '',                               desc: 'Kajian pasaran' },
  ],
};
