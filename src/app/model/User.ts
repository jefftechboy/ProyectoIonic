import { Profile } from "./Profile";

export class User {
    public idUser: number;
    public username: string;
    public password: string;
    public profile: Profile;

    constructor(idUser: number, username: string, password: string, profile: Profile) {
        this.idUser = idUser;
        this.username = username;
        this.password = password;
        this.profile = profile;
    }
}
