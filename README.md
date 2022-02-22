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
- `--extensions`: Specify the extension of the files to count, separated by commas. Defaults to `js,jsx,ts,tsx,json,md,yml,yaml,css,scss,less,html,htm,xml,txt,mdx`.
- `--recursive`: Count files recursively. Default: `false`
- `--path`: Specify the path to the directory to count. Default: `.`

### To Do
- Multi-extension support
- Exclude files or directories