/* ################################################################### */
/*
/*  Helpers
/*
/* ################################################################### */

import * as path from 'path';
import * as fs from 'fs';

/* ------------------------------------------------------------------- */
/*                          Parse package.json
/* ------------------------------------------------------------------- */

export const parsePackage = () => {
  // Read file
  const file =
    fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8');

  // Parse JSON
  const parsed = JSON.parse(file);

  // Return
  return parsed.version;
};

/* ------------------------------------------------------------------- */
/*                          Update readme
/* ------------------------------------------------------------------- */

export const updateReadme = () => {
  // Filepath
  const filePath = path.join(__dirname, 'Readme.md');

  // Read file
  const file =
    fs.readFileSync(filePath, 'utf-8');

  // Get version
  const version = parsePackage();

  // Str to replace
  const oldStr = /badge\/version.*-yellow\.svg/gi;
  const newStr = `badge/version-${version}-yellow.svg`;

  // Replace
  const newFile = file.replace(oldStr, newStr);

  // Update file
  fs.writeFileSync(filePath, newFile, 'utf-8');
};

// Run script
updateReadme();
