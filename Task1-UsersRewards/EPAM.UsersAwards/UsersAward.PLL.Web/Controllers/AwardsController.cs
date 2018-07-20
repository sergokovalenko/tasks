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

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(CreateAwardVM award)
        {
            if (ModelState.IsValid)
            {
                var newUser = Mapper.Map<AwardDTO>(award);
                if (bllModel.AddAward(newUser) > 0)
                {
                    return RedirectToAction("Index");
                }
                return View(award);
            }

            return View(award);
        }

        public ActionResult Delete(int id)
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

        [HttpPost]
        public ActionResult Edit(EditAwardVM award)
        {
            if (ModelState.IsValid)
            {
                var updatedAward = Mapper.Map<AwardDTO>(award);
                if (bllModel.UpdateAward(updatedAward))
                {
                    return RedirectToAction("Index");
                }
                return View(award);
            }
            return View(award);
        }
    }
}