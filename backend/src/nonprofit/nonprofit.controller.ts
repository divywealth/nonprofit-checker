import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { NonprofitService } from './nonprofit.service';
import { GetNonProfitDto } from './dto/create-nonprofit.dto';
import { UpdateNonprofitDto } from './dto/update-nonprofit.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from 'express-serve-static-core';
import { OK } from 'src/utils/response';


@Controller('nonprofit')
export class NonprofitController {
  constructor(private readonly nonprofitService: NonprofitService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getNonProfit(@Query() getNonProfitDto: GetNonProfitDto, @Req() request: Request) {
    const user = request.user
    const response = await this.nonprofitService.getNonProfit(getNonProfitDto, user.id);
    return OK(response, "Ein details gotten successfully")
  }
}
