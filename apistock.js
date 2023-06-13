import { request } from 'https';
import { writeFile, renameSync, readFileSync } from 'fs';

function stockApiRequest(endpoint) {
    const options = {
        hostname: 'api.mtgstocks.com',
        path: endpoint,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0'
        }
    };

    return new Promise((resolve, reject) => {
        const req = request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (error) => {
            reject(new Error(error.message));
        });

        req.end();
    })
}

function readJsonFile(filePath) {
    try {
        return JSON.parse(readFileSync(filePath + '.json', 'utf8'));
    } catch (err) {
        console.error(err.message);
    }
}

async function updateRegularInterests() {
    let currentDate = new Date().toJSON().slice(0, 10);
    const data = readJsonFile('rint');
    if (currentDate == data['date']) {
        console.log("No need to update");
        return;
    }
    let oldDate = data['date'];

    try {
        renameSync('rint.json', 'archive/rint_' + oldDate + '.json');
    } catch (err) {
        console.error(err.message);
    }

    try {
        const response = await stockApiRequest('/interests/average/regular');
        let data = JSON.parse(response);
        writeFile('rint.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log('Error writing data to file: ', err);
            }
        });
    } catch (error) {
      console.error('Error occured:', error.message);
    }
}

updateRegularInterests();