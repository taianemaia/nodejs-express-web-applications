const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadsService');

const parser = xml2js.Parser({ explicitArray: false });

const goodReadsService = () => {
    const getBookById = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=iC2VFbRyuijJhd2iWmDaEg`)
                .then((response) => {
                    parser.parseString(response.data, (err, result) => {
                        if (err) {
                            debug(err);
                        } else {
                            resolve(result.GoodreadsResponse.book);
                        }
                    });
                })
                .catch((err) => {
                    reject(err);
                    debug(err);
                });
        }); 
    }

    return { getBookById };
}

module.exports = goodReadsService();
