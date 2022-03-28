
//Generate Random String
// exports.createRandomStringOfLength = (length=10) => {
// 	return Math.random().toString(36).substring(2, length);
// }


exports.createRandomStringOfLength = (length=10) => {
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 1; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
