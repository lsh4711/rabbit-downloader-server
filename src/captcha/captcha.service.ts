import { Injectable } from '@nestjs/common';

@Injectable()
export class CaptchaService {
  private captchaServerUrl = process.env.CAPTCHA_SERVER_URL!;

  async sendRecognizeRequest(formData: FormData) {
    return fetch(this.captchaServerUrl, {
      method: 'POST',
      body: formData,
    }).then((r) => {
      if (!r.ok) {
        throw new Error('Failed to recognize image');
      }
      return r.text();
    });
  }
}
