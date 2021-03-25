// import { Controller, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { UsersService } from './users.service';
// import { User as UserEntity } from './user.entity';
// import { UserDto } from './dto/user.dto';

// @Controller('user')
// export class ProposalsController {
//   constructor(private readonly usersService: UsersService) { }

//   @UseGuards(AuthGuard('jwt'))
//   @Put(':id')
//   async update(@Param('id') id: number, @Body() post: UserDto, @Request() req): Promise<UserEntity> {
//     // get the number of row affected and the updated post
//     const { numberOfAffectedRows, updatedFavourites } = await this.usersService.update(
//       post, req.user.id
//     );

//     // if the number of row affected is zero,
//     // it means the post doesn't exist in our db
//     if (numberOfAffectedRows === 0) {
//         throw new NotFoundException('This Post doesn\'t exist');
//     }

//     // return the updated post
//     return updatedFavourites;
//   }

//   // @UseGuards(AuthGuard('jwt'))
//   // @Delete(':id')
//   // async remove(@Param('id') id: number, @Request() req) {
//   //   // delete the post with this id
//   //   const deleted = await this.usersService.delete(id, req.user.id);

//   //   // if the number of row affected is zero,
//   //   // then the post doesn't exist in our db
//   //   if (deleted === 0) {
//   //       throw new NotFoundException('This Post doesn\'t exist');
//   //   }

//   //   // return success message
//   //   return 'Successfully deleted';
//   // }
// }