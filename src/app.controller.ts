import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/customjs')
  getCustomJs(): StreamableFile {
    const path = join(process.cwd(), '/src/swagger.js');
    const file = createReadStream(path);
    return new StreamableFile(file);
  }
}
