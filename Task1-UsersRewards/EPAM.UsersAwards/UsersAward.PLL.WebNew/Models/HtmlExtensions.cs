using System.Text;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace UsersAward.PLL.Web.Models
{
    public static class HtmlExtensions
    {
        public static string BuilBreadcrumbNavigation(this HtmlHelper helper)
        {
            StringBuilder breadcrumb = new StringBuilder("<ol class='breadcrumb'><li>").Append(helper.ActionLink("Home", "Index", "Users").ToHtmlString()).Append("</li>");

            breadcrumb.Append("<li>");
            breadcrumb.Append(helper.ActionLink(
                                    helper.ViewContext.RouteData.Values["controller"].ToString(),
                                    "Index",
                                    helper.ViewContext.RouteData.Values["controller"].ToString()));
            breadcrumb.Append("</li>");

            if (helper.ViewContext.RouteData.Values["action"].ToString() != "Index")
            {
                breadcrumb.Append("<li>");
                breadcrumb.Append(helper.ActionLink(
                                         helper.ViewContext.RouteData.Values["action"].ToString(),
                                         helper.ViewContext.RouteData.Values["action"].ToString(),
                                         helper.ViewContext.RouteData.Values["controller"].ToString()));
                breadcrumb.Append("</li>");
            }

            return breadcrumb.Append("</ol>").ToString();
        }
    }
}