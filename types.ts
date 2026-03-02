export type LanguageEntry = {
    alpha3_terminology: string, // ISO 639-2/T - 3 letter code (based on native name), more common
    alpha3_bibliographic: string, // ISO 639-2/B - 3 letter code (based on English name)
    alpha2: string | null, // ISO 639-1 - 2 letter code
    english_name: string | null,
    french_name: string | null,
};
