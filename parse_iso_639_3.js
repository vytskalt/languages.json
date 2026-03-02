#!/usr/bin/env node
import * as fs from 'fs/promises';
/** @import { ISO_639_3_LanguageEntry } from './types.ts' */

const resp = await fetch('https://iso639-3.sil.org/sites/iso639-3/files/downloads/iso-639-3.tab');
const text = await resp.text();

const output = [];

for (const line of text.trim().split('\n').slice(1)) {
    // Id	Part2b	Part2t	Part1	Scope	Language_Type	Ref_Name	Comment
    const parts = line.split('\t');

    /** @type {ISO_639_3_LanguageEntry['scope']} */
    let scope;
    switch (parts[4]) {
        case 'I':
            scope = 'individual';
            break;
        case 'M':
            scope = 'macrolanguage';
            break;
        case 'S':
            scope = 'special';
            break;
        default:
            throw new Error(`Unknown language scope '${parts[4]}'`);
    }

    /** @type {ISO_639_3_LanguageEntry['type']} */
    let type;
    switch (parts[5]) {
        case 'L':
            type = 'living';
            break;
        case 'E':
            type = 'extinct';
            break;
        case 'C':
            type = 'constructed';
            break;
        case 'H':
            type = 'historical';
            break;
        case 'S':
            type = 'special';
            break;
        default:
            throw new Error(`Unknown language type '${parts[5]}'`);
    }

    /** @type {ISO_639_3_LanguageEntry} */
    const entry = {
        id: parts[0],
        part2b: parts[1].length > 0 ? parts[1] : null,
        part2t: parts[2].length > 0 ? parts[2] : null,
        part1: parts[3].length > 0 ? parts[3] : null,
        scope,
        type,
        reference_name: parts[6],
        comment: parts[7]?.length > 0 ? parts[7] : null,
    };
    output.push(entry);
}

await fs.writeFile('iso-639-3.json', JSON.stringify(output, null, 4));
