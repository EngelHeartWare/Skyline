import { useTheme } from "../hooks/useTheme";

const IMPRESSUM_CONTENT = `
Angaben gemäß § 5 TMG

Moritz Engelhardt
Schachtstraße 10
04155 Leipzig
Deutschland

Kontakt:
E-Mail: moritzengelhardt@gmx.de
Telefon: 015678 305322

Umsatzsteuer
Es besteht keine Umsatzsteuerpflicht gemäß § 19 UStG (Kleinunternehmerregelung), daher wird keine Umsatzsteuer-Identifikationsnummer geführt.

Redaktionell Verantwortlicher
Moritz Engelhardt
Schachtstraße 10
04155 Leipzig
(§ 18 Abs. 2 MStV)

EU-Streitschlichtung
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/
Unsere E-Mail-Adresse finden Sie oben im Impressum.

Verbraucherstreitbeilegung / Universalschlichtungsstelle
Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
`.trim();

const DATENSCHUTZ_CONTENT = `
Datenschutzerklärung

Stand: April 2026

1. Verantwortlicher

Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer datenschutzrechtlicher Bestimmungen ist:

Moritz Engelhardt
Schachtstraße 10
04155 Leipzig
Deutschland
E-Mail: moritzengelhardt@gmx.de
Telefon: 015678 305322

2. Datenschutz auf einen Blick

Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen entnehmen Sie den nachfolgenden Abschnitten.

3. Hosting (Netlify)

Diese Website wird extern bei Netlify (Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, California 94104, USA) gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Meta- und Kommunikationsdaten, Webseitenzugriffe und sonstige Daten handeln, die über eine Website generiert werden.

Die Nutzung von Netlify erfolgt zum Zwecke einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Unser berechtigtes Interesse liegt in der zuverlässigen Darstellung unserer Website.

Drittlandübermittlung: Netlify verarbeitet Daten auch in den USA. Netlify ist unter dem EU-US Data Privacy Framework (DPF) sowie der UK Extension zum EU-US DPF zertifiziert (siehe https://www.dataprivacyframework.gov/s). Die Datenübertragung in die USA erfolgt daher auf Grundlage dieses Angemessenheitsbeschlusses. Sollte das DPF für ungültig erklärt werden, greifen die EU-Standardvertragsklauseln (SCCs) als Rückfallmechanismus. Weitere Informationen: https://www.netlify.com/gdpr-ccpa/

Auftragsverarbeitung: Netlify verarbeitet Daten in unserem Auftrag auf Grundlage eines Data Processing Agreements (DPA), das die Einhaltung der DSGVO sicherstellt.

4. SSL- bzw. TLS-Verschlüsselung

Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.

5. Datenerfassung auf dieser Website

Server-Log-Dateien:
Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
- Browsertyp und Browserversion
- Verwendetes Betriebssystem
- Referrer URL
- Hostname des zugreifenden Rechners
- Uhrzeit der Serveranfrage
- IP-Adresse

Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Laut Netlify-DPA werden Server-Log-Dateien bis zu 90 Tage online und bis zu 1 Jahr offline aufbewahrt.

Cookies und lokale Speicherung:
Diese Website verwendet keine Cookies zu Tracking- oder Werbezwecken. Es werden keine Analyse-Tools eingesetzt. Die Web-App „Skyline Explorer" speichert Einstellungen und Authentifizierungs-Tokens von Supabase im localStorage Ihres Browsers (siehe Abschnitt 7). Die Portfolio-Website (engelheartware.netlify.app) verwendet weder Cookies noch localStorage.

6. Externe Dienste und Inhalte

Schriftarten:
Diese Website verwendet ausschließlich lokal eingebundene Systemschriftarten. Es werden keine externen Schriftarten (z. B. Google Fonts) von Drittanbieter-Servern geladen. Es findet daher keine Datenübertragung an Dritte im Zusammenhang mit der Schriftdarstellung statt.

GitHub:
Diese Website enthält Links zu GitHub (GitHub, Inc., San Francisco, USA). Beim Anklicken werden Sie auf die Website von GitHub weitergeleitet, wobei die für den Seitenaufruf üblichen Daten (z. B. IP-Adresse) an GitHub übertragen werden. Datenschutzhinweise: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement

Ko-fi:
Diese Website enthält einen Link zu Ko-fi (Ko-fi Labs Limited, UK). Beim Anklicken werden Sie auf die Website von Ko-fi weitergeleitet. Datenschutzhinweise: https://more.ko-fi.com/privacy

Apple App Store:
Diese Website enthält Links zum Apple App Store (Apple Inc., USA). Beim Anklicken werden Sie auf die Website von Apple weitergeleitet. Datenschutzhinweise: https://www.apple.com/legal/privacy/

7. Unsere Apps

Swipe In (iOS):
Die App „Swipe In" speichert alle eingegebenen Daten (wie z. B. erfasste Zeiten, Aktivitäten, Orte und Einstellungen) ausschließlich lokal auf Ihrem Gerät mittels Core Data und UserDefaults. Wir (der Entwickler) haben zu keinem Zeitpunkt Zugriff auf diese Daten, lesen diese nicht aus und übertragen sie nicht an externe Server. Die App enthält keine Werbe-SDKs, Analyse-Frameworks oder Tracking-Bibliotheken Dritter. Wenn Sie die CSV-Export-Funktion nutzen, wird die Datei auf Ihrem Gerät erzeugt und über das iOS-Share-Sheet geteilt. Die Entscheidung, wohin Sie die Datei senden oder speichern, liegt ausschließlich bei Ihnen. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).

Skyline Explorer (Web-App):
Die Web-App „Skyline Explorer" wird ebenfalls über Netlify gehostet. Es gelten die unter Abschnitt 3 genannten Hinweise zum Hosting.

Benutzerkonten und Authentifizierung (Supabase):
Für die Nutzung personalisierter Funktionen (Favoriten, Besucht-Markierungen, Wunschliste) ist eine Registrierung erforderlich. Wir verwenden Supabase (Supabase Inc., San Francisco, USA) als Backend-Dienst. Dabei werden verarbeitet: E-Mail-Adresse (für Registrierung und Login), Passwort (gehasht gespeichert, nicht im Klartext), eine automatisch generierte Benutzer-ID sowie Ihre Gebäudelisten als Referenz-IDs. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Supabase nutzt Amazon Web Services (AWS) als Infrastruktur. Die Datenverarbeitung erfolgt auf Servern in der EU (Stockholm, Schweden). Weitere Informationen: https://supabase.com/privacy

Lokale Datenspeicherung (localStorage):
Zusätzlich zur Cloud-Speicherung speichert die App Einstellungen und Listen lokal in Ihrem Browser (localStorage): Theme-Einstellung (hell/dunkel), Favoritenliste, Besucht-Liste und Wunschliste (als Gebäude-IDs). Diese Daten verlassen Ihren Browser nicht, es sei denn, Sie nutzen die Cloud-Synchronisation. Sie können diese Daten jederzeit über die Browsereinstellungen löschen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Funktionalität).

Externe APIs (Wikidata und Wikipedia):
Beim Laden der App werden Gebäudedaten von Wikidata (query.wikidata.org) abgefragt. Für Gebäudebilder und Beschreibungen werden Daten von der Wikipedia-API (en.wikipedia.org) abgerufen. Bei beiden Diensten wird Ihre IP-Adresse an die Wikimedia Foundation übermittelt. Es handelt sich um öffentlich verfügbare Daten. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen: https://foundation.wikimedia.org/wiki/Privacy_policy

Kontolöschung:
Sie können Ihr Benutzerkonto jederzeit löschen lassen. Senden Sie dazu eine E-Mail an die in Abschnitt 1 genannte Adresse. Alle mit Ihrem Konto verknüpften Daten (E-Mail, Gebäudelisten) werden daraufhin vollständig gelöscht.

8. Ihre Rechte als betroffene Person

Im Rahmen der geltenden gesetzlichen Bestimmungen haben Sie folgende Rechte:
- Recht auf Auskunft (Art. 15 DSGVO)
- Recht auf Berichtigung (Art. 16 DSGVO)
- Recht auf Löschung (Art. 17 DSGVO)
- Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
- Recht auf Datenübertragbarkeit (Art. 20 DSGVO)
- Recht auf Widerspruch (Art. 21 DSGVO)

Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die im Abschnitt 1 genannte Kontaktadresse.

9. Beschwerderecht bei einer Aufsichtsbehörde

Unbeschadet eines anderweitigen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde zu, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt (Art. 77 DSGVO).

Die für uns zuständige Aufsichtsbehörde ist:
Sächsischer Datenschutz- und Transparenzbeauftragter
Devrientstraße 5
01067 Dresden
Telefon: +49 351 85471-101
E-Mail: post@sdtb.sachsen.de
Website: https://www.sdtb.sachsen.de

10. Aktualität dieser Datenschutzerklärung

Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen.
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