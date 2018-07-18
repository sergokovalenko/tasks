using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAward.PLL.Web.Models;

namespace UsersAward.PLL.Web.Controllers
{
    public class ValidationController : Controller
    {
        private AwardPictureBllModel bllModel;

        public ValidationController(AwardPictureBllModel model)
        {
            this.bllModel = model;
        }

        public JsonResult IsAwardAllowed(string title)
        {
            return Json(bllModel.GetAllAwards().Any(aw => (string.Compare(title, aw.Title, StringComparison.InvariantCultureIgnoreCase) != 0)), JsonRequestBehavior.AllowGet);
        }
    }
}