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
        private AwardPictureBllModel awardBllModel;
        private UserPictureBllModel userBllModel;

        public ValidationController(AwardPictureBllModel aw, UserPictureBllModel us)
        {
            this.awardBllModel = aw;
            this.userBllModel = us;
        }

        public JsonResult IsAwardAllowed(string title)
        {
            var result = !awardBllModel.GetAllAwards().Any(aw => (string.Compare(title, aw.Title, StringComparison.InvariantCultureIgnoreCase) == 0));
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}