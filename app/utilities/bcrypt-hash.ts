import bcrypt from "bcrypt";

export default async function hash(param: string): Promise<{hashedPassword: string | undefined, error:string | undefined}>{
  const error: string | undefined = "Formato della password non corretto"
  try {
    if (param.length == 0) return {error: error, hashedPassword: undefined};
    const hash = await bcrypt.hash(param, 10);
    return {hashedPassword: hash, error: undefined}
  } catch (err) {
    throw new Error("Errore nell'inserimento della password");
  }
}
