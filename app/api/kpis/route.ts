import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { error } from "console";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KES!);

export async function GET(req: Request) {
    const url = new URL(req.url);
    const orgId = url.searchParams.get('org_id');
    if (!orgId) return NextResponse.json({ error: 'org_id required' }, { status: 400 });

    const { data, error } = await supabase
        .from('kpis')
        .select('*')
        .eq('org_id', orgId);
    if (error) return NextResponse.json({
        error:
            error.message
    }, { status: 500 });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { org_id, title, unit, description } = body;
    const { data, error } = await supabase
        .from('kpis')
        .insert([{ org_id, title, unit, description }])
        .select()
        .single();
    if (error) return NextResponse.json({
        error:
            error.message
    }, { status: 500 });
    return NextResponse.json(data);
}