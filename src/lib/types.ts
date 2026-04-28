export interface ImexRecord {
  id: number;
  panel: string;
  nama_kumpulan: string;
  tajuk_projek: string;
  // Persembahan
  p1: number; p2: number; p3: number; p4: number; p5: number;
  p6: number; p7: number; p8: number; p9: number; p10: number;
  p11: number; p12: number; p13: number; p14: number; p15: number;
  p16: number; p17: number; p18: number; p19: number;
  // Semangat
  s1: number; s2: number; s3: number; s4: number; s5: number;
  s6: number; s7: number; s8: number; s9: number; s10: number;
  s11: number; s12: number; s13: number;
  // Idea
  i1: number; i2: number; i3: number; i4: number; i5: number;
  i6: number; i7: number; i8: number; i9: number; i10: number;
  i11: number; i12: number;
  // Jumlah
  jumlah_persembahan: number;
  jumlah_semangat: number;
  jumlah_idea: number;
  jumlah_keseluruhan: number;
  peratus: number;
  created_at: string;
}

export interface RankingItem {
  tajuk: string;
  purata: number;
  jumlah_panel: number;
}

export type PanelId = '1' | '2' | '3';

export interface ScoreField {
  id: string;
  kriteria: string;
  desc: string;
}

export interface ImexFormPayload {
  panel: string;
  tajuk_projek: string;
  nama_kumpulan: string;
  jumlah_persembahan: number;
  jumlah_semangat: number;
  jumlah_idea: number;
  jumlah_keseluruhan: number;
  peratus: number;
  [key: string]: string | number;
}
