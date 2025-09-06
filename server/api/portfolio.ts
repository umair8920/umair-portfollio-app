// server/api/portfolio.api.ts
import { defineEventHandler, getQuery, readBody } from "h3";
import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/portfolio.controller";

export default defineEventHandler(async (event) => {
  const { resource, id } = getQuery(event) as { resource?: string; id?: string };
  const method = event.node.req.method || "GET";

  try {
    // Basic request logging for debugging
    console.log("[portfolio.api] request", { resource, id, method });
    // ---- USER PROFILE ----
    if (resource === "profile") {
      if (method === "GET") return await getProfile();

      if (method === "POST") {
        const body = await readBody(event);
        return await createProfile(body);
      }

      if (method === "PUT") {
        const body = await readBody(event);
        return await updateProfile(body);
      }

      if (method === "DELETE") {
        return await deleteProfile();
      }
    }

    // ---- PROJECTS ----
    if (resource === "projects") {
      if (method === "GET") {
        if (id) return await getProject(Number(id));
        return await listProjects();
      }

      if (method === "POST") {
        const body = await readBody(event);
        return await createProject(body);
      }

      if (method === "PUT") {
        if (!id) throw new Error("Project id is required for update");
        const body = await readBody(event);
        return await updateProject(Number(id), body);
      }

      if (method === "DELETE") {
        if (!id) throw new Error("Project id is required for delete");
        return await deleteProject(Number(id));
      }
    }

    console.warn("[portfolio.api] invalid route or method", { resource, id, method });
    return { error: "Invalid resource or method. Use resource=profile|projects and proper method." };
  } catch (err: any) {
    console.error("[portfolio.api] error", err);
    return { error: err.message || "Internal error" };
  }
});
