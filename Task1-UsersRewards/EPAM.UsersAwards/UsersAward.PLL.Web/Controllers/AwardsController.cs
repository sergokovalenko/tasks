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
            var model = Mapper.Map<IEnumerable<DisplayAwardVM>>(BLLManager.GetAllAwards());
            return View(model);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(CreateAwardVM user)
        {
            var newUser = Mapper.Map<AwardDTO>(user);
            if (BLLManager.AddAward(newUser))
            {
                return RedirectToAction("Index");
            }

            return View(user);
        }

        public ActionResult Delete(Guid id)
        {
            BLLManager.DeleteAward(id);
            return RedirectToAction("Index");
        }

        public ActionResult Edit(Guid id)
        {
            var user = BLLManager.GetAwardById(id);

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
                if (BLLManager.UpdateAward(updatedAward))
                {
                    return RedirectToAction("Index");
                }
                return View(award);
            }
            return View(award);
        }
    }
}