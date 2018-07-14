using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.UserModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = Mapper.Map<IEnumerable<DisplayUserVM>>(BLLManager.GetAllUsers());
            return View(model);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ChildActionOnly]
        public ActionResult Create(CreateUserVM user)
        {
            var newUser = Mapper.Map<UserDTO>(user);
            if (BLLManager.AddUser(newUser))
            {
                return RedirectToAction("Index");
            }

            return View(user);
        }

        [ChildActionOnly]
        public ActionResult Delete(Guid id)
        {
            BLLManager.DeleteUser(id);
            return RedirectToAction("Index");
        }

        public ActionResult Edit(Guid id)
        {
            return View();
        }

        [HttpPost]
        [ChildActionOnly]
        public ActionResult Edit(EditUserVM user)
        {
            return View();
        }
    }
}