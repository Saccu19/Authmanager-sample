
export type User = {
    id: string
    nome: string,
    email: string,
    ruolo: "admin" | "user"
    password: string
    ip: string
    version: "login" | "logout"
}

export type UserTable = User & {
    table: "Utenti"
}