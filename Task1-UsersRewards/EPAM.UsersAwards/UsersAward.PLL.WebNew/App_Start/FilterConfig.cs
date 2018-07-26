using System;
using System.Web.Mvc;

namespace UsersAward.PLL.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            var errorFilter = new HandleErrorAttribute();
            errorFilter.View = "Error";

            filters.Add(errorFilter);
        }
    }
}