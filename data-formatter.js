function returnCleanUsername(username){
    clean = username.replace(/\s/g, '');
    clean = clean.replace(/[^\w\s]/gi, '');
    return clean;
}

exports.returnCleanUsername = returnCleanUsername;
