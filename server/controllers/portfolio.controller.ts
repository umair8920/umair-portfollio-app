// server/controller/portfolio.controller.ts
import { UserProfile, Project } from "../models/models";

const getInitials = (name: string) => {
  const parts = (name || "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
  return (first + last).toUpperCase().slice(0, 2);
};

// Normalize incoming payload from client to match DB column names
const normalizeProfileInput = (data: Partial<UserProfile>): any => {
  const payload: any = { ...(data as any) };

  // map aliases
  if (payload.email && !payload.gmail) payload.gmail = String(payload.email).trim();
  if (payload.phone && !payload.phone_number) payload.phone_number = String(payload.phone).trim();

  // trim key strings if present
  if (payload.hero_name) payload.hero_name = String(payload.hero_name).trim();
  if (payload.hero_role) payload.hero_role = String(payload.hero_role).trim();
  if (payload.hero_description) payload.hero_description = String(payload.hero_description).trim();
  if (payload.linkedin) payload.linkedin = String(payload.linkedin).trim();
  if (payload.github) payload.github = String(payload.github).trim();
  if (payload.work_location) payload.work_location = String(payload.work_location).trim();
  if (payload.profile_image) payload.profile_image = String(payload.profile_image).trim();

  return payload;
};

/* ===========================
 * USER PROFILE (single row)
 * =========================== */

export const getProfile = async () => {
  // First/only profile
  return UserProfile.findOne({ order: [["id", "ASC"]] });
};

export const getProfileWithProjects = async () => {
  return UserProfile.findOne({
    order: [["id", "ASC"]],
    include: [{ model: Project, as: "projects" }],
  });
};

export const createProfile = async (data: Partial<UserProfile>) => {
  const exists = await UserProfile.count();
  if (exists > 0) {
    throw new Error("Profile already exists. Use update instead.");
  }

  const payload: any = normalizeProfileInput(data);
  if (!payload.login_initials && payload.hero_name) {
    payload.login_initials = getInitials(payload.hero_name);
  }
  return UserProfile.create(payload);
};

export const updateProfile = async (data: Partial<UserProfile>) => {
  const profile = await UserProfile.findOne({ order: [["id", "ASC"]] });
  if (!profile) throw new Error("No profile found. Create one first.");

  const payload: any = normalizeProfileInput(data);
  // Derive initials if not provided but name changed/provided
  if ((!payload.login_initials || payload.login_initials.trim() === "") && payload.hero_name) {
    payload.login_initials = getInitials(payload.hero_name);
  }

  await profile.update(payload);
  return profile;
};

export const deleteProfile = async () => {
  // Delete ONLY the existing single profile; DB will cascade projects if FK is set (onDelete: 'CASCADE')
  const profile = await UserProfile.findOne({ order: [["id", "ASC"]] });
  if (!profile) return { deleted: 0 };
  const deleted = await UserProfile.destroy({ where: { id: profile.id } });
  return { deleted };
};

/* ===========================
 * PROJECTS (multiple rows)
 * =========================== */

export const listProjects = async () => {
  // Return projects for the current (single) profile
  const profile = await UserProfile.findOne({ order: [["id", "ASC"]] });
  if (!profile) return [];
  return Project.findAll({
    where: { user_profile_id: profile.id },
    order: [["createdAt", "DESC"]],
  });
};

export const getProject = async (id: number) => {
  const project = await Project.findByPk(id);
  if (!project) throw new Error("Project not found");
  return project;
};

export const createProject = async (data: Partial<Project>) => {
  const profile = await UserProfile.findOne({ order: [["id", "ASC"]] });
  if (!profile) throw new Error("Create profile first.");

  // Ensure skills is an array (of strings)
  if (data.skills && !Array.isArray(data.skills)) {
    throw new Error("project-skills must be an array of strings");
  }

  const payload: any = {
    user_profile_id: profile.id,
    title: data.title,
    description: data.description,
    skills: data.skills || [],
    link: data.link ?? null,
    repo: data.repo ?? null,
    image_path: data.image_path ?? null,
  };

  return Project.create(payload);
};

export const updateProject = async (id: number, data: Partial<Project>) => {
  const project = await Project.findByPk(id);
  if (!project) throw new Error("Project not found");

  if (data.skills && !Array.isArray(data.skills)) {
    throw new Error("project-skills must be an array of strings");
  }

  const payload: any = { ...data };
  await project.update(payload);
  return project;
};

export const deleteProject = async (id: number) => {
  const count = await Project.destroy({ where: { id } });
  if (!count) throw new Error("Project not found or already deleted");
  return { deleted: count };
};
