

function setupEndpoints(app) {

  app.get('/api/test', (req, res) => {
    res.send('Hello World')
  });

  console.log("created '/api/test' endpoint");
}

module.exports = {setupEndpoints}