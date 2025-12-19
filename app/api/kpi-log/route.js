import { supabase } from "@/lib/supabase";

export async function POST(req) {
    const body = await req.json();
    const { data, error } = await supabase.from("kpi_logs").insert(body);

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json(data);
}

export async function GET() {
    const { data, error } = await supabase
        .from("kpi_logs")
        .select("*, user_kpis(*), users(fullname)");

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json(data);
}