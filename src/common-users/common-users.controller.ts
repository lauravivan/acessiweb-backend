import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommonUserService } from './common-users.service';
import { CreateCommonUserDto } from './dto/create-common-user.dto';
import { UpdateCommonUserDto } from './dto/update-common-user.dto';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { RoutePolicies } from 'src/auth/enum/route-policies.enum';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { RoutePolicyGuard } from 'src/auth/guards/route-policy.guard';

@Controller('common-users')
export class CommonUserController {
  constructor(private readonly commonUsersService: CommonUserService) {}

  @Post()
  async create(@Body() createCommonUserDto: CreateCommonUserDto) {
    return await this.commonUsersService.create(createCommonUserDto);
  }

  @SetRoutePolicy(RoutePolicies.user)
  @UseGuards(AuthTokenGuard, RoutePolicyGuard)
  @Put(':cuid')
  async update(
    @Param('cuid', ParseUUIDPipe) cuid: string,
    @Body() updateCommonUserDto: UpdateCommonUserDto,
  ) {
    return await this.commonUsersService.update(cuid, updateCommonUserDto);
  }

  @SetRoutePolicy(RoutePolicies.user)
  @UseGuards(AuthTokenGuard, RoutePolicyGuard)
  @Delete(':cuid')
  async delete(@Param('cuid', ParseUUIDPipe) cuid: string) {
    return await this.commonUsersService.delete(cuid);
  }
}
