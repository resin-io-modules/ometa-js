(function() {
  var BSMetaCoffeeParser, BSMetaCoffeeTranslator, ErrorHandler, MetaCoffee, requirejs;

  requirejs = require('requirejs');

  requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require
  });

  MetaCoffee = requirejs('./loader');

  ErrorHandler = requirejs('./errorhandler');

  BSMetaCoffeeParser = MetaCoffee.BSMetaCoffeeParser, BSMetaCoffeeTranslator = MetaCoffee.BSMetaCoffeeTranslator;

  MetaCoffee.OMLib.errorHandler = ErrorHandler;

  module.exports = {
    compileSource: function(sourceCode) {
      var message, result, tree, _ref;
      sourceCode = sourceCode.replace(/\r\n/g, '\n');
      try {
        tree = BSMetaCoffeeParser.matchAll(sourceCode, "topLevel", void 0, function(m, i) {
          var handled;
          handled = ErrorHandler.handle(m, i);
          throw new Error("Error at line: " + handled.lineNumber + "\n\n" + ErrorHandler.bottomErrorArrow(handled));
        });
        result = BSMetaCoffeeTranslator.matchAll(tree, "trans", void 0, function(m, i) {
          throw new Error("Translation error");
        });
      } catch (e) {
        message = (_ref = e.toString()) != null ? _ref : e;
        throw message;
      }
      return result;
    },
    OMeta: MetaCoffee.OMeta,
    OMLib: MetaCoffee.OMLib
  };

}).call(this);