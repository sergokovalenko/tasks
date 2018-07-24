using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UsersAward.PLL.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            var errorFilter = new HandleErrorAttribute();
            errorFilter.ExceptionType = typeof(Exception);
            errorFilter.View = "Error";

            filters.Add(errorFilter);
        }
    }
}