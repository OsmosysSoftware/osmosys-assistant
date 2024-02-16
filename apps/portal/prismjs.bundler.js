const fs = require('fs');
const path = require('path');

const componentsPath = 'node_modules/prismjs/components/';
const angularJsonPath = 'angular.json';

// Read all min.js files from the directory
fs.readdir(componentsPath, (err, files) => {
  if (err) throw err;

  const minJsFiles = files.filter((file) => file.endsWith('.min.js'));

  // Read angular.json file
  fs.readFile(angularJsonPath, 'utf8', (err, data) => {
    if (err) throw err;

    const angularJson = JSON.parse(data);
    const project = Object.keys(angularJson.projects)[0]; // Assumes single project, adjust if needed

    // Add files to the scripts array
    minJsFiles.forEach((file) => {
      const filePath = path.join(componentsPath, file);
      if (!angularJson.projects[project].architect.build.options.scripts.includes(filePath)) {
        angularJson.projects[project].architect.build.options.scripts.push(filePath);
      }
    });

    // Write updated angular.json back to file
    fs.writeFile(angularJsonPath, JSON.stringify(angularJson, null, 2), 'utf8', (err) => {
      if (err) throw err;
      console.log('angular.json has been updated with PrismJS components');
    });
  });
});
