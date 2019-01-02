const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '1ac1c0d68b22458b9b8817b704257b92'
 });

 const apiCall = (req, res) => {
     app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data  => {
         res.json(data);
     })
     .catch(err => res.status(400).json('error to work with API'))
 }


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage: handleImage,
    apiCall: apiCall
};