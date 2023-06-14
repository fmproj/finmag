import axios from 'axios';
import { load } from 'cheerio';


function knightApiRequest(name) {
    const data = 'edice_magic=libovolna&rarita=A&foil=A&jmenokarty='+name+'&triditpodle=ceny&submit=Vyhledej';
    
    axios.post('https://cernyrytir.cz/index.php3?akce=3', data)
        .then(res => {
            console.log(`Status: ${res.status}`);
            const $ = load(res.data);
            const trs = $('table.kusovkytext').eq(1).find('tbody').children('tr');

            trs.each((index, tr) => {
                const i = index % 3;
                const tds = $(tr).children('td');

                if (i == 0) {
                    console.log(`Name: ${tds.eq(1).text()}`);
                } else if (i == 1) {
                    console.log(`Set: ${tds.eq(0).text()}`);
                } else if (i == 2) {
                    console.log(`Ks/Cena: ${tds.eq(1).text()} / ${tds.eq(2).text()}`);
                }
            });
        })
        .catch(err => {
            console.error(err)
        });
}

knightApiRequest('sol+ring');