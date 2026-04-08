import { useTheme } from "../hooks/useTheme";

const IMPRESSUM_CONTENT = `
Angaben gemäß § 5 TMG

Moritz Engelhardt
EngelHeartWare (Nebengewerbe)
Schachtstraße 10
04155 Leipzig
Deutschland

Kontakt:
E-Mail: moritzengelhardt@gmx.de

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Moritz Engelhardt
Schachtstraße 10
04155 Leipzig

Haftungsausschluss

Haftung für Inhalte:
Die Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

Haftung für Links:
Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.

Urheberrecht:
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.

Gebäudedaten:
Informationen zu Gebäuden stammen aus Wikidata und Wikipedia und unterliegen den jeweiligen Lizenzbestimmungen (CC BY-SA 3.0 bzw. CC0). Bilder stammen von Wikimedia Commons und unterliegen den dort angegebenen Lizenzen.
`.trim();

const DATENSCHUTZ_CONTENT = `
Datenschutzerklärung

Stand: April 2026

1. Verantwortlicher

Moritz Engelhardt
EngelHeartWare (Nebengewerbe)
Schachtstraße 10
04155 Leipzig
Deutschland
E-Mail: moritzengelhardt@gmx.de

2. Übersicht der Datenverarbeitungen

Diese Webseite ermöglicht es Nutzern, Wolkenkratzer zu erkunden, zu bewerten und persönliche Listen (Favoriten, Besucht, Wunschliste) zu führen. Im Folgenden informieren wir Sie über die Verarbeitung personenbezogener Daten bei der Nutzung unserer Webseite.

3. Hosting (Netlify)

Unsere Webseite wird bei Netlify, Inc. (San Francisco, USA) gehostet. Beim Aufrufen der Webseite werden automatisch Informationen an den Server übermittelt (Server-Logfiles), darunter:

- IP-Adresse
- Datum und Uhrzeit der Anfrage
- Browsertyp und -version
- Referrer URL

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der stabilen Bereitstellung der Webseite). Netlify verarbeitet Daten ggf. in den USA. Die Datenübermittlung erfolgt auf Basis von Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).

Weitere Informationen: https://www.netlify.com/privacy/

4. Benutzerkonten und Authentifizierung (Supabase)

Für die Nutzung personalisierter Funktionen (Favoriten, Besucht-Markierungen, Wunschliste) ist eine Registrierung erforderlich. Wir verwenden Supabase (Supabase Inc., San Francisco, USA) als Backend-Dienst. Dabei werden verarbeitet:

- E-Mail-Adresse (für Registrierung und Login)
- Passwort (gehasht gespeichert, nicht im Klartext)
- Benutzer-ID (automatisch generiert)
- Ihre Gebäudelisten (Favoriten, Besucht, Wunschliste) als Referenz-IDs

Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Supabase nutzt Amazon Web Services (AWS) als Infrastruktur. Die Datenverarbeitung erfolgt auf Servern in der EU (Frankfurt, wenn verfügbar) bzw. in den USA auf Basis von Standardvertragsklauseln.

Weitere Informationen: https://supabase.com/privacy

5. Lokale Datenspeicherung (localStorage)

Zusätzlich zur Cloud-Speicherung speichern wir Ihre Einstellungen und Listen lokal in Ihrem Browser (localStorage):

- Theme-Einstellung (hell/dunkel)
- Favoritenliste, Besucht-Liste, Wunschliste (als Gebäude-IDs)

Diese Daten verlassen Ihren Browser nicht, es sei denn, Sie nutzen die Cloud-Synchronisation. Sie können diese Daten jederzeit über die Browsereinstellungen löschen.

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Funktionalität).

6. Externe APIs

a) Wikidata (query.wikidata.org):
Beim Laden der Seite werden Gebäudedaten von Wikidata abgefragt. Dabei wird Ihre IP-Adresse an die Wikimedia Foundation übermittelt. Es handelt sich um öffentlich verfügbare Daten.

b) Wikipedia (en.wikipedia.org):
Für Gebäudebilder und Beschreibungen werden Daten von der Wikipedia-API abgerufen. Auch hier wird Ihre IP-Adresse übermittelt.

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Darstellung von Gebäudeinformationen).

Weitere Informationen: https://foundation.wikimedia.org/wiki/Privacy_policy

7. Keine Cookies, kein Tracking

Diese Webseite verwendet keine Cookies zu Tracking- oder Werbezwecken. Es werden keine Analyse-Tools (wie Google Analytics) eingesetzt. Die einzigen im Browser gespeicherten Daten sind die unter Punkt 5 beschriebenen localStorage-Einträge sowie von Supabase verwaltete Authentifizierungs-Tokens.

8. Ihre Rechte

Sie haben gemäß DSGVO folgende Rechte:

- Auskunft (Art. 15 DSGVO): Sie können Auskunft über Ihre gespeicherten Daten verlangen.
- Berichtigung (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger Daten verlangen.
- Löschung (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen. Bei Löschung Ihres Benutzerkontos werden alle zugehörigen Daten entfernt.
- Einschränkung (Art. 18 DSGVO): Sie können die Einschränkung der Verarbeitung verlangen.
- Datenübertragbarkeit (Art. 20 DSGVO): Sie können Ihre Daten über die Export-Funktion als JSON-Datei herunterladen.
- Widerspruch (Art. 21 DSGVO): Sie können der Verarbeitung Ihrer Daten widersprechen.

Zur Ausübung Ihrer Rechte wenden Sie sich an die oben genannte E-Mail-Adresse.

9. Kontolöschung

Sie können Ihr Benutzerkonto jederzeit löschen lassen. Senden Sie dazu eine E-Mail an die oben genannte Adresse. Alle mit Ihrem Konto verknüpften Daten (E-Mail, Gebäudelisten) werden daraufhin vollständig gelöscht.

10. Beschwerderecht

Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die für Leipzig zuständige Aufsichtsbehörde ist:

Sächsischer Datenschutzbeauftragter
Devrientstraße 5
01067 Dresden
https://www.saechsdsb.de

11. Änderungen

Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder Änderungen des Dienstes anzupassen. Die aktuelle Version finden Sie stets auf dieser Seite.
`.trim();

