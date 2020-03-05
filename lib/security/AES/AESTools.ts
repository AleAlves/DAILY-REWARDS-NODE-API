
import { JWTSession } from "../../security/JWT/model/JWTSession";

const CryptoJS = require('crypto-js');
const KEY_SIZE = 8
const ITERATIONS = 2048

export class AESTools {

    public testBandindinho(key: String, chiperMessage: String, cleanMessage: String) {

        console.log('\n ---- CRYPTO TESTE IOS -----')

        console.log('\n KEY: ' + key)

        console.log('\n CHIPER MESSAGE: ' + chiperMessage)

        console.log('\n CLEAN MESSAGE: ' + cleanMessage)

        var encrypted = CryptoJS.AES.encrypt(cleanMessage, key);

        console.log('\n ENCRYPTED: ' + encrypted)

        var decrypted = CryptoJS.AES.decrypt(chiperMessage, key);

        console.log('\n DECRYPTED: ' + decrypted)

        return encrypted
    }

    public encrypt(data: String, key: String, salt: String, iv: String) {

        console.log("\nCryptoUtil : encrypt\n");
        console.log("key: " + key);

        salt = CryptoJS.enc.Utf8.parse(salt);
        iv = CryptoJS.enc.Base64.parse(iv);

        var keyBits = CryptoJS.PBKDF2(key, salt, {
            hasher: CryptoJS.algo.SHA1,
            keySize: KEY_SIZE,
            iterations: ITERATIONS
        });

        return CryptoJS.AES.encrypt(data, keyBits, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }).toString();
    }

    public decrypt(data: String, token: JWTSession) {

        console.log("\nCryptoUtil : decrypt\n")
        console.log("key: " + JSON.stringify(token))

        console.log('\n ---- CRYPTO -----')
        console.log('iv: ' + token.AESIV)
        console.log('key: ' + token.AESKey)
        console.log('salt: ' + token.AESSalt);
        console.log('cipherData: ' + data)
        console.log('\n ---- CRYPTO -----\n')

        let salt = CryptoJS.enc.Utf8.parse(token.AESSalt)
        let iv = CryptoJS.enc.Base64.parse(token.AESIV)
        let key = token.AESKey

        var keyBits = CryptoJS.PBKDF2(key, salt, {
            hasher: CryptoJS.algo.SHA1,
            keySize: KEY_SIZE,
            iterations: ITERATIONS
        });

        console.log('\n ---- CRYPTO -----')
        console.log('iv: ' + iv)
        console.log('key: ' + key)
        console.log('salt: ' + salt);
        console.log('cipherData: ' + data)
        console.log('\n ---- CRYPTO -----\n')

        return JSON.parse(JSON.stringify(CryptoJS.AES.decrypt(data, keyBits, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }).toString(CryptoJS.enc.Utf8).replace("\\", "")));
    }


    public test() {

        console.log('\nTest AES:\n');
        var salt = CryptoJS.enc.Utf8.parse("123456789123");
        var password = "123456789123";
        var text = "wow";
        var keyBits = CryptoJS.PBKDF2(password, salt, {
            hasher: CryptoJS.algo.SHA1,
            keySize: 8,
            iterations: 2048
        });

        var iv = CryptoJS.enc.Base64.parse('/fSsDxwE3PLP20qb/sD99g==');

        var encrypted = CryptoJS.AES.encrypt(text, keyBits, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        console.log('\n ---- CRYPTO -----');
        console.log('iv: ' + iv);
        console.log('key: ' + password);
        console.log('salt: ' + salt);
        console.log('cipherData: ' + encrypted);

        var decrypted = CryptoJS.AES.decrypt(encrypted, keyBits, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        console.log("\nDecrypted Hex: " + decrypted.toString(CryptoJS.enc.Hex));
        console.log("\nDecrypted utf-8: " + decrypted.toString(CryptoJS.enc.Utf8));
        console.log('\n ---- CRYPTO -----\n');
    }
}