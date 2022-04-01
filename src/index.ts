/**
 * Generic Enum base class
 * @example
 * Declare :
 *    export class TransportType extends Enum {
 *      static inTransit = new TransportType('1', 'Preparing')
 *      static waitReceiving = new TransportType('2', 'Receiving')
 *      static received = new TransportType('3', 'Received')
 *      static errorHandling = new TransportType('4', 'Error')
 *      static _ = TransportType.closeEnum()
 *      constructor(value: string, label: string) {
 *        super()
 *        this.value = value
 *        this.label = label
 *      }
 *    }
 * @example
 * Usage :
 *    const TransportType = TransportType.of<TransportType>(1) // convert value to enum instance
 *    const options = TransportType.options() // get {value, label} options
 *    TransportType.inTransit.label // get label
 *    TransportType.inTransit.value // get value
 */
export default class Enum {
  public static keys: string[];
  public static values: Enum[];

  /**
   * call this function after declare all staic enum variable
   */
  public static closeEnum() {
    const enumKeys: string[] = [];
    const enumValues: Enum[] = [];
    for (const [key, value] of Object.entries(this)) {
      enumKeys.push(key);

      value.key = key;
      value.index = enumValues.length;
      enumValues.push(value);
    }

    this.keys = enumKeys;
    this.values = enumValues;
  }

  /**
   * convert raw enum name to enum instance
   * @param key key(name) of enum member
   */
  public static ofKey<T extends Enum>(key: string): T | undefined {
    const index = this.keys.indexOf(key);
    if (index >= 0) {
      return this.values[index] as T;
    }
    return undefined;
  }

  /**
   * convert raw enum value to enum instance
   * @param value value of enum member
   */
  public static of<T extends Enum>(value: string): T | undefined {
    const findEnum = this.values.find((v) => String(v.value) === String(value));
    return findEnum as T;
  }

  /**
   * get { label, value } array
   */
  public static options() {
    return this.values.map((v) => ({ label: v.label, value: v.value }));
  }

  public key!: string;
  public index!: number;
  public value!: string;
  public label = "";

  public toString() {
    return (
      this.constructor.name +
      "." +
      this.key +
      "=" +
      `${this.label} : ${this.value}`
    );
  }
}
