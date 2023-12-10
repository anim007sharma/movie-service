import { v4 as uuidv4 } from "uuid";

class CommonUtils {
  public static uuid(prefix: string) {
    const uuid = uuidv4().split("-").join("");
    return `${prefix}${uuid}`;
  }
}

export default CommonUtils