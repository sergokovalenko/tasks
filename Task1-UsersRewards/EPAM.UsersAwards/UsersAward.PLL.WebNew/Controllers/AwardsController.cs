using AutoMapper;
using System.Collections.Generic;
using System.Web.Mvc;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.AwardModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class AwardsController : Controller
    {
        private AwardPictureBllModel bllModel;

        public AwardsController(AwardPictureBllModel model)
        {
            this.bllModel = model;
        }

        [Route("awards/")]
        [Route("awards/{query}")]
        public ActionResult Index(string query = "")
        {
            var model = bllModel.GetModelForHomePage(query);

            if (model == null)
            {
                return View(new List<DisplayAwardVM>());
            }

            return View(model);
        }

        [Route("award/{id}")]
        public ActionResult Details(string id)
        {
            var awardModel = bllModel.GetAward(id);

            if (awardModel == null)
            {
                return HttpNotFound();
            }

            return View(awardModel);
        }

        [Route("create-award/")]
        public ActionResult Create()
        {
            return View();
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Create(CreateAwardVM award)
        {
            if (ModelState.IsValid)
            {
                if (bllModel.CreateAward(award, Request))
                {
                    return RedirectToAction("Index");
                }

                ViewBag.ImageError = "Image required";

                return View(award);
            }

            return View(award);
        }

        [Route("award/{id}/delete")]
        public ActionResult Delete(int id)
        {
            var model = bllModel.GetAward(id);
            if (model == null)
            {
                return HttpNotFound();
            }

            return View(model);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult DeleteAward(int id)
        {
            bllModel.DeleteAward(id);
            return RedirectToAction("Index");
        }

        [Route("award/{id}/edit")]
        public ActionResult Edit(int id)
        {
            var award = bllModel.GetAwardById(id);

            if (award == null)
            {
                return RedirectToAction("Index");
            }

            var awardModel = Mapper.Map<EditAwardVM>(award);

            return View(awardModel);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Edit(EditAwardVM award)
        {
            if (ModelState.IsValid)
            {
                if (bllModel.UpdateAward(award, Request))
                {
                    return RedirectToAction("Index");
                }
                return View(award);
            }
            return View(award);
        }
    }
}