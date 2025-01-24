import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import { createLogger, format, transports } from 'winston';
import util from 'util';
import { blue, magenta, red, yellow } from 'colorette';
import * as sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

const colorizeLevel = (level: string) => {
    switch (level) {
        case 'INFO':
            return blue(level);
        case 'WARNING':
            return yellow(level);
        case 'ERROR':
            return red(level);
        default:
            return level;
    }
};

const consoleLogFormat = format.printf((info) => {
    const { timestamp, level, message, meta = {} } = info;
    const customLevel = colorizeLevel(level.toUpperCase());
    const customMessage = message as string;
    const customTimestamp = timestamp;
    const customMeta = util.inspect(meta, {
        showHidden: true,
        depth: null,
        colors: true
    });

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`;

    return customLog;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.NODE_ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ];
    }
    return [];
};

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransport()]
});
