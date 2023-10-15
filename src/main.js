import { Readability } from "@mozilla/readability";

main();

function to_hex_string(bytes) {
    let tmp = new Uint8Array(2*bytes.length);
    for(let k = 0; k <= bytes.length; ++k)
    {
        let value = bytes[k];
        let msb = value >> 4;
        let lsb = value & 0xf;
        tmp[2*k] = msb < 10 ? msb + 48 : (msb - 10) + 65;
        tmp[2*k + 1] = lsb < 10 ? lsb + 48 : (lsb - 10) + 65;
    }

    return new TextDecoder().decode(tmp);
}

async function main() {

	const entry = new Readability(document.cloneNode(true)).parse();
	const url = String(document.location);
	const id = to_hex_string(new Uint8Array( await crypto.subtle.digest("SHA-256", new TextEncoder().encode(url))));
	console.log(id, url);

	await fetch('http://localhost:7700/indexes/pages/documents?primaryKey=id', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({id, url, ...entry})
	});
}
