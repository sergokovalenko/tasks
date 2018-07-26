using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using UsersAward.PLL.Web;
using UsersAward.PLL.Web.App_Start;
using UsersAward.PLL.Web.Models;

namespace UsersAward.PLL.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            AutoMapperConfig.Configurate();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            ModelBinders.Binders.Add(typeof(DateTime), new DateTimeBinder());
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            Logger.Log.ErrorFormat("[{0}] Error {1} - {2}", DateTime.Now, ex.Message, ex.StackTrace);
        }
    }
}
