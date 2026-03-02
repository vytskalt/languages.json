export type ISO_639_2_LanguageEntry = {
    alpha3_terminology: string, // ISO 639-2/T - 3 letter code (based on native name), more common
    alpha3_bibliographic: string, // ISO 639-2/B - 3 letter code (based on English name)
    alpha2: string | null, // ISO 639-1 - 2 letter code
    english_name: string | null,
    french_name: string | null,
};

export type ISO_639_3_LanguageEntry = {
    id: string, // ISO 639-3 - 3 letter code
    part2b: string | null, // ISO 639-2/T - 3 letter code (based on native name), more common
    part2t: string | null, // ISO 639-2/B - 3 letter code (based on English name)
    part1: string | null, // ISO 639-1 - 2 letter code
    scope: 'individual' | 'macrolanguage' | 'special',
    type: 'living' | 'extinct' | 'constructed' | 'historical' | 'special',
    reference_name: string,
    comment: string | null,
};
