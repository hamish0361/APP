export default function getDateOfWeekByNumber(d_o_w) {
    switch (d_o_w) {
        case 1:
            return "common.sunday";

        case 2:
            return "common.monday";

        case 3:
            return "common.tuesday";

        case 4:
            return "common.wednesday";

        case 5:
            return "common.thursday";

        case 6:
            return "common.friday";

        case 7:
            return "common.saturday";

        default:

            return 'common.monday'
    }
}