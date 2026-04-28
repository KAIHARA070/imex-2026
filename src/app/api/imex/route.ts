import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Ambil semua rekod
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('data_imex')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[GET /api/imex] Supabase error:', JSON.stringify(error));
      return NextResponse.json({ success: false, message: error.message, code: error.code }, { status: 500 });
    }
    return NextResponse.json({ success: true, data: data || [] });
  } catch (e: any) {
    console.error('[GET /api/imex] Exception:', e.message);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

// POST: Simpan rekod baru
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { data, error } = await supabase
      .from('data_imex')
      .insert([{
        ...payload,
        id: Date.now(),
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('[POST /api/imex] Supabase error:', JSON.stringify(error));
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    console.error('[POST /api/imex] Exception:', e.message);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
