import npm from "npm";

const mkPromise = <E, R>(
  wrappedFn: (callback: (err: E, result: R) => void) => void
): Promise<R> =>
  new Promise((resolve, reject) =>
    wrappedFn((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );

export interface NPMError {
  code: string;
  name: string;
  message: string;
  stack?: string;
}

type ViewCommandResult = Record<
  string,
  {
    versions: string[];
  }
>;

const viewCommand = async (...args: string[]): Promise<ViewCommandResult> => {
  await mkPromise((cb) => npm.load({}, cb));
  return mkPromise<Error | undefined, ViewCommandResult>((cb) =>
    npm.commands.view(args, cb)
  );
};

export const getPublishedVersions = async (pkg: string): Promise<string[]> => {
  try {
    const output = await viewCommand(pkg, "versions");
    const [latestVersion] = Object.keys(output);
    return output[latestVersion].versions;
  } catch (err) {
    if ((err as NPMError).code === "E404") {
      return [];
    } else {
      throw err;
    }
  }
};
