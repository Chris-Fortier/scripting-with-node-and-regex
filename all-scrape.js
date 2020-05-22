const fs = require("fs"); // import the file system module
const { getComponents, getName, getDesc, trim, getInputs } = require("./regex"); // import our regex functions

function scrapeFile(group, typeNum) {
   // group is the group name such as "basic"
   // typeNum is the order number that these components start from

   const fileName = "./html-pages/" + group + ".html";

   console.log("Scraping ", fileName);

   const sourceFile = String(fs.readFileSync(fileName));

   const components = getComponents(sourceFile);

   const componentObjs = components.map((component) => {
      return {
         name: getName(component),
         desc: trim(getDesc(component)),
         inputs: getInputs(component).length,
         type: group,
         typeNum: typeNum,
         isFavorite: false, // default value is false
      };
   });

   // order the components
   const orderedObjs = [];
   for (let i = 0; i < componentObjs.length; i++) {
      const obj = componentObjs[i];
      obj.order = obj.typeNum + i;
      orderedObjs.push(obj);
   }

   console.log("Found " + orderedObjs.length + " components.");

   return orderedObjs;
}

allComponents = [];

allComponents.push(...scrapeFile("basic", 100)); // scrape basic functions
allComponents.push(...scrapeFile("intermediate", 200)); // scrape intermediate functions
allComponents.push(...scrapeFile("functional", 300)); // scrape functional functions
allComponents.push(...scrapeFile("algorithm", 400)); // scrape algorithm functions
allComponents.push(...scrapeFile("regex", 500)); // scrape regex functions

// write the file
const targetFile = "./dist/dist.json";
fs.writeFileSync(targetFile, JSON.stringify(allComponents));
