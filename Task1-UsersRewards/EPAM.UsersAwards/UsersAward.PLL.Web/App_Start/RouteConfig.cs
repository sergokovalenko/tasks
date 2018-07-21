using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace UsersAward.PLL.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: null,
                url: "users/",
                defaults: new { controller = "User", action = "Index" }
                );

            routes.MapRoute(
                name: null,
                url: "create-user/",
                defaults: new { controller = "User", action = "Create" }
                );

            //routes.MapRoute(
            //    name: null,
            //    url: "user/{id}",
            //    defaults: new { controller = "User", action = "Details" }
            //    );

            //routes.MapRoute(
            //    name: null,
            //    url: "user/{id}/edit",
            //    defaults: new { controller = "User", action = "Edit" }
            //    );

            //routes.MapRoute(
            //    name: null,
            //    url: "user/{id}/delete",
            //    defaults: new { controller = "User", action = "Delete" }
            //    );

            routes.MapRoute(
                name: null,
                url: "awards/",
                defaults: new { controller = "Awards", action = "Index" }
                );

            routes.MapRoute(
                name: null,
                url: "create-award/",
                defaults: new { controller = "Awards", action = "Create" }
                );

            routes.MapRoute(
                name: null,
                url: "award/{id}",
                defaults: new { controller = "Awards", action = "Details" }
                );

            routes.MapRoute(
                name: null,
                url: "award/{id}/edit",
                defaults: new { controller = "Awards", action = "Edit" }
                );

            routes.MapRoute(
                name: null,
                url: "award/{id}/delete",
                defaults: new { controller = "Awards ", action = "Delete" }
                );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "User", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
