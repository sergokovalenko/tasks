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
        public ActionResult Index()
        {
            var model = Mapper.Map<IEnumerable<DisplayAwardVM>>(BllModel.GetAllAwards());
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
                if (BllModel.AddAward(newUser))
                {
                    return RedirectToAction("Index");
                }
                return View(award);
            }

            return View(award);
        }

        public ActionResult Delete(Guid id)
        {
            BllModel.DeleteAward(id);
            return RedirectToAction("Index");
        }

        public ActionResult Edit(Guid id)
        {
            var user = BllModel.GetAwardById(id);

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
                if (BllModel.UpdateAward(updatedAward))
                {
                    return RedirectToAction("Index");
                }
                return View(award);
            }
            return View(award);
        }
    }
}