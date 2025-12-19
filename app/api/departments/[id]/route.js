import { supabase } from "@/lib/supabase";

export async function GET(_, { params }) {
    const { data, error } = await supabase
        .from("departments")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error) return Response.json({ error }, { status: 404 });
    return Response.json(data);
}

export async function PUT(req, { params }) {
    const body = await req.json();
    const { data, error } = await supabase
        .from("departments")
        .update(body)
        .eq("id", params.id);

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json(data);
}

export async function DELETE(_, { params }) {
    const { error } = await supabase
        .from("departments")
        .delete()
        .eq("id", params.id);

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json({ message: "Deleted" });
}