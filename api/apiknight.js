import axios from 'axios';
import { load } from 'cheerio';

export async function knightApiRequest(name) {
    try {
        const data = `edice_magic=libovolna&rarita=A&foil=A&jmenokarty=${encodeURIComponent(name)}&triditpodle=ceny&submit=Vyhledej`
     
        const response = await axios.post('https://cernyrytir.cz/index.php3?akce=3', data);
        const $ = load(response.data);
        const trs = $('table.kusovkytext').eq(1).find('tbody').children('tr');
        const variants = [];
        let variant = {};
        
        trs.each((index, tr) => {
            const i = index % 3;
            const tds = $(tr).children('td');
            
            if (i === 0) {
                variant = {};
                variant.name = tds.eq(1).text();
            } else if (i === 1) {
                variant.set = tds.eq(0).text();
            } else if (i === 2) {
                variant.quantity = tds.eq(1).text().split(/\u00A0/)[0];
                variant.price = tds.eq(2).text().split(/\u00A0/)[0];    
                variants.push(variant);
            }
        });

        const output = { variants };
        return output;
    } catch (err) {
        throw err;
    }
}

knightApiRequest('opposition agent')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });