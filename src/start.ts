import { createMiddleware, createStart } from "@tanstack/react-start";
import { applyDefaultHostNoindex } from "@/lib/indexing-policy";

const defaultHostNoindex = createMiddleware().server(
  async ({ next, request }) => {
    const result = await next();

    if (result.response instanceof Response) {
      return {
        ...result,
        response: applyDefaultHostNoindex(request, result.response),
      };
    }

    return result;
  },
);

export const startInstance = createStart(() => ({
  requestMiddleware: [defaultHostNoindex],
}));
