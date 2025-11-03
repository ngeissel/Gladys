---
inject: true
to: ../front/src/config/i18n/de.json
before: "\"openai\": {"
skip_if: "\"title\": \"<%= module %> configuration\","
---
    "<%= module %>": {
      "title": "<%= module %>",
      "description": "Steuern Sie Ihre <%= module %>-Geräte.",
      "deviceTab": "Geräte",
      "discoverTab": "<%= module %> entdecken",
      "setupTab": "Einrichtung",
      "documentation": "<%= module %>-Dokumentation",
      "discoverDeviceDescr": "<%= module %>-Geräte automatisch scannen",
      "nameLabel": "Gerätename",
      "namePlaceholder": "Geben Sie den Namen Ihres Geräts ein",
      "roomLabel": "Raum",
      "saveButton": "Speichern",
      "updateButton": "Aktualisieren",
      "alreadyCreatedButton": "Bereits erstellt",
      "deleteButton": "Löschen",
      "status": {
        "notConnected": "Gladys konnte keine Verbindung zum <%= module %>-Cloud-Konto herstellen. Bitte gehen Sie zu ",
        "setupPageLink": "<%= module %>-Konfigurationsseite."
      },
      "device": {
        "title": "Geräte in Gladys",
        "search": "Geräte suchen",
        "updates": "Nach Updates suchen",
        "editButton": "Bearbeiten",
        "noDeviceFound": "Kein <%= module %>-Gerät gefunden.",
        "featuresLabel": "Funktionen"
      },
      "discover": {
        "title": "Geräte, die auf Ihrem <%= module %>-Cloud-Konto erkannt wurden",
        "description": "<%= module %>-Geräte werden automatisch erkannt. Ihre <%= module %>-Geräte müssen zuvor zu Ihrem <%= module %>-Cloud-Konto hinzugefügt werden.",
        "error": "Fehler beim Erkennen von <%= module %>-Geräten. Bitte überprüfen Sie Ihre Zugangsdaten unter Einrichtung.",
        "noDeviceFound": "Kein <%= module %>-Gerät erkannt.",
        "scan": "Scannen"
      },
      "setup": {
        "title": "<%= module %>-Konfiguration",
        "<%= attributeName %>Description": "Sie können Gladys mit Ihrem <%= module %>-Cloud-Konto verbinden, um die zugehörigen Geräte zu steuern.",
        "userLabel": "Benutzername",
        "userPlaceholder": "Geben Sie den <%= module %>-Benutzernamen ein",
        "passwordLabel": "Passwort",
        "passwordPlaceholder": "Geben Sie das <%= module %>-Passwort ein",
        "saveLabel": "Konfiguration speichern",
        "error": "Beim Speichern der Konfiguration ist ein Fehler aufgetreten.",
        "connecting": "Konfiguration gespeichert. Verbindung mit Ihrem <%= module %>-Cloud-Konto wird hergestellt...",
        "connected": "Erfolgreich mit dem <%= module %>-Cloud-Konto verbunden!",
        "connectionError": "Fehler bei der Verbindung, bitte überprüfen Sie Ihre Konfiguration."
      },
      "error": {
        "defaultError": "Beim Speichern des Geräts ist ein Fehler aufgetreten.",
        "defaultDeletionError": "Beim Löschen des Geräts ist ein Fehler aufgetreten.",
        "conflictError": "Das aktuelle Gerät ist bereits in Gladys vorhanden."
      }
    },