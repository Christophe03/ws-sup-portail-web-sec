export abstract class AbstractEntity {
  id!: number;
  createdBy!: string;
  updatedBy!: string;
  deletedBy!: string;
  recoverdBy!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}
