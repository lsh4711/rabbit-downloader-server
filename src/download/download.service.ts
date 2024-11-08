import { PlaywrightService } from '#@/playwright/playwright.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DownloadService {
  constructor(private readonly playwrightService: PlaywrightService) {}

  async parse(html: string) {
    const text = await this.playwrightService.parseHtmlText(html);
    return `\n\n${text}\n\n`;
  }

  decode(code: string, step = 3) {
    let result = '';

    for (let i = 0; i < code.length; i += step) {
      result += String.fromCharCode(parseInt(code.substring(i, i + step), 16));
    }

    return result;
  }
}
