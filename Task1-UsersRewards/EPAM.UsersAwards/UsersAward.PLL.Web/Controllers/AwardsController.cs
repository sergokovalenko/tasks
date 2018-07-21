using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAward.Entities;
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

        public ActionResult Index()
        {
            var model = Mapper.Map<IEnumerable<DisplayAwardVM>>(bllModel.GetAllAwards());
            return View(model);
        }

        public ActionResult Details(int id)
        {
            var awardModel = bllModel.GetAward(id);

            if (awardModel == null)
            {
                return HttpNotFound();
            }

            return View(awardModel);
        }

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

        public ActionResult Edit(int id)
        {
            var user = bllModel.GetAwardById(id);

            if (user == null)
            {
                return RedirectToAction("Index");
            }

            var userModel = Mapper.Map<EditAwardVM>(user);

            return View(userModel);
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