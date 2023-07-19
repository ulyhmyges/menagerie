import * as crypto from "crypto";

export class SecurityUtils {

    static toSHA512(pwd: string) {
        const hash = crypto.createHash('sha512');
        hash.update(pwd);
        return hash.digest('hex');
    }
}