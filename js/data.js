
class Data {
    
    loadData = async function() {
        const url = 'https://api.sampleapis.com/countries/countries';
        let data;
        try {
            const respons = await fetch(url);
            data = await respons.json();
        } catch(err) {
            data = [];
            console.error("error", err);
        }
        return data;
    }
}

export {Data};