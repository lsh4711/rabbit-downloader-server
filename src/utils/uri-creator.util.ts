export class UriCreator {
  static create(domain: string, id: string) {
    return `${domain}/${id}`;
  }
}
