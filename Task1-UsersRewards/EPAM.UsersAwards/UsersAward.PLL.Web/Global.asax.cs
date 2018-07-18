﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using UsersAward.PLL.Web;

namespace UsersAward.PLL.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            AutoMapperConfig.Configurate();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
