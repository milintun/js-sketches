import { Dict, List } from './util.js';


export class Table {
  headers = null;
  rows = null;
  columnCount;
  // types = [ ];

  constructor() {
    if (arguments.length > 0) {
      this.init(...arguments);
    }
  }

  init() {
    let hasHeader = false;
    let useNames = false;
    let allStrings = false;
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i] == 'header') {
        hasHeader = true;
      } else if (arguments[i] == 'names') {
        useNames = true;
      } else if (arguments[i] == 'strings') {
        allStrings = true;
      }
    }

    // faster to have these reversed so we can use pop() to get the next entry
    let content = arguments[0];
    // perhaps this should not actuall be hasOwn(), since 'bytes' may be inherited?
    if (Object.hasOwn(content, 'bytes')) {
      // bytes from loadBytes()
      content = new TextDecoder().decode(content.bytes);
    }
    // if (typeof(content) == 'object')
    // new TextDecoder().decode(uint8array);
    const CRLF = '\r\n';
    let lineSeparator = content.indexOf(CRLF) == -1 ? '\n' : CRLF;
    let lines = content.split(lineSeparator);
    if (lines[lines.length-1].length == 0) {
      lines.length = lines.length - 1;  // remove the last empty line
    }
    lines.reverse();  // more efficient to pop()
    let csl = new CommaSeparatedLine(allStrings == false);

    let parsed = [ ];  // what we're constructing
    while (lines.length > 0) {
      parsed.push(csl.handle(lines));
    }

    if (hasHeader) {
      this.headers = parsed[0];
      // let headerCount = this.headers.length;
      let rowCount = parsed.length - 1;
      this.rows = new Array(rowCount);
      if (useNames) {
        // can only index by name if we have a column name
        this.columnCount = this.headers.length;  //headerCount;
        for (let i = 0; i < rowCount; i++) {
          let pieces = parsed[i+1];
          let outgoing = { };
          for (let j = 0; j < Math.min(this.columnCount, pieces.length); j++) {
            let key = (j < this.columnCount) ? this.headers[j] : String(j);
            // using empty string to go easy on beginners;
            // have a separate method to convert empty to null if that's wanted
            outgoing[key] = (j < pieces.length) ? pieces[j] : '';
          }
          this.rows[i] = outgoing;
        }
      }
    } else {
      let rowCount = parsed.length;
      // make sure all rows are the same length
      for (let row = 0; row < rowCount; row++) {
        let colCount = parsed[row].length;
        if (colCount < this.columnCount) {
          // for (let i = colCount; i < this.columnCount; i++) {
            // parsed[row].push('');
          // }
          const extra = new Array(this.columnCount - colCount).fill('');
          parsed[row].push(...extra);
        }
      }
      this.rows = parsed;
    }
  }


  getRowCount() {
    return this.rows.length;
  }


  setRowCount(newCount) {
    let rowCount = this.getRowCount();
    if (newCount < rowCount) {
      this.rows.length = newCount;
    } else {
      for (let i = 0; i < newCount - rowCount; i++) {
        this.rows.push(new Array(this.columnCount).fill(''));
      }
    }
  }


  /*
  setNumberColumn(col) {
    // TODO check whether 'which' is a valid column
    this.rows.forEach(row => {
      row[col] = Number(row[col]);
    });
  }
  */


  getRows() {
    return this.rows;
  }


  getColumn(col) {
    const count = this.getRowCount();
    let outgoing = new Array(count);
    for (let i = 0; i < count; i++) {
      outgoing[i] = this.rows[i][col];
    }
    return new List(outgoing);
  }


  // TODO maybe have this return an array? upside? downside?
  // use array: more familiar (not many know Set)
  // use set: array convert is extra work, useful oppo to learn Set,
  //          nicer Set methods (has), forEach() and others still work
  getUnique(col) {
    let outgoing = new Set();
    const count = this.getRowCount();
    for (let i = 0; i < count; i++) {
      outgoing.add(this.rows[i][col]);
    }
    // return outgoing;
    return new List(Array.from(outgoing));
  }


  getTally(col) {
    let outgoing = { };
    const count = this.getRowCount();
    for (let i = 0; i < count; i++) {
      const value = this.rows[i][col];
      if (Object.hasOwn(outgoing, value)) {
        outgoing[value] += 1;
      } else {
        outgoing[value] = 1;
      }
    }
    // return outgoing;
    return new Dict(outgoing);
  }


  /*
  setColumnType(col, flavor) {
    if (flavor == 'int') {
      for (let row = 0; row < this.getRowCount(); row++) {
        this.rows[row][col] = parseInt(this.rows[row][col]);
      }

    } else if (flavor == 'float') {
      for (let row = 0; row < this.getRowCount(); row++) {
        this.rows[row][col] = parseFloat(this.rows[row][col]);
      }
    }
  }
  */


  /*
  getNum(col, row) {
    let value = this.rows[row][col];
    if (typeof(value) !== 'number') {
      return Number(value);
    }
    return value;
  }
  */


  findRow(seeking, column) {
    let index = this.findRowIndex(seeking, column);
    return index == -1 ? null : this.rows[index];

    /*
    // let index = this.findRowIndex(seeking, column);
    // console.log(index);
    // console.log(this.headers);
    // return this.rows[this.findRowIndex(seeking, column)];
    for (let row = 0; row < this.getRowCount(); row++) {
      if (this.rows[row][column] === seeking) {
        // return this.rows[row][column];
        return this.rows[row];
      }
    }
    */
  }


  findRows(seeking, column) {
    let outgoing = [ ];
    for (let row = 0; row < this.getRowCount(); row++) {
      if (this.rows[row][column] === seeking) {
        outgoing.push(this.rows[row]);
      }
    }
    return outgoing;
  }


  findRowIndex(seeking, column) {
    // if (typeof(column) != 'number') {
    //   column = this.headers.indexOf(column);  // look up by name
    // }
    for (let row = 0; row < this.getRowCount(); row++) {
      if (this.rows[row][column] === seeking) {
        return row;
      }
    }
    return -1;
  }


  /*
  // can just loop…
  setNumberColumns() {
    for (let i = 0; i < arguments.length; i++) {
      this.setNumberColumn(arguments[i]);
    }
  }
  */
}


