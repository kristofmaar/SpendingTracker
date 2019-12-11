export class Spending {
  public id: string;
  public amount: bigint;
  public currency: Currency;
  public description: string;
  public dateCreated: Date;
  public categoryId: string;
  public userId: string;
}
