
import { JWTSession } from "../../security/JWT/model/JWTSession";

const CryptoJS = require('crypto-js');
const Crypto = require('crypto');
const KEY_SIZE = 8
const ITERATIONS = 2048

export class AESTools {

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
            keySize: key.length,
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

    public encryptCrypto(data: String, key: String, salt: String, iv: String) {

        console.log("\nCryptoUtil : encrypt\n");
        console.log("key: " + key);
        let saltCrypto = salt;
        let keyCrypto = key;
        let keySecret = Crypto.pbkdf2Sync(keyCrypto, saltCrypto, 2048, 32, "sha1");
        let ivCrypto = iv;
        let algorithm = 'aes-256-cbc';

        console.log('\n ---- CRYPTO -----')
        console.log('iv: ' + ivCrypto)
        console.log('key: ' + keyCrypto)
        console.log('salt: ' + saltCrypto)
        console.log('cipherData: ' + data)
        console.log('secretKey: ' + keySecret)
        console.log('algorithm: ' + algorithm)
        console.log('\n ---- CRYPTO -----\n')

        var cipher = Crypto.createCipheriv(algorithm, keySecret, ivCrypto);
        var crypted = cipher.update(data, 'utf8', 'base64');
        crypted += cipher.final('base64');
        return crypted;
    }

    public decryptCrypto(data: String, token: JWTSession) {

        let saltCrypto = token.AESSalt;
        let keyCrypto = token.AESKey;
        let keySecret = Crypto.pbkdf2Sync(keyCrypto, saltCrypto, 2048, 32, "sha1");
        let ivCrypto = token.AESIV;
        let algorithm = 'aes-256-cbc';

        console.log("\nCryptoUtil : decrypt\n")
        console.log("token: " + JSON.stringify(token))
        console.log('\n ---- CRYPTO -----')
        console.log('iv: ' + ivCrypto)
        console.log('key: ' + keyCrypto)
        console.log('salt: ' + saltCrypto)
        console.log('cipherData: ' + data)
        console.log('secretKey: ' + keySecret)
        console.log('algorithm: ' + algorithm)
        console.log('\n ---- CRYPTO -----\n')

        var decipher = Crypto.createDecipheriv(algorithm, keySecret, ivCrypto);
        var dec = decipher.update(data, 'base64', 'utf8');
        dec += decipher.final('utf8');
        return JSON.parse(JSON.stringify(dec));
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