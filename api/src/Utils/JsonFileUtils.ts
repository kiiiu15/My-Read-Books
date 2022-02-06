import fs from "fs";
export class JsonFileUtils {
    private static intance: JsonFileUtils;

    public static getIntance(): JsonFileUtils {
        if (!this.intance) {
            this.intance = new JsonFileUtils();
        }
        return this.intance;
    }

    private constructor() { }

    public readFile(path: string): Promise<string> {
        return new Promise(function (res, rej) {
            fs.readFile(path, function (err, data) {
                if (err) {
                    rej(err);
                }
                res((data)? data.toString(): "[]");
            });
        });
    }


    public writeFile(path: string, data: string): Promise<boolean> {
        return new Promise((res, rej) => {
            fs.writeFile(path, data, function (err) {
                (!err) ? res(true) : rej(err);
            });
        });
    }

}