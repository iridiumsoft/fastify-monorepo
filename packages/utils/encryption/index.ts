import * as crypto from 'crypto';

const IV_LENGTH = 16; // For AES, this is always 16

export const encrypt = (text: string) => {
	if(!process.env.ENCRYPTION_ALGORITHM){
		throw new Error("ENCRYPTION_ALGORITHM not defined in .env file");
	}
	if(!process.env.ENCRYPTION_KEY){
		throw new Error("ENCRYPTION_KEY not defined in .env file");
	}
	let iv = crypto.randomBytes(IV_LENGTH);
	let cipher = crypto.createCipheriv(process.env.ENCRYPTION_ALGORITHM, Buffer.from(process.env.ENCRYPTION_KEY), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (text: string) => {
	if(!process.env.ENCRYPTION_ALGORITHM){
		throw new Error("ENCRYPTION_ALGORITHM not defined in .env file");
	}
	if(!process.env.ENCRYPTION_KEY){
		throw new Error("ENCRYPTION_KEY not defined in .env file");
	}
	let textParts = text.split(':');
	if(!textParts || !Array.isArray(textParts) || textParts.length !== 2){
		throw new Error("Invalid text");
	}
	// @ts-ignore
	let iv = Buffer.from(textParts.shift(), 'hex');
	let encryptedText = Buffer.from(textParts.join(':'), 'hex');
	let decipher = crypto.createDecipheriv(process.env.ENCRYPTION_ALGORITHM, Buffer.from(process.env.ENCRYPTION_KEY), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
};

export const decrypt_object = (columns: string[], object: Record<string, string>) => {
	columns.forEach((name) => {
		if (object.hasOwnProperty(name)) {
			object[name] = decrypt(object[name]);
		}
	});
	return object;
};
