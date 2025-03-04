export default function createSecret() {
    const characters = "fgffbtnumiium43365766u67ij$I$ekujyhrwe&%?t" 
    // generare stringhe casuali di 12 caratteri
    let randomString: string | undefined = "";
    let randint: number | undefined;
    for(let i = 0; i<= 12; i++) {
        randint = Math.floor(Math.random() * characters.length);
        // console.log((randint));
        const char = characters[randint];
        randomString += char
    }
    return Buffer.from(randomString as string).toString("base64");
}