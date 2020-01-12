"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _HitchEmitter = _interopRequireDefault(require("./HitchEmitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitchInstance {
  constructor(url, groupName) // private readonly userID: string,
  // private pollingInterval: number,
  {
    this.groupName = groupName;
    this.flagKeys = [];
    this.url = new URL(`/api/v1/flags?groupName=${this.groupName}&isArchived=false`, url);
    this.url.port = "28191";
    this.hitchEmitter = new _HitchEmitter.default();
    this.fetchData();
  }

  async fetchData() {
    const flags = (await _axios.default.get(this.url.toString(), {
      responseType: "json"
    })).data;
    let flagNames = flags.map(value => value.name);
    let tempMap = new Map();
    let tempKeys = [];
    flags.forEach((value, index) => {
      tempMap.set(flagNames[index], value);
      tempKeys.push(flagNames[index]);
    });
    this.flags = tempMap;
    this.flagKeys = tempKeys;
    this.hitchEmitter.emit("ready");
  }

  isEnabled(flagName) {
    return this.flags.get(this.flagKeys.find(key => key.toUpperCase() === flagName.toUpperCase())).isEnabled;
  }

  async ready() {
    await _HitchEmitter.default.once(this.hitchEmitter, "ready");
  }

}

exports.default = HitchInstance;

//# sourceMappingURL=HitchInstance.js.map