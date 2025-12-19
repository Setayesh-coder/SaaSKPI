import { supabase } from "@/lib/supabase";

export async function POST(req) {
    const body = await req.json();
    const { data, error } = await supabase.from("manager_access").insert(body);

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json(data);
}

export async function GET() {
    const { data, error } = await supabase
        .from("manager_access")
        .select("*, manager:manager_id(fullname), employee:employee_id(fullname)");

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json(data);
}