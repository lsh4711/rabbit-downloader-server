import { Time } from '#@/decorators/time.decorator';
import { Timeout } from '@nestjs/schedule';
import {
  type Browser,
  type BrowserContext,
  chromium,
  type Page,
} from 'playwright';

export class PlaywrightService {
  private readonly headless: boolean = true;
  private readonly javaScriptEnabled: boolean = false;
  private readonly offline: boolean = true;

  private browser?: Browser;
  private context?: BrowserContext;
  private page?: Page;

  @Timeout(0)
  async initPlaywright() {
    if (this.browser) {
      return;
    }

    await this.init();
  }

  @Time('playwright initialized')
  private async init() {
    this.browser = await chromium.launch({ headless: this.headless });
    this.context = await this.browser.newContext({
      javaScriptEnabled: this.javaScriptEnabled,
      offline: this.offline,
    });
    this.page = await this.context.newPage();

    /* istanbul ignore next */
    return this.page.evaluate(() => {
      const root = document.createElement('div');
      root.id = 'root';
      document.body.append(root);
    });
  }

  async parseHtmlText(html: string) {
    /* istanbul ignore next */
    return await this.page!.evaluate((html) => {
      const requestContext = document.createElement('div');
      requestContext.innerHTML = html;

      document.getElementById('root')!.append(requestContext);

      const text = requestContext.innerText;

      requestContext.remove();

      return text;
    }, html);
  }
}