export default function LegalPage({ page, onClose }) {
  const { t, mode } = useTheme();
  const content = page === "impressum" ? IMPRESSUM_CONTENT : DATENSCHUTZ_CONTENT;
  const title = page === "impressum" ? "Impressum" : "Datenschutzerklärung";

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: mode === "dark" ? "rgba(6,10,16,.92)" : "rgba(255,255,255,.92)",
      backdropFilter: "blur(12px)",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      overflow: "auto", padding: "40px 20px",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        maxWidth: 640, width: "100%",
        background: mode === "dark" ? "#0f1724" : "#fff",
        border: `1px solid ${t.border}`,
        borderRadius: 14, padding: "28px 32px 32px",
        boxShadow: mode === "dark" ? "0 8px 40px rgba(0,0,0,.5)" : "0 8px 40px rgba(0,0,0,.1)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: t.textStrong, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{
            background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8,
            padding: "6px 14px", color: t.textMuted, cursor: "pointer", fontSize: 12, fontFamily: "inherit",
          }}>Schließen ✕</button>
        </div>
        <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>
          {content.split("\n").map((line, i) => {
            if (/^\d+\.\s/.test(line.trim()) || line.trim() === line.trim().toUpperCase() && line.trim().length > 3) {
              return <p key={i} style={{ fontWeight: 600, color: t.text, marginTop: 18, marginBottom: 4 }}>{line}</p>;
            }
            if (line.trim().startsWith("- ")) {
              return <p key={i} style={{ paddingLeft: 16, margin: "2px 0" }}>{line.trim()}</p>;
            }
            if (line.trim() === "") return <br key={i} />;
            return <span key={i}>{line}{"\n"}</span>;
          })}
        </div>
      </div>
    </div>
  );
}
