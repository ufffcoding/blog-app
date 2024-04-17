import { Client, Query } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteBucketId);
    this.database = new this.database(this.client);
    this.bucket = new this.bucket(this.client);
    console.log(ID.unique());
  }

  async createPost({ title, slug, description, image, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, description, image, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost({ title, description, image, status, userId }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, description, image, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.listDocuments(slug);
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // File storage service

  async uploadFile(file) {
    try {
      return await this.database.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
    }
  }

  async updateFile(fileId, file) {
    try {
      return await this.database.updateFile(
        conf.appwriteBucketId,
        fileId,
        file
      );
    } catch (error) {
      console.log("Appwrite service :: updateFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.database.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
    }
  }

  async getFilepreview(fileId) {
    try {
      return await this.database.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: getFilepreview :: error", error);
    }
  }
}

const service = Service();

export default service;
