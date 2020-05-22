const fs = require("fs"); // import the file system module
const { getComponents, getName, getDesc, trim, getInputs } = require("./regex"); // import our regex functions

const sourceFile = String(fs.readFileSync("./html-pages/basic-functions.html"));

const components = getComponents(sourceFile);

const componentObjs = components.map((component) => {
   return {
      name: getName(component),
      desc: trim(getDesc(component)),
      inputs: getInputs(component),
      type: "basic",
      typeNum: 100, // 100 for basic
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

// console.log(orderedObjs);

const targetFile = "./json-files/basic.json";

fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
