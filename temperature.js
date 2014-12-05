var SequentialDataReader = function(file, start, stop) {

  var fs = require('fs');
  var readline = require('readline');
  var stream = require('stream');

  var tabulate = function(line) {
    return line.trim().replace(/\s+/g, '\t');
  };

  var read = function(dataCb, doneCb) {
    var instream = fs.createReadStream(file);
    var outstream = new stream;

    var rl = readline.createInterface(instream, outstream);

    var lineNumber = 0;

    rl.on('line', function(line) {
      if (lineNumber >= start && lineNumber <= stop)
        dataCb(tabulate(line).split('\t'));
      lineNumber++;
    });

    rl.on('close', function() {
      doneCb();
    });
  };

  return {
    read: read
  };

};

var DataParser = function(dataReader) {
  var data = [],
    done;

  var parse = function(parseFunc, doneCb) {
    done = doneCb;
    dataReader.read(function(d) {
      data.push(parseFunc(d));
    }, parsingDone);
  };

  var parsingDone = function() {
    done(data);
  };

  return {
    parse: parse
  };
};

var _ = require('lodash');

var findLowestDecemberTemperature = function(data) {
  var combineDateFields = function(date) {
    return date.year + '' + date.month + '' + date.day;
  };
  var sortedTemps = data.filter(function(d) {
    return d.month === 12;
  }).sort(function(a, b) {
    return a.temp === b.temp ? (combineDateFields(a) > combineDateFields(b) ? 1 : -1) : (a.temp > b.temp ? 1 : -1);
  });

  console.log(_.first(sortedTemps));
};

var parser = new DataParser(new SequentialDataReader('./kilma_data_blindern.txt', 24, 23400));
parser.parse(function(data) {
  var date = data[1].split('.').map(function(s) {
    return parseInt(s);
  });

  return {
    day: date[0],
    month: date[1],
    year: date[2],
    temp: parseFloat(data[3].replace(',', '.'))
  };
}, function(data) {
  findLowestDecemberTemperature(data);
});