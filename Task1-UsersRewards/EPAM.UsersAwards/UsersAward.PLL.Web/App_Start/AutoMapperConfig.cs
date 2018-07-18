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
                cfg.CreateMap<UserDTO, CreateUserVM>().ForMember(obj => obj.Uploaded, option => option.UseValue<object>(null));
                cfg.CreateMap<CreateUserVM, UserDTO>()
                    .ForMember(obj => obj.Id, option => option.UseValue(Guid.Empty))
                    .ForMember(obj => obj.Age, opt => opt.UseValue(-1));
                cfg.CreateMap<EditUserVM, UserDTO>()
                    .ForMember(obj => obj.Age, opt => opt.UseValue(-1)); 

                cfg.CreateMap<AwardDTO, DisplayAwardVM>();
                cfg.CreateMap<AwardDTO, CreateAwardVM>();
                cfg.CreateMap<CreateAwardVM, AwardDTO>().ForMember(obj => obj.Id, option => option.UseValue(Guid.Empty));
                cfg.CreateMap<EditAwardVM, AwardDTO>();
            });

            Mapper.AssertConfigurationIsValid();
        }
    }
}