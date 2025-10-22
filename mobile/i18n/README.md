# 🌍 Internationalization (i18n) Structure

This project implements **internationalization (i18n)** using the **ISO 639** standard for language codes and **ISO 3166** for regional variants. The goal is to support multiple languages and regional differences in a scalable and maintainable way.

---

## 📂 Folder Structure

```
i18n/
├── en-US/ # English (United States)
│ ├── tabs/
│ │ └── _layout.json
│ └── index/
│ └── index.json
│
└── es-MX/ # Spanish (Mexico)
├── tabs/
│ └── _layout.json
└── index/
└── index.json

```

---

## 📘 Standards Used

- **ISO 639-1**: Two-letter language codes  
  - `en` → English  
  - `es` → Spanish  

- **ISO 3166-1 alpha-2**: Two-letter region/country codes  
  - `US` → United States  
  - `MX` → Mexico  

👉 Combining them (`en-US`, `es-MX`) allows us to differentiate between regional variations.

---

## ✅ Justification

1. **Standards Compliance**  
   Using `en-US` and `es-MX` aligns with international standards (ISO 639 + ISO 3166). This ensures compatibility with i18n libraries such as **i18next**, **react-intl**, and **FormatJS**.

2. **Regional Variants**  
   - `en-US` = American English  
   - `es-MX` = Mexican Spanish  
   This structure allows us to later add other dialects (e.g., `en-GB`, `es-ES`) without conflicts.

3. **Domain-Specific Files**  
   Translations are split by feature/screen (`tabs/_layout.json`, `index/index.json`), which improves maintainability and avoids one large translation file.

4. **Consistency**  
   Both languages follow the same structure, ensuring the same translation keys exist across locales.

5. **Scalability**  
   As the app grows, we can add more domains (e.g., `settings.json`, `profile.json`) under each language folder without affecting existing translations.

---

## 🚀 Suggested Fallback Strategy

To reduce duplication and handle missing translations gracefully, we may also include **base language folders**:


```
i18n/
├── en/ # Generic English (fallback)
├── en-US/ # American English overrides
├── es/ # Generic Spanish (fallback)
└── es-MX/ # Mexican Spanish overrides

```

- **Generic language folder** (`en`, `es`) contains shared translations.  
- **Region folder** (`en-US`, `es-MX`) only overrides region-specific words.  

---

## 🔑 Example

```json
// en/common.json
{
  "welcome": "Welcome",
  "logout": "Log out"
}

// es/common.json
{
  "welcome": "Bienvenido",
  "logout": "Cerrar sesión"
}

// es-MX/overrides.json
{
  "computer": "Computadora"
}

// es-ES/overrides.json
{
  "computer": "Ordenador"
}

```

## 📖 Summary

We use ISO 639-1 for languages (en, es).

We extend with ISO 3166-1 alpha-2 for regions (US, MX).

Translations are organized by screen/domain for clarity.

The structure is scalable, maintainable, and standards-compliant.

## References
https://www.iso.org/iso-639-language-code
https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes