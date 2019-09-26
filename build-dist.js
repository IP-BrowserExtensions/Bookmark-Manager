const fs = require("fs");
const path = require("path");

const distPath = "./dist";
const assetsPath = "./assets";
const manifestPath = "./manifest.json";
const polyfillPath = "./node_modules/webextension-polyfill/dist/browser-polyfill.js";

deleteFolderRecursive(distPath);
copyFolderRecursiveSync(assetsPath, distPath);
copyFileSync(manifestPath, distPath);
copyFileSync(polyfillPath, distPath);

function deleteFolderRecursive(target) {
    if (target != "" && target != "./") {
        if (fs.existsSync(target)) {
            fs.readdirSync(target).forEach(function(file, index) {
                var curPath = target + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    // recurse
                    deleteFolderRecursive(curPath);
                } else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(target);
        }
    }
}

function copyFolderRecursiveSync(source, target) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
    }

    //copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function(file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

function copyFileSync(source, target) {
    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
