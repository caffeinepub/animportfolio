import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Bool "mo:core/Bool";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Types
  type Project = {
    id : Text;
    title : Text;
    description : Text;
    shortDesc : Text;
    category : ProjectCategory;
    imageUrl : Text;
    liveUrl : ?Text;
    githubUrl : ?Text;
    featured : Bool;
    order : Nat;
    tags : [Text];
  };

  module Project {
    public func compare(p1 : Project, p2 : Project) : Order.Order {
      Text.compare(p1.id, p2.id);
    };

    public func compareByOrder(p1 : Project, p2 : Project) : Order.Order {
      Nat.compare(p1.order, p2.order);
    };
  };

  type ProjectCategory = {
    #web;
    #mobile;
    #design;
    #other;
  };

  type Service = {
    id : Text;
    title : Text;
    description : Text;
    icon : Text;
    price : ?Text;
    features : [Text];
    order : Nat;
  };

  module Service {
    public func compare(s1 : Service, s2 : Service) : Order.Order {
      Text.compare(s1.id, s2.id);
    };

    public func compareByOrder(s1 : Service, s2 : Service) : Order.Order {
      Nat.compare(s1.order, s2.order);
    };
  };

  type Skill = {
    id : Text;
    name : Text;
    percentage : Nat;
    category : SkillCategory;
    icon : Text;
  };

  module Skill {
    public func compare(s1 : Skill, s2 : Skill) : Order.Order {
      Text.compare(s1.id, s2.id);
    };
    public func compareByPercentage(s1 : Skill, s2 : Skill) : Order.Order {
      Nat.compare(s1.percentage, s2.percentage);
    };
  };

  type SkillCategory = {
    #frontend;
    #backend;
    #design;
    #other;
  };

  type Testimonial = {
    id : Text;
    name : Text;
    role : Text;
    company : Text;
    avatarUrl : Text;
    text : Text;
    rating : Nat;
    featured : Bool;
  };

  module Testimonial {
    public func compareNaturally(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Text.compare(t1.id, t2.id);
    };

    public func compareByFeatured(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Bool.compare(t1.featured, t2.featured);
    };
  };

  type BlogPost = {
    id : Text;
    title : Text;
    slug : Text;
    content : Text;
    excerpt : Text;
    coverImageUrl : Text;
    tags : [Text];
    publishedAt : ?Text;
    status : PostStatus;
  };

  module BlogPost {
    public func compareNaturally(b1 : BlogPost, b2 : BlogPost) : Order.Order {
      Text.compare(b1.id, b2.id);
    };

    public func compareByPublishedAt(b1 : BlogPost, b2 : BlogPost) : Order.Order {
      switch (b1.publishedAt, b2.publishedAt) {
        case (?d1, ?d2) { Text.compare(d1, d2) };
        case (?_, null) { #less };
        case (null, ?_) { #greater };
        case (null, null) { Text.compare(b1.id, b2.id) };
      };
    };
  };

  type PostStatus = {
    #draft;
    #published;
  };

  type ContactMessage = {
    id : Text;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    createdAt : Text;
    isRead : Bool;
  };

  module ContactMessage {
    public func compareNaturally(m1 : ContactMessage, m2 : ContactMessage) : Order.Order {
      Text.compare(m1.id, m2.id);
    };

    public func compareByCreatedAt(m1 : ContactMessage, m2 : ContactMessage) : Order.Order {
      Text.compare(m1.createdAt, m2.createdAt);
    };
  };

  type Experience = {
    id : Text;
    role : Text;
    company : Text;
    location : Text;
    startDate : Text;
    endDate : ?Text;
    description : Text;
    current : Bool;
    order : Nat;
  };

  module Experience {
    public func compareNaturally(e1 : Experience, e2 : Experience) : Order.Order {
      Text.compare(e1.id, e2.id);
    };
    public func compareByOrder(e1 : Experience, e2 : Experience) : Order.Order {
      Nat.compare(e1.order, e2.order);
    };
  };

  type Theme = {
    primaryColor : Text;
    secondaryColor : Text;
    accentColor : Text;
    bgColor : Text;
    textColor : Text;
  };

  type CMSSetting = {
    key : Text;
    value : Text;
  };

  // Stores
  let projects = Map.empty<Text, Project>();
  let services = Map.empty<Text, Service>();
  let skills = Map.empty<Text, Skill>();
  let testimonials = Map.empty<Text, Testimonial>();
  let blogPosts = Map.empty<Text, BlogPost>();
  let contactMessages = Map.empty<Text, ContactMessage>();
  let experiences = Map.empty<Text, Experience>();
  let settings = Map.empty<Text, Text>();
  let imageReferences = Map.empty<Text, Storage.ExternalBlob>();

  var theme : Theme = {
    primaryColor = "#2D3748";
    secondaryColor = "#4A5568";
    accentColor = "#FF6B6B";
    bgColor = "#F7FAFC";
    textColor = "#2D3748";
  };

  // Helper Functions
  func generateId() : Text {
    Time.now().toText();
  };

  // Helper Functions
  // generateId - Converts current time to Text
  // This ensures a unique identifier on each call.
  // Used throughout the codebase for object creation.

  // Legacy admin credential functions - deprecated, kept for compatibility
  public query ({ caller }) func verifyAdminCredentials(username : Text, password : Text) : async Bool {
    false;
  };

  public shared ({ caller }) func changeAdminPassword(oldPassword : Text, newPassword : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can change password");
    };
    false;
  };

  // CMS Settings
  public query ({ caller }) func getSetting(key : Text) : async ?Text {
    settings.get(key);
  };

  public shared ({ caller }) func updateSetting(key : Text, value : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update settings");
    };
    settings.add(key, value);
  };

  public query ({ caller }) func getAllSettings() : async [CMSSetting] {
    let iter = settings.entries();
    iter.map<(Text, Text), CMSSetting>(
      func((k, v)) { { key = k; value = v } }
    ).toArray();
  };

  // Projects
  public shared ({ caller }) func createProject(project : Project) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create projects");
    };
    let id = generateId();
    let newProject = { project with id };
    projects.add(id, newProject);
    id;
  };

  public shared ({ caller }) func updateProject(id : Text, project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    if (not projects.containsKey(id)) {
      Runtime.trap("Project not found");
    };
    projects.add(id, project);
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    if (not projects.containsKey(id)) {
      Runtime.trap("Project not found");
    };
    projects.remove(id);
  };

  public query ({ caller }) func getProjects() : async [Project] {
    projects.values().toArray().sort(Project.compareByOrder);
  };

  public query ({ caller }) func getFeaturedProjects() : async [Project] {
    let filtered = List.empty<Project>();
    for ((_, project) in projects.entries()) {
      if (project.featured) {
        filtered.add(project);
      };
    };
    filtered.toArray().sort(Project.compareByOrder);
  };

  public query ({ caller }) func getProjectById(id : Text) : async ?Project {
    projects.get(id);
  };

  // Services
  public shared ({ caller }) func createService(service : Service) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create services");
    };
    let id = generateId();
    let newService = { service with id };
    services.add(id, newService);
    id;
  };

  public shared ({ caller }) func updateService(id : Text, service : Service) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };
    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    services.add(id, service);
  };

  public shared ({ caller }) func deleteService(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };
    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    services.remove(id);
  };

  public query ({ caller }) func getServices() : async [Service] {
    services.values().toArray().sort(Service.compareByOrder);
  };

  public query ({ caller }) func getServiceById(id : Text) : async ?Service {
    services.get(id);
  };

  // Skills
  public shared ({ caller }) func createSkill(skill : Skill) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create skills");
    };
    let id = generateId();
    let newSkill = { skill with id };
    skills.add(id, newSkill);
    id;
  };

  public shared ({ caller }) func updateSkill(id : Text, skill : Skill) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update skills");
    };
    if (not skills.containsKey(id)) {
      Runtime.trap("Skill not found");
    };
    skills.add(id, skill);
  };

  public shared ({ caller }) func deleteSkill(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete skills");
    };
    if (not skills.containsKey(id)) {
      Runtime.trap("Skill not found");
    };
    skills.remove(id);
  };

  public query ({ caller }) func getSkills() : async [Skill] {
    skills.values().toArray().sort(Skill.compareByPercentage);
  };

  public query ({ caller }) func getSkillById(id : Text) : async ?Skill {
    skills.get(id);
  };

  // Testimonials
  public shared ({ caller }) func createTestimonial(testimonial : Testimonial) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create testimonials");
    };
    let id = generateId();
    let newTestimonial = { testimonial with id };
    testimonials.add(id, newTestimonial);
    id;
  };

  public shared ({ caller }) func updateTestimonial(id : Text, testimonial : Testimonial) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };
    if (not testimonials.containsKey(id)) {
      Runtime.trap("Testimonial not found");
    };
    testimonials.add(id, testimonial);
  };

  public shared ({ caller }) func deleteTestimonial(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    if (not testimonials.containsKey(id)) {
      Runtime.trap("Testimonial not found");
    };
    testimonials.remove(id);
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort(Testimonial.compareByFeatured);
  };

  public query ({ caller }) func getTestimonialById(id : Text) : async ?Testimonial {
    testimonials.get(id);
  };

  // Blog Posts
  public shared ({ caller }) func createBlogPost(post : BlogPost) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    let id = generateId();
    let newPost = { post with id };
    blogPosts.add(id, newPost);
    id;
  };

  public shared ({ caller }) func updateBlogPost(id : Text, post : BlogPost) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Blog post not found");
    };
    blogPosts.add(id, post);
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Blog post not found");
    };
    blogPosts.remove(id);
  };

  public query ({ caller }) func getPublishedPosts() : async [BlogPost] {
    let filtered = blogPosts.values().filter(
      func(post) {
        post.status == #published;
      }
    );
    filtered.toArray().sort(BlogPost.compareByPublishedAt);
  };

  public query ({ caller }) func getPostBySlug(slug : Text) : async ?BlogPost {
    blogPosts.values().find(
      func(post) {
        post.slug == slug and post.status == #published;
      }
    );
  };

  public query ({ caller }) func getBlogPostById(id : Text) : async ?BlogPost {
    blogPosts.get(id);
  };

  // Contact Messages
  public shared ({ caller }) func submitContact(message : ContactMessage) : async Text {
    let id = generateId();
    let newMessage = { message with id };
    contactMessages.add(id, newMessage);
    id;
  };

  public shared ({ caller }) func markAsRead(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark messages as read");
    };
    switch (contactMessages.get(id)) {
      case (null) { Runtime.trap("Message not found") };
      case (?msg) {
        let updated = { msg with isRead = true };
        contactMessages.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteMessage(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete messages");
    };
    if (not contactMessages.containsKey(id)) {
      Runtime.trap("Message not found");
    };
    contactMessages.remove(id);
  };

  public query ({ caller }) func getMessages() : async [ContactMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view messages");
    };
    contactMessages.values().toArray().sort(ContactMessage.compareByCreatedAt);
  };

  // Experience/Timeline
  public shared ({ caller }) func createExperience(exp : Experience) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create experience entries");
    };
    let id = generateId();
    let newExp = { exp with id };
    experiences.add(id, newExp);
    id;
  };

  public shared ({ caller }) func updateExperience(id : Text, exp : Experience) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update experience entries");
    };
    if (not experiences.containsKey(id)) {
      Runtime.trap("Experience not found");
    };
    experiences.add(id, exp);
  };

  public shared ({ caller }) func deleteExperience(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete experience entries");
    };
    if (not experiences.containsKey(id)) {
      Runtime.trap("Experience not found");
    };
    experiences.remove(id);
  };

  public query ({ caller }) func getExperiences() : async [Experience] {
    experiences.values().toArray().sort(Experience.compareByOrder);
  };

  public query ({ caller }) func getExperienceById(id : Text) : async ?Experience {
    experiences.get(id);
  };

  // Theme Settings
  public query ({ caller }) func getTheme() : async Theme {
    theme;
  };

  public shared ({ caller }) func updateTheme(newTheme : Theme) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update theme");
    };
    theme := newTheme;
  };

  // Portfolio Images
  public shared ({ caller }) func addImageReference(id : Text, blob : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add image references");
    };
    imageReferences.add(id, blob);
  };

  public query ({ caller }) func getImageReference(id : Text) : async ?Storage.ExternalBlob {
    imageReferences.get(id);
  };

  public query ({ caller }) func getAllImageReferences() : async [(Text, Storage.ExternalBlob)] {
    imageReferences.toArray();
  };

  public shared ({ caller }) func deleteImageReference(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete image references");
    };
    if (not imageReferences.containsKey(id)) {
      Runtime.trap("Image reference not found");
    };
    imageReferences.remove(id);
  };
};
