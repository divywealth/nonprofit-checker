import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetNonProfitDto } from './dto/create-nonprofit.dto';
import { UpdateNonprofitDto } from './dto/update-nonprofit.dto';
import axios from 'axios';
import { HistoryService } from 'src/history/history.service';
import { UserService } from 'src/user/user.service';
import { NOTFOUND } from 'src/utils/response';

@Injectable()
export class NonprofitService {
  constructor(
    private readonly historyService: HistoryService,
    private readonly userService: UserService,
  ) {}
  async getNonProfit(getNonProfitDto: GetNonProfitDto, user_id: string) {
    const { ein, organization_name } = getNonProfitDto;
    if (!ein && !organization_name) {
      throw new HttpException(
        'You must provide either EIN or Organization Name.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (ein && organization_name) {
      throw new HttpException(
        'Please provide either EIN or Organization Name, not both.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.findUser({ id: user_id });
    if (!user) throw NOTFOUND([], 'User not found');
    const param = ein ? ein : organization_name;
    const baseUrl = `https://entities.pactman.org/api/entities/nonprofitcheck/v1/us/ein/${param}`;
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${process.env.PACTMAN_API_KEY}`,
        },
      });
      this.historyService.logSearch({
        user_id: user.id,
        name: user.name,
        ein,
        organization_name,
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch nonprofit data.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
