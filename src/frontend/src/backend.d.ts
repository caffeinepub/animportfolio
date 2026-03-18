import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: string;
    featured: boolean;
    name: string;
    role: string;
    text: string;
    company: string;
    avatarUrl: string;
    rating: bigint;
}
export interface BlogPost {
    id: string;
    status: PostStatus;
    coverImageUrl: string;
    title: string;
    content: string;
    slug: string;
    tags: Array<string>;
    publishedAt?: string;
    excerpt: string;
}
export interface Service {
    id: string;
    title: string;
    features: Array<string>;
    order: bigint;
    icon: string;
    description: string;
    price?: string;
}
export interface CMSSetting {
    key: string;
    value: string;
}
export interface ContactMessage {
    id: string;
    subject: string;
    name: string;
    createdAt: string;
    isRead: boolean;
    email: string;
    message: string;
}
export interface Skill {
    id: string;
    icon: string;
    name: string;
    category: SkillCategory;
    percentage: bigint;
}
export interface Experience {
    id: string;
    endDate?: string;
    order: bigint;
    role: string;
    description: string;
    company: string;
    current: boolean;
    location: string;
    startDate: string;
}
export interface Project {
    id: string;
    title: string;
    featured: boolean;
    order: bigint;
    tags: Array<string>;
    description: string;
    githubUrl?: string;
    imageUrl: string;
    shortDesc: string;
    category: ProjectCategory;
    liveUrl?: string;
}
export interface Theme {
    primaryColor: string;
    accentColor: string;
    secondaryColor: string;
    textColor: string;
    bgColor: string;
}
export enum PostStatus {
    published = "published",
    draft = "draft"
}
export enum ProjectCategory {
    web = "web",
    other = "other",
    design = "design",
    mobile = "mobile"
}
export enum SkillCategory {
    other = "other",
    frontend = "frontend",
    design = "design",
    backend = "backend"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addImageReference(id: string, blob: ExternalBlob): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changeAdminPassword(oldPassword: string, newPassword: string): Promise<boolean>;
    createBlogPost(post: BlogPost): Promise<string>;
    createExperience(exp: Experience): Promise<string>;
    createProject(project: Project): Promise<string>;
    createService(service: Service): Promise<string>;
    createSkill(skill: Skill): Promise<string>;
    createTestimonial(testimonial: Testimonial): Promise<string>;
    deleteBlogPost(id: string): Promise<void>;
    deleteExperience(id: string): Promise<void>;
    deleteImageReference(id: string): Promise<void>;
    deleteMessage(id: string): Promise<void>;
    deleteProject(id: string): Promise<void>;
    deleteService(id: string): Promise<void>;
    deleteSkill(id: string): Promise<void>;
    deleteTestimonial(id: string): Promise<void>;
    getAllImageReferences(): Promise<Array<[string, ExternalBlob]>>;
    getAllSettings(): Promise<Array<CMSSetting>>;
    getBlogPostById(id: string): Promise<BlogPost | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getExperienceById(id: string): Promise<Experience | null>;
    getExperiences(): Promise<Array<Experience>>;
    getFeaturedProjects(): Promise<Array<Project>>;
    getImageReference(id: string): Promise<ExternalBlob | null>;
    getMessages(): Promise<Array<ContactMessage>>;
    getPostBySlug(slug: string): Promise<BlogPost | null>;
    getProjectById(id: string): Promise<Project | null>;
    getProjects(): Promise<Array<Project>>;
    getPublishedPosts(): Promise<Array<BlogPost>>;
    getServiceById(id: string): Promise<Service | null>;
    getServices(): Promise<Array<Service>>;
    getSetting(key: string): Promise<string | null>;
    getSkillById(id: string): Promise<Skill | null>;
    getSkills(): Promise<Array<Skill>>;
    getTestimonialById(id: string): Promise<Testimonial | null>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getTheme(): Promise<Theme>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markAsRead(id: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContact(message: ContactMessage): Promise<string>;
    updateBlogPost(id: string, post: BlogPost): Promise<void>;
    updateExperience(id: string, exp: Experience): Promise<void>;
    updateProject(id: string, project: Project): Promise<void>;
    updateService(id: string, service: Service): Promise<void>;
    updateSetting(key: string, value: string): Promise<void>;
    updateSkill(id: string, skill: Skill): Promise<void>;
    updateTestimonial(id: string, testimonial: Testimonial): Promise<void>;
    updateTheme(newTheme: Theme): Promise<void>;
    verifyAdminCredentials(username: string, password: string): Promise<boolean>;
}
