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
                cfg.CreateMap<UserDTO, DisplayUserVM>()
                    .ForMember(obj => obj.Awards, (opt => opt.UseValue(new List<AwardDTO>())));
                cfg.CreateMap<UserDTO, CreateUserVM>();
                cfg.CreateMap<UserDTO, DeleteUserVM>();

                //For using this VM as partial
                cfg.CreateMap<DisplayUserVM, DeleteUserVM>();

                cfg.CreateMap<CreateUserVM, UserDTO>()
                    .ForMember(obj => obj.Id, (opt => opt.UseValue(-1)))
                    .ForMember(obj => obj.Age, (opt => opt.UseValue(-1)))
                    .ForMember(obj => obj.ImageId, (opt => opt.UseValue(Guid.Empty)));

                cfg.CreateMap<EditUserVM, UserDTO>()
                    .ForMember(obj => obj.Age, (opt => opt.UseValue(-1)))
                    .ForMember(obj => obj.ImageId, (opt => opt.UseValue(Guid.Empty)));

                cfg.CreateMap<AwardDTO, DisplayAwardVM>();
                cfg.CreateMap<AwardDTO, CreateAwardVM>();
                cfg.CreateMap<CreateAwardVM, AwardDTO>()
                    .ForMember(obj => obj.Id, (opt => opt.UseValue(-1)))
                    .ForMember(obj => obj.ImageId, (opt => opt.UseValue(Guid.Empty))); ;
                cfg.CreateMap<EditAwardVM, AwardDTO>();
            });

            Mapper.AssertConfigurationIsValid();
        }
    }
}