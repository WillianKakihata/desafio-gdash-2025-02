export class SignUpUserModelIn {
constructor(
    public readonly name: string, 
    public readonly username: string, 
    public readonly email: string, 
    public password: string,
    public readonly confirmPassword: string
) {}
}