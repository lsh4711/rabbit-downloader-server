import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
class Test {
  @Expose()
  id: number;

  @Expose()
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

test('test', () => {
  console.log(2, plainToInstance(Test, { id: 5, name: '12312', age: 5 }));

  expect(test).toBe(test);
});
