const CREDXP_ORIGIN = "https://credxp.com";

function extractFirst(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match?.[1] ?? null;
}

function extractFormHtml(html: string, formId: string, renderId: string): string | null {
  const pattern = new RegExp(
    `<form[^>]*id="forminator-module-${formId}"[^>]*data-forminator-render="${renderId}"[\\s\\S]*?</form>`,
    "i",
  );
  const form = html.match(pattern)?.[0] ?? null;
  if (!form) return null;
  return form.replace(/style="display:\s*none;?"/i, 'style="display:block"');
}

function extractInitScript(html: string, formId: string, renderId: string): string | null {
  const marker = `jQuery('#forminator-module-${formId}[data-forminator-render="${renderId}"]')`;
  const index = html.indexOf(marker);
  if (index === -1) return null;
  const scriptStart = html.lastIndexOf("<script", index);
  const scriptEnd = html.indexOf("</script>", index);
  if (scriptStart === -1 || scriptEnd === -1) return null;
  return html.slice(scriptStart, scriptEnd + 9);
}

function extractStylesheets(html: string, formId: string): string[] {
  const urls: string[] = [];
  const patterns = [
    new RegExp(`id='forminator-module-css-${formId}-css' href='([^']+)'`, "i"),
    /id='forminator-icons-css' href='([^']+)'/i,
    /id='forminator-utilities-css' href='([^']+)'/i,
    /id='forminator-grid-default-css' href='([^']+)'/i,
    /id='forminator-forms-default-base-css' href='([^']+)'/i,
    /id='forminator-forms-default-select2-css' href='([^']+)'/i,
    /id='forminator-forms-default-full-css' href='([^']+)'/i,
    /id='intlTelInput-forminator-css-css' href='([^']+)'/i,
  ];
  for (const pattern of patterns) {
    const href = extractFirst(html, pattern);
    if (href) urls.push(href.replace(/^http:/, "https:"));
  }
  return urls;
}

function extractFrontConfigScript(html: string): string | null {
  const match = html.match(/<script id="forminator-front-scripts-js-extra">([\s\S]*?)<\/script>/i);
  return match?.[0] ?? null;
}

export async function buildForminatorEmbedDocument(formId: string, renderId = "1"): Promise<string> {
  const response = await fetch(`${CREDXP_ORIGIN}/`, {
    cache: "no-store",
    headers: { "User-Agent": "Credxp-Next-Embed/1.0" },
  });

  if (!response.ok) {
    throw new Error(`Failed to load Credxp form source (${response.status})`);
  }

  const sourceHtml = await response.text();
  const formHtml = extractFormHtml(sourceHtml, formId, renderId);
  const initScript = extractInitScript(sourceHtml, formId, renderId);
  const frontConfigScript = extractFrontConfigScript(sourceHtml);

  if (!formHtml || !initScript || !frontConfigScript) {
    throw new Error(`Forminator form ${formId} (render ${renderId}) was not found on credxp.com`);
  }

  const stylesheets = extractStylesheets(sourceHtml, formId);
  const styleTags = stylesheets.map((href) => `<link rel="stylesheet" href="${href}" />`).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Credxp Form</title>
  ${styleTags}
  <style>
    html, body { margin: 0; padding: 0; background: #fff; color: #111; font-family: Inter, system-ui, sans-serif; }
    .forminator-embed { padding: 1.25rem 1.25rem 1.5rem; max-width: 32rem; margin: 0 auto; }
    .forminator-embed .forminator-button-submit { background: #ef231c !important; border-color: #ef231c !important; }
  </style>
  <script src="${CREDXP_ORIGIN}/wp-includes/js/jquery/jquery.min.js"></script>
  <script src="${CREDXP_ORIGIN}/wp-includes/js/jquery/jquery-migrate.min.js"></script>
  <script src="${CREDXP_ORIGIN}/wp-includes/js/jquery/ui/core.min.js"></script>
</head>
<body>
  <div class="forminator-embed">
    <div class="forminator-wrapper">${formHtml}</div>
  </div>
  <script src="${CREDXP_ORIGIN}/wp-content/plugins/forminator/assets/forminator-ui/js/select2.full.min.js"></script>
  <script src="${CREDXP_ORIGIN}/wp-content/plugins/forminator/assets/js/library/jquery.validate.min.js"></script>
  <script src="${CREDXP_ORIGIN}/wp-content/plugins/forminator/assets/forminator-ui/js/forminator-form.min.js"></script>
  ${frontConfigScript}
  <script src="${CREDXP_ORIGIN}/wp-content/plugins/forminator/build/front/front.multi.min.js"></script>
  <script src="${CREDXP_ORIGIN}/wp-content/plugins/forminator/assets/js/library/intlTelInput.min.js"></script>
  ${initScript}
</body>
</html>`;
}
