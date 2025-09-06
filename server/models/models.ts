// server/models/models.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

/**
 * USER PROFILE (single row for your portfolio)
 * Fields:
 * - hero_name, hero_role, hero_description
 * - profile_image (store path like /images/profile.png from /public/images)
 * - login_initials (2 letters, can be auto-derived from hero_name)
 * - gmail, phone_number, linkedin, github, work_location
 */
export class UserProfile extends Model {
  declare id: number;
  declare hero_name: string;
  declare hero_role: string;
  declare hero_description: string;
  declare profile_image: string | null;
  declare login_initials: string | null;
  declare gmail: string | null;
  declare phone_number: string | null;
  declare linkedin: string | null;
  declare github: string | null;
  declare work_location: string | null;
}

UserProfile.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hero_name: { type: DataTypes.STRING, allowNull: false },
    hero_role: { type: DataTypes.STRING, allowNull: false },
    hero_description: { type: DataTypes.TEXT, allowNull: false },
    profile_image: { type: DataTypes.STRING, allowNull: true },   // e.g. "/images/profile.png"
    login_initials: { type: DataTypes.STRING(2), allowNull: true }, // e.g. "UM"
    gmail: { type: DataTypes.STRING, allowNull: true },
    phone_number: { type: DataTypes.STRING, allowNull: true },
    linkedin: { type: DataTypes.STRING, allowNull: true },
    github: { type: DataTypes.STRING, allowNull: true },
    work_location: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: "user_profile", timestamps: true }
);

/**
 * PROJECTS (multiple rows)
 * - skills as ARRAY(TEXT) (Postgres-only feature; perfect for tags)
 * - link/repo are optional
 * - image_path: store like "/images/projects/foo.png" (from /public/images/projects)
 */
export class Project extends Model {
  declare id: number;
  declare user_profile_id: number
  declare title: string;
  declare description: string;
  declare skills: string[];
  declare link: string | null;
  declare repo: string | null;
  declare image_path: string | null;
}

Project.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_profile_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    skills: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false, defaultValue: [] },
    link: { type: DataTypes.STRING, allowNull: true },
    repo: { type: DataTypes.STRING, allowNull: true },
    image_path: { type: DataTypes.STRING, allowNull: true }, // e.g. "/images/projects/x.png"
  },
  { sequelize, tableName: "projects", timestamps: true }
);

/* ========== Associations ========== */
// IMPORTANT: these mirror the FK in migrations. Cascade is enforced by DB.
UserProfile.hasMany(Project, {
  foreignKey: "user_profile_id",
  as: "projects",
});
Project.belongsTo(UserProfile, {
  foreignKey: "user_profile_id",
  as: "owner",
});

export default { UserProfile, Project };
