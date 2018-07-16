using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models.UserModels;
using UsersAward.PLL.Web.Models.AwardModels;

namespace UsersAward.PLL.Web
{
    public class AutoMapperConfig
    {
        public static void Configurate()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<UserDTO, DisplayUserVM>();
                cfg.CreateMap<UserDTO, CreateUserVM>();
                cfg.CreateMap<CreateUserVM, UserDTO>().ForMember(obj => obj.Id, option => option.UseValue(Guid.Empty));
                cfg.CreateMap<EditUserVM, UserDTO>();

                cfg.CreateMap<AwardDTO, DisplayAwardVM>();
                cfg.CreateMap<AwardDTO, CreateAwardVM>();
                cfg.CreateMap<CreateAwardVM, AwardDTO>().ForMember(obj => obj.Id, option => option.UseValue(Guid.Empty));
                cfg.CreateMap<EditUserVM, AwardDTO>();
            });
        }
    }
}