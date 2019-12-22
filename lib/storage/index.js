"use strict";

var _nodePersist = _interopRequireDefault(require("node-persist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initStorage = function initStorage() {
  var defaultStorage, config;
  return regeneratorRuntime.async(function initStorage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(makeInstance('./.@jibril-config'));

        case 2:
          defaultStorage = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(defaultStorage.values());

        case 6:
          config = _context.sent;

          if (config.length) {
            _context.next = 13;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(defaultStorage.set('@jibril-login', true));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(defaultStorage.set('@jibril-collections', []));

        case 12:
          return _context.abrupt("return", {
            firstTime: true,
            defaultStorage: defaultStorage
          });

        case 13:
          return _context.abrupt("return", {
            firstTime: false,
            defaultStorage: defaultStorage
          });

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 16]]);
};

var getCurrentCollectionStorage = function getCurrentCollectionStorage(defaultStorage) {
  var currentCollection;
  return regeneratorRuntime.async(function getCurrentCollectionStorage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(defaultStorage.get('@jibril-current-collection'));

        case 2:
          currentCollection = _context2.sent;
          return _context2.abrupt("return", makeInstance("./.@jibril-collection-".concat(currentCollection)));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var makeInstance = function makeInstance(dir) {
  var myStorage;
  return regeneratorRuntime.async(function makeInstance$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          myStorage = _nodePersist["default"].create({
            dir: dir
          });
          _context3.next = 3;
          return regeneratorRuntime.awrap(myStorage.init({
            dir: dir
          }));

        case 3:
          return _context3.abrupt("return", myStorage);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var searchStorage = function searchStorage(dir) {
  return regeneratorRuntime.async(function searchStorage$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_nodePersist["default"].init({
            dir: dir
          }));

        case 2:
          return _context4.abrupt("return", _nodePersist["default"]);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  initStorage: initStorage,
  makeInstance: makeInstance,
  getCurrentCollectionStorage: getCurrentCollectionStorage
};