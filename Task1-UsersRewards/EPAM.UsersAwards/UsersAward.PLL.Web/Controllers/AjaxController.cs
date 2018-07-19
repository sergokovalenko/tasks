using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.AwardModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class AjaxController : Controller
    {
        private AwardPictureBllModel bllModel;

        public AjaxController(AwardPictureBllModel model)
        {
            this.bllModel = model;
        }

        public ActionResult ShowModalForAward(Guid awardId)
        {
            if (Request.IsAjaxRequest())
            {
                var model = Mapper.Map<DisplayAwardVM>(bllModel.GetAwardById(awardId));

                return PartialView("_AwardDescriptionModalPartial", model);
            }

            return null;
        }
    }
}