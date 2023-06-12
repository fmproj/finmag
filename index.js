const https = require('https');
const fs = require('fs');

function mtgApiRequest(endpoint) {
    const options = {
        hostname: 'api.mtgstocks.com',
        path: endpoint,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
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
    return new Promise((resolve, reject) => {
      fs.readFile(filePath + '.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          reject(err);
          return;
        }
  
        resolve(JSON.parse(data));
      });
    });
}

async function updateRegularInterests() {
    try {
        const response = await mtgApiRequest('/interests/average/regular');
        data = JSON.parse(response);
        fs.writeFile('regular_interests.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log('Error writing data to file: ', err);
            }
        });
    } catch (error) {
      console.error('Error occured:', error.message);
    }
}

readJsonFile('rint')
    .then(data => {
        console.log(data['interests'][0]['print']['name']);
    })
    .catch(err => {
        console.log('Error: ', err);
    });