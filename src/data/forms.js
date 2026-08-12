// Google Apps Script Web App endpoint shared by every form on the site
// (Contact, Feedback, and the footer's "Contact the Developer" form).
// Update this if the script is ever redeployed to a new URL.
export const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby0L5MUwX8Sjz9LMr6laUSRa6t_VZ2rdctSrczNDPpNAhxD9a2b4wR3nabuVH_iOamc/exec";

// Apps Script web apps don't respond to CORS preflight requests, so a
// "Content-Type: application/json" POST gets blocked by the browser before
// it ever reaches the script. Sending as text/plain avoids the preflight
// entirely (it's treated as a "simple request"); the script's doPost can
// still call JSON.parse(e.postData.contents) regardless of this header.
export async function submitFormData(payload) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Submission failed with status ${response.status}`);
  }

  return response;
}
