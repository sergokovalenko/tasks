using System;
using System.Web.Mvc;
using System.Web.Routing;
using UsersAward.PLL.Web.Models;

namespace UsersAward.PLL.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            AutoMapperConfig.Configurate();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            ModelBinders.Binders.Add(typeof(DateTime), new DateTimeBinder());
        }
    }
}