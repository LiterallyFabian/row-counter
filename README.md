# row-counter
    
Node script to count total lines of code in a directory.

## Usage

```bash
$ git clone https://github.com/LiterallyFabian/row-counter.git
$ cd row-counter
$ npm install
$ node index.js
```

#### Flags 
- `--extensions` (`e`): Specify the extension of the files to count, separated by commas. Default: `js,jsx,ts,tsx,json,md,yml,yaml,css,scss,less,html,htm,xml,txt,mdx`.
- `--recursive` (`r`): Count files recursively. Default: `false`
- `--path` (`p`): Specify the path to the directory to count. Default: `.`
- `--ignore` (`i`): Specify directory names to exclude from the count, separated by commas. Default: `node_modules`