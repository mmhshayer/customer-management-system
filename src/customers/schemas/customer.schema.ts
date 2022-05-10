import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  age?: number;

  @Prop()
  address?: string;

  @Prop({
    type: [String],
  })
  shopping_interests?: string[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
