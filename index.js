const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

let extension = args.e || args.extension || 'js';
let path = args.p || args.path || '.';
let recursive = args.r || args.recursive || true;

printFileData();

function printFileData() {
    let data = countAllLinesInDir();

    data.fileData.sort((a, b) => {
        return b.lines - a.lines;
    });

    data.fileData.forEach(file => {
        console.log(`${file.file.replace(path, '').replace(/^[\/|\\|]/g, "")}: ${file.lines}`);
    });

    console.log(`Total lines: ${data.totalLines}`);
}

function countAllLinesInDir() {
    let files = getFiles(path, recursive);
    let totalLines = 0;
    let fileData = [];
    files.forEach(file => {
        if (file.endsWith('.' + extension)) {
            let lines = countLinesInFile(file);
            totalLines += lines;
            fileData.push({
                file: file,
                lines: lines
            });
        }
    });

    return {
        totalLines: totalLines,
        fileData: fileData
    };
}


function getFiles(dir, recursive) {
    let files = fs.readdirSync(dir);
    let result = [];
    files.forEach(file => {
        let filePath = dir + '/' + file;
        if (fs.statSync(filePath).isDirectory()) {
            if (recursive) {
                result = result.concat(getFiles(filePath, recursive));
            }
        } else {
            result.push(filePath);
        }
    });
    return result;
}

function countLinesInFile(file) {
    let lines = fs.readFileSync(file).toString().split("\n").length - 1;
    return lines;
}