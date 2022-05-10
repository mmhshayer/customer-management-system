import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await new this.customerModel({
      ...createCustomerDto,
      createdAt: new Date(),
    }).save();
  }

  async findAll() {
    return await this.customerModel.find().exec();
  }

  async findOne(query: string) {
    return await this.customerModel
      .findOne({
        $where: `this.name.indexOf('${query}') !== -1 || this._id.toString().indexOf('${query}') !== -1`,
      })
      .exec();
  }

  async update(query: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(query);
    if (customer)
      return await this.customerModel.findByIdAndUpdate(
        customer.id,
        updateCustomerDto,
      );
  }

  remove(id: number) {
    return `This action shpuld removes a #${id} customer. Not defined in requirement.`;
  }
}
