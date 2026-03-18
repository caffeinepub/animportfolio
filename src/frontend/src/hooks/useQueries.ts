import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContactMessage, Theme } from "../backend.d";
import {
  DEMO_BLOG_POSTS,
  DEMO_EXPERIENCES,
  DEMO_PROJECTS,
  DEMO_SERVICES,
  DEMO_SKILLS,
  DEMO_TESTIMONIALS,
} from "../lib/constants";
import { useActor } from "./useActor";

type ActorType = NonNullable<ReturnType<typeof useActor>["actor"]>;

function useActorQuery<T>(
  key: string[],
  fn: (actor: ActorType) => Promise<T>,
  fallback?: T,
) {
  const { actor, isFetching } = useActor();
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      if (!actor) return fallback as T;
      try {
        return await fn(actor);
      } catch {
        return fallback as T;
      }
    },
    enabled: !isFetching,
  });
}

export function useProjects() {
  const q = useActorQuery(["projects"], (a) => a.getProjects(), []);
  const data = q.data && q.data.length > 0 ? q.data : DEMO_PROJECTS;
  return { ...q, data };
}

export function useFeaturedProjects() {
  const q = useActorQuery(
    ["featuredProjects"],
    (a) => a.getFeaturedProjects(),
    [],
  );
  const data =
    q.data && q.data.length > 0
      ? q.data
      : DEMO_PROJECTS.filter((p) => p.featured);
  return { ...q, data };
}

export function useProjectById(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!actor) return DEMO_PROJECTS.find((p) => p.id === id) ?? null;
      try {
        const result = await actor.getProjectById(id);
        return result ?? DEMO_PROJECTS.find((p) => p.id === id) ?? null;
      } catch {
        return DEMO_PROJECTS.find((p) => p.id === id) ?? null;
      }
    },
    enabled: !isFetching && !!id,
  });
}

export function useServices() {
  const q = useActorQuery(["services"], (a) => a.getServices(), []);
  const data = q.data && q.data.length > 0 ? q.data : DEMO_SERVICES;
  return { ...q, data };
}

export function useSkills() {
  const q = useActorQuery(["skills"], (a) => a.getSkills(), []);
  const data = q.data && q.data.length > 0 ? q.data : DEMO_SKILLS;
  return { ...q, data };
}

export function useExperiences() {
  const q = useActorQuery(["experiences"], (a) => a.getExperiences(), []);
  const data = q.data && q.data.length > 0 ? q.data : DEMO_EXPERIENCES;
  return { ...q, data };
}

export function useTestimonials() {
  const q = useActorQuery(["testimonials"], (a) => a.getTestimonials(), []);
  const data = q.data && q.data.length > 0 ? q.data : DEMO_TESTIMONIALS;
  return { ...q, data };
}

export function usePublishedPosts() {
  const q = useActorQuery(["publishedPosts"], (a) => a.getPublishedPosts(), []);
  const data = q.data && q.data.length > 0 ? q.data : DEMO_BLOG_POSTS;
  return { ...q, data };
}

export function usePostBySlug(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!actor) return DEMO_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
      try {
        const result = await actor.getPostBySlug(slug);
        return result ?? DEMO_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
      } catch {
        return DEMO_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
      }
    },
    enabled: !isFetching && !!slug,
  });
}

export function useSettings() {
  return useActorQuery(["settings"], (a) => a.getAllSettings(), []);
}

export function useTheme() {
  return useActorQuery(["theme"], (a) => a.getTheme(), null);
}

export function useMessages() {
  return useActorQuery(["messages"], (a) => a.getMessages(), []);
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (msg: ContactMessage) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContact(msg);
    },
  });
}

export function useMarkAsRead() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (actor) await actor.markAsRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

export function useDeleteMessage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (actor) await actor.deleteMessage(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

export function useUpdateSetting() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      if (actor) await actor.updateSetting(key, value);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}

export function useUpdateTheme() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (theme: Theme) => {
      if (actor) await actor.updateTheme(theme);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["theme"] }),
  });
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function useCRUD<T>(entityKey: string) {
  const { actor } = useActor();
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: [entityKey] });

  const create = useMutation({
    mutationFn: async (data: T) => {
      if (!actor) throw new Error("Not connected");
      const fn = (
        actor as unknown as Record<string, (d: T) => Promise<string>>
      )[`create${capitalize(entityKey)}`];
      return fn(data);
    },
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: T }) => {
      if (!actor) throw new Error("Not connected");
      const fn = (
        actor as unknown as Record<string, (id: string, d: T) => Promise<void>>
      )[`update${capitalize(entityKey)}`];
      return fn(id, data);
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      const fn = (
        actor as unknown as Record<string, (id: string) => Promise<void>>
      )[`delete${capitalize(entityKey)}`];
      return fn(id);
    },
    onSuccess: invalidate,
  });

  return { create, update, remove };
}

export function useProjectCRUD() {
  return useCRUD<Parameters<ActorType["createProject"]>[0]>("projects");
}
export function useServiceCRUD() {
  return useCRUD<Parameters<ActorType["createService"]>[0]>("services");
}
export function useSkillCRUD() {
  return useCRUD<Parameters<ActorType["createSkill"]>[0]>("skills");
}
export function useExperienceCRUD() {
  return useCRUD<Parameters<ActorType["createExperience"]>[0]>("experiences");
}
export function useTestimonialCRUD() {
  return useCRUD<Parameters<ActorType["createTestimonial"]>[0]>("testimonials");
}
export function useBlogPostCRUD() {
  return useCRUD<Parameters<ActorType["createBlogPost"]>[0]>("blogPosts");
}
