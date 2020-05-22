module.exports = {
   getComponents(file) {
      return file.match(
         /(?<=<!-- start column -->)(.*?)(?=<!-- end column -->)/gs
      );
   },
   getName(component) {
      return component.match(/(?<=<b>)(.*?)(?=<\/b>)/g)[0];
   },
   getDesc(component) {
      description = component.match(/(?<=<\/b> - )(.*?)(?=<\/p>)/gs)[0]; // Find the description.
      // console.log(description);
      // description = description.replace(/\s{2,}/g, " "); // All whitespace with 2 or more spaces should be converted to single spaces.
      // description = description.replace(/^\s+|\s+$/gi, ""); // Trim space at the beginning and end of the search string.
      return description;
   },
   getInputs(component) {
      return component.match(/(?<=<input)(.*?)(?=\/>)/gs).length;
   },
   trim(str) {
      // "use the string .replace() method and regex to first replace carriage returns and new lines with a space, then replace 2 or more spaces with 1 space, then remove spaces from beginning and end";
      str = str.replace(/\s{2,}/g, " "); // All whitespace with 2 or more spaces should be converted to single spaces.
      str = str.replace(/^\s+|\s+$/gi, ""); // Trim space at the beginning and end of the search string.
      return str;
   },
};
