## Description
This repository contains a node scripts to generate translations files in the correct format for both the server side and the web UI from csv input with the following format:

key,English,French,Japanese
label.dublincore.title,Title,Titre,題名

The script will generate the following files:
- messages.json
- messages_en_US.properties
- messages-fr.json
- messages_fr.properties
- messages-ja.json
- messages_ja.properties

This files can then be added to the Studio project

## Important Note

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

## Run
The following software are required
- git
- node
- npm

```
git clone https://github.com/nuxeo-sandbox/nuxeo-translation-formatter
cd nuxeo-translation-formatter
npm install
node index.js --inputFile="myfile.csv"
```

## Import
Add the output files to your studio project or plugin.


## Known limitations
This plugin is a work in progress.

## About Nuxeo
Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands. More information is available at [www.nuxeo.com](http://www.nuxeo.com).
