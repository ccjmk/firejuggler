import Config from "../domain/Config";

export function getConfig(): Config {
    const fs = require('fs');
    let config: Config;
    try {
        const rawData = fs.readFileSync('./config.json');
        config = JSON.parse(rawData);
    } catch (error) {
        throw new Error("Unable to properly parse configuration file. Make sure you have a config.json file on the app root folder and that it's a valid json.");
    }
    return config;
}

export function getFoundryPid(foundryAppBasePath: string): number | undefined {
    const { execSync } = require("child_process");
    //var isWin = process.platform === "win32";
    // if (isWin) {
    //     return 123; // FIXME how to do this on windows?!
    // } else {
    //     return execSync(`pgrep -f ${foundryAppBasePath}/resources/app/main.js`).toString().split('\n').filter(Boolean).map(Number);
    // }

    try {
        return execSync(`pgrep -f ${foundryAppBasePath}/resources/app/main.js`).toString().split('\n').filter(Boolean).map(Number);
    } catch (error) {
        return;
    }
}