function returnCleanUsername(username){
    clean = username.replace(/\s/g, '');
    clean = clean.replace(/[^\w\s]/gi, '');
    console.log(clean);
    return clean;
}

exports.returnCleanUsername = returnCleanUsername;
