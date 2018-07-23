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
                defaults: new { controller = "Users", action = "Index" }
                );

            routes.MapRoute(
                name: null,
                url: "users/{query}",
                defaults: new { controller = "Users", action = "Index" }
                );

            routes.MapRoute(
                name: null,
                url: "create-user/",
                defaults: new { controller = "Users", action = "Create" }
                );

            routes.MapRoute(
                name: null,
                url: "user/{id}",
                defaults: new { controller = "Users", action = "Details" }
                );

            routes.MapRoute(
                name: null,
                url: "user/{id}/edit",
                defaults: new { controller = "Users", action = "Edit" }
                );

            routes.MapRoute(
                name: null,
                url: "user/{id}/delete",
                defaults: new { controller = "Users", action = "Delete" }
                );

            routes.MapRoute(
                name: null,
                url: "awards/",
                defaults: new { controller = "Awards", action = "Index" }
                );

            routes.MapRoute(
                name: null,
                url: "awards/{query}",
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
                defaults: new { controller = "Awards", action = "Delete" }
                );

            routes.MapRoute(
                name: null,
                url: "award-user/{userId_awardId}",
                defaults: new { controller = "Users", action = "AwardUserByUrl" }
                );

            routes.MapRoute(
                name: "Default",
                url: "{action}/{controller}/{id}",
                defaults: new { controller = "Users", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
