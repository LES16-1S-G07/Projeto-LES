// Set the Node ENV
process.env.NODE_ENV = 'development';

var chalk = require('chalk'),
  mongoose = require('../config/lib/mongoose');

mongoose.loadModels();

var _indexToRemove = 'email_1',
  errors = [],
  processedCount = 0;

mongoose.connect(function (db) {
  'use strict';
  
  // get a reference to the User collection
  var userCollection = db.connections[0].collections.users;

  console.log("",chalk.yellow('Removing index "' +
    _indexToRemove + '" from the User collection.'));
  // Remove the index
  userCollection.dropIndex(_indexToRemove, function (err, result) {
    var message = 'Removido o index "' + _indexToRemove + '".';

    if (err) {
      errors.push(err);
      message = 'Ocorreu um erro ao tentar remover o index "' +
        _indexToRemove + '".';

      if (err.message.indexOf('index not found with name') !== -1) {
        message = 'Index "' + _indexToRemove + '" não pode ser encontrado.' +
          '\r\nFavor checar a id deste index no banco de dados mongodb ' +
          'mongodb User collection.';
      }

      reportAndExit(message);
    } else {
      reportAndExit(message);
    }
  });
});

function reportAndExit(message) {
  if (errors.length) {
    console.log(chalk.red(message));

    console.log(chalk.yellow("Errors:"));
    for (var i = 0; i < errors.length; i++) {
      console.log(chalk.red(errors[i]));

      if (i === errors.length -1) {
        process.exit(0);
      }
    }
  } else {
    console.log(chalk.green(message));
    console.log(chalk.green('Na proxima vez que o app iniciar, ' +
      'Mongoose vai reconstruir o index "' + _indexToRemove + '".'));
    process.exit(0);
  }
}
