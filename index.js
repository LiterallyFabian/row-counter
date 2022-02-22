const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

//#region Command line arguments
// Extensions to count
let extensions = args.e || args.extensions || `js,jsx,ts,tsx,json,md,yml,yaml,css,scss,less,html,htm,xml,txt,mdx`;
extensions = extensions.split(',');

// Path to directory to count
let path = args.p || args.path || '.';

// Recursive flag
let recursive = args.r || args.recursive || false;

recursive = recursive === 'true' || recursive === true;
//#endregion

printFileData();

function printFileData() {
    let data = countAllLinesInDir();

    data.fileData.sort((a, b) => {
        return b.lines - a.lines;
    });

    let paddingLength = data.longestFile.length + 2 - path.length;

    data.fileData.forEach(file => {
        console.log(
            "\x1b[33m", // yellow
            `${file.file.replace(path, '').replace(/^[\/|\\|]/g, "")}`.padEnd(paddingLength),
            "\x1b[0m", // reset
            `${file.lines}`); // toString to force color
    });

    console.log(
        "\n\x1b[33m", // yellow
        `Total lines`.padEnd(paddingLength),
        "\x1b[0m", // reset
        `${data.totalLines}`);
}

function countAllLinesInDir() {
    let files = getFiles(path, recursive);
    let totalLines = 0;
    let fileData = [];
    let currentLongestFile = '';

    files.forEach(file => {
        let extension = file.split('.').pop();
        if (extensions.includes(extension)) {
            let lines = countLinesInFile(file);
            totalLines += lines;

            if (file.length > currentLongestFile.length) {
                currentLongestFile = file;
            }

            fileData.push({
                file: file,
                lines: lines
            });
        }
    });

    return {
        totalLines: totalLines,
        fileData: fileData,
        longestFile: currentLongestFile
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