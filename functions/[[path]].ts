import { applyDefaultHostNoindex } from "../src/lib/indexing-policy.ts";

interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const response = await context.next();
  return applyDefaultHostNoindex(context.request, response);
}
