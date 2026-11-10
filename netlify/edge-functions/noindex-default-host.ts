import { applyDefaultHostNoindex } from "../../src/lib/indexing-policy.ts";

export default async function noindexDefaultHost(
  request: Request,
  context: { next: () => Promise<Response> },
): Promise<Response> {
  const response = await context.next();
  return applyDefaultHostNoindex(request, response);
}

export const config = { path: "/*" };
