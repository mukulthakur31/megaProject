import { Client,Account,ID } from 'appwrite'
import conf from '../conf/conf.js';
export class Auhservice {
    client=new Client();
    account;

    constructor(){
        this.client 
            .setEndpoint(conf.appwriteurl) 
            .setProject(conf.appwriteProjectId);
            this.account=new Account(this.client)
     }
     async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
            //    call another method 
               return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
     }
     async login ({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error
        }  
     }

     async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite service:: gettCurrentUser:: errror,",error)
        }

        return null
     }

     async Logout(){
        try {
            await this.account.deleteSessions(); 
        } catch (error) {
            console.log("Apperite service :: Logout::error",error)
        }
     }

     }  


const authservice=new Auhservice();
export default authservice 
