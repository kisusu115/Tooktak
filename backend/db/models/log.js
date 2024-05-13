const { LogModel } = require("../schemas/log");

class LogRepository {

    static async getLogs(queryParams, page, limit = 10) {
        const { username, role, ip, f_name, date } = queryParams;
        const filter = {};
        const skip = (page - 1) * limit;

        if (username) filter["meta.username"] = username;
        if (role) filter["meta.role"] = role;
        if (ip) filter["meta.ip"] = ip;
        if (f_name) filter["meta.f_name"] = f_name;

        // 날짜 필터 처리
        if (date) {
            const [startDate, endDate] = date.split("_to_").map(d => new Date(d));
            filter.timestamp = { $gte: startDate, $lte: endDate };
        }

        try {
            const logs = await LogModel.find(filter)
                .skip(skip)
                .limit(limit)
                .exec();
            return JSON.stringify({
                status: 200,
                data: logs,
                message: "Logs fetched successfully."
            });
        } catch (error) {
            console.error("Error fetching logs: ", error);
            return JSON.stringify({
                status: 500,
                message: "Server error: " + error.message
            });
        }
    }
}

module.exports = { LogRepository };
