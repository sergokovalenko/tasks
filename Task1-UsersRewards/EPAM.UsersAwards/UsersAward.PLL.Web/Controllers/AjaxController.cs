using AutoMapper;
using System.Web.Mvc;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.AwardModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class AjaxController : Controller
    {
        private AwardPictureBllModel awardModel;
        private UserPictureBllModel userModel;

        public AjaxController(AwardPictureBllModel model, UserPictureBllModel model2)
        {
            this.awardModel = model;
            this.userModel = model2;
        }

        public ActionResult ShowModalForAward(int awardId)
        {
            if (Request.IsAjaxRequest())
            {
                var model = Mapper.Map<DisplayAwardVM>(awardModel.GetAwardById(awardId));

                return PartialView("_AwardDescriptionModalPartial", model);
            }

            return null;
        }

        public ActionResult ShowModalForFreeAward(int userId)
        {
            if (Request.IsAjaxRequest())
            {
                var model = userModel.GetFreeAwardsForUser(userId);

                return PartialView("_ShowModalForFreeAward", model);
            }

            return null;
        }
    }
}