const rabbitmqPublisher = require('../../rabbitmq/publisher')

class ConfirmMailController {
    static async dataFormEmail (req, res) {
        try {
            if ( req.body.name == "" || req.body.email == "" || req.body.data == ""){
              return
            };
            await rabbitmqPublisher(req.body);
          } catch (err) {
            console.log(err);
          }
    }
}
module.exports = ConfirmMailController