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
    public class UserController : Controller
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
        public ActionResult Create(CreateUserVM user)
        {
            if (ModelState.IsValid)
            {
                var newUser = Mapper.Map<UserDTO>(user);
                if (BLLManager.AddUser(newUser))
                {
                    return RedirectToAction("Index");
                }
                return View(user);
            }

            return View(user);
        } 

        public ActionResult Delete(Guid id)
        {
            BLLManager.DeleteUser(id);
            return RedirectToAction("Index");
        }

        public ActionResult Edit(Guid id)
        {
            var user = BLLManager.GetUserById(id);

            if (user == null)
            {
                return RedirectToAction("Index");
            }

            var userModel = Mapper.Map<EditUserVM>(user);

            return View(userModel);
        }

        [HttpPost]
        public ActionResult Edit(EditUserVM user)
        {
            if (ModelState.IsValid)
            {
                var updatedUser = Mapper.Map<UserDTO>(user);
                if (BLLManager.UpdateUser(updatedUser))
                {
                    return RedirectToAction("Index");
                }
                return View(user);
            }
            return View(user);
        }

        public FileContentResult DownloadUsers()
        {
            var fileResult = BLLManager.GetFileWithUsers();
            return File(fileResult.bytes, fileResult.type, "All Users");
        }
    }
}