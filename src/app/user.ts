export class User {
    id !: string;
    email!: string;
    username!: string;
    password!: string;
    newPassword: string;
    roles !: string[];
    captchaResp !: string;    

    constructor(){
        this.roles=["user"];
    }

    
}
