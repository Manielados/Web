// /api/notify-google.js
// Endpoint serverless en Vercel. La private key NUNCA se expone al cliente:
// solo vive en variables de entorno, server-side.

import { GoogleAuth } from "google-auth-library";

export default async function handler(req, res) {
  // 1. Solo aceptar POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 2. Proteger el endpoint con un secret propio,
  //    para que no cualquiera pueda golpearlo y gastar tu cuota.
  const authHeader = req.headers["authorization"];
  if (authHeader !== `Bearer ${process.env.NOTIFY_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 3. Body esperado: { urls: ["https://manielados.vercel.app/..."] }
  const { urls } = req.body;
  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: "Falta 'urls' (array)" });
  }

  try {
    // 4. Autenticación con la service account (desde env vars, nunca hardcoded)
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    // 5. Notificar cada URL al Indexing API
    const results = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(
          "https://indexing.googleapis.com/v3/urlNotifications:publish",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url,
              type: "URL_UPDATED", // o "URL_DELETED" si aplica
            }),
          }
        );
        const data = await response.json();
        return { url, status: response.status, data };
      })
    );

    return res.status(200).json({ ok: true, results });
  } catch (err) {
    console.error("Indexing API error:", err);
    return res.status(500).json({ error: "Error notificando a Google" });
  }
}
