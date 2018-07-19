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
                cfg.CreateMap<UserDTO, Models.UserModels.DisplayUserVM>()
                    .ForMember(obj => obj.Awards, (IMemberConfigurationExpression<UserDTO, Models.UserModels.DisplayUserVM, List<AwardDTO>> opt) => opt.UseValue(new List<AwardDTO>()));
                cfg.CreateMap<UserDTO, CreateUserVM>();
                cfg.CreateMap<CreateUserVM, UserDTO>()
                    .ForMember(obj => obj.Id, (IMemberConfigurationExpression<CreateUserVM, UserDTO, Guid> option) => option.UseValue(Guid.Empty))
                    .ForMember(obj => obj.Age, (IMemberConfigurationExpression<CreateUserVM, UserDTO, int> opt) => opt.UseValue(-1));
                cfg.CreateMap<EditUserVM, UserDTO>()
                    .ForMember(obj => obj.Age, (IMemberConfigurationExpression<EditUserVM, UserDTO, int> opt) => opt.UseValue(-1)); 

                cfg.CreateMap<AwardDTO, Models.AwardModels.DisplayAwardVM>();
                cfg.CreateMap<AwardDTO, CreateAwardVM>();
                cfg.CreateMap<CreateAwardVM, AwardDTO>().ForMember(obj => obj.Id, (IMemberConfigurationExpression<CreateAwardVM, AwardDTO, Guid> option) => option.UseValue(Guid.Empty));
                cfg.CreateMap<EditAwardVM, AwardDTO>();
            });

            Mapper.AssertConfigurationIsValid();
        }
    }
}