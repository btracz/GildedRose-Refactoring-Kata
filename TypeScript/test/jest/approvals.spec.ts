import { GildedRose } from "../../app/gilded-rose";
import { StandardItem } from "../../app/types/standard-item";

describe("Gilded Rose Approval", () => {
  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[];

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += "\n";
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = "";
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it("should build a foo item and decrease sellIn by one but not quality", () => {
    const gildedRose = new GildedRose([new StandardItem("foo", 0, 0)]);
    const items = gildedRose.updateQuality();

    expect(items).toMatchSnapshot();
  });

  it("should run properly during thirty days", () => {
    process.argv = ["<node>", "<script", "30"];
    require("../golden-master-text-test.ts");

    expect(gameConsoleOutput).toMatchSnapshot();
  });
});
