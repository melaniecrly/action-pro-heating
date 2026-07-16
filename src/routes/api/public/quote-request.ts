import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  nom: z.string().trim().min(1).max(120),
  prenom: z.string().trim().min(1).max(120),
  telephone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(200),
  adresse: z.string().trim().max(300).optional().default(""),
  type_client: z.string().trim().max(60).optional().default(""),
  type_install: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(4000).optional().default(""),
  // honeypot
  website: z.string().max(0).optional().default(""),
});

export const Route = createFileRoute("/api/public/quote-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = schema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation error", details: parsed.error.flatten() },
            { status: 400 }
          );
        }
        const data = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: inserted, error } = await supabaseAdmin
          .from("quote_requests")
          .insert({
            nom: data.nom,
            prenom: data.prenom,
            telephone: data.telephone,
            email: data.email,
            adresse: data.adresse || null,
            type_client: data.type_client || null,
            type_install: data.type_install || null,
            message: data.message || null,
          })
          .select("id")
          .single();

        if (error) {
          console.error("[quote-request] insert error", error);
          return Response.json({ error: "Server error" }, { status: 500 });
        }

        // Best-effort notification email. Enqueue if email infrastructure is
        // configured; otherwise the request is still persisted and visible in
        // Cloud > quote_requests.
        try {
          const { error: rpcError } = await supabaseAdmin.rpc("enqueue_email" as never, {
            queue_name: "transactional_emails",
            template_name: "quote-request-notification",
            recipient_email: "contact@actiondesembouage.fr",
            template_data: { ...data, id: inserted?.id },
            idempotency_key: `quote-${inserted?.id}`,
          } as never);
          if (rpcError) {
            await supabaseAdmin
              .from("quote_requests")
              .update({ email_error: rpcError.message })
              .eq("id", inserted!.id);
          } else {
            await supabaseAdmin
              .from("quote_requests")
              .update({ email_sent: true })
              .eq("id", inserted!.id);
          }
        } catch (e) {
          console.warn("[quote-request] email enqueue skipped", e);
        }

        return Response.json({ ok: true, id: inserted?.id });
      },
    },
  },
});
