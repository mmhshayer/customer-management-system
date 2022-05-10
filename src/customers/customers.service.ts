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

  async findOne(id: string) {
    return await this.customerModel.findById(id).exec();
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto)
      .exec();
  }

  remove(id: number) {
    return `This action shpuld removes a #${id} customer. Not defined in requirement.`;
  }
}
