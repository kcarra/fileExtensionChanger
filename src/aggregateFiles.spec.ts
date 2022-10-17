import { aggregateFiles } from "./aggregateFiles";
import { PromptState } from "./prompt";
import { temporaryDirectoryTask } from "tempy";

describe("aggregateFiles", () => {
  it("returns a list of files that match the file extension", async () => {
    await temporaryDirectoryTask((tempDir) => {
      console.log(tempDir);

      const mockPromptState: PromptState = {
        fileExtensionFrom: ".jsx",
        fileExtensionTo: ".tsx",
        isThreaded: false,
        numThreads: 0,
        promptStage: "threading",
        files: [],
      };

      expect(aggregateFiles(mockPromptState)).toEqual({
        ...mockPromptState,
        ...{ files: ["foo/bar/baz/index.jsx", "blah/blah/user.jsx"] },
      });
    });
  });
});
