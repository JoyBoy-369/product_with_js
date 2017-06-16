import app from './app';
import {logger} from './util';

app.listen(8080, function() {
  const host = this.address().address;
  const port = this.address().port;
  logger.info(`Shard listening at http://${host}${port}`);
});

process.on('uncaughtException', err => logger.error('uncaught exception', err));
process.on('uncaughtRejection', err => logger.error('uncaught rejection', err));
