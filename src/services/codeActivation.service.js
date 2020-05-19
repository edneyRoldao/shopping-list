import emailSender from './emailSender.service';
import codeGenerator from '../utils/codeGenerator.util';
import ActivationCodeModel from '../models/activationCode.model';

export default class CodeActivationService {

    async sendActivationCode(email) {
        try {
            await ActivationCodeModel.findOneAndRemove({email}).exec();

            const code = codeGenerator();

            const codeActivation = new ActivationCodeModel({ email, code });
            const codeActivationSaved = await codeActivation.save();
            const codeAsArray = codeActivationSaved.code.split('');
            const codeGenerated = codeAsArray.join('  ');

            const emailOptions = {
                email,
                subject: 'activation code',
                content: 'Use the following code to activate your account',
                html: `<h3><strong>${codeGenerated}</strong></h3>`
            };

            return emailSender(emailOptions);

        } catch (err) {
            console.log(err);
            return false;
        }
    }

}
