
var nodemailer = require('nodemailer'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  config = require('../config/config'),
  mg = require('../config/lib/mongoose');

var transporter = nodemailer.createTransport(config.mailer.options);
var link = 'Link de alteração de senha aqui'; // PUT reset link here
var email = {
  from: config.mailer.from,
  subject: 'Atualização de Segurança'
};
var text = [
  'Caro(a) {{name}},',
  '\n',
  'Nós atualizamos nosso sistema de senhas para ser mais seguro, vá ao link abaixo para resetar sua senha para que possa acessar no futuro.',
  link,
  '\n',
  'Atenciosamente,',
  'Equipe de suporte ao usuário'
].join('\n');

mg.loadModels();

mg.connect(function (db) {
  'use strict';
  
  var User = mongoose.model('User');

  User.find().exec(function (err, users) {
    if (err) {
      throw err;
    }

    var processedCount = 0,
      errorCount = 0;

    // report and exit if no users were found
    if (users.length === 0) {
      return reportAndExit(processedCount, errorCount);
    }

    for (var i = 0; i < users.length; i++) {
      sendEmail(users[i]);
    }

    function sendEmail(user) {
      email.to = user.email;
      email.text = email.html = text.replace('{{name}}', user.displayName);

      transporter.sendMail(email, emailCallback(user));
    }

    function emailCallback(user) {
      return function (err, info) {
        processedCount++;

        if (err) {
          errorCount++;

          if (config.mailer.options.debug) {
            console.log('Error: ', err);
          }
          console.error('[' + processedCount + '/' + users.length + '] ' + chalk.red('Falha ao tentar enviar email para usuário ' + user.displayName));
        } else {
          console.log('[' + processedCount + '/' + users.length + '] enviado email para usuário ' + user.displayName);
        }

        if (processedCount === users.length) {
          return reportAndExit(processedCount, errorCount);
        }
      };
    }
    // report the processing results and exit
    function reportAndExit(processedCount, errorCount) {
      var successCount = processedCount - errorCount;

      if (processedCount === 0) {
        console.log(chalk.yellow('Nenhum usuário encontrado.'));
      } else {
        var alert;
        if (!errorCount) {
          alert = chalk.green;
        } else if ((successCount / processedCount) < 0.8) {
          alert = chalk.red;
        } else {
          alert = chalk.yellow;
        }

        console.log(alert('Enviados ' + successCount + ' emails de ' + processedCount + ' com sucesso!'));
      }

      process.exit(0);
    }
  });
});
