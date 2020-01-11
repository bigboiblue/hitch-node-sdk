import axios from "axios";
import HitchEmitter from "./HitchEmitter";
import { FlagData } from "./FlagData";

export default class HitchInstance {
    private flags: Map<string, Partial<FlagData>>;
    private flagKeys: string[];
    private url: string;
    private hitchEmitter: HitchEmitter;

    constructor(
        url: string,
        private readonly groupName: string,
        // private readonly userID: string,
        // private pollingInterval: number,
    ) {
        this.flagKeys = [];

        this.url = url;
        /** Remove '/' at the end if it exists */
        if (this.url.substr(url.length - 1) === "/") {
            this.url = this.url.substr(0, this.url.length - 1);
        }

        this.url = `${this.url}/api/v1/flags?groupName=${this.groupName}&isArchived=false`;


        this.hitchEmitter = new HitchEmitter();

        this.fetchData();
    }

    async fetchData(): Promise<void> {
        const flags: FlagData[] = (await axios.get(this.url, { responseType: "json" })).data;

        let flagNames = flags.map((value) => value.name);
        let tempMap: Map<string, Partial<FlagData>> = new Map();
        let tempKeys = [];
        flags.forEach((value, index) => { tempMap.set(flagNames[index], value); tempKeys.push(flagNames[index]); });

        this.flags = tempMap;
        this.flagKeys = tempKeys;

        this.hitchEmitter.emit("ready");
    }

    isEnabled(flagName: string): boolean {
        return this.flags.get(this.flagKeys.find((key) => key.toUpperCase() === flagName.toUpperCase())).isEnabled;
    }

    async ready(): Promise<void> {
        await HitchEmitter.once(this.hitchEmitter, "ready");
    }
}
