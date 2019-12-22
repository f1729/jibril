"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chalk = require('chalk');

var _require = require('../questions'),
    askForAWord = _require.askForAWord,
    askForADescription = _require.askForADescription,
    askForACollectionName = _require.askForACollectionName;

var log = function log(message) {
  return console.log("\n ".concat(message));
};

var addWord = function addWord(currentStorage) {
  var _ref, word, _ref2, description;

  return regeneratorRuntime.async(function addWord$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(askForAWord());

        case 2:
          _ref = _context.sent;
          word = _ref.word;
          _context.next = 6;
          return regeneratorRuntime.awrap(askForADescription());

        case 6:
          _ref2 = _context.sent;
          description = _ref2.description;
          _context.next = 10;
          return regeneratorRuntime.awrap(currentStorage.init());

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(currentStorage.set(word, {
            description: description,
            phase: 1
          }));

        case 12:
          log("".concat(chalk.green(word), " was added correctly \u2728")); // return { word, description }

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

var deleteWord = function deleteWord(storage) {
  var _ref3, word;

  return regeneratorRuntime.async(function deleteWord$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(askForAWord());

        case 2:
          _ref3 = _context2.sent;
          word = _ref3.word;

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var test = function test(data, currentStorage) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, datum, _ref4, description;

  return regeneratorRuntime.async(function test$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(currentStorage.init());

        case 2:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 5;
          _iterator = data[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 26;
            break;
          }

          datum = _step.value;
          log("\uD83D\uDCDD ".concat(chalk.underline(datum.key), " \n"));
          _context3.next = 12;
          return regeneratorRuntime.awrap(askForADescription());

        case 12:
          _ref4 = _context3.sent;
          description = _ref4.description;

          if (!(description === datum.value.description)) {
            _context3.next = 20;
            break;
          }

          log("".concat(chalk.green('Nice you are right!'), " \uD83D\uDE0E"));
          _context3.next = 18;
          return regeneratorRuntime.awrap(currentStorage.set(datum.key, _objectSpread({}, datum.value, {
            phase: datum.value.phase === 3 ? 3 : datum.value.phase + 1,
            phaseDate: new Date()
          })));

        case 18:
          _context3.next = 23;
          break;

        case 20:
          log("You are wrong, the answer is: ".concat(chalk.magenta(datum.value.description), " \uD83D\uDE1E"));
          _context3.next = 23;
          return regeneratorRuntime.awrap(currentStorage.set(datum.key, {
            description: description,
            phase: 1
          }));

        case 23:
          _iteratorNormalCompletion = true;
          _context3.next = 7;
          break;

        case 26:
          _context3.next = 32;
          break;

        case 28:
          _context3.prev = 28;
          _context3.t0 = _context3["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 32:
          _context3.prev = 32;
          _context3.prev = 33;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 35:
          _context3.prev = 35;

          if (!_didIteratorError) {
            _context3.next = 38;
            break;
          }

          throw _iteratorError;

        case 38:
          return _context3.finish(35);

        case 39:
          return _context3.finish(32);

        case 40:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 28, 32, 40], [33,, 35, 39]]);
};

var autoTest = function autoTest(storage) {
  var getWordsForToday, data;
  return regeneratorRuntime.async(function autoTest$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          getWordsForToday = function getWordsForToday(storage) {
            var items, data, weeksUntilNow, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, i, weeks;

            return regeneratorRuntime.async(function getWordsForToday$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    items = [];
                    _context4.next = 3;
                    return regeneratorRuntime.awrap(storage.data());

                  case 3:
                    data = _context4.sent;

                    weeksUntilNow = function weeksUntilNow(date) {
                      return Math.round((new Date() - date) / 604800000);
                    };

                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context4.prev = 8;

                    for (_iterator2 = data[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      i = _step2.value;
                      weeks = weeksUntilNow(i.value.phaseDate);

                      if (weeks === i.value.phase || i.value.phase === 1) {
                        items.push(i);
                      }
                    }

                    _context4.next = 16;
                    break;

                  case 12:
                    _context4.prev = 12;
                    _context4.t0 = _context4["catch"](8);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context4.t0;

                  case 16:
                    _context4.prev = 16;
                    _context4.prev = 17;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 19:
                    _context4.prev = 19;

                    if (!_didIteratorError2) {
                      _context4.next = 22;
                      break;
                    }

                    throw _iteratorError2;

                  case 22:
                    return _context4.finish(19);

                  case 23:
                    return _context4.finish(16);

                  case 24:
                    return _context4.abrupt("return", items);

                  case 25:
                  case "end":
                    return _context4.stop();
                }
              }
            }, null, null, [[8, 12, 16, 24], [17,, 19, 23]]);
          };

          _context5.next = 3;
          return regeneratorRuntime.awrap(getWordsForToday(storage));

        case 3:
          data = _context5.sent;

          if (data.length) {
            test(data, storage);
          } else {
            log("".concat(chalk.yellow('Wait me a short time, for now u dont have to remember nothing'), " \uD83D\uDE0F"));
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var addCollection = function addCollection(defaultStorage) {
  var _ref5, collectionName, collection;

  return regeneratorRuntime.async(function addCollection$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(askForACollectionName());

        case 2:
          _ref5 = _context6.sent;
          collectionName = _ref5.collection;
          _context6.next = 6;
          return regeneratorRuntime.awrap(defaultStorage.get('@jibril-collections'));

        case 6:
          collection = _context6.sent;

          if (!collection.includes(collectionName)) {
            _context6.next = 10;
            break;
          }

          log("Oh no! This collection ".concat(chalk.red(collectionName), " do exist! \uD83E\uDD14\uD83D\uDE33\uD83E\uDD14\uD83E\uDD14, try again!"));
          return _context6.abrupt("return");

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(defaultStorage.set('@jibril-collections', [].concat(_toConsumableArray(collection), [collectionName])));

        case 12:
          _context6.next = 14;
          return regeneratorRuntime.awrap(defaultStorage.set('@jibril-current-collection', collectionName));

        case 14:
          log("Nice! You are been created the ".concat(chalk.green(collectionName), " collection \uD83D\uDE04"));

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  });
};

module.exports = {
  addCollection: addCollection,
  addWord: addWord,
  autoTest: autoTest,
  deleteWord: deleteWord,
  test: test
};