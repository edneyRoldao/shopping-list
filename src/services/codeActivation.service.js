import emailSender from './emailSender.service';
import ActivationCodeModel from '../models/activationCode.model';

export default class CodeActivationService {

    async sendActivationCode(email) {
        try {
            ActivationCodeModel.findOneAndRemove({email}).exec();
            const codeActivation = new ActivationCodeModel({ email });
            const codeActivationSaved = await codeActivation.save();
            const codeAsArray = codeActivationSaved.code.split('');
            const code = codeAsArray.join('  ');

            const emailOptions = {
                email,
                subject: 'activation code',
                content: 'Use the following code to activate your account',
                html: `<h3><strong>${code}</strong></h3>`
            };

            return emailSender(emailOptions);

        } catch (err) {
            console.log(err);
            return false;
        }
    }

}
