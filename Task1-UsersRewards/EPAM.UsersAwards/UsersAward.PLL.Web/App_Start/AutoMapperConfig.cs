﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models.UserModels;

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
            });
        }
    }
}