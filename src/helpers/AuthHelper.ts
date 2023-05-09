import crypto, { BinaryToTextEncoding } from "crypto";



type HashType = "md5" | "sha1" | "sha256" | "sha224" | "sha512" | "sha384" | "sha3" | "ripemd160";

export default class AuthHelper {
  private hash_type: HashType = "sha256";
  private digest: BinaryToTextEncoding = "base64";
  
  /**
   * 
   * Метод хеширующий текст передаваемый в него
   * 
   * @param text - текст, который будет хешироваться
   * @returns hash типа string
   */
  public hash(text: string): string {
    return crypto.createHash(this.hash_type).digest(this.digest);  
  }

  /**
   * 
   * Метод проверяющий эквивалентность захешированного текста и параметра hash 
   * 
   * @param text - текст, который будет проверяться с hash-ем
   * @param hash - hash code
   * @returns true | false
   */
  public checkHash(text: string, hash: string): boolean {
    return crypto.createHash(this.hash_type).digest(this.digest) === hash;
  }
}