const commandLineArgs = require('command-line-args');
const parse = require('csv-parse');
const fs = require('fs');

const LANGUAGE_ISO = {
  English:'en_US',
  Japanese:'ja',
  French:'fr'
};

//declare commandline arguments

const optionDefinitions = [
  { name: 'inputFile', type: String, defaultValue: "translations.csv"  },
]

const options = commandLineArgs(optionDefinitions);

//create output dir if it does not exist
const outputDirName = 'output';

if (!fs.existsSync(outputDirName)){
    fs.mkdirSync(outputDirName);
}

// Open the input CSV file
const inputStream = fs.createReadStream(options.inputFile, {encoding: 'utf8'});

// Create the parser
const parser = parse({
  delimiter: ','
})

const languages = [];

// Parse the input file
inputStream.pipe(parser)
.on('data', function(record){
  if (languages.length === 0 ) {
      buildLanguageList(record,languages);
  } else {
      transformRecord(record);
  }
})
.on('end',function() {
  writeTranslationsToFile();
})

function transformRecord(record) {
    let key;
    record.forEach(function(item,index){
      if (index===0) {
        key = item;
      } else if (key.length > 0 && item.length >0){
        let language = languages[index-1];
        language.uiTranslations[key]=item,
        language.serverTranslations.push(key+"="+toUnicodeNotation(item))
      }
    })
}

function buildLanguageList(array,list) {
  array.forEach(function(item) {
    if (LANGUAGE_ISO[item] !== undefined) {
      list.push({
        iso:LANGUAGE_ISO[item],
        uiTranslations:{},
        serverTranslations: []
      });
    }
  })
}

function toUnicodeNotation(string) {
    var s = "";
    for( var i = 0; i < string.length; ++i) {
        var c = string[ i];
        if( c >= '\x7F') {
            c = c.charCodeAt(0).toString(16);
            switch( c.length) {
              case 2: c = "\\u00" + c; break;
              case 3: c = "\\u0" + c; break;
              default: c = "\\u" + c; break;
            }
        }
        s += c;
    }
    return s;
}

function writeTranslationsToFile() {
 languages.forEach(function(item) {
   let uiFileName = item.iso === "en_US" ? "output/messages.json" : 'output/messages-'+item.iso+'.json';
   const uiTranslationStream = fs.createWriteStream(uiFileName);
   uiTranslationStream.write(JSON.stringify(item.uiTranslations, null, 1));
   uiTranslationStream.close();
   const serverTranslationStream = fs.createWriteStream('output/messages_'+item.iso+'.properties');
   serverTranslationStream.write(item.serverTranslations.join('\n'));
   serverTranslationStream.close();
 })
}
