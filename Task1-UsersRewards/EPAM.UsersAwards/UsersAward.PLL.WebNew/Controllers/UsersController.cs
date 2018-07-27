using AutoMapper;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.UserModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class UsersController : Controller
    {
        private UserPictureBllModel bllModel;

        public UsersController(UserPictureBllModel model)
        {
            this.bllModel = model;
        }

        [Route("")]
        [Route("users/")]
        [Route("users/{query}")]
        public ActionResult Index(string query = "")
        {
            var model = bllModel.GetModelForHomePage(query);

            if (model == null)
            {
                return View(new List<DisplayUserVM>());
            }

            return View(model);
        }

        [Route("create-user/")]
        public ActionResult Create()
        {
            return View();
        }

        [Route("create-user/")]
        [HttpPost]
        public ActionResult Create(CreateUserVM user)
        {
            if (ModelState.IsValid)
            {
                if (bllModel.CreateUser(user, Request))
                {
                    return RedirectToAction("Index");
                }

                return View(user);
            }

            return View(user);
        }

        [Route("user/{id}/delete")]
        public ActionResult Delete(int id)
        {
            var model = bllModel.GetUser(id);
            return View(model);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult DeleteUser(int id)
        {
            if (bllModel.DeleteUser(id))
            {
                return RedirectToAction("Index");
            }
            else
            {
                return HttpNotFound();
            }
        }

        [Route("user/{id}/edit")]
        public ActionResult Edit(int id)
        {
            var user = bllModel.GetUserById(id);

            if (user == null)
            {
                return HttpNotFound();
            }

            var userModel = Mapper.Map<EditUserVM>(user);

            return View(userModel);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Edit(EditUserVM user)
        {
            if (ModelState.IsValid)
            {
                if (bllModel.UpdateUser(user, Request))
                {
                    return RedirectToAction("Index");
                }

                return View(user);
            }

            return View(user);
        }

        [Route("user/{id}")]
        public ActionResult Details(string id)
        {
            var userModel = bllModel.GetDetailedUser(id);

            if (userModel == null)
            {
                return HttpNotFound();
            }

            return View(userModel);
        }

        public ActionResult GetImageById(Guid id)
        {
            ImageDTO imgDTO = bllModel.GetImageById(id);

            return File(imgDTO.Data, imgDTO.Type);
        }

        public ActionResult AddAwardToUser(int userId, int awardId)
        {
            bllModel.AddAwardToUser(userId, awardId);
            return RedirectToAction("Details", "Users", new { id = userId });
        }

        [Route("award-user/{userId_awardId}")]
        public ActionResult AwardUserByUrl(string userId_awardId)
        {
            var answer = bllModel.AwardUserByUrl(userId_awardId);

            if (!answer)
            {
                return HttpNotFound();
            }

            return RedirectToAction("Index", "Users");
        }

        public FileContentResult DownloadUsers()
        {
            var fileResult = bllModel.GetFileWithUsers();
            return File(fileResult.Data, fileResult.Type, fileResult.FileName);
        }

        public ActionResult DeleteUserImage(Guid ownerId)
        {
            if (bllModel.DeleteUserImage(ownerId))
            {
                return RedirectToAction("Index");
            }

            return RedirectToAction("Index");
        }
    }
}