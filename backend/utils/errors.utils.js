'use strict'

module.exports.signUpErrors = (err) => {
  let errors = { usrPseudo: "", usrMail: "", usrPasswd: "" };

  if (err.message.includes("usrPseudo"))
    errors.usrPseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("usrMail")) errors.usrMail = "Email incorrect";

  if (err.message.includes("usrPasswd"))
    errors.usrPasswd = "Le mot de passe doit faire 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("usrPseudo"))
    errors.usrPseudo = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("usrMail"))
    errors.usrMail = "Cet email est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { usrMail: '', usrPasswd: ''}

  if (err.message.includes("usrMail")) 
    errors.usrMail = "Email inconnu";
  
  if (err.message.includes('usrPasswd'))
    errors.usrPasswd = "Le mot de passe ne correspond pas"

  return errors;
}

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: ""};

  if (err.message.includes('invalid file'))
    errors.format = "Format incompatabile";

  if (err.message.includes('max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors
}

console.log('backend/utils/errors.utils.js 🚀');