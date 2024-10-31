import bcrypt from 'bcrypt'

export const hashPassword = async(password:string):Promise<string>=>{
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        return hashedPassword
    } catch (error) {
        throw new Error(`Error hashing password: ${error}`)
    }
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error(`Error comparing passwords: ${error}`);
    }
};