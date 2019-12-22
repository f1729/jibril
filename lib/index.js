"use strict";

var program = require('commander');

var _require = require('./storage'),
    initStorage = _require.initStorage,
    getCurrentCollectionStorage = _require.getCurrentCollectionStorage;

var _require2 = require('./actions'),
    addCollection = _require2.addCollection,
    addWord = _require2.addWord,
    deleteWord = _require2.deleteWord,
    autoTest = _require2.autoTest;

program.version('0.0.1').option('--test [?collection]', 'Test your memory').option('--add [word] [description]', 'For add a word').option('--delete [word]', 'For delete a word').option('--add-collection [WIP]', 'Flag in progress').parse(process.argv);

var init = function init() {
  var _ref, firstTime, defaultStorage, currentCollectionStorage;

  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(initStorage());

        case 2:
          _ref = _context.sent;
          firstTime = _ref.firstTime;
          defaultStorage = _ref.defaultStorage;

          if (!firstTime) {
            _context.next = 8;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(addCollection(defaultStorage));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(getCurrentCollectionStorage(defaultStorage));

        case 10:
          currentCollectionStorage = _context.sent;

          if (program.add) {
            addWord(currentCollectionStorage);
          }

          if (program["delete"]) {
            deleteWord(currentCollectionStorage);
          }

          if (program.test) {
            autoTest(currentCollectionStorage);
          }

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
};

init();