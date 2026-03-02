#!/usr/bin/env node
import * as fs from 'fs/promises';
/** @import { ISO_639_2_LanguageEntry } from './types.ts' */

const resp = await fetch('https://www.loc.gov/standards/iso639-2/ISO-639-2_utf-8.txt');
const text = await resp.text();

const output = [];

for (const line of text.trim().split('\r\n')) {
    // alpha3-B | alpha3-T | alpha2 | English name | French name
    const parts = line.split('|');

    /** @type {ISO_639_2_LanguageEntry} */
    const entry = {
        alpha3_bibliographic: parts[0].length > 0 ? parts[0] : parts[1],
        alpha3_terminology: parts[1].length > 0 ? parts[1] : parts[0],
        alpha2: parts[2].length > 0 ? parts[2] : null,
        english_name: !parts[3].includes('Not applicable') ? parts[3] : null,
        french_name: !parts[4].includes('non applicable') ? parts[4] : null,
    };
    output.push(entry);
}

await fs.writeFile('iso-639-2.json', JSON.stringify(output, null, 4));
