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
- `--extension`: Specify the extension of the files to count. Default: `.js`
- `--recursive`: Count files recursively. Default: `false`
- `--path`: Specify the path to the directory to count. Default: `.`

### To Do
- Multi-extension support
- Exclude files or directories