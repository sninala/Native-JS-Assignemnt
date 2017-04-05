// - http://www.codewars.com/kata/can-you-keep-a-secret

function createSecretHolder(secret) {
    var obj = {
        getSecret: function () {
            return secret;
        },
        setSecret: function (value) {
            secret = value;
        }
    };
    return obj
}