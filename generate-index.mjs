// generate-index.mjs
import fs from "fs";
import path from "path";

const root = process.cwd();

// Берём все .html в корне, кроме index.html
const files = fs
    .readdirSync(root)
    .filter((name) => name.endsWith(".html"))
    .filter((name) => name !== "index.html")
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

function labelFromFile(name) {
    const base = name.replace(/\.html$/i, "");
    return base
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

const links =
    files.length > 0
        ? files
            .map((file) => {
                const label = labelFromFile(file);
                return `        <li><a href="${file}" target="_blank" rel="noopener noreferrer">${label}</a></li>`;
            })
            .join("\n")
        : '        <li>Пока нет ни одного HTML-файла.</li>';

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Dev Notes</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f5f5f5;
      margin: 0;
      padding: 24px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 24px 28px;
      border-radius: 8px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
    }
    h1 {
      font-size: 28px;
      margin-bottom: 4px;
    }
    p.desc {
      margin-top: 0;
      color: #555;
      margin-bottom: 20px;
    }
    .file-count {
      font-size: 13px;
      color: #777;
      margin-bottom: 12px;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    li a {
      display: block;
      padding: 8px 10px;
      border-radius: 6px;
      text-decoration: none;
      color: #0b5ed7;
      background: #f0f4ff;
    }
    li a:hover {
      background: #e0ebff;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Dev Notes</h1>
    <p class="desc">HTML-Vorlagen und Notizen. Wähle ein Dokument aus der Liste unten</p>
    <div class="file-count">Dateien: ${files.length}</div>
    <ul>
${links}
    </ul>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(root, "index.html"), html, "utf8");
console.log(`index.html generated with ${files.length} links.`);
