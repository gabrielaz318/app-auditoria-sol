import axios from "axios";

async function verifyInternet() {
    try {
        // await axios.get('https://www.googleeeeeeeeeeee.com.br', { timeout: 6000 });
        await axios.get('https://www.google.com.br', { timeout: 6000 });
        return true;
    } catch (error) {
        console.log('Error Internet')
        return false;
    }
}

export { verifyInternet };