import app from './app';
import {logger} from './util';
import {thinky} from './db';

thinky.dbReady().then(() => {
  logger.info('starting db');
});

app.listen(8080, function() {
  const host = this.address().address;
  const port = this.address().port;
  logger.info(`Shard listening at http://${host}${port}`);
});

process.on('uncaughtException', err => logger.error('uncaught exception', err));
process.on('uncaughtRejection', err => logger.error('uncaught rejection', err));
