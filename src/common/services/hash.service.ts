import * as jsSHA from 'jssha';
import * as _ from 'lodash';

const defaultHashType = 'SHA3-256';

export class HashService {
  static hash(input: any, length = 32, type = defaultHashType) {
    if (_.isObject(input)) {
      input = JSON.stringify(input);
    }

    let shaObj = new jsSHA(type, 'TEXT');
    shaObj.update(input);
    return shaObj.getHash("HEX").substring(0, length);
  }
}
