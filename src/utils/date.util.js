import envVariables from '../config/environment.config';
import moment from "moment";
moment.defaultFormat  = envVariables.variables.defaultFormatDate;

export default class DateUtil {

    now() {
        return moment().format(moment.defaultFormat);
    }

    checkFormatDate(dateAsString) {
        return moment(dateAsString, moment.defaultFormat, true).isValid();
    }

}
