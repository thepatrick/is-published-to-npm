#!/usr/bin/env node

import { readFileSync } from "fs";
import { join } from "path";

import { isPublishedToNPM } from "../lib/is-published-to-npm";

let pkg = process.argv[2];
let version = process.argv[3];

if (!(pkg && version)) {
  try {
    const pkgJson = JSON.parse(
      readFileSync(join(process.cwd(), "package.json")).toString()
    ) as { name: string; version: string };
    pkg = pkgJson.name;
    version = pkgJson.version;
  } catch (err) {
    console.log(
      "is-published-to-npm must either be run from a a directory with a package.json or"
    );
    console.log("with package name and arguments provided:");
    console.log("> is-published-to-npm pkgname version");
    process.exit(2);
  }
}

isPublishedToNPM(pkg, version)
  .then((published) => {
    if (published) {
      console.log(pkg + " v" + version + " has already been published!");
      process.exit(1);
    } else {
      console.log(pkg + " v" + version + " has not been published yet!");
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(3);
  });
