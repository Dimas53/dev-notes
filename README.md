# dev-notes
## 🔄 Aktualisierung der Datei-Liste (index.html)

Immer wenn Sie:

- eine neue HTML-Datei hinzufügen
- eine Datei löschen
- eine Datei umbenennen
- die Struktur der Dokumente ändern

müssen Sie die automatisch generierte Datei `index.html` aktualisieren.

Führen Sie dafür den folgenden Befehl aus:

```
npm run update:index
git add .
git commit -m "update"
git push
