import { supabase } from "@/lib/supabase";

export async function POST(req) {
    const body = await req.json();
    const { data, error } = await supabase.from("user_kpis").insert(body);

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json(data);
}

export async function GET() {
    const { data, error } = await supabase
        .from("user_kpis")
        .select("*, users(fullname), kpis(title)");

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json(data);
}