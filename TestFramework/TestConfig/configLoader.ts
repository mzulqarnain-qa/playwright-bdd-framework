import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

const configPath = path.resolve(__dirname, './testconfig.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// -----------------------------
// ENV + CONFIG MAPPING
// -----------------------------

process.env.BASE_URL = process.env.BASE_URL || config.baseURL;
process.env.INVENTORY_URL = config.inventoryURL;

// STANDARD_USER / STANDARD_PASS: set via .env or CI only (not loaded from testconfig.json).

export default config;
