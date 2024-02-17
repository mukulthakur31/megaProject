import conf from '../conf/conf.js';
import { Client,Databases,ID,Storage,Query } from 'appwrite'

export class Service{
    client=new Client();
    databases;
    storage;
    constructor(){
        this.client 
         .setEndpoint(conf.appwriteurl) 
         .setProject(conf.appwriteProjectId)
            this.databases=new Databases(this.client)
            this.storage=new Storage(this.client)
     }
  async creatPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost:: error",error)
        }
  }  

  async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost:: error",error)
        }
  }

  async deletePost(slug){
    try {
         this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;
    } catch (error) {
        console.log("Appwrite service :: createPost:: error",error)
        return false
    }
  }
  async getpost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Apperite service :: Logout::error",error)
            return false;
    }
 }

  async getactiveposts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
            )
        } catch (error) {
            console.log("Apperite service :: Logout::error",error)
            return false
        }
  }
    // file upload  service 
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Apperite service :: Logout::error",error)
                return false
        }
    }
    async deletefile(fileId){
        try {
            await this.bucket.deletefile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Apperite service :: Logout::error",error)
            return false
        }
    }
    getfilepreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    
}

const service= new Service();
export default service
