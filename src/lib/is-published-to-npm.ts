import { getPublishedVersions } from "./npm";

export const isPublishedToNPM = async (
  pkg: string,
  version: string
): Promise<boolean> => {
  const remoteVersions = await getPublishedVersions(pkg);

  return remoteVersions.includes(version);
};
