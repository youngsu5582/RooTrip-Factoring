import { NestBootStrapApplication } from './bootstrap.application';

NestBootStrapApplication.getInstance().emit('ready');
