import moment from "moment";
import envVariables from '../config/environment.config';

moment.defaultFormat  = envVariables.variables.defaultFormatDate;

export default class DateUtil {

    checkFormatDate(dateAsString) {
        return moment(dateAsString, moment.defaultFormat, true).isValid();
    }

    getStartDayOfDate(dateAsString) {
        return moment(dateAsString, moment.defaultFormat).startOf('day').toDate();
    }

    getEndDayOfDate(dateAsString) {
        return moment(dateAsString, moment.defaultFormat).endOf('day').toDate();
    }

    getDefaultFormat() {
        return moment.defaultFormat;
    }

    isCodeActivationDateValid(date, minutes = 120) {
        const now = moment(new Date());
        const activationDate = moment(date);
        const duration = moment.duration(now.diff(activationDate));
        const durationAsMinutes = duration.asMinutes();

        return durationAsMinutes < minutes;
    }

}