class CommaSeparatedLine {
  autoParse;
  columnCount = 0;

  c;  //char[] c;
  pieces;  //String[] pieces;
  pieceCount; //int pieceCount;
  start;  // int

  constructor(autoParse) {
    if (autoParse) {
      this.autoParse = true;
    }
  }

  // pass in all remaining lines because there may be newlines inside quotes
  handle(lines) {
    let line = lines.pop();
    this.start = 0;
    this.pieceCount = 0;
    // c = line.toCharArray();
    // c = line.split('');  // wrong, won't decompose properly
    this.c = [ ...line ];  // https://stackoverflow.com/a/34717402

    // get tally of number of columns and allocate the array
    let cols = 1;  // the first comma indicates the second column
    let quote = false;
    for (let i = 0; i < this.c.length; i++) {
      if (!quote && (this.c[i] == ',')) {
        cols++;
      } else if (this.c[i] == '"') {
        // double double quotes (escaped quotes like "") will simply toggle
        // this back and forth, so it should remain accurate
        quote = !quote;
      }
    }
    // pieces = new String[cols];
    this.pieces = new Array(cols);

    while (this.start < this.c.length) {
      let enough = this.ingest();  // boolean
      while (!enough) {
        // found a newline inside the quote, grab another line
        if (lines.length == 0) {
          throw new Error("Found a quoted line that wasn't terminated properly.");
        }
        // push this line concatenated back onto the stack and re-parse
        lines.push(line + '\n' + lines.pop());
        return this.handle(lines);
      }
    }

    if (this.autoParse) {
      for (let i = 0; i < this.pieceCount; i++) {
        if (this.pieces[i].length > 0) {  // Number('') is unfortunately 0
          let value = Number(this.pieces[i]);
          if (value === value) {  // or use isNan() or… ?
            this.pieces[i] = value;  // replace with number
          }
        }
      }
    }

    // Update the column count if we've found more columns
    if (this.pieces.length > this.columnCount) {
      this.columnCount = this.pieces.length;
    }

    // Make any remaining entries blanks instead of nulls. Empty columns from
    // CSV are always "" not null, so this handles successive commas in a line
    // for (let i = this.pieceCount; i < this.pieces.length; i++) {
    for (let i = this.pieceCount; i < this.columnCount; i++) {
      this.pieces[i] = '';
    }
    return this.pieces;
  }

  // protected void addPiece(int start, int stop, boolean quotes) {
  addPiece(start, stop, quotes) {
    if (quotes) {
      let dest = start;  // int
      for (let i = start; i < stop; i++) {
        if (this.c[i] == '"') {
          ++i;  // step over the quote
        }
        if (i != dest) {
          this.c[dest] = this.c[i];
        }
        dest++;
      }
      // pieces[pieceCount++] = new String(c, start, dest - start);
      this.pieces[this.pieceCount++] = this.c.slice(start, dest).join('');

    } else {
      // pieces[pieceCount++] = new String(c, start, stop - start);
      this.pieces[this.pieceCount++] = this.c.slice(start, stop).join('');
    }
  }

  ingest() {  // boolean
    let hasEscapedQuotes = false;
    let quoted = this.c[this.start] == '"';
    if (quoted) {
      this.start++; // step over the quote
    }
    let i = this.start;
    while (i < this.c.length) {
      if (this.c[i] == '"') {
        // if this fella started with a quote
        if (quoted) {
          if (i == this.c.length-1) {
            // closing quote for field; last field on the line
            this.addPiece(this.start, i, hasEscapedQuotes);
            this.start = this.c.length;
            return true;

          } else if (this.c[i+1] == '"') {
            // an escaped quote inside a quoted field, step over it
            hasEscapedQuotes = true;
            i += 2;

          } else if (this.c[i+1] == ',') {
            // that was our closing quote, get outta here
            this.addPiece(this.start, i, hasEscapedQuotes);
            this.start = i+2;
            return true;

          } else {
            // This is a lone-wolf quote, occasionally seen in exports.
            // It's a single quote in the middle of some other text,
            // and not escaped properly. Pray for the best!
            i++;
          }

        } else {  // not a quoted line
          if (i == this.c.length-1) {
            // we're at the end of the line, can't have an unescaped quote
            throw new Error("Unterminated quote at end of line");

          } else if (this.c[i+1] == '"') {
            // step over this crummy quote escape
            hasEscapedQuotes = true;
            i += 2;

          } else {
            throw new Error("Unterminated quoted field mid-line");
          }
        }
      } else if (!quoted && this.c[i] == ',') {
        this.addPiece(this.start, i, hasEscapedQuotes);
        this.start = i+1;
        return true;

      } else if (!quoted && i == this.c.length-1) {
        this.addPiece(this.start, this.c.length, hasEscapedQuotes);
        this.start = this.c.length;
        return true;

      } else {  // nothing all that interesting
        i++;
      }
    }

    // if still inside a quote, indicate that another line should be read
    if (quoted) {
      return false;
    }

    // should not be possible
    throw new Error("Internal error during parse. Oops.");
  }
}